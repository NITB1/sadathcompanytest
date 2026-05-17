import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 text-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-4">Last updated: March 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-xl text-foreground">Information We Collect</h2>
          <p>When you use our services, we collect the information you provide through our forms, including your name, email address, company name, job details, and hiring preferences. We also collect payment information processed securely through Stripe.</p>

          <h2 className="font-serif text-xl text-foreground">How We Use Your Information</h2>
          <p>We use your information to deliver our recruitment services, process payments, communicate with you about your campaigns, and improve our services. We do not sell your personal data to third parties.</p>

          <h2 className="font-serif text-xl text-foreground">Data Storage & Security</h2>
          <p>Your data is stored securely using industry-standard encryption. Payment information is handled by Stripe and never stored on our servers. We retain your data only as long as necessary to provide our services.</p>

          <h2 className="font-serif text-xl text-foreground">Third-Party Services</h2>
          <p>We use Stripe for payment processing and LinkedIn for job posting distribution. These services have their own privacy policies governing their use of your data.</p>

          <h2 className="font-serif text-xl text-foreground">Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us. We will respond to your request within 30 days.</p>

          <h2 className="font-serif text-xl text-foreground">Contact</h2>
          <p>For privacy-related inquiries, please reach out to us via our LinkedIn page or through the contact form on our website.</p>
        </div>
      </div>
    </div>
  );
}
