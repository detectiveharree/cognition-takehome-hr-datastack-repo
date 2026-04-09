# Quickstart Guide

Get up and running with the DataStack API in under 5 minutes.

## Step 1: Get Your API Key

Sign up at [datastack.io](https://datastack.io) and grab your API key from the dashboard.

## Step 2: Make Your First Request

Let's fetch a stock quote for Apple (AAPL):

```bash
curl -X GET "https://api.datastack.io/api/quotes/AAPL" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

You'll receive a response like this:

```json
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 178.52,
    "change": 2.34,
    "changePercent": 1.33,
    "volume": 52453892
  }
}
```

## Step 3: Explore the API

Here are some common use cases to get you started:

### Get Real-Time Quotes

```javascript
const quote = await fetch('https://api.datastack.io/api/quotes/AAPL', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
}).then(r => r.json());

console.log(`${quote.data.symbol}: $${quote.data.price}`);
```

### Fetch Historical Data

```javascript
const history = await fetch(
  'https://api.datastack.io/api/historical/AAPL?range=1mo',
  { headers: { 'Authorization': 'Bearer YOUR_API_KEY' } }
).then(r => r.json());

history.data.prices.forEach(day => {
  console.log(`${day.date}: $${day.close}`);
});
```

### Get Market News

```javascript
const news = await fetch('https://api.datastack.io/api/news/AAPL', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
}).then(r => r.json());

news.data.articles.forEach(article => {
  console.log(`[${article.sentiment}] ${article.title}`);
});
```

### Check Forex Rates

```javascript
const forex = await fetch('https://api.datastack.io/api/forex/EURUSD', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
}).then(r => r.json());

console.log(`EUR/USD: ${forex.data.rate}`);
```

## SDK Installation

### JavaScript/TypeScript

```bash
npm install @datastack/sdk
```

```javascript
import { DataStack } from '@datastack/sdk';

const client = new DataStack('YOUR_API_KEY');

const quote = await client.quotes.get('AAPL');
console.log(quote.price);
```

### Python

```bash
pip install datastack-sdk
```

```python
from datastack import DataStack

client = DataStack('YOUR_API_KEY')

quote = client.quotes.get('AAPL')
print(quote.price)
```

## Available Endpoints

| Endpoint                  | Description                    |
|---------------------------|--------------------------------|
| `GET /api/markets`        | List available markets         |
| `GET /api/markets/{id}`   | Get market details             |
| `GET /api/quotes/{symbol}`| Get real-time quote            |
| `GET /api/historical/{symbol}` | Get historical prices     |
| `GET /api/news/{symbol}`  | Get news for a symbol          |
| `GET /api/sectors`        | List sector performance        |
| `GET /api/forex/{pair}`   | Get forex exchange rate        |

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

Error responses include helpful error codes:

```json
{
  "success": false,
  "error": {
    "code": "SYMBOL_NOT_FOUND",
    "message": "The requested symbol was not found"
  }
}
```

## Next Steps

- Read the [Authentication](/docs/authentication) guide for API key best practices
- Explore individual endpoint documentation in the sidebar
- Check out our [GitHub examples](https://github.com/datastack/examples)
- Join our [Discord community](https://discord.gg/datastack) for support

## Need Help?

- **Documentation**: You're here! Browse the sidebar for detailed endpoint docs
- **API Support**: support@datastack.io
- **Status Page**: [status.datastack.io](https://status.datastack.io)
