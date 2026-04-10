# Historical Data API

The Historical API provides historical price data for stocks with daily OHLCV data across multiple date ranges.

## Endpoints

### Get Historical Prices

```http
GET /api/historical/{symbol}
```

Returns historical OHLCV (Open, High, Low, Close, Volume) data for a specific symbol.

#### Parameters

| Parameter  | Type   | Required | Default | Description                                |
|------------|--------|----------|---------|--------------------------------------------|
| `symbol`   | string | Yes      | -       | Stock ticker symbol                        |
| `interval` | string | No       | `1d`    | Data interval (passed through in response, but data is always generated as daily bars) |
| `range`    | string | No       | `1mo`   | Date range (`1d`, `5d`, `1mo`, `3mo`, `6mo`, `1y`, `5y`) |

#### Response

```json
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "interval": "1d",
    "range": "1mo",
    "prices": [
      {
        "date": "2024-01-02",
        "open": 185.23,
        "high": 187.45,
        "low": 184.12,
        "close": 186.78,
        "adjustedClose": 186.78,
        "volume": 54234567,
        "vwap": 185.90,
        "changePct": 0.84,
        "splitCoefficient": 1.0
      }
    ]
  },
  "meta": {
    "total": 22,
    "timestamp": "2024-01-15T14:30:00Z",
    "currency": "USD"
  }
}
```

## Available Symbols

| Symbol | Company              |
|--------|----------------------|
| `AAPL` | Apple Inc.           |
| `GOOGL`| Alphabet Inc.        |
| `MSFT` | Microsoft Corporation|
| `TSLA` | Tesla, Inc.          |
| `AMZN` | Amazon.com, Inc.     |
| `META` | Meta Platforms, Inc. |
| `NVDA` | NVIDIA Corporation   |

## Range Options

| Range   | Description    | Days of Data |
|---------|----------------|-------------|
| `1d`    | 1 trading day  | 1           |
| `5d`    | 5 trading days | 5           |
| `1mo`   | 1 month        | 30          |
| `3mo`   | 3 months       | 90          |
| `6mo`   | 6 months       | 180         |
| `1y`    | 1 year         | 365         |
| `5y`    | 5 years        | 1825        |

If an unrecognized `range` value is provided, it defaults to 30 days.

## Response Fields

| Field              | Type   | Description                                         |
|--------------------|--------|-----------------------------------------------------|
| `date`             | string | Date of the bar (YYYY-MM-DD)                        |
| `open`             | number | Opening price                                       |
| `high`             | number | Highest price during period                         |
| `low`              | number | Lowest price during period                          |
| `close`            | number | Closing price                                       |
| `adjustedClose`    | number | Adjusted closing price (for splits/dividends)       |
| `volume`           | number | Trading volume                                      |
| `vwap`             | number | Volume-weighted average price                       |
| `changePct`        | number | Percentage change from open to close                |
| `splitCoefficient` | number | Split coefficient (1.0 when no split)               |

## Error Response

If the symbol is not found, the API returns a 404 response:

```json
{
  "success": false,
  "error": {
    "code": "SYMBOL_NOT_FOUND",
    "message": "Historical data for symbol 'XYZ' not found"
  }
}
```

## Example Usage

```bash
# Get 3 months of daily data for AAPL
curl -X GET "https://api.datastack.io/api/historical/AAPL?range=3mo&interval=1d"
```

```python
import requests

response = requests.get(
    'https://api.datastack.io/api/historical/AAPL',
    params={'range': '3mo', 'interval': '1d'}
)
data = response.json()

for candle in data['data']['prices']:
    print(f"{candle['date']}: {candle['close']}")
```

## Notes

- Weekend dates are excluded from the response
- The `interval` parameter is accepted and returned in the response, but data is always generated as daily bars
- All timestamps are in UTC
