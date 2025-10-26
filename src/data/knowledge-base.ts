
export type KBContentType = 'webpage' | 'docx' | 'excel' | 'video' | 'text';

export interface KBArticle {
  score: number;
  id: string;
  title: string;
  module: string;
  tags: string[];
  lastUpdated: string;
  createdBy: string;
  status: 'published' | 'draft';
  contentType: KBContentType;
  contentLocation: string; // This could be a URL or a file path
  description: string; // A brief description of the content
}

// Sample data for the knowledge base
export const knowledgeBase: KBArticle[] = [
  {
    id: "kb-001",
    title: "How to reset your password",
    module: "User Administration",
    tags: ["password", "account", "reset"],
    lastUpdated: "2024-07-28",
    createdBy: "Admin",
    status: "published",
    contentType: "text",
    contentLocation: "", // In-line content for simple text
    description: "To reset your password, navigate to the login page and click the 'Forgot Password' link. You will be prompted to enter your email address, and a reset link will be sent to you."
  },
  {
    id: "kb-002",
    title: "Quarterly Sales Report Generation Guide",
    module: "Sales Dashboard",
    tags: ["sales", "reports", "pdf"],
    lastUpdated: "2024-07-27",
    createdBy: "Sales Team",
    status: "published",
    contentType: "docx",
    contentLocation: "/kb-files/quarterly-sales-report-guide.docx",
    description: "A detailed guide on how to generate quarterly sales reports from the Sales Dashboard."
  },
  {
    id: "kb-003",
    title: "Troubleshooting Inventory File Upload Errors",
    module: "Inventory System",
    tags: ["inventory", "csv", "upload", "error"],
    lastUpdated: "2024-07-26",
    createdBy: "Support",
    status: "published",
    contentType: "webpage",
    contentLocation: "/kb/inventory-upload-errors",
    description: "A troubleshooting guide for common errors encountered when uploading inventory files."
  },
  {
    id: "kb-004",
    title: "Explainer: New Customer Portal Features",
    module: "Customer Portal",
    tags: ["login", "portal", "customer", "video"],
    lastUpdated: "2024-07-29",
    createdBy: "Engineering",
    status: "published",
    contentType: "video",
    contentLocation: "/kb-files/portal-features-explainer.mp4",
    description: "A video walkthrough of the new features available in the customer portal."
  },
  {
    id: "kb-005",
    title: "Finance Module Excel Functions",
    module: "Finance Module",
    tags: ["finance", "excel", "functions"],
    lastUpdated: "2024-07-28",
    createdBy: "Finance Team",
    status: "draft",
    contentType: "excel",
    contentLocation: "/kb-files/finance-module-functions.xlsx",
    description: "An Excel sheet detailing the various financial functions and their usage within the Finance Module."
  }
];
