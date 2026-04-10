# Crypto API

The Crypto API provides real-time cryptocurrency quotes including price, volume, market cap, and supply data.

## Endpoints

### Get Cryptocurrency Quote

```http
GET /api/crypto/{symbol}
```

Returns the current quote for a specific cryptocurrency.

#### Parameters

| Parameter | Type   | Required | Default | Description                                         |
|-----------|--------|----------|---------|-----------------------------------------------------|
| `symbol`  | string | Yes      | -       | Cryptocurrency ticker symbol (e.g., `BTC`, `ETH`)   |
| `convert` | string | No       | `USD`   | Target currency for the quote (passed through in response) |

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

## Available Symbols

| Symbol | Name      |
|--------|-----------|
| `BTC`  | Bitcoin   |
| `ETH`  | Ethereum  |
| `SOL`  | Solana    |
| `DOGE` | Dogecoin  |
| `XRP`  | XRP       |

## Response Fields

| Field               | Type        | Description                                    |
|---------------------|-------------|------------------------------------------------|
| `symbol`            | string      | Cryptocurrency ticker symbol                   |
| `name`              | string      | Cryptocurrency name                            |
| `price`             | number      | Current price                                  |
| `change24h`         | number      | Price change in last 24 hours                  |
| `changePercent24h`  | number      | Percentage change in last 24 hours             |
| `high24h`           | number      | Highest price in last 24 hours                 |
| `low24h`            | number      | Lowest price in last 24 hours                  |
| `volume24h`         | number      | 24-hour trading volume                         |
| `marketCap`         | number      | Market capitalization                          |
| `circulatingSupply` | number      | Current circulating supply                     |
| `maxSupply`         | number/null | Maximum supply (null if unlimited)             |
| `allTimeHigh`       | number      | All-time high price                            |
| `allTimeHighDate`   | string      | Date of all-time high (YYYY-MM-DD)             |
| `convert`           | string      | Target currency specified in the request       |
| `lastUpdated`       | string      | Timestamp of last update                       |

## Error Response

If the symbol is not found, the API returns a 404 response:

```json
{
  "success": false,
  "error": {
    "code": "CRYPTO_NOT_FOUND",
    "message": "Cryptocurrency 'FAKE' not found"
  }
}
```

## Example Usage

```bash
curl -X GET "https://api.datastack.io/api/crypto/BTC"
```

```bash
# Specify a conversion currency
curl -X GET "https://api.datastack.io/api/crypto/ETH?convert=EUR"
```

```python
import requests

symbols = ['BTC', 'ETH', 'SOL']

for symbol in symbols:
    response = requests.get(f'https://api.datastack.io/api/crypto/{symbol}')
    data = response.json()
    print(f"{data['data']['name']}: ${data['data']['price']:,.2f}")

# Bitcoin: $67,432.18
# Ethereum: $3,456.78
# Solana: $178.45
```
