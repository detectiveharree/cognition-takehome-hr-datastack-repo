# Forex API

The Forex API provides real-time and historical foreign exchange rates for major and exotic currency pairs.

## Endpoints

### Get Exchange Rate

```http
GET /api/forex/{pair}
```

Returns the current exchange rate for a currency pair.

#### Parameters

| Parameter | Type   | Required | Description                                    |
|-----------|--------|----------|------------------------------------------------|
| `pair`    | string | Yes      | Currency pair (e.g., `EURUSD`, `EUR/USD`, `EUR-USD`) |

#### Response

```json
{
  "success": true,
  "data": {
    "pair": "EUR/USD",
    "baseCurrency": "EUR",
    "quoteCurrency": "USD",
    "rate": 1.0892,
    "bid": 1.0891,
    "ask": 1.0893,
    "change": 0.0023,
    "changePercent": 0.21,
    "dayHigh": 1.0912,
    "dayLow": 1.0867,
    "previousClose": 1.0869,
    "volume": "156.2B",
    "lastUpdated": "2024-01-15T14:30:00Z"
  },
  "meta": {
    "timestamp": "2024-01-15T14:30:00Z",
    "source": "DataStack FX Feed"
  }
}
```

## Response Fields

| Field           | Type   | Description                          |
|-----------------|--------|--------------------------------------|
| `pair`          | string | Currency pair in standard format     |
| `baseCurrency`  | string | Base currency code                   |
| `quoteCurrency` | string | Quote currency code                  |
| `rate`          | number | Current mid-market rate              |
| `bid`           | number | Best bid price                       |
| `ask`           | number | Best ask price                       |
| `change`        | number | Change from previous close           |
| `changePercent` | number | Percentage change                    |
| `dayHigh`       | number | Highest rate today                   |
| `dayLow`        | number | Lowest rate today                    |
| `previousClose` | number | Previous day's closing rate          |
| `volume`        | string | 24-hour trading volume               |
| `lastUpdated`   | string | Timestamp of last update             |

## Available Currency Pairs

### Major Pairs

| Pair     | Description         |
|----------|---------------------|
| `EURUSD` | Euro / US Dollar    |
| `GBPUSD` | British Pound / USD |
| `USDJPY` | USD / Japanese Yen  |
| `USDCHF` | USD / Swiss Franc   |
| `AUDUSD` | Australian Dollar / USD |
| `USDCAD` | USD / Canadian Dollar |
| `NZDUSD` | New Zealand Dollar / USD |

### Cross Pairs

| Pair     | Description         |
|----------|---------------------|
| `EURGBP` | Euro / British Pound|

## Pair Format

The API accepts multiple formats for currency pairs:

- `EURUSD` - concatenated (recommended)
- `EUR/USD` - with slash
- `EUR-USD` - with hyphen
- `eur-usd` - case insensitive

## Example Usage

```bash
curl -X GET "https://api.datastack.io/api/forex/EURUSD" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```python
import requests

# Get multiple currency pairs
pairs = ['EURUSD', 'GBPUSD', 'USDJPY']
rates = {}

for pair in pairs:
    response = requests.get(
        f'https://api.datastack.io/api/forex/{pair}',
        headers={'Authorization': 'Bearer YOUR_API_KEY'}
    )
    data = response.json()
    rates[pair] = data['data']['rate']

print(rates)
# {'EURUSD': 1.0892, 'GBPUSD': 1.2734, 'USDJPY': 148.52}
```

## Currency Conversion

To convert amounts between currencies:

```javascript
const amount = 1000; // EUR
const rate = 1.0892; // EURUSD rate
const converted = amount * rate; // 1089.20 USD
```

## Rate Limits

- **Free tier**: 100 requests per day
- **Pro tier**: 10,000 requests per day  
- **Enterprise tier**: Unlimited with streaming

## Historical Forex Data

For historical forex data, use the historical API with forex symbols:

```http
GET /api/historical/EURUSD?range=1mo&interval=1d
```
