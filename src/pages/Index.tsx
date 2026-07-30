import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PenTool,
  Code2,
  Rocket,
  Compass,
  LayoutDashboard,
  CalendarClock,
  Workflow,
  Globe,
  ShoppingBag,
  Palette,
  CreditCard,
  Boxes,
  Plug,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import sadathLogo from "@/assets/sadath-logo.png";
import { Seo } from "@/components/Seo";

const t = {
  nav: {
    howItWorks: "Process",
    contact: "Get Started",
  },
  hero: {
    tagline: "Websites · E-Commerce · Software · Systems",
    title: "Software that runs it, websites that grow it.",
    description:
      "Sadath Company is a UK studio building websites, online stores, custom software, and the internal systems behind them — from booking and dashboards to workflow automation.",
    cta: "Get Started",
  },

  services: {
    title: "Our Process",
    subtitle: "A focused, transparent sprint from messy process to shipped product.",
    steps: [
      {
        title: "Discovery Call",
        desc: "We sit with you to understand the business, the users, and the process you're trying to streamline.",
      },
      {
        title: "Strategy & Wireframes",
        desc: "We map flows, data models, and screens — for software or site — before a single pixel is drawn.",
      },
      {
        title: "Design",
        desc: "Custom interface and brand design tailored to your team and customers. Reviewed in 2 rounds.",
      },
      {
        title: "Build",
        desc: "Modern, hand-crafted code. Auth, integrations, performance, accessibility — built in from day one.",
      },
      {
        title: "Launch & Support",
        desc: "We deploy, train your team, and stay on call after launch with hosting and ongoing maintenance.",
      },
    ],
  },
  pricing: {
    title: "Studio Packages",
    subtitle:
      "Indicative pricing for websites and custom software. Final scope and quote follow a discovery call.",
    perPackage: "starting at",
    select: "Choose Package",
  },
  form: {
    fullName: "Full Name",
    email: "Email Address",
    description: "Briefly describe your project and goals",
  },
};

const pricingOptions = [
  {
    label: "Startup Website",
    priceMin: 400,
    priceMax: 800,
    features: [
      "Unlimited pages custom website",
      "Mobile-first responsive design",
      "Brand & design overhaul",
      "1 year managed hosting included",
      "Basic SEO setup & analytics",
      "Domain configuration",
    ],
    badge: null,
  },
  {
    label: "Custom Software",
    priceMin: 600,
    priceMax: 2000,
    features: [
      "Discovery & process mapping",
      "Custom dashboard, tool, or automation",
      "User authentication & roles",
      "Integrations (Stripe, email, APIs)",
      "Managed hosting & maintenance",
      "Team training & handover",
    ],
    badge: "Most Impact",
  },
];

const serviceOptions = [
  "Custom Software (Dashboard / Tool / Automation)",
  "Booking or Scheduling System",
  "Startup Website (£400–£800)",
  "E-Commerce / Custom Site",
  "Design Overhaul / Rebrand",
  "Consulting",
  "Other",
];

const inputClasses =
  "w-full bg-background/50 border border-input rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-foreground/30 transition-all placeholder:text-muted-foreground";

const processSteps = [
  { icon: <Compass size={20} />, ...t.services.steps[0] },
  { icon: <PenTool size={20} />, ...t.services.steps[1] },
  { icon: <Sparkles size={20} />, ...t.services.steps[2] },
  { icon: <Code2 size={20} />, ...t.services.steps[3] },
  { icon: <Rocket size={20} />, ...t.services.steps[4] },
];

const whatWeBuild = [
  {
    title: "Websites",
    tagline: "Sites that make small teams look established.",
    desc: "Custom-designed, fast, accessible websites for startups and small businesses — with hosting, SEO, and domain setup handled.",
    items: [
      { icon: <Globe size={18} />, label: "Marketing & startup websites" },
      { icon: <Palette size={18} />, label: "Brand & design overhauls" },
      { icon: <ShieldCheck size={18} />, label: "Managed hosting & maintenance" },
    ],
  },
  {
    title: "E-Commerce",
    tagline: "Sell online without fighting your platform.",
    desc: "Online stores built around your products and margins, with payments, shipping, and stock wired in from day one.",
    items: [
      { icon: <ShoppingBag size={18} />, label: "Custom stores (Stripe / Shopify)" },
      { icon: <CreditCard size={18} />, label: "Payments, checkout & subscriptions" },
      { icon: <Boxes size={18} />, label: "Inventory & order management" },
    ],
  },
  {
    title: "Software",
    tagline: "Replace the spreadsheet. Save hours every week.",
    desc: "Internal tools tailored to how your business actually works — so your team stops fighting software and starts moving faster.",
    items: [
      { icon: <LayoutDashboard size={18} />, label: "Dashboards & admin panels" },
      { icon: <CalendarClock size={18} />, label: "Booking & scheduling tools" },
      { icon: <Code2 size={18} />, label: "Client & customer portals" },
    ],
  },
  {
    title: "Systems",
    tagline: "Connect the tools you already pay for.",
    desc: "We automate the manual steps between your apps — quotes, invoices, CRM, email — so nothing gets rekeyed twice.",
    items: [
      { icon: <Workflow size={18} />, label: "Workflow automation" },
      { icon: <Plug size={18} />, label: "API & third-party integrations" },
      { icon: <Sparkles size={18} />, label: "Reporting & data clean-up" },
    ],
  },
];


