import fs from "fs";
import path from "path";
import { DocBreadcrumb } from "@/components/doc-breadcrumb";
import { MarkdownRenderer } from "@/components/markdown-renderer";

export default async function PortfolioPage() {
  const filePath = path.join(process.cwd(), "docs", "endpoints", "portfolio.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <DocBreadcrumb
            items={[
              { label: "Documentation", href: "/docs/quickstart" },
              { label: "Endpoints", href: "/docs/endpoints/markets" },
              { label: "Portfolio" },
            ]}
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  );
}
