import { defineTool } from "@lovable.dev/mcp-js";

const SERVICES = [
  {
    package: "Startup Website",
    price_gbp: { min: 400, max: 800 },
    description:
      "Unlimited pages, mobile-first responsive design, brand & design overhaul, 1 year managed hosting, basic SEO setup & analytics, domain configuration.",
  },
  {
    package: "Custom Software",
    price_gbp: { min: 600, max: 2000 },
    description:
      "Discovery & process mapping, custom dashboard/tool/automation, user auth & roles, integrations (Stripe, email, APIs), managed hosting & maintenance, team training & handover.",
  },
];

const PROCESS = [
  "Discovery Call — understand business, users, process.",
  "Strategy & Wireframes — flows, data models, screens.",
  "Design — custom interface & brand, 2 review rounds.",
  "Build — modern hand-crafted code with auth, integrations, performance, accessibility.",
  "Launch & Support — deploy, train, ongoing hosting & maintenance.",
];

export default defineTool({
  name: "list_services_and_pricing",
  title: "List services & pricing",
  description:
    "Get Sadath Company's public studio packages, indicative GBP price ranges, and the studio process. Use to answer questions about what Sadath builds and what it costs.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            company: "The Sadath Company Ltd",
            location: "Cambridge, UK",
            contact_email: "contact@sadathcompany.com",
            note: "Indicative pricing only. Every engagement is scoped via a bespoke Statement of Work after a discovery call.",
            packages: SERVICES,
            process: PROCESS,
          },
          null,
          2,
        ),
      },
    ],
    structuredContent: { packages: SERVICES, process: PROCESS },
  }),
});
