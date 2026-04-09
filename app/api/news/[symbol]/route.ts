import { NextRequest, NextResponse } from "next/server";

const newsData: Record<string, object[]> = {
  AAPL: [
    {
      id: "news-001",
      title: "Apple Reports Record Q4 Revenue Driven by iPhone 15 Sales",
      summary:
        "Apple Inc. announced record-breaking quarterly revenue of $89.5 billion, exceeding analyst expectations as iPhone 15 sales surpassed projections.",
      source: "Reuters",
      author: "Stephen Nellis",
      url: "https://example.com/news/apple-q4-2024",
      publishedAt: "2024-01-15T14:30:00Z",
      sentiment: "positive",
      relevanceScore: 0.95,
      tickers: ["AAPL"],
      categories: ["earnings", "technology"],
    },
    {
      id: "news-002",
      title: "Apple Vision Pro Launches to Mixed Reviews",
      summary:
        "The highly anticipated Apple Vision Pro headset launched today with impressive technology but questions remain about mainstream adoption due to its $3,499 price point.",
      source: "TechCrunch",
      author: "Brian Heater",
      url: "https://example.com/news/vision-pro-launch",
      publishedAt: "2024-01-12T09:00:00Z",
      sentiment: "neutral",
      relevanceScore: 0.88,
      tickers: ["AAPL"],
      categories: ["product-launch", "technology"],
    },
    {
      id: "news-003",
      title: "Apple Expands AI Capabilities with New Acquisitions",
      summary:
        "Apple has quietly acquired three AI startups in the past quarter as it accelerates efforts to integrate artificial intelligence across its product lineup.",
      source: "Bloomberg",
      author: "Mark Gurman",
      url: "https://example.com/news/apple-ai-acquisitions",
      publishedAt: "2024-01-10T16:45:00Z",
      sentiment: "positive",
      relevanceScore: 0.82,
      tickers: ["AAPL"],
      categories: ["acquisitions", "artificial-intelligence"],
    },
  ],
  GOOGL: [
    {
      id: "news-004",
      title: "Google Cloud Revenue Surges 28% as AI Services Gain Traction",
      summary:
        "Alphabet's cloud division reported significant growth driven by enterprise adoption of its generative AI tools and Vertex AI platform.",
      source: "Wall Street Journal",
      author: "Miles Kruppa",
      url: "https://example.com/news/google-cloud-growth",
      publishedAt: "2024-01-14T11:20:00Z",
      sentiment: "positive",
      relevanceScore: 0.91,
      tickers: ["GOOGL"],
      categories: ["earnings", "cloud", "artificial-intelligence"],
    },
    {
      id: "news-005",
      title: "DOJ Antitrust Trial Against Google Enters Final Phase",
      summary:
        "The landmark antitrust case against Google's search monopoly is nearing its conclusion, with potential implications for the entire tech industry.",
      source: "New York Times",
      author: "David McCabe",
      url: "https://example.com/news/google-antitrust",
      publishedAt: "2024-01-11T08:30:00Z",
      sentiment: "negative",
      relevanceScore: 0.87,
      tickers: ["GOOGL"],
      categories: ["legal", "regulation"],
    },
  ],
  MSFT: [
    {
      id: "news-006",
      title: "Microsoft Copilot Adoption Exceeds Expectations in Enterprise",
      summary:
        "Microsoft reports that over 40% of Fortune 500 companies have adopted Copilot AI assistants, driving subscription revenue growth.",
      source: "CNBC",
      author: "Jordan Novet",
      url: "https://example.com/news/microsoft-copilot",
      publishedAt: "2024-01-15T10:00:00Z",
      sentiment: "positive",
      relevanceScore: 0.93,
      tickers: ["MSFT"],
      categories: ["artificial-intelligence", "enterprise"],
    },
  ],
  TSLA: [
    {
      id: "news-007",
      title: "Tesla Announces New Gigafactory Location in Mexico",
      summary:
        "Tesla will build its next Gigafactory in Monterrey, Mexico, with production expected to begin in 2025, focusing on the next-generation affordable EV.",
      source: "Electrek",
      author: "Fred Lambert",
      url: "https://example.com/news/tesla-mexico-factory",
      publishedAt: "2024-01-13T15:00:00Z",
      sentiment: "positive",
      relevanceScore: 0.89,
      tickers: ["TSLA"],
      categories: ["manufacturing", "expansion"],
    },
  ],
};

// GET /api/news/[symbol] - Get news for a ticker
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const { searchParams } = new URL(request.url);

  const limit = parseInt(searchParams.get("limit") || "10");
  const sentiment = searchParams.get("sentiment");

  let news = newsData[symbol.toUpperCase()] || [];

  if (sentiment) {
    news = news.filter((item: { sentiment?: string }) => item.sentiment === sentiment);
  }

  news = news.slice(0, limit);

  return NextResponse.json({
    success: true,
    data: {
      symbol: symbol.toUpperCase(),
      articles: news,
    },
    meta: {
      total: news.length,
      timestamp: new Date().toISOString(),
    },
  });
}
