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
    tagline: "Custom Software & Web Design · For Growing Businesses",
    title: "We build software, you run the business",
    description:
      "Sadath Company is a UK studio building custom business software and beautifully designed websites. Internal dashboards, booking systems, workflow automation — and the marketing sites and stores around them.",
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
      "Up to 5-page custom website",
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
    priceMin: 2000,
    priceMax: 8000,
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
    title: "Custom Software",
    tagline: "Replace the spreadsheet. Save hours every week.",
    desc: "We build internal tools tailored to how your business actually works — so your team stops fighting software and starts moving faster.",
    items: [
      { icon: <LayoutDashboard size={18} />, label: "Internal dashboards & admin panels" },
      { icon: <CalendarClock size={18} />, label: "Booking & scheduling systems" },
      { icon: <Workflow size={18} />, label: "Workflow automation & integrations" },
    ],
  },
  {
    title: "Web Design",
    tagline: "Beautiful sites that convert visitors into customers.",
    desc: "Editorial, custom-designed websites and online stores — built fast, accessible by default, and hosted on managed infrastructure.",
    items: [
      { icon: <Globe size={18} />, label: "Marketing & startup websites" },
      { icon: <ShoppingBag size={18} />, label: "E-commerce stores (Stripe / Shopify)" },
      { icon: <Palette size={18} />, label: "Brand & design overhauls" },
    ],
  },
];

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(0);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").slice(0, 100);
    const email = String(fd.get("email") || "").slice(0, 255);
    const project = String(fd.get("project") || "").slice(0, 100);
    const message = String(fd.get("message") || "").slice(0, 1000);
    const subject = encodeURIComponent(`New project inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${project}\n\n${message}`
    );
    window.location.href = `mailto:contact@sadathcompany.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-muted-foreground/30">
      <Seo
        title="Sadath Company — Web Design Agency for Startups"
        description="We design, build, and launch beautiful websites for startups. Web design, hosting, and e-commerce — plus strategic consulting to bring your idea to life."
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
                      £{opt.priceMin}–£{opt.priceMax}
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
    </div>
  );
}
