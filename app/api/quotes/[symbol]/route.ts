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

// GET /api/quotes/[symbol] - Get current quote for a ticker
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const quote = quotesData[symbol.toUpperCase()];

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

  return NextResponse.json({
    success: true,
    data: {
      ...quote,
      lastUpdated: new Date().toISOString(),
    },
    meta: {
      timestamp: new Date().toISOString(),
      delayed: false,
    },
  });
}
