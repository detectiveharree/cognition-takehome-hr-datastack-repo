import {
  BarChart3,
  Globe,
  Key,
  LineChart,
  Newspaper,
  PieChart,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Wallet,
  FileText,
  type LucideIcon,
} from "lucide-react";

export interface DocItem {
  title: string;
  slug: string;
  url: string;
  icon: string; // Icon name as string for serialization
  description?: string;
}

// Metadata for known docs - maps slug to icon name and description
export const docMetadata: Record<string, { icon: string; description?: string }> = {
  // Root docs
  quickstart: { icon: "Rocket", description: "Get started with DataStack API" },
  authentication: { icon: "ShieldCheck", description: "API authentication and security" },
  // Endpoints
  markets: { icon: "BarChart3", description: "Get market overview and search securities" },
  quotes: { icon: "TrendingUp", description: "Real-time stock quotes and pricing data" },
  historical: { icon: "LineChart", description: "Historical price data and OHLCV candles" },
  portfolio: { icon: "Wallet", description: "Portfolio tracking and management" },
  news: { icon: "Newspaper", description: "Financial news and market updates" },
  sectors: { icon: "PieChart", description: "Sector performance and breakdown" },
  forex: { icon: "Globe", description: "Foreign exchange rates and currency pairs" },
};

// Map icon names to actual components (for use in client components)
export const iconMap: Record<string, LucideIcon> = {
  Rocket,
  ShieldCheck,
  Key,
  BarChart3,
  TrendingUp,
  LineChart,
  Wallet,
  Newspaper,
  PieChart,
  Globe,
  FileText,
};
