import { NextRequest, NextResponse } from "next/server";

const quotesData: Record<string, object> = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    currency: "USD",
    price: 178.52,
    change: 2.34,
    changePercent: 1.33,
    open: 176.18,
    high: 179.45,
    low: 175.89,
    previousClose: 176.18,
    volume: 52453892,
    avgVolume: 58234567,
    marketCap: 2780000000000,
    pe: 28.45,
    eps: 6.27,
    week52High: 199.62,
    week52Low: 143.9,
    dividendYield: 0.51,
    beta: 1.28,
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    exchange: "NASDAQ",
    currency: "USD",
    price: 141.82,
    change: -0.87,
    changePercent: -0.61,
    open: 142.69,
    high: 143.21,
    low: 140.55,
    previousClose: 142.69,
    volume: 23891456,
    avgVolume: 26789012,
    marketCap: 1770000000000,
    pe: 23.67,
    eps: 5.99,
    week52High: 153.78,
    week52Low: 102.21,
    dividendYield: 0,
    beta: 1.05,
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    exchange: "NASDAQ",
    currency: "USD",
    price: 378.91,
    change: 4.56,
    changePercent: 1.22,
    open: 374.35,
    high: 380.12,
    low: 373.89,
    previousClose: 374.35,
    volume: 19234567,
    avgVolume: 22456789,
    marketCap: 2810000000000,
    pe: 32.12,
    eps: 11.8,
    week52High: 384.3,
    week52Low: 275.37,
    dividendYield: 0.79,
    beta: 0.89,
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    exchange: "NASDAQ",
    currency: "USD",
    price: 248.67,
    change: -5.23,
    changePercent: -2.06,
    open: 253.9,
    high: 255.12,
    low: 246.34,
    previousClose: 253.9,
    volume: 98765432,
    avgVolume: 112345678,
    marketCap: 789000000000,
    pe: 62.34,
    eps: 3.99,
    week52High: 299.29,
    week52Low: 152.37,
    dividendYield: 0,
    beta: 2.09,
  },
};

// Currency conversion rates (mock)
const conversionRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.53,
};

// GET /api/quotes/[symbol] - Get current quote for a ticker
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const { searchParams } = new URL(request.url);
  
  // Undocumented parameters
  const currency = searchParams.get("currency") || "USD";
  const adjusted = searchParams.get("adjusted") === "true";
  
  const quote = quotesData[symbol.toUpperCase()] as Record<string, unknown> | undefined;

  if (!quote) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "QUOTE_NOT_FOUND",
          message: `Quote for symbol '${symbol}' not found`,
        },
      },
      { status: 404 }
    );
  }

  // Apply currency conversion if not USD
  const rate = conversionRates[currency.toUpperCase()] || 1;
  const convertedQuote = { ...quote };
  
  if (rate !== 1) {
    const priceFields = ['price', 'open', 'high', 'low', 'previousClose', 'week52High', 'week52Low'];
    for (const field of priceFields) {
      if (typeof convertedQuote[field] === 'number') {
        convertedQuote[field] = parseFloat(((convertedQuote[field] as number) * rate).toFixed(2));
      }
    }
  }

  // Apply split adjustment factor if requested (mock: 1.0 means no adjustment needed)
  const splitAdjustmentFactor = adjusted ? 1.0 : 1.0;

  return NextResponse.json({
    success: true,
    data: {
      ...convertedQuote,
      currency: currency.toUpperCase(),
      adjusted,
      splitAdjustmentFactor,
      lastUpdated: new Date().toISOString(),
    },
    meta: {
      timestamp: new Date().toISOString(),
      delayed: false,
    },
  });
}
