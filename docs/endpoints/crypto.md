# Crypto API

The Crypto API provides real-time cryptocurrency price quotes and market data, powered by Binance.

> **Note**: The Crypto API is available exclusively on the **Pro plan** and above.

## Endpoints

### Get Crypto Quote

```http
GET /api/crypto/{symbol}
```

Returns the current quote and market data for a specific cryptocurrency.

#### Parameters

| Parameter | Type   | Required | Default | Description                                      |
|-----------|--------|----------|---------|--------------------------------------------------|
| `symbol`  | string | Yes      | -       | Cryptocurrency ticker symbol (e.g., `BTC`, `ETH`) |
| `convert` | string | No       | `USD`   | Currency to convert prices into                  |

#### Supported Symbols

| Symbol | Name     |
|--------|----------|
| `BTC`  | Bitcoin  |
| `ETH`  | Ethereum |
| `SOL`  | Solana   |
| `DOGE` | Dogecoin |
| `XRP`  | XRP      |

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

| Field               | Type           | Description                                    |
|---------------------|----------------|------------------------------------------------|
| `symbol`            | string         | Cryptocurrency ticker symbol                   |
| `name`              | string         | Cryptocurrency name                            |
| `price`             | number         | Current price                                  |
| `change24h`         | number         | Price change in the last 24 hours              |
| `changePercent24h`  | number         | Percentage change in the last 24 hours         |
| `high24h`           | number         | Highest price in the last 24 hours             |
| `low24h`            | number         | Lowest price in the last 24 hours              |
| `volume24h`         | number         | Trading volume in the last 24 hours            |
| `marketCap`         | number         | Market capitalization                          |
| `circulatingSupply` | number         | Number of coins currently in circulation       |
| `maxSupply`         | number \| null | Maximum supply cap (`null` if uncapped)        |
| `allTimeHigh`       | number         | All-time high price                            |
| `allTimeHighDate`   | string         | Date the all-time high was reached             |
| `convert`           | string         | Currency used for price conversion             |
| `lastUpdated`       | string         | Timestamp of last data update                  |

## Error Codes

| Code               | Description                              |
|--------------------|------------------------------------------|
| `CRYPTO_NOT_FOUND` | The requested cryptocurrency was not found |

## Example Usage

```bash
# Get current Bitcoin quote
curl -X GET "https://api.datastack.io/api/crypto/BTC" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Get Ethereum quote converted to EUR
curl -X GET "https://api.datastack.io/api/crypto/ETH?convert=EUR" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```python
import requests

response = requests.get(
    'https://api.datastack.io/api/crypto/BTC',
    params={'convert': 'USD'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
data = response.json()

print(f"Bitcoin: ${data['data']['price']:,.2f}")
print(f"24h Change: {data['data']['changePercent24h']}%")
```

## Notes

- Data is sourced from Binance
- The `maxSupply` field is `null` for cryptocurrencies with no supply cap (e.g., Ethereum)
- All timestamps are in UTC
- This endpoint requires a **Pro plan** subscription or above
