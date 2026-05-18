import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 text-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-4">Last updated: March 2026</p>

        <div className="prose max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-xl text-foreground">Service Overview</h2>
          <p>Najah Studio provides web design, development, hosting, e-commerce, and startup consulting services. By purchasing a package, you agree to these terms.</p>

          <h2 className="font-serif text-xl text-foreground">Payments & Refunds</h2>
          <p>All payments are processed securely through Stripe. Deposits are non-refundable once design work has begun. If we are unable to deliver the agreed scope within the timeline, we will extend the engagement at no additional cost.</p>

          <h2 className="font-serif text-xl text-foreground">Project Delivery</h2>
          <p>We aim to begin discovery within 5 business days of payment. Project timelines vary based on scope. We include up to 2 rounds of revisions per package; additional revisions are billed hourly.</p>

          <h2 className="font-serif text-xl text-foreground">Client Responsibilities</h2>
          <p>You are responsible for providing accurate brand assets, content, and timely feedback. Delays in feedback may extend the project timeline.</p>

          <h2 className="font-serif text-xl text-foreground">Ownership & Hosting</h2>
          <p>Upon final payment, you own the design and code of your website. Hosting is provided on a yearly subscription basis and can be migrated to your own provider on request.</p>

          <h2 className="font-serif text-xl text-foreground">Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of updated terms.</p>

          <h2 className="font-serif text-xl text-foreground">Contact</h2>
          <p>For questions about these terms, please reach out via our LinkedIn page or through the contact form on our website.</p>
        </div>
      </div>
    </div>
  );
}
