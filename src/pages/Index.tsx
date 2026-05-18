import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  ArrowRight,
  Globe,
  CheckCircle2,
  Linkedin,
  CreditCard,
  X,
  ChevronDown,
  Loader2,
  Sparkles,
  PenTool,
  Code2,
  Rocket,
  ShoppingBag,
  Server,
  Compass,
} from "lucide-react";
import { useState, useEffect, FormEvent, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Slider } from "@/components/ui/slider";

type Language = "en" | "ar";

const translations = {
  en: {
    nav: {
      howItWorks: "Process",
      pricing: "Services",
      contact: "Start a Project",
      apply: "Get a Quote",
    },
    hero: {
      tagline: "Web Design Studio · For Founders",
      title: "We design websites, you launch ideas",
      description:
        "Najah Studio is a boutique web design agency for startups. We craft beautiful websites, handle hosting, build e-commerce experiences, and consult founders from zero to launch.",
      cta: "Start a Project",
    },
    services: {
      title: "Our Process",
      subtitle:
        "A focused, transparent sprint from blank page to shipped product.",
      step1: {
        title: "Discovery Call",
        desc: "We sit with founders to understand the product, the audience, and the story you want to tell.",
      },
      step2: {
        title: "Strategy & Wireframes",
        desc: "We map the site structure, content priorities, and conversion flows before a single pixel is drawn.",
      },
      step3: {
        title: "Visual Design",
        desc: "Custom, editorial design tailored to your brand — never templates. Reviewed in 2 rounds.",
      },
      step4: {
        title: "Build & E-Commerce",
        desc: "Hand-crafted code, fast performance, accessible by default. Stripe, Shopify, or headless CMS as needed.",
      },
      step5: {
        title: "Launch & Host",
        desc: "We deploy on managed hosting, configure your domain, and stay on call after launch.",
      },
    },
    pricing: {
      title: "Studio Packages",
      subtitle: "Two ways to work with us. Add a managed hosting plan to keep things running smoothly.",
      perPackage: "starting at",
      total: "Total",
      select: "Choose Package",
    },
    form: {
      title: "Start a Project",
      subtitle: "Tell us about your idea — we'll get back within 24 hours.",
      contactInfo: "Contact Information",
      fullName: "Full Name",
      email: "Email Address",
      companyName: "Company / Startup",
      role: "Project Type",
      description: "Briefly describe your project and goals",
      descriptionHint: "Pages, features, references — anything helps.",
      visaStatus: "Project Stage",
      visaOptions: [
        "Pre-launch idea",
        "Existing brand, no site",
        "Redesign of current site",
      ],
      openings: "Number of Pages",
      length: "Timeline",
      weeks: "Weeks",
      industry: "Industry",
      experience: "Budget Range",
      submit: "Proceed to Checkout",
      checkoutTitle: "Secure Checkout",
      checkoutDesc:
        "Reserve your project slot — complete the deposit via Stripe.",
    },
  },
  ar: {
    nav: {
      howItWorks: "العملية",
      pricing: "الخدمات",
      contact: "ابدأ مشروعك",
      apply: "اطلب عرض سعر",
    },
    hero: {
      tagline: "استوديو تصميم مواقع · للمؤسسين",
      title: "نحن نصمم المواقع، وأنت تُطلق الأفكار",
      description:
        "نجاح ستوديو وكالة تصميم مواقع للشركات الناشئة. نصمم مواقع جميلة، ونوفر الاستضافة، ونبني تجارب تجارة إلكترونية، ونستشير المؤسسين من الفكرة إلى الإطلاق.",
      cta: "ابدأ مشروعك",
    },
    services: {
      title: "عمليتنا",
      subtitle: "سبرنت مركز وشفاف من الفكرة إلى الإطلاق.",
      step1: {
        title: "مكالمة استكشاف",
        desc: "نجلس مع المؤسسين لفهم المنتج والجمهور والقصة التي تريد سردها.",
      },
      step2: {
        title: "الاستراتيجية والمخططات",
        desc: "نرسم بنية الموقع وأولويات المحتوى وتدفقات التحويل قبل رسم أي بكسل.",
      },
      step3: {
        title: "التصميم البصري",
        desc: "تصميم مخصص لعلامتك التجارية — ليست قوالب أبدًا. مراجعة في جولتين.",
      },
      step4: {
        title: "البناء والتجارة الإلكترونية",
        desc: "كود مكتوب بعناية، أداء سريع، وصول للجميع. Stripe أو Shopify أو CMS حسب الحاجة.",
      },
      step5: {
        title: "الإطلاق والاستضافة",
        desc: "ننشر على استضافة مُدارة، ونضبط النطاق، ونبقى على استعداد بعد الإطلاق.",
      },
    },
    pricing: {
      title: "باقات الاستوديو",
      subtitle: "طريقتان للعمل معنا. أضف خطة استضافة مُدارة لإبقاء كل شيء يعمل بسلاسة.",
      perPackage: "تبدأ من",
      total: "الإجمالي",
      select: "اختر الباقة",
    },
    form: {
      title: "ابدأ مشروعك",
      subtitle: "أخبرنا عن فكرتك — سنرد خلال 24 ساعة.",
      contactInfo: "معلومات الاتصال",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      companyName: "الشركة / الشركة الناشئة",
      role: "نوع المشروع",
      description: "صف مشروعك وأهدافك بإيجاز",
      descriptionHint: "الصفحات، الميزات، المراجع — أي شيء يساعد.",
      visaStatus: "مرحلة المشروع",
      visaOptions: [
        "فكرة قبل الإطلاق",
        "علامة تجارية قائمة بدون موقع",
        "إعادة تصميم موقع حالي",
      ],
      openings: "عدد الصفحات",
      length: "الجدول الزمني",
      weeks: "أسابيع",
      industry: "الصناعة",
      experience: "نطاق الميزانية",
      submit: "المتابعة للدفع",
      checkoutTitle: "الدفع الآمن",
      checkoutDesc: "احجز مكان مشروعك — أكمل العربون عبر Stripe.",
    },
  },
};