export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(0);
  const [showThanks, setShowThanks] = useState(false);
  const [contactName, setContactName] = useState("");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").slice(0, 100);
    const email = String(fd.get("email") || "").slice(0, 255);
    const project = String(fd.get("project") || "").slice(0, 100);
    const message = String(fd.get("message") || "").slice(0, 1000);
    const subject = encodeURIComponent(`New project inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${project}\n\n${message}`
    );
    setContactName(name.split(" ")[0] || "");
    setShowThanks(true);
    form.reset();
    // Open the user's email client without navigating away from the thank-you screen
    const mailto = `mailto:contact@sadathcompany.com?subject=${subject}&body=${body}`;
    window.setTimeout(() => {
      const a = document.createElement("a");
      a.href = mailto;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 300);
  };


  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-muted-foreground/30">
      <Seo
        title="Sadath Company — Websites, E-Commerce, Software &amp; Systems"
        description="UK studio building websites, online stores, custom software and internal systems for startups and small businesses. Dashboards, booking, automation and integrations."
        path="/"

      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 md:px-12 bg-transparent">
        <div
          role="button"
          tabIndex={0}
          aria-label="Scroll to top"
          className="flex items-center cursor-pointer"
          onClick={() => scrollToSection("hero")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollToSection("hero");
            }
          }}
        >
          <img
            src={sadathLogo}
            alt="Sadath Company"
            className="h-32 md:h-48 w-auto object-contain"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => scrollToSection("contact")}
            className="group hidden sm:flex items-center space-x-2 text-xs md:text-sm font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg hover:scale-105 transition-all"
          >
            <span>Get Started</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center space-y-8 text-2xl font-serif"
          >
            <button onClick={() => scrollToSection("contact")}>
              {t.nav.contact}
            </button>
            <button
              className="text-sm uppercase tracking-widest opacity-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full opacity-30 grayscale"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase opacity-60 mb-6 block">
            {t.hero.tagline}
          </span>
          <h1 className="font-serif text-5xl md:text-8xl font-light tracking-tight mb-8 leading-tight">
            {t.hero.title.split(",")[0]}
            <br />
            <span className="italic">{t.hero.title.split(",")[1]}</span>
          </h1>
          <p className="font-serif text-lg md:text-2xl opacity-70 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => scrollToSection("contact")}
              className="group flex items-center space-x-3 text-[12px] font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground px-10 py-5 rounded-full transition-all hover:scale-105"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-[12px] font-bold tracking-[0.2em] uppercase border border-foreground/20 px-10 py-5 rounded-full hover:bg-secondary transition-all"
            >
              {t.nav.howItWorks}
            </button>
          </div>
        </motion.div>
      </section>

      {/* What We Build */}
      <section id="what-we-build" className="py-32 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 block">
              What We Build
            </span>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">
              Websites, Stores, <span className="italic">Software &amp; Systems</span>
            </h2>
            <p className="text-muted-foreground text-lg font-serif italic max-w-2xl mx-auto">
              One studio for the site customers see, the store that sells, and the systems that keep it all running.

            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatWeBuild.map((block) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-all"
              >
                <h3 className="font-serif text-3xl mb-3">{block.title}</h3>
                <p className="text-sm uppercase tracking-widest opacity-50 mb-6">
                  {block.tagline}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {block.desc}
                </p>
                <ul className="space-y-4">
                  {block.items.map((item) => (
                    <li key={item.label} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 md:px-12 bg-secondary/20">

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-serif text-4xl md:text-6xl mb-6">
              {t.pricing.title}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingOptions.map((opt, i) => {
              const isSelected = selectedPkg === i;
              return (
                <div
                  key={opt.label}
                  className={`relative p-10 rounded-3xl border transition-all flex flex-col ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary scale-105"
                      : "bg-secondary/50 border-border hover:border-foreground/20"
                  }`}
                >
                  {opt.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase whitespace-nowrap bg-emerald-500 text-white">
                      {opt.badge}
                    </div>
                  )}
                  <h3 className="font-serif text-2xl mb-4 mt-2">{opt.label}</h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold">
                      £{opt.priceMin.toLocaleString()}–£{opt.priceMax.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs uppercase tracking-widest block mt-1 ${
                        isSelected ? "opacity-60" : "text-muted-foreground"
                      }`}
                    >
                      {t.pricing.perPackage}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {opt.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            isSelected ? "opacity-80" : "text-emerald-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isSelected ? "opacity-90" : "text-muted-foreground"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-current/10">
                    <button
                      onClick={() => {
                        setSelectedPkg(i);
                        scrollToSection("contact");
                      }}
                      className={`w-full py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${
                        isSelected
                          ? "bg-primary-foreground text-primary"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {t.pricing.select}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact"
        className="py-32 px-6 md:px-12 bg-background border-t border-border"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-50 mb-6 block">
              {t.nav.contact}
            </span>
            <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
              Let's <span className="italic">talk</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Share a few details and we'll get back within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-10 space-y-6 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.15)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t.form.fullName}
                </label>
                <input
                  required
                  maxLength={100}
                  name="name"
                  type="text"
                  className={inputClasses}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t.form.email}
                </label>
                <input
                  required
                  maxLength={255}
                  name="email"
                  type="email"
                  className={inputClasses}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Service Interested In
              </label>
              <select
                name="project"
                defaultValue={serviceOptions[selectedPkg]}
                className={`${inputClasses} appearance-none`}
              >
                {serviceOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {t.form.description}
              </label>
              <textarea
                required
                maxLength={1000}
                name="message"
                rows={5}
                className={`${inputClasses} resize-none`}
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full group flex items-center justify-center space-x-3 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground py-5 rounded-2xl transition-all hover:opacity-90"
            >
              <span>Send Message</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        className="py-32 px-6 md:px-12 bg-background border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 block">
              01 — Process
            </span>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">
              {t.services.title}
            </h2>
            <p className="text-muted-foreground text-lg font-serif italic max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-30 mb-2">
                  Step 0{i + 1}
                </div>
                <h3 className="font-serif text-xl mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start space-y-4 max-w-md">
            <img
              src={sadathLogo}
              alt="Sadath Company"
              className="h-16 w-auto object-contain opacity-80"
            />
            <div className="text-[11px] leading-relaxed opacity-50 text-center md:text-left space-y-1">
              <p className="tracking-[0.15em] uppercase">
                © 2026 The Sadath Company Ltd. All rights reserved.
              </p>
              <p>Registered in England and Wales. Company No. 16707212</p>
              <p>Registered office: 27 Orchard Estate, Cambridge, CB1 3JW</p>
              <a
                href="mailto:contact@sadathcompany.com"
                className="inline-block hover:opacity-100 transition-opacity underline-offset-2 hover:underline"
              >
                contact@sadathcompany.com
              </a>
            </div>
          </div>

          <div className="flex space-x-8 text-[10px] font-bold tracking-widest uppercase opacity-40">
            <a href="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy
            </a>
            <a href="/terms" className="hover:opacity-100 transition-opacity">
              Terms
            </a>
            <a
              href="https://www.linkedin.com/company/sadathcompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Thank you overlay */}
      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Message sent"
            className="fixed inset-0 z-[80] flex items-center justify-center px-6 bg-background/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg text-center rounded-3xl border border-border bg-card p-12 shadow-[0_0_80px_-20px_hsl(var(--primary)/0.35)]"
            >
              <button
                onClick={() => setShowThanks(false)}
                aria-label="Close"
                className="absolute top-5 right-5 opacity-40 hover:opacity-100 transition-opacity"
              >
                <X size={18} />
              </button>
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="font-serif text-4xl md:text-5xl mb-5 leading-tight"
              >
                Thank you{contactName ? `, ${contactName}` : ""}
                <br />
                <span className="italic">for getting in touch.</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-muted-foreground leading-relaxed mb-10"
              >
                Your message is on its way to our team. We read every enquiry personally and will
                be in touch within 24 hours to arrange a discovery call.
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                onClick={() => setShowThanks(false)}
                className="text-[11px] font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground px-10 py-4 rounded-full hover:opacity-90 transition-all"
              >
                Back to Site
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
}
