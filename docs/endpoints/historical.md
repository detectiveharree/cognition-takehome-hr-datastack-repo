# Historical Data API

The Historical API provides historical price data for stocks, ETFs, and indices with support for multiple timeframes and intervals.

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
| `interval` | string | No       | `1d`    | Data interval (`1m`, `5m`, `1h`, `1d`, `1w`, `1mo`) |
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
      },
      {
        "date": "2024-01-03",
        "open": 186.90,
        "high": 188.12,
        "low": 185.67,
        "close": 187.45,
        "adjustedClose": 187.45,
        "volume": 48765432,
        "vwap": 187.04,
        "changePct": 0.29,
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

## Interval Options

| Interval | Description        | Max Range  |
|----------|--------------------|-----------:|
| `1m`     | 1-minute bars      | 7 days     |
| `5m`     | 5-minute bars      | 30 days    |
| `15m`    | 15-minute bars     | 60 days    |
| `1h`     | Hourly bars        | 180 days   |
| `1d`     | Daily bars         | 20 years   |
| `1w`     | Weekly bars        | 20 years   |
| `1mo`    | Monthly bars       | 20 years   |

## Range Options

| Range   | Description    |
|---------|----------------|
| `1d`    | 1 trading day  |
| `5d`    | 5 trading days |
| `1mo`   | 1 month        |
| `3mo`   | 3 months       |
| `6mo`   | 6 months       |
| `1y`    | 1 year         |
| `5y`    | 5 years        |
| `max`   | Maximum available data |

## Response Fields

| Field          | Type   | Description                           |
|----------------|--------|---------------------------------------|
| `date`         | string | Date/timestamp of the bar             |
| `open`         | number | Opening price                         |
| `high`         | number | Highest price during period           |
| `low`          | number | Lowest price during period            |
| `close`        | number | Closing price                         |
| `adjustedClose`| number | Adjusted closing price (for splits/dividends) |
| `volume`       | number | Trading volume                        |
| `vwap`         | number | Volume Weighted Average Price, calculated as the average of open, high, low, and close |
| `changePct`    | number | Percentage change from open to close for the period |
| `splitCoefficient` | number | Stock split coefficient (1.0 when no split occurred) |

## Example Usage

```bash
# Get 3 months of daily data for AAPL
curl -X GET "https://api.datastack.io/api/historical/AAPL?range=3mo&interval=1d" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```python
import requests

response = requests.get(
    'https://api.datastack.io/api/historical/AAPL',
    params={'range': '3mo', 'interval': '1d'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
data = response.json()

for candle in data['data']['prices']:
    print(f"{candle['date']}: {candle['close']}")
```

## Notes

- Historical data is adjusted for stock splits and dividends by default
- Intraday data (intervals < 1d) is only available for the past 60 days
- Weekend and holiday dates are excluded from the response
- All timestamps are in UTC