const inputClasses =
  "w-full bg-background/50 border border-input rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-foreground/30 transition-all placeholder:text-muted-foreground";

export default function Index() {
  const [lang, setLang] = useState<Language>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<number>(0);
  const [linkedinBudget, setLinkedinBudget] = useState<number>(100);
  const [shortlistCount, setShortlistCount] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const t = translations[lang];
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const pricingOptions = [
    {
      tier: "Basic",
      label: lang === "en" ? "Launch" : "إطلاق",
      priceUsd: 60,
      priceSar: 225,
      features: lang === "en"
        ? [
            "Up to 5-page custom website",
            "Mobile-first responsive design",
            "1 year managed hosting",
            "Basic SEO setup",
          ]
        : [
            "موقع مخصص حتى 5 صفحات",
            "تصميم متجاوب للجوال أولاً",
            "استضافة مُدارة لمدة عام",
            "إعداد SEO أساسي",
          ],
      badge: null,
    },
    {
      tier: "Pro",
      label: lang === "en" ? "Scale" : "نمو",
      priceUsd: 100,
      priceSar: 375,
      features: lang === "en"
        ? [
            "Everything in Launch",
            "E-commerce / Stripe integration",
            "Custom CMS or blog",
            "Founder consulting calls",
          ]
        : [
            "كل ما في إطلاق",
            "تجارة إلكترونية / تكامل Stripe",
            "CMS أو مدونة مخصصة",
            "جلسات استشارية للمؤسس",
          ],
      badge: lang === "en" ? "Recommended" : "موصى به",
    },
  ];

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowCheckout(true);
  };

  const handlePayNow = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const form = formRef.current;
      if (!form) throw new Error("Form not found");

      const selectedTier = pricingOptions[selectedPkg];
      const formData = new FormData(form);
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          tier: selectedTier.tier,
          linkedinBudget,
          shortlistCount: selectedTier.tier === "Pro" ? shortlistCount : 10,
          customerEmail: formData.get("email"),
          customerName: formData.get("fullName"),
          companyName: formData.get("companyName"),
          role: formData.get("role"),
          industry: formData.get("industry"),
          description: formData.get("description"),
          visaStatus: formData.get("visaStatus"),
          openings: Number(formData.get("openings")) || 1,
          postingLength: Number(formData.get("postingLength")) || 1,
          experienceLevel: formData.get("experienceLevel"),
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
        setShowCheckout(false);
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedPrice = pricingOptions[selectedPkg];
  const totalPrice = selectedPrice.priceUsd + linkedinBudget;
  const totalSar = selectedPrice.priceSar + Math.round(linkedinBudget * 3.75);

  return (
    <div
      className={`min-h-screen bg-background text-foreground font-sans selection:bg-muted-foreground/30 ${isRtl ? "font-serif" : ""}`}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 md:px-12 bg-transparent">
        <div
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          onClick={() => scrollToSection("hero")}
        >
          <span className="font-serif text-2xl md:text-3xl tracking-tight leading-none">
            Najah<span className="italic"> Studio</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse text-[10px] font-bold tracking-[0.2em] uppercase">
          <button
            onClick={() => scrollToSection("pricing")}
            className="hover:opacity-60 transition-opacity"
          >
            {t.nav.pricing}
          </button>
          <button
            onClick={() => scrollToSection("work-with-us")}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full hover:scale-105 transition-all"
          >
            {t.nav.contact}
          </button>
          <button
            onClick={() => scrollToSection("process")}
            className="hover:opacity-60 transition-opacity"
          >
            {t.nav.howItWorks}
          </button>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center space-x-2 rtl:space-x-reverse text-[10px] font-bold tracking-widest uppercase bg-secondary/60 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-accent transition-all"
          >
            <Globe size={12} />
            <span>{lang === "en" ? "العربية" : "English"}</span>
          </button>
          <button
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
            initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? -100 : 100 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center space-y-8 text-2xl font-serif"
          >
            <button onClick={() => scrollToSection("pricing")}>
              {t.nav.pricing}
            </button>
            <button onClick={() => scrollToSection("work-with-us")}>
              {t.nav.contact}
            </button>
            <button onClick={() => scrollToSection("process")}>
              {t.nav.howItWorks}
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
              onClick={() => scrollToSection("work-with-us")}
              className="group flex items-center space-x-3 rtl:space-x-reverse text-[12px] font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground px-10 py-5 rounded-full transition-all hover:scale-105"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1 rtl:rotate-180"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {pricingOptions.map((opt, i) => (
              <div
                key={i}
                className={`relative p-10 rounded-3xl border transition-all flex flex-col ${
                  selectedPkg === i
                    ? "bg-primary text-primary-foreground border-primary scale-105"
                    : "bg-secondary/50 border-border hover:border-foreground/20"
                }`}
              >
                {opt.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase whitespace-nowrap bg-emerald-500 text-white">
                    {opt.badge}
                  </div>
                )}
                <h3 className="font-serif text-2xl mb-4 mt-2">
                  {opt.label}
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold">
                    ${opt.priceUsd}
                  </span>
                  <span
                    className={`text-xs uppercase tracking-widest block mt-1 ${
                      selectedPkg === i
                        ? "opacity-60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t.pricing.perPackage}
                  </span>
                </div>
                <div
                  className={`text-lg font-serif mb-6 ${
                    selectedPkg === i
                      ? "opacity-80"
                      : "text-muted-foreground"
                  }`}
                >
                  ≈ {opt.priceSar} SAR
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {opt.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${
                        selectedPkg === i ? "opacity-80" : "text-emerald-500"
                      }`} />
                      <span className={`text-sm ${
                        selectedPkg === i ? "opacity-90" : "text-muted-foreground"
                      }`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-current/10">
                  <button
                    onClick={() => {
                      setSelectedPkg(i);
                      scrollToSection("work-with-us");
                    }}
                    className={`w-full py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${
                      selectedPkg === i
                        ? "bg-primary-foreground text-primary"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    {t.pricing.select}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Hosting Add-on Info */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-3xl p-8 md:p-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Server size={22} />
                <h3 className="font-serif text-2xl">
                  {lang === "en" ? "Managed Hosting Add-on" : "إضافة استضافة مُدارة"}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
                {lang === "en"
                  ? "Premium managed hosting with global CDN, daily backups, SSL, and uptime monitoring. We recommend a budget between $50–$200/year depending on traffic. Added on top of your package."
                  : "استضافة مُدارة متميزة مع CDN عالمي ونسخ احتياطية يومية و SSL ومراقبة وقت التشغيل. نوصي بميزانية بين 50–200 دولار/سنة حسب حركة المرور. تُضاف فوق باقتك."}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>$50</span>
                <div className="h-px w-16 bg-border" />
                <span className="font-bold text-foreground">
                  {lang === "en" ? "Set your amount in the form below" : "حدد المبلغ في النموذج أدناه"}
                </span>
                <div className="h-px w-16 bg-border" />
                <span>$200+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work with Us Form */}
      <section id="work-with-us" className="py-32 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-50 mb-6 block">
              {t.nav.contact}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
              {t.form.title.split(" ")[0]}{" "}
              <span className="italic">
                {t.form.title.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              {t.form.subtitle}
            </p>
          </div>

          <form
            ref={formRef}
            className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-10 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.15)]"
            onSubmit={handleFormSubmit}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Left Column — Form Fields */}
              <div className="lg:col-span-3 space-y-6">
                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.fullName}
                    </label>
                    <input required name="fullName" type="text" className={inputClasses} placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.email}
                    </label>
                    <input required name="email" type="email" className={inputClasses} placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.companyName}
                    </label>
                    <input required name="companyName" type="text" className={inputClasses} placeholder="Acme Corp" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.role}
                    </label>
                    <input required name="role" type="text" className={inputClasses} placeholder="Senior Designer" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.industry}
                    </label>
                    <input name="industry" type="text" className={inputClasses} placeholder="Technology" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.experience}
                    </label>
                    <select name="experienceLevel" className={`${inputClasses} appearance-none`}>
                      <option>$2K – $5K</option>
                      <option>$5K – $15K</option>
                      <option>$15K+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t.form.description}
                  </label>
                  <textarea
                    required
                    name="description"
                    rows={3}
                    className={`${inputClasses} resize-none`}
                    placeholder="Briefly describe the role..."
                  />
                  <p className="text-[9px] text-muted-foreground italic">{t.form.descriptionHint}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.visaStatus}
                    </label>
                    <select name="visaStatus" className={`${inputClasses} appearance-none`}>
                      {t.form.visaOptions.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.openings}
                    </label>
                    <input name="openings" type="number" min="1" defaultValue="1" className={inputClasses} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.form.length}
                    </label>
                    <div className="relative">
                      <select name="postingLength" className={`${inputClasses} appearance-none`}>
                        {[1, 2, 3, 4].map((w) => (
                          <option key={w} value={w}>{w} {t.form.weeks}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-4" : "right-4"} pointer-events-none opacity-40`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column — Sticky Summary */}
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-32 space-y-6">
                  {/* Plan Selection */}
                  <div className="bg-secondary/30 p-6 rounded-2xl border border-border space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {lang === "en" ? "Studio Package" : "باقة الاستوديو"}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {pricingOptions.map((opt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedPkg(i)}
                          className={`relative py-4 px-3 rounded-xl border text-center transition-all ${
                            selectedPkg === i
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background/50 border-border hover:border-foreground/20"
                          }`}
                        >
                          {opt.badge && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[7px] tracking-widest uppercase bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                              {opt.badge}
                            </span>
                          )}
                          <span className="text-sm font-bold block">{opt.label}</span>
                          <span className="text-xl font-bold block mt-0.5">${opt.priceUsd}</span>
                        </button>
                      ))}
                    </div>

                    {selectedPkg === 1 && (
                      <div className="space-y-2 pt-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {lang === "en" ? "Consulting Sessions" : "جلسات استشارية"}
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="number" min="2" max="20" value={shortlistCount}
                            onChange={(e) => setShortlistCount(Math.max(2, Math.min(20, Number(e.target.value) || 4)))}
                            className={`${inputClasses} w-20 text-center`}
                          />
                          <span className="text-xs text-muted-foreground">{lang === "en" ? "calls" : "مكالمات"}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hosting Budget */}
                  <div className="bg-secondary/30 p-6 rounded-2xl border border-border space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Server size={12} />
                      {lang === "en" ? "Hosting Budget (yr)" : "ميزانية الاستضافة (سنويًا)"}
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${linkedinBudget}</span>
                      <span className="text-xs text-muted-foreground">≈ {Math.round(linkedinBudget * 3.75)} SAR</span>
                    </div>
                    <Slider
                      value={[linkedinBudget]}
                      onValueChange={([val]) => setLinkedinBudget(val)}
                      min={50} max={500} step={10}
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground uppercase tracking-widest">
                      <span>$50</span>
                      <span className="font-bold">{lang === "en" ? "Rec: $100–$200" : "موصى: $100–$200"}</span>
                      <span>$500</span>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-secondary/30 p-6 rounded-2xl border border-border space-y-3">
                    <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                      {lang === "en" ? "Order Summary" : "ملخص الطلب"}
                    </h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{selectedPrice.label}</span>
                      <span className="font-bold">${selectedPrice.priceUsd}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Server size={10} />
                        {lang === "en" ? "Hosting" : "استضافة"}
                      </span>
                      <span className="font-bold">${linkedinBudget}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-bold">{t.pricing.total}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold">${totalPrice}</span>
                        <span className="block text-xs text-muted-foreground">≈ {totalSar} SAR</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full group flex items-center justify-center space-x-3 rtl:space-x-reverse text-[11px] font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground py-5 rounded-2xl transition-all hover:opacity-90"
                  >
                    <CreditCard size={16} />
                    <span>{t.form.submit}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Stripe Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-md bg-secondary border border-border rounded-[2rem] p-10 overflow-hidden"
            >
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8">
                  <CreditCard size={40} />
                </div>
                <h2 className="font-serif text-3xl mb-4">
                  {t.form.checkoutTitle}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t.form.checkoutDesc}
                </p>

                <div className="w-full space-y-4 mb-8">
                  <div className="flex justify-between text-sm border-b border-border pb-4">
                    <span className="opacity-50">{selectedPrice.label}</span>
                    <span className="font-bold">${selectedPrice.priceUsd}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-border pb-4">
                    <span className="opacity-50 flex items-center gap-1.5">
                      <Linkedin size={12} />
                      LinkedIn Budget
                    </span>
                    <span className="font-bold">${linkedinBudget}</span>
                  </div>
                  {selectedPkg === 1 && (
                    <div className="flex justify-between text-sm border-b border-border pb-4">
                      <span className="opacity-50">
                        {lang === "en" ? "Shortlisted Candidates" : "المرشحين المختصرين"}
                      </span>
                      <span className="font-bold">{shortlistCount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl">
                    <span className="opacity-50">{t.pricing.total}</span>
                    <div className="text-right">
                      <span className="font-bold">${totalPrice}</span>
                      <span className="block text-sm opacity-50">≈ {totalSar} SAR</span>
                    </div>
                  </div>
                </div>

                <div className="w-full p-6 bg-background rounded-2xl border border-border mb-8 flex items-center justify-center space-x-3 rtl:space-x-reverse">
                  <svg viewBox="0 0 60 25" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 2.69c0-.95.79-1.33 2.09-1.33 1.87 0 4.23.57 6.1 1.58V.36A16.28 16.28 0 0 0 7.09 0C2.82 0 0 2.34 0 6.26c0 9.69 13.34 8.14 13.34 12.33 0 1.12-.98 1.49-2.34 1.49-2.02 0-4.62-.83-6.67-1.95v2.7a16.94 16.94 0 0 0 6.67 1.42c4.37 0 7.37-2.16 7.37-6.24C18.37 6.53 5 8.39 5 2.69zm14.87-1.43v14.08c0 4.15 2.02 5.21 4.37 5.21 1.42 0 2.44-.24 3.24-.63v-2.55c-.74.3-1.76.38-2.42.38-1.7 0-2.38-.67-2.38-2.79V3.92h2.38V1.26h-2.38V-2l-2.81.6zM29.5 1.93l-.18-.67h-2.5v18.24h2.82V7.17c.67-2.73 3.6-2.23 4.31-1.85V1.26c-.74-.28-3.44-.8-4.45 .67zM35.44 1.26h2.82v18.24h-2.82zm0-4.92l2.82-.6v2.82h-2.82zM44.57 1.26 42.03.66v14.14c0 2.61 1.96 4.76 4.58 4.76 1.45 0 2.51-.27 3.1-.58v-2.29c-.56.23-3.34 1.03-3.34-1.56V3.92h3.34V1.26h-3.14zm11.7 -0.37c-2.14 0-3.5 1.01-4.26 1.71l-.19-.67h-2.49v24.52l2.81-.6.01-5.95c.78.56 1.92 1.36 3.82 1.36 3.87 0 7.39-3.1 7.39-9.96-.01-6.26-3.58-9.04-7.09-9.04v-.01zM55.9 16.55c-1.28 0-2.03-.46-2.55-1.02l-.03-8.07c.56-.62 1.33-1.05 2.58-1.05 1.97 0 3.34 2.21 3.34 5.06 0 2.9-1.34 5.08-3.34 5.08z" fill="hsl(var(--muted-foreground))" fillRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-muted-foreground">Secure payment via Stripe</span>
                </div>

                <button
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Process Section */}
      <section
        id="process"
        className="py-32 px-6 md:px-12 bg-background border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 block">
                01 — {lang === "en" ? "Process" : "العملية"}
              </span>
              <h2 className="font-serif text-4xl md:text-6xl mb-6">
                {t.services.title}
              </h2>
              <p className="text-muted-foreground text-lg font-serif italic">
                {t.services.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: <Compass size={20} />, ...t.services.step1 },
              { icon: <PenTool size={20} />, ...t.services.step2 },
              { icon: <Sparkles size={20} />, ...t.services.step3 },
              { icon: <Code2 size={20} />, ...t.services.step4 },
              { icon: <Rocket size={20} />, ...t.services.step5 },
            ].map((step, i) => (
              <motion.div
                key={i}
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
                  {lang === "en" ? `Step` : `خطوة`} 0{i + 1}
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
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <h2 className="font-serif text-2xl tracking-tight opacity-60">
                Najah<span className="italic"> Studio</span>
              </h2>
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">
              © 2026 Najah Studio — Riyadh, Saudi Arabia
            </p>
          </div>

          <div className="flex space-x-8 rtl:space-x-reverse text-[10px] font-bold tracking-widest uppercase opacity-40">
            <a href="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy
            </a>
            <a href="/terms" className="hover:opacity-100 transition-opacity">
              Terms
            </a>
            <a href="https://www.linkedin.com/company/najahcareers" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
