import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
  matchCount: number;
}

function extractTitle(content: string, filePath: string): string {
  // Try to find h1 header
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1];
  
  // Fall back to filename
  const fileName = path.basename(filePath, ".md");
  return fileName.charAt(0).toUpperCase() + fileName.slice(1);
}

function getExcerpt(content: string, query: string): string {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);
  
  if (index === -1) {
    // Return first 150 chars if no match found
    return content.slice(0, 150).replace(/\n/g, " ").trim() + "...";
  }
  
  // Get surrounding context
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + 100);
  let excerpt = content.slice(start, end).replace(/\n/g, " ").trim();
  
  if (start > 0) excerpt = "..." + excerpt;
  if (end < content.length) excerpt = excerpt + "...";
  
  return excerpt;
}

function searchInFile(filePath: string, query: string, basePath: string): SearchResult | null {
  const content = fs.readFileSync(filePath, "utf-8");
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  // Count matches
  let matchCount = 0;
  let searchIndex = 0;
  while ((searchIndex = lowerContent.indexOf(lowerQuery, searchIndex)) !== -1) {
    matchCount++;
    searchIndex += lowerQuery.length;
  }
  
  if (matchCount === 0) return null;
  
  // Convert file path to URL path
  const relativePath = path.relative(basePath, filePath);
  const urlPath = "/docs/" + relativePath.replace(/\\/g, "/").replace(/\.md$/, "");
  
  return {
    title: extractTitle(content, filePath),
    path: urlPath,
    excerpt: getExcerpt(content, query),
    matchCount,
  };
}

function walkDir(dir: string, query: string, basePath: string): SearchResult[] {
  const results: SearchResult[] = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results.push(...walkDir(filePath, query, basePath));
    } else if (file.endsWith(".md")) {
      const result = searchInFile(filePath, query, basePath);
      if (result) results.push(result);
    }
  }
  
  return results;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  
  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }
  
  const docsDir = path.join(process.cwd(), "docs");
  const results = walkDir(docsDir, query, docsDir);
  
  // Sort by match count descending
  results.sort((a, b) => b.matchCount - a.matchCount);
  
  return NextResponse.json({ results: results.slice(0, 10) });
}
