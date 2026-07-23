import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_contact_inquiry",
  title: "Submit a contact inquiry",
  description:
    "File a new project inquiry with Sadath Company on behalf of a visitor. Captures name, email, optional company, the service they're interested in, and a description of their project. The Sadath team follows up by email within 24 hours.",
  inputSchema: {
    name: z.string().trim().min(1).max(100).describe("Full name of the person inquiring."),
    email: z.string().trim().email().max(255).describe("Contact email address."),
    company: z.string().trim().max(200).optional().describe("Company or project name (optional)."),
    service: z
      .enum([
        "Custom Software",
        "Booking or Scheduling System",
        "Startup Website",
        "E-Commerce / Custom Site",
        "Design Overhaul / Rebrand",
        "Consulting",
        "Other",
      ])
      .describe("Which service they're interested in."),
    description: z
      .string()
      .trim()
      .min(10)
      .max(1000)
      .describe("Short description of the project, goals, and timeline."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ name, email, company, service, description }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      return {
        content: [{ type: "text", text: "Server is not configured to accept inquiries." }],
        isError: true,
      };
    }
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("submissions")
      .insert({
        customer_name: name,
        customer_email: email,
        company_name: company ?? null,
        tier: service,
        description,
        status: "new_inquiry",
      })
      .select("id")
      .single();

    if (error) {
      return {
        content: [{ type: "text", text: `Could not submit inquiry: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `Inquiry received. The Sadath team will reply to ${email} within 24 hours. Reference: ${data.id}`,
        },
      ],
      structuredContent: { id: data.id, status: "received" },
    };
  },
});
