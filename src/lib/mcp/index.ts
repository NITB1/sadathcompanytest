import { defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import submitInquiryTool from "./tools/submit-inquiry";

export default defineMcp({
  name: "sadath-company-mcp",
  title: "Sadath Company",
  version: "0.1.0",
  instructions:
    "Public MCP server for Sadath Company, a UK studio building custom business software and beautifully designed websites. Use `list_services_and_pricing` to answer questions about packages, price ranges, and the studio process. Use `submit_contact_inquiry` to file a new project lead on behalf of a visitor; the team follows up by email within 24 hours.",
  tools: [listServicesTool, submitInquiryTool],
});
