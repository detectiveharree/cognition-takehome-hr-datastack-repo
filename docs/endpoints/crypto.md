# Crypto API

The Crypto API provides real-time cryptocurrency quotes including price, market cap, supply data, and all-time high information.

## Endpoints

### Get Cryptocurrency Quote

```http
GET /api/crypto/{symbol}
```

Returns the current quote for a specific cryptocurrency.

#### Parameters

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| `symbol`  | string | Yes      | Cryptocurrency symbol (e.g., `BTC`, `ETH`, `SOL`) |

#### Response

```json
{
  "success": true,
  "data": {
    "symbol": "BTC",
    "name": "Bitcoin",
    "price": 67432.18,
    "change24h": 1245.32,
    "changePercent24h": 1.88,
    "high24h": 68102.45,
    "low24h": 65890.12,
    "volume24h": 28945123456,
    "marketCap": 1324000000000,
    "circulatingSupply": 19634218,
    "maxSupply": 21000000,
    "allTimeHigh": 73750.00,
    "allTimeHighDate": "2024-03-14",
    "lastUpdated": "2024-01-15T14:30:00Z"
  },
  "meta": {
    "timestamp": "2024-01-15T14:30:00Z",
    "source": "CryptoDataFeed"
  }
}
```

## Response Fields

| Field              | Type        | Description                                  |
|--------------------|-------------|----------------------------------------------|
| `symbol`           | string      | Cryptocurrency ticker symbol                 |
| `name`             | string      | Full cryptocurrency name                     |
| `price`            | number      | Current price in USD                         |
| `change24h`        | number      | Price change in the last 24 hours            |
| `changePercent24h` | number      | Percentage change in the last 24 hours       |
| `high24h`          | number      | Highest price in the last 24 hours           |
| `low24h`           | number      | Lowest price in the last 24 hours            |
| `volume24h`        | number      | 24-hour trading volume in USD                |
| `marketCap`        | number      | Total market capitalization in USD           |
| `circulatingSupply`| number      | Number of coins currently in circulation     |
| `maxSupply`        | number\|null| Maximum coin supply (`null` if uncapped)     |
| `allTimeHigh`      | number      | All-time high price in USD                   |
| `allTimeHighDate`  | string      | Date the all-time high was reached           |
| `lastUpdated`      | string      | Timestamp of last data update (ISO 8601)     |

## Available Cryptocurrencies

| Symbol | Name     |
|--------|----------|
| `BTC`  | Bitcoin  |
| `ETH`  | Ethereum |
| `SOL`  | Solana   |
| `DOGE` | Dogecoin |
| `XRP`  | XRP      |

## Error Response

```json
{
  "success": false,
  "error": {
    "code": "CRYPTO_NOT_FOUND",
    "message": "Cryptocurrency 'INVALID' not found"
  }
}
```

## Example Usage

```bash
curl -X GET "https://api.datastack.io/api/crypto/BTC"
```

```javascript
const response = await fetch('https://api.datastack.io/api/crypto/BTC');
const data = await response.json();
console.log(`${data.data.name}: $${data.data.price}`);
// Bitcoin: $67432.18
```

```python
import requests

response = requests.get('https://api.datastack.io/api/crypto/ETH')
data = response.json()

crypto = data['data']
print(f"{crypto['name']}: ${crypto['price']}")
print(f"24h Change: {crypto['changePercent24h']}%")
print(f"Market Cap: ${crypto['marketCap']:,}")
```
