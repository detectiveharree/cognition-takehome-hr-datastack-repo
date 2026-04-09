import { NextRequest, NextResponse } from "next/server";

const marketsData: Record<string, object> = {
  nyse: {
    id: "nyse",
    name: "New York Stock Exchange",
    mic: "XNYS",
    country: "US",
    timezone: "America/New_York",
    currency: "USD",
    openTime: "09:30",
    closeTime: "16:00",
    isOpen: true,
    status: "open",
    tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    holidays: [
      "2024-01-01",
      "2024-01-15",
      "2024-02-19",
      "2024-03-29",
      "2024-05-27",
      "2024-06-19",
      "2024-07-04",
      "2024-09-02",
      "2024-11-28",
      "2024-12-25",
    ],
    indices: ["DJI", "SPX", "NYA"],
    stats: {
      listedCompanies: 2400,
      marketCap: "25.5T",
      avgDailyVolume: "4.2B",
    },
  },
  nasdaq: {
    id: "nasdaq",
    name: "NASDAQ",
    mic: "XNAS",
    country: "US",
    timezone: "America/New_York",
    currency: "USD",
    openTime: "09:30",
    closeTime: "16:00",
    isOpen: true,
    status: "open",
    tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    holidays: [
      "2024-01-01",
      "2024-01-15",
      "2024-02-19",
      "2024-03-29",
      "2024-05-27",
      "2024-06-19",
      "2024-07-04",
      "2024-09-02",
      "2024-11-28",
      "2024-12-25",
    ],
    indices: ["IXIC", "NDX", "COMP"],
    stats: {
      listedCompanies: 3300,
      marketCap: "22.1T",
      avgDailyVolume: "5.8B",
    },
  },
  lse: {
    id: "lse",
    name: "London Stock Exchange",
    mic: "XLON",
    country: "GB",
    timezone: "Europe/London",
    currency: "GBP",
    openTime: "08:00",
    closeTime: "16:30",
    isOpen: false,
    status: "closed",
    tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    indices: ["FTSE", "FTMC", "FTAS"],
    stats: {
      listedCompanies: 1900,
      marketCap: "3.8T",
      avgDailyVolume: "1.2B",
    },
  },
};

// GET /api/markets/[id] - Get a specific market
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const market = marketsData[id.toLowerCase()];

  if (!market) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "MARKET_NOT_FOUND",
          message: `Market with id '${id}' not found`,
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: market,
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
}
