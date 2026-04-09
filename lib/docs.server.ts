import fs from "fs";
import path from "path";
import { docMetadata, type DocItem } from "./docs";

function extractTitle(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) return h1Match[1];
  } catch {
    // Ignore read errors
  }
  
  // Fall back to filename
  const fileName = path.basename(filePath, ".md");
  return fileName.charAt(0).toUpperCase() + fileName.slice(1);
}

export function getDocsStructure(): { rootDocs: DocItem[]; endpoints: DocItem[] } {
  const docsDir = path.join(process.cwd(), "docs");
  const rootDocs: DocItem[] = [];
  const endpoints: DocItem[] = [];

  // Read root docs
  const rootFiles = fs.readdirSync(docsDir);
  for (const file of rootFiles) {
    const filePath = path.join(docsDir, file);
    const stat = fs.statSync(filePath);
    
    if (!stat.isDirectory() && file.endsWith(".md")) {
      const slug = file.replace(".md", "");
      const metadata = docMetadata[slug] || { icon: "FileText" };
      
      rootDocs.push({
        title: extractTitle(filePath),
        slug,
        url: `/docs/${slug}`,
        icon: metadata.icon,
        description: metadata.description,
      });
    }
  }

  // Read endpoints
  const endpointsDir = path.join(docsDir, "endpoints");
  if (fs.existsSync(endpointsDir)) {
    const endpointFiles = fs.readdirSync(endpointsDir);
    for (const file of endpointFiles) {
      if (file.endsWith(".md")) {
        const filePath = path.join(endpointsDir, file);
        const slug = file.replace(".md", "");
        const metadata = docMetadata[slug] || { icon: "FileText" };
        
        endpoints.push({
          title: extractTitle(filePath),
          slug,
          url: `/docs/endpoints/${slug}`,
          icon: metadata.icon,
          description: metadata.description,
        });
      }
    }
  }

  // Sort alphabetically by title
  rootDocs.sort((a, b) => a.title.localeCompare(b.title));
  endpoints.sort((a, b) => a.title.localeCompare(b.title));

  return { rootDocs, endpoints };
}
