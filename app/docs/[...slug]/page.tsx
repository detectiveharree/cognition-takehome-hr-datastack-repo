import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface DocsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Generate static params for all docs
export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "docs");
  const params: { slug: string[] }[] = [];

  function walkDir(dir: string, basePath: string[] = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath, [...basePath, file]);
      } else if (file.endsWith(".md")) {
        const slug = [...basePath, file.replace(".md", "")];
        params.push({ slug });
      }
    }
  }

  walkDir(docsDir);
  return params;
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const docPath = path.join(process.cwd(), "docs", ...slug.slice(0, -1), `${slug[slug.length - 1]}.md`);

  if (!fs.existsSync(docPath)) {
    notFound();
  }

  const content = fs.readFileSync(docPath, "utf-8");

  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  );
}
