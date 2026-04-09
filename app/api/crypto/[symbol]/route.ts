import { NextRequest, NextResponse } from "next/server";

const cryptoData: Record<string, object> = {
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    price: 67432.18,
    change24h: 1245.32,
    changePercent24h: 1.88,
    high24h: 68102.45,
    low24h: 65890.12,
    volume24h: 28945123456,
    marketCap: 1324000000000,
    circulatingSupply: 19634218,
    maxSupply: 21000000,
    allTimeHigh: 73750.00,
    allTimeHighDate: "2024-03-14",
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    price: 3456.78,
    change24h: -45.23,
    changePercent24h: -1.29,
    high24h: 3520.90,
    low24h: 3412.34,
    volume24h: 15678234567,
    marketCap: 415000000000,
    circulatingSupply: 120123456,
    maxSupply: null,
    allTimeHigh: 4878.26,
    allTimeHighDate: "2021-11-10",
  },
  SOL: {
    symbol: "SOL",
    name: "Solana",
    price: 178.45,
    change24h: 8.92,
    changePercent24h: 5.26,
    high24h: 182.30,
    low24h: 168.12,
    volume24h: 3456789012,
    marketCap: 78900000000,
    circulatingSupply: 442345678,
    maxSupply: null,
    allTimeHigh: 260.06,
    allTimeHighDate: "2021-11-06",
  },
  DOGE: {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.1823,
    change24h: 0.0092,
    changePercent24h: 5.31,
    high24h: 0.1890,
    low24h: 0.1712,
    volume24h: 1234567890,
    marketCap: 26100000000,
    circulatingSupply: 143567890123,
    maxSupply: null,
    allTimeHigh: 0.7376,
    allTimeHighDate: "2021-05-08",
  },
  XRP: {
    symbol: "XRP",
    name: "XRP",
    price: 0.5234,
    change24h: -0.0123,
    changePercent24h: -2.30,
    high24h: 0.5412,
    low24h: 0.5178,
    volume24h: 987654321,
    marketCap: 28700000000,
    circulatingSupply: 54823456789,
    maxSupply: 100000000000,
    allTimeHigh: 3.84,
    allTimeHighDate: "2018-01-04",
  },
};

// GET /api/crypto/[symbol] - Get current cryptocurrency quote
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const { searchParams } = new URL(request.url);
  
  const convert = searchParams.get("convert") || "USD";
  
  const crypto = cryptoData[symbol.toUpperCase()];

  if (!crypto) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "CRYPTO_NOT_FOUND",
          message: `Cryptocurrency '${symbol}' not found`,
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      ...crypto,
      convert,
      lastUpdated: new Date().toISOString(),
    },
    meta: {
      timestamp: new Date().toISOString(),
      source: "CryptoDataFeed",
    },
  });
}
