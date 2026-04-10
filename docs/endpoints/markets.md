# Markets API

The Markets API provides information about available financial markets, including exchanges, trading hours, and market status.

## Endpoints

### List All Markets

```http
GET /api/markets
```

Returns a list of all available markets with their current status.

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "nyse",
      "name": "New York Stock Exchange",
      "mic": "XNYS",
      "country": "US",
      "timezone": "America/New_York",
      "currency": "USD",
      "openTime": "09:30",
      "closeTime": "16:00",
      "isOpen": true,
      "status": "open"
    }
  ],
  "meta": {
    "total": 6,
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

### Get Market Details

```http
GET /api/markets/{id}
```

Returns detailed information about a specific market.

#### Parameters

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| `id`      | string | Yes      | Market identifier (e.g., `nyse`, `nasdaq`) |

#### Response

```json
{
  "success": true,
  "data": {
    "id": "nyse",
    "name": "New York Stock Exchange",
    "mic": "XNYS",
    "country": "US",
    "timezone": "America/New_York",
    "currency": "USD",
    "openTime": "09:30",
    "closeTime": "16:00",
    "isOpen": true,
    "status": "open",
    "tradingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "holidays": ["2024-01-01", "2024-01-15", "..."],
    "indices": ["DJI", "SPX", "NYA"],
    "stats": {
      "listedCompanies": 2400,
      "marketCap": "25.5T",
      "avgDailyVolume": "4.2B"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

#### Error Response

```json
{
  "success": false,
  "error": {
    "code": "MARKET_NOT_FOUND",
    "message": "Market with id 'invalid' not found"
  }
}
```

## Available Markets

| ID         | Name                      | MIC   | Country |
|------------|---------------------------|-------|---------|
| `nyse`     | New York Stock Exchange   | XNYS  | US      |
| `nasdaq`   | NASDAQ                    | XNAS  | US      |
| `lse`      | London Stock Exchange     | XLON  | GB      |
| `tse`      | Tokyo Stock Exchange      | XJPX  | JP      |
| `hkex`     | Hong Kong Stock Exchange  | XHKG  | HK      |
| `euronext` | Euronext Paris            | XPAR  | FR      |

## Market Status Values

- `open` - Market is currently open for trading
- `closed` - Market is closed
