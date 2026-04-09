import { NextRequest, NextResponse } from "next/server";

// Generate mock historical data
function generateHistoricalData(symbol: string, days: number = 30) {
  const data = [];
  const basePrice =
    symbol === "AAPL" ? 175 : symbol === "GOOGL" ? 140 : symbol === "MSFT" ? 375 : 250;
  let currentPrice = basePrice;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const change = (Math.random() - 0.5) * 5;
    currentPrice = Math.max(50, currentPrice + change);

    const high = currentPrice + Math.random() * 3;
    const low = currentPrice - Math.random() * 3;
    const open = low + Math.random() * (high - low);
    const close = low + Math.random() * (high - low);
    const volume = Math.floor(20000000 + Math.random() * 80000000);

    // Calculate VWAP (simplified mock calculation)
    const vwap = parseFloat(((open + high + low + close) / 4).toFixed(2));
    const changePct = parseFloat((((close - open) / open) * 100).toFixed(2));
    const splitCoefficient = 1.0;
    
    data.push({
      date: date.toISOString().split("T")[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      adjustedClose: parseFloat(close.toFixed(2)),
      volume,
      vwap,
      changePct,
      splitCoefficient,
    });
  }

  return data;
}

// GET /api/historical/[symbol] - Get historical price data
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const { searchParams } = new URL(request.url);

  const interval = searchParams.get("interval") || "1d";
  const range = searchParams.get("range") || "1mo";

  const validSymbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "META", "NVDA"];

  if (!validSymbols.includes(symbol.toUpperCase())) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SYMBOL_NOT_FOUND",
          message: `Historical data for symbol '${symbol}' not found`,
        },
      },
      { status: 404 }
    );
  }

  const daysMap: Record<string, number> = {
    "1d": 1,
    "5d": 5,
    "1mo": 30,
    "3mo": 90,
    "6mo": 180,
    "1y": 365,
    "5y": 1825,
  };

  const days = daysMap[range] || 30;
  const historicalData = generateHistoricalData(symbol.toUpperCase(), days);

  return NextResponse.json({
    success: true,
    data: {
      symbol: symbol.toUpperCase(),
      interval,
      range,
      prices: historicalData,
    },
    meta: {
      total: historicalData.length,
      timestamp: new Date().toISOString(),
      currency: "USD",
    },
  });
}
