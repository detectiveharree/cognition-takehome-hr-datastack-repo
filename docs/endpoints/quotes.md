# Quotes API

The Quotes API provides real-time and delayed price quotes for stocks, ETFs, and other securities.

## Endpoints

### Get Quote

```http
GET /api/quotes/{symbol}
```

Returns the current quote for a specific symbol.

#### Parameters

| Parameter  | Type   | Required | Default | Description                                              |
|------------|--------|----------|---------|----------------------------------------------------------|
| `symbol`   | string | Yes      | -       | Stock ticker symbol (e.g., `AAPL`, `GOOGL`)              |
| `currency` | string | No       | `USD`   | Convert prices to this currency (e.g., `EUR`, `GBP`, `JPY`, `CAD`, `AUD`) |
| `adjusted` | boolean| No       | `false` | Whether to return split-adjusted prices                  |

#### Response

```json
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "exchange": "NASDAQ",
    "currency": "USD",
    "price": 178.52,
    "change": 2.34,
    "changePercent": 1.33,
    "open": 176.18,
    "high": 179.45,
    "low": 175.89,
    "previousClose": 176.18,
    "volume": 52453892,
    "avgVolume": 58234567,
    "marketCap": 2780000000000,
    "pe": 28.45,
    "eps": 6.27,
    "week52High": 199.62,
    "week52Low": 143.90,
    "dividendYield": 0.51,
    "beta": 1.28,
    "currency": "USD",
    "adjusted": false,
    "splitAdjustmentFactor": 1.0,
    "lastUpdated": "2024-01-15T14:30:00Z"
  },
  "meta": {
    "timestamp": "2024-01-15T14:30:00Z",
    "delayed": false
  }
}
```

## Response Fields

| Field           | Type    | Description                                    |
|-----------------|---------|------------------------------------------------|
| `symbol`        | string  | Stock ticker symbol                            |
| `name`          | string  | Company name                                   |
| `exchange`      | string  | Exchange where the stock is listed             |
| `currency`      | string  | Currency of the quoted prices                  |
| `price`         | number  | Current/last trade price                       |
| `change`        | number  | Price change from previous close               |
| `changePercent` | number  | Percentage change from previous close          |
| `open`          | number  | Opening price                                  |
| `high`          | number  | Day's high price                               |
| `low`           | number  | Day's low price                                |
| `previousClose` | number  | Previous day's closing price                   |
| `volume`        | number  | Trading volume                                 |
| `avgVolume`     | number  | Average trading volume                         |
| `marketCap`     | number  | Market capitalization in USD                   |
| `pe`            | number  | Price-to-earnings ratio                        |
| `eps`           | number  | Earnings per share                             |
| `week52High`    | number  | 52-week high price                             |
| `week52Low`     | number  | 52-week low price                              |
| `dividendYield` | number  | Annual dividend yield percentage               |
| `beta`          | number  | Stock's beta coefficient                       |
| `currency`      | string  | Currency of the quoted prices                  |
| `adjusted`      | boolean | Whether split-adjusted prices are returned     |
| `splitAdjustmentFactor` | number | Split adjustment factor (1.0 = no adjustment) |
| `lastUpdated`   | string  | Timestamp of last update                       |

## Error Codes

| Code              | Description                              |
|-------------------|------------------------------------------|
| `QUOTE_NOT_FOUND` | The requested symbol was not found       |

## Rate Limits

- **Free tier**: 5 requests per second
- **Pro tier**: 100 requests per second
- **Enterprise tier**: Unlimited

## Example Usage

```bash
curl -X GET "https://api.datastack.io/api/quotes/AAPL" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```javascript
const response = await fetch('https://api.datastack.io/api/quotes/AAPL', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();
console.log(data.data.price); // 178.52
```
