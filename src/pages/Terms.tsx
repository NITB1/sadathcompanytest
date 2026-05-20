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
        <p className="text-muted-foreground text-sm mb-4">Last updated: May 2026</p>

        <div className="prose max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-xl text-foreground">1. About Us</h2>
          <p>The Sadath Company Ltd ("Sadath", "we", "us", "our") is a web design and development studio registered in England and Wales (Company No. 16707212), with a registered office at 27 Orchard Estate, Cambridge, CB1 3JW. These terms govern your use of our website and any preliminary engagement with our studio.</p>

          <h2 className="font-serif text-xl text-foreground">2. Custom Contracts Per Client</h2>
          <p><strong className="text-foreground">Each client engagement is governed by a bespoke Statement of Work (SOW) signed by both parties.</strong> The package tiers, prices, timelines, and inclusions shown on our website are indicative starting points only. Final scope, deliverables, payment schedule, intellectual property terms, revision rounds, and project timeline are individually negotiated and set out in your signed SOW or service agreement.</p>
          <p>Where any terms in your signed SOW conflict with this page, the SOW takes precedence.</p>

          <h2 className="font-serif text-xl text-foreground">3. Services</h2>
          <p>We offer custom website design and development, e-commerce builds, brand and design overhauls, ongoing support, and founder consulting. The exact services provided to you will be defined in your SOW.</p>

          <h2 className="font-serif text-xl text-foreground">4. Quotes and Estimates</h2>
          <p>Any pricing displayed publicly is an estimate. A binding quote is only provided in writing after a discovery call and is valid for 30 days unless stated otherwise.</p>

          <h2 className="font-serif text-xl text-foreground">5. Payments</h2>
          <p>Unless otherwise agreed in your SOW, projects require a non-refundable deposit before work begins, with remaining payments tied to project milestones. Payments are processed in GBP via Stripe or bank transfer. Late payments may pause active work and incur interest at the statutory rate under the Late Payment of Commercial Debts (Interest) Act 1998.</p>

          <h2 className="font-serif text-xl text-foreground">6. Revisions and Change Requests</h2>
          <p>Each SOW includes a defined number of revision rounds. Work that falls outside the agreed scope will be quoted and invoiced separately as a change request before being carried out.</p>

          <h2 className="font-serif text-xl text-foreground">7. Client Responsibilities</h2>
          <p>You agree to provide timely feedback, accurate content, brand assets, and approvals required to progress the project. We are not liable for delays caused by missing inputs.</p>

          <h2 className="font-serif text-xl text-foreground">8. Intellectual Property</h2>
          <p>On receipt of full and final payment, ownership of the final deliverables (excluding third-party assets, fonts, plugins, and our pre-existing tools and frameworks) transfers to you. We retain the right to display the work in our portfolio and case studies unless restricted in your SOW.</p>

          <h2 className="font-serif text-xl text-foreground">9. Third-Party Services</h2>
          <p>Projects may rely on third-party platforms such as Stripe, Shopify, hosting providers, and CMS vendors. These services are governed by their own terms, and we are not responsible for their availability, pricing changes, or downtime.</p>

          <h2 className="font-serif text-xl text-foreground">10. Confidentiality</h2>
          <p>Both parties agree to keep confidential information shared during the engagement private. Mutual NDAs can be signed on request before the discovery phase.</p>

          <h2 className="font-serif text-xl text-foreground">11. Warranty and Liability</h2>
          <p>We deliver work with reasonable skill and care. To the fullest extent permitted by law, our total liability for any claim arising from a project is limited to the fees paid by you under the relevant SOW. We are not liable for indirect, consequential, or loss-of-profit damages.</p>

          <h2 className="font-serif text-xl text-foreground">12. Termination</h2>
          <p>Either party may terminate an engagement in writing. Fees for work completed up to the termination date remain payable, and deposits remain non-refundable.</p>

          <h2 className="font-serif text-xl text-foreground">13. Governing Law</h2>
          <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the English courts.</p>

          <h2 className="font-serif text-xl text-foreground">14. Updates to These Terms</h2>
          <p>We may update these terms from time to time. The latest version will always be published on this page.</p>

          <h2 className="font-serif text-xl text-foreground">15. Contact</h2>
          <p>For questions about these terms or your engagement, email <a href="mailto:contact@sadathcompany.com" className="text-foreground underline underline-offset-2">contact@sadathcompany.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
