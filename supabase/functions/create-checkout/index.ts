import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TIER_PRICE_MAP: Record<string, string> = {
  Basic: "price_1TJWrAFAaVcnX26dusxmel4I",
  Pro: "price_1TJWrBFAaVcnX26dV8pGoG5E",
};

const LINKEDIN_BUDGET_PRICE_ID = "price_1TJWrCFAaVcnX26dG7jPdYvQ";

// Simple in-memory rate limiter (per-isolate; resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 429,
    });
  }

  try {
    const body = await req.json();
    const { tier, linkedinBudget, shortlistCount, customerEmail, customerName, companyName, role, industry, description, visaStatus, openings, postingLength, experienceLevel } = body;

    // Validate tier
    const validTiers = ["Basic", "Pro"];
    if (!validTiers.includes(tier)) {
      return new Response(JSON.stringify({ error: "Invalid plan selection." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate linkedinBudget
    const budget = Number(linkedinBudget);
    if (!Number.isFinite(budget) || budget < 50 || budget > 500) {
      return new Response(JSON.stringify({ error: "LinkedIn budget must be between $50 and $500." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate email
    if (!customerEmail || typeof customerEmail !== "string" || !EMAIL_REGEX.test(customerEmail.trim())) {
      return new Response(JSON.stringify({ error: "A valid email address is required." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate optional string fields
    const stringFields = { customerName, companyName, role, industry };
    for (const [key, val] of Object.entries(stringFields)) {
      if (val !== undefined && val !== null && (typeof val !== "string" || val.length > 200)) {
        return new Response(JSON.stringify({ error: "Invalid input." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
    }

    const priceId = TIER_PRICE_MAP[tier];

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const sanitizedEmail = customerEmail.trim().toLowerCase();

    // Check for existing customer
    const customers = await stripe.customers.list({ email: sanitizedEmail, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const allowedOrigins = [
      "https://najahcareers.lovable.app",
      "https://id-preview--115b49b5-9666-4ece-ae96-baff99b452af.lovable.app",
    ];
    const requestOrigin = req.headers.get("origin") || "";
    const baseUrl = allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : allowedOrigins[0];

    // Build line items: plan + LinkedIn budget
    const line_items: Array<{ price: string; quantity: number }> = [
      { price: priceId, quantity: 1 },
      { price: LINKEDIN_BUDGET_PRICE_ID, quantity: budget },
    ];

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : sanitizedEmail,
      line_items,
      mode: "payment",
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#work-with-us`,
      metadata: {
        customer_name: (customerName || "").slice(0, 200),
        company_name: (companyName || "").slice(0, 200),
        role: (role || "").slice(0, 200),
        industry: (industry || "").slice(0, 200),
        tier: tier,
        linkedin_budget: String(budget),
        shortlist_count: String(shortlistCount || 10),
      },
    });

    // Insert submission into database
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabaseAdmin.from("submissions").insert({
      customer_name: (customerName || "").slice(0, 200),
      customer_email: sanitizedEmail,
      company_name: (companyName || "").slice(0, 200),
      role: (role || "").slice(0, 200),
      industry: (industry || "").slice(0, 200),
      description: (description || "").slice(0, 2000),
      visa_status: (visaStatus || "").slice(0, 200),
      openings: Number(openings) || 1,
      posting_length: Number(postingLength) || 1,
      experience_level: (experienceLevel || "").slice(0, 200),
      tier,
      shortlist_count: shortlistCount || 10,
      stripe_session_id: session.id,
      status: "pending",
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: "An error occurred. Please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
