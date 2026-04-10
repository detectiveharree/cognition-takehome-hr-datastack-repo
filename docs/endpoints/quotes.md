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
| `currency` | string | No       | `USD`   | Currency for price fields (e.g., `EUR`, `GBP`, `JPY`)    |
| `adjusted` | string | No       | `false` | Set to `true` to include split adjustment factor         |

#### Supported Currencies

| Currency | Description         |
|----------|---------------------|
| `USD`    | US Dollar (default) |
| `EUR`    | Euro                |
| `GBP`    | British Pound       |
| `JPY`    | Japanese Yen        |
| `CAD`    | Canadian Dollar     |
| `AUD`    | Australian Dollar   |

When a non-USD currency is specified, the following price fields are converted: `price`, `open`, `high`, `low`, `previousClose`, `week52High`, and `week52Low`.

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

## Available Symbols

| Symbol | Company              |
|--------|----------------------|
| `AAPL` | Apple Inc.           |
| `GOOGL`| Alphabet Inc.        |
| `MSFT` | Microsoft Corporation|
| `TSLA` | Tesla, Inc.          |

## Response Fields

| Field                  | Type    | Description                                    |
|------------------------|---------|------------------------------------------------|
| `symbol`               | string  | Stock ticker symbol                            |
| `name`                 | string  | Company name                                   |
| `exchange`             | string  | Exchange where the stock is listed             |
| `currency`             | string  | Currency of the quoted prices                  |
| `price`                | number  | Current/last trade price                       |
| `change`               | number  | Price change from previous close               |
| `changePercent`        | number  | Percentage change from previous close          |
| `open`                 | number  | Opening price                                  |
| `high`                 | number  | Day's high price                               |
| `low`                  | number  | Day's low price                                |
| `previousClose`        | number  | Previous day's closing price                   |
| `volume`               | number  | Trading volume                                 |
| `avgVolume`            | number  | Average trading volume                         |
| `marketCap`            | number  | Market capitalization                          |
| `pe`                   | number  | Price-to-earnings ratio                        |
| `eps`                  | number  | Earnings per share                             |
| `week52High`           | number  | 52-week high price                             |
| `week52Low`            | number  | 52-week low price                              |
| `dividendYield`        | number  | Annual dividend yield percentage               |
| `beta`                 | number  | Stock's beta coefficient                       |
| `adjusted`             | boolean | Whether split adjustment was requested         |
| `splitAdjustmentFactor`| number  | Split adjustment factor (1.0 when no adjustment)|
| `lastUpdated`          | string  | Timestamp of last update                       |

## Error Codes

| Code              | Description                              |
|-------------------|------------------------------------------|
| `QUOTE_NOT_FOUND` | The requested symbol was not found       |

## Example Usage

```bash
curl -X GET "https://api.datastack.io/api/quotes/AAPL"
```

```bash
# Get quote in EUR
curl -X GET "https://api.datastack.io/api/quotes/AAPL?currency=EUR"
```

```javascript
const response = await fetch('https://api.datastack.io/api/quotes/AAPL?currency=EUR&adjusted=true');
const data = await response.json();
console.log(data.data.price); // Price converted to EUR
console.log(data.data.currency); // "EUR"
console.log(data.data.adjusted); // true
console.log(data.data.splitAdjustmentFactor); // 1.0
```
