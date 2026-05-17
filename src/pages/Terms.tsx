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

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-xl text-foreground">Service Overview</h2>
          <p>Najah Careers provides recruitment and talent acquisition services. By purchasing a package, you agree to these terms. Our services include job posting, candidate screening, and shortlist delivery.</p>

          <h2 className="font-serif text-xl text-foreground">Payments & Refunds</h2>
          <p>All payments are processed securely through Stripe. Payments are non-refundable once the recruitment campaign has been initiated. If we are unable to deliver the agreed shortlist within the posting period, we will extend the campaign at no additional cost.</p>

          <h2 className="font-serif text-xl text-foreground">Service Delivery</h2>
          <p>We aim to deliver your first shortlist within 72 hours of campaign launch. The number of shortlisted candidates corresponds to your selected package. We guarantee quality screening but cannot guarantee hiring outcomes.</p>

          <h2 className="font-serif text-xl text-foreground">Client Responsibilities</h2>
          <p>You are responsible for providing accurate job descriptions and requirements. Misleading or fraudulent job postings will result in service termination without refund.</p>

          <h2 className="font-serif text-xl text-foreground">Limitation of Liability</h2>
          <p>Najah Careers is not liable for hiring decisions made based on our shortlists. Our liability is limited to the amount paid for the service package.</p>

          <h2 className="font-serif text-xl text-foreground">Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of updated terms.</p>

          <h2 className="font-serif text-xl text-foreground">Contact</h2>
          <p>For questions about these terms, please reach out via our LinkedIn page or through the contact form on our website.</p>
        </div>
      </div>
    </div>
  );
}
