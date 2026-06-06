import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-20">
      <Seo
        title="Privacy Policy — Sadath Company"
        description="How Sadath Company collects, uses, and protects personal data under UK GDPR and the Data Protection Act 2018."
        path="/privacy"
      />
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 text-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-4">Last updated: May 2026</p>

        <div className="prose max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-xl text-foreground">1. Who We Are</h2>
          <p>The Sadath Company Ltd ("Sadath", "we", "us") is the data controller of personal data collected through this website. We are registered in England and Wales (Company No. 16707212), registered office: 27 Orchard Estate, Cambridge, CB1 3JW. This policy explains what we collect, why, and your rights under the UK GDPR and Data Protection Act 2018.</p>

          <h2 className="font-serif text-xl text-foreground">2. Information We Collect</h2>
          <p>We collect information you submit via our contact form, email, or during a discovery call — typically your name, email address, company name, project details, and budget. If you become a client, we also collect billing details, project assets, and any content you share with us. Payment data is collected and processed by Stripe; we do not store full card details.</p>

          <h2 className="font-serif text-xl text-foreground">3. How We Use Your Information</h2>
          <p>We use your data to respond to enquiries, prepare quotes and contracts, deliver agreed services, send project updates and invoices, and meet our legal and accounting obligations. The lawful bases we rely on are: (a) performance of a contract, (b) our legitimate interests in running and improving our studio, and (c) compliance with legal obligations.</p>

          <h2 className="font-serif text-xl text-foreground">4. Sharing Your Data</h2>
          <p>We never sell your personal data. We share data only with trusted processors who help us run the business, including Stripe (payments), our hosting and database providers, email and analytics tools, and our accountants. All processors operate under appropriate data protection agreements.</p>

          <h2 className="font-serif text-xl text-foreground">5. International Transfers</h2>
          <p>Some of our processors may store data outside the UK or EEA. Where they do, we rely on approved safeguards such as the UK International Data Transfer Agreement or Standard Contractual Clauses.</p>

          <h2 className="font-serif text-xl text-foreground">6. Data Retention</h2>
          <p>We keep enquiry data for up to 24 months. Client records, contracts, and invoices are retained for a minimum of 6 years to meet UK tax and accounting requirements. Project files may be archived for longer for reference and case-study purposes.</p>

          <h2 className="font-serif text-xl text-foreground">7. Cookies and Analytics</h2>
          <p>Our website uses essential cookies and may use privacy-friendly analytics to understand how visitors use the site. We do not run advertising trackers.</p>

          <h2 className="font-serif text-xl text-foreground">8. Your Rights</h2>
          <p>Under UK GDPR you have the right to access, correct, delete, restrict, or port your personal data, and to object to certain processing. You can exercise these rights by emailing <a href="mailto:contact@sadathcompany.com" className="text-foreground underline underline-offset-2">contact@sadathcompany.com</a>. You also have the right to complain to the Information Commissioner's Office (ico.org.uk).</p>

          <h2 className="font-serif text-xl text-foreground">9. Security</h2>
          <p>We apply appropriate technical and organisational measures — including encryption in transit, access controls, and regular reviews — to protect your data.</p>

          <h2 className="font-serif text-xl text-foreground">10. Changes to This Policy</h2>
          <p>We may update this policy from time to time. The current version will always be available on this page.</p>

          <h2 className="font-serif text-xl text-foreground">11. Contact</h2>
          <p>For any privacy questions or to exercise your rights, contact us at <a href="mailto:contact@sadathcompany.com" className="text-foreground underline underline-offset-2">contact@sadathcompany.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
