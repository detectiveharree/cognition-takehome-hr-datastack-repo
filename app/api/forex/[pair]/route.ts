import { NextRequest, NextResponse } from "next/server";

const forexData: Record<string, object> = {
  EURUSD: {
    pair: "EUR/USD",
    baseCurrency: "EUR",
    quoteCurrency: "USD",
    rate: 1.0892,
    bid: 1.0891,
    ask: 1.0893,
    change: 0.0023,
    changePercent: 0.21,
    dayHigh: 1.0912,
    dayLow: 1.0867,
    previousClose: 1.0869,
    volume: "156.2B",
  },
  GBPUSD: {
    pair: "GBP/USD",
    baseCurrency: "GBP",
    quoteCurrency: "USD",
    rate: 1.2734,
    bid: 1.2733,
    ask: 1.2735,
    change: -0.0045,
    changePercent: -0.35,
    dayHigh: 1.2789,
    dayLow: 1.2712,
    previousClose: 1.2779,
    volume: "92.4B",
  },
  USDJPY: {
    pair: "USD/JPY",
    baseCurrency: "USD",
    quoteCurrency: "JPY",
    rate: 148.52,
    bid: 148.51,
    ask: 148.53,
    change: 0.67,
    changePercent: 0.45,
    dayHigh: 148.89,
    dayLow: 147.65,
    previousClose: 147.85,
    volume: "134.8B",
  },
  USDCHF: {
    pair: "USD/CHF",
    baseCurrency: "USD",
    quoteCurrency: "CHF",
    rate: 0.8734,
    bid: 0.8733,
    ask: 0.8735,
    change: 0.0012,
    changePercent: 0.14,
    dayHigh: 0.8756,
    dayLow: 0.8712,
    previousClose: 0.8722,
    volume: "45.6B",
  },
  AUDUSD: {
    pair: "AUD/USD",
    baseCurrency: "AUD",
    quoteCurrency: "USD",
    rate: 0.6578,
    bid: 0.6577,
    ask: 0.6579,
    change: -0.0034,
    changePercent: -0.51,
    dayHigh: 0.6623,
    dayLow: 0.6565,
    previousClose: 0.6612,
    volume: "67.3B",
  },
  USDCAD: {
    pair: "USD/CAD",
    baseCurrency: "USD",
    quoteCurrency: "CAD",
    rate: 1.3456,
    bid: 1.3455,
    ask: 1.3457,
    change: 0.0023,
    changePercent: 0.17,
    dayHigh: 1.3478,
    dayLow: 1.3423,
    previousClose: 1.3433,
    volume: "54.9B",
  },
  NZDUSD: {
    pair: "NZD/USD",
    baseCurrency: "NZD",
    quoteCurrency: "USD",
    rate: 0.6123,
    bid: 0.6122,
    ask: 0.6124,
    change: -0.0018,
    changePercent: -0.29,
    dayHigh: 0.6156,
    dayLow: 0.6112,
    previousClose: 0.6141,
    volume: "23.7B",
  },
  EURGBP: {
    pair: "EUR/GBP",
    baseCurrency: "EUR",
    quoteCurrency: "GBP",
    rate: 0.8553,
    bid: 0.8552,
    ask: 0.8554,
    change: 0.0034,
    changePercent: 0.4,
    dayHigh: 0.8567,
    dayLow: 0.8512,
    previousClose: 0.8519,
    volume: "34.2B",
  },
};

// GET /api/forex/[pair] - Get exchange rate for a currency pair
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pair: string }> }
) {
  const { pair } = await params;
  const normalizedPair = pair.toUpperCase().replace(/[^A-Z]/g, "");
  const forex = forexData[normalizedPair];

  if (!forex) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "PAIR_NOT_FOUND",
          message: `Exchange rate for pair '${pair}' not found. Available pairs: ${Object.keys(forexData).join(", ")}`,
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      ...forex,
      lastUpdated: new Date().toISOString(),
    },
    meta: {
      timestamp: new Date().toISOString(),
      source: "DataStack FX Feed",
    },
  });
}
