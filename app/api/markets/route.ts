import { NextResponse } from "next/server";

// GET /api/markets - List available markets
export async function GET() {
  const markets = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
      id: "tse",
      name: "Tokyo Stock Exchange",
      mic: "XJPX",
      country: "JP",
      timezone: "Asia/Tokyo",
      currency: "JPY",
      openTime: "09:00",
      closeTime: "15:00",
      isOpen: false,
      status: "closed",
    },
    {
      id: "hkex",
      name: "Hong Kong Stock Exchange",
      mic: "XHKG",
      country: "HK",
      timezone: "Asia/Hong_Kong",
      currency: "HKD",
      openTime: "09:30",
      closeTime: "16:00",
      isOpen: false,
      status: "closed",
    },
    {
      id: "euronext",
      name: "Euronext Paris",
      mic: "XPAR",
      country: "FR",
      timezone: "Europe/Paris",
      currency: "EUR",
      openTime: "09:00",
      closeTime: "17:30",
      isOpen: false,
      status: "closed",
    },
  ];

  return NextResponse.json({
    success: true,
    data: markets,
    meta: {
      total: markets.length,
      timestamp: new Date().toISOString(),
    },
  });
}
