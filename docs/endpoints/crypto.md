# Crypto API

The Crypto API provides real-time cryptocurrency quotes including price, volume, market cap, and supply data.

## Endpoints

### Get Cryptocurrency Quote

```http
GET /api/crypto/{symbol}
```

Returns the current quote for a specific cryptocurrency.

#### Path Parameters

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| `symbol`  | string | Yes      | Cryptocurrency ticker symbol (e.g., `BTC`, `ETH`) |

#### Query Parameters

| Parameter | Type   | Required | Default | Description                          |
|-----------|--------|----------|---------|--------------------------------------|
| `convert` | string | No       | `USD`   | Target currency for price conversion |

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
    "convert": "USD",
    "lastUpdated": "2024-01-15T14:30:00Z"
  },
  "meta": {
    "timestamp": "2024-01-15T14:30:00Z",
    "source": "CryptoDataFeed"
  }
}
```

## Response Fields

| Field               | Type        | Description                                |
|---------------------|-------------|--------------------------------------------|
| `symbol`            | string      | Cryptocurrency ticker symbol               |
| `name`              | string      | Full cryptocurrency name                   |
| `price`             | number      | Current price                              |
| `change24h`         | number      | Price change in the last 24 hours          |
| `changePercent24h`  | number      | Percentage price change in the last 24 hours |
| `high24h`           | number      | Highest price in the last 24 hours         |
| `low24h`            | number      | Lowest price in the last 24 hours          |
| `volume24h`         | number      | 24-hour trading volume                     |
| `marketCap`         | number      | Market capitalization                      |
| `circulatingSupply` | number      | Number of coins currently in circulation   |
| `maxSupply`         | number/null | Maximum possible supply (`null` if uncapped) |
| `allTimeHigh`       | number      | All-time high price                        |
| `allTimeHighDate`   | string      | Date the all-time high was reached         |
| `convert`           | string      | Target conversion currency                 |
| `lastUpdated`       | string      | Timestamp of last update                   |

## Available Cryptocurrencies

| Symbol | Name     |
|--------|----------|
| `BTC`  | Bitcoin  |
| `ETH`  | Ethereum |
| `SOL`  | Solana   |
| `DOGE` | Dogecoin |
| `XRP`  | XRP      |

## Error Codes

| Code               | HTTP Status | Description                                |
|--------------------|-------------|--------------------------------------------|
| `CRYPTO_NOT_FOUND` | 404         | The requested cryptocurrency was not found |

### Error Response

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
curl -X GET "https://api.datastack.io/api/crypto/BTC" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```bash
# With currency conversion parameter
curl -X GET "https://api.datastack.io/api/crypto/ETH?convert=EUR" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```javascript
const response = await fetch('https://api.datastack.io/api/crypto/BTC', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();
console.log(data.data.price); // 67432.18
```

```python
import requests

# Get multiple crypto quotes
symbols = ['BTC', 'ETH', 'SOL']
quotes = {}

for symbol in symbols:
    response = requests.get(
        f'https://api.datastack.io/api/crypto/{symbol}',
        headers={'Authorization': 'Bearer YOUR_API_KEY'}
    )
    data = response.json()
    quotes[symbol] = data['data']['price']

print(quotes)
# {'BTC': 67432.18, 'ETH': 3456.78, 'SOL': 178.45}
```

## Notes

- The `symbol` parameter is case-insensitive (e.g., `btc` and `BTC` are equivalent)
- The `maxSupply` field is `null` for cryptocurrencies with no maximum supply cap (e.g., ETH, SOL, DOGE)
