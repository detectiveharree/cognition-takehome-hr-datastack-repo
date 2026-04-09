# Sectors API

The Sectors API provides information about market sectors, including performance metrics, constituent stocks, and sector-level analytics.

## Endpoints

### List All Sectors

```http
GET /api/sectors
```

Returns a list of all market sectors with their current performance metrics.

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "technology",
      "name": "Technology",
      "performance": {
        "day": 1.45,
        "week": 3.21,
        "month": 5.67,
        "ytd": 12.34,
        "year": 28.91
      },
      "marketCap": "14.2T",
      "topHoldings": ["AAPL", "MSFT", "GOOGL", "NVDA", "META"],
      "volume": "3.2B",
      "pe": 28.5
    }
  ],
  "meta": {
    "total": 11,
    "timestamp": "2024-01-15T14:30:00Z",
    "asOf": "2024-01-15"
  }
}
```

## Available Sectors

| ID                        | Name                     |
|---------------------------|--------------------------|
| `technology`              | Technology               |
| `healthcare`              | Healthcare               |
| `financials`              | Financials               |
| `consumer-discretionary`  | Consumer Discretionary   |
| `consumer-staples`        | Consumer Staples         |
| `industrials`             | Industrials              |
| `energy`                  | Energy                   |
| `materials`               | Materials                |
| `utilities`               | Utilities                |
| `real-estate`             | Real Estate              |
| `communication-services`  | Communication Services   |

## Response Fields

| Field          | Type     | Description                              |
|----------------|----------|------------------------------------------|
| `id`           | string   | Sector identifier                        |
| `name`         | string   | Sector display name                      |
| `performance`  | object   | Performance metrics by time period       |
| `marketCap`    | string   | Total market capitalization              |
| `topHoldings`  | string[] | Top 5 stocks by weight                   |
| `volume`       | string   | Total trading volume                     |
| `pe`           | number   | Sector average P/E ratio                 |

## Performance Object

| Field   | Type   | Description                    |
|---------|--------|--------------------------------|
| `day`   | number | 1-day percentage change        |
| `week`  | number | 1-week percentage change       |
| `month` | number | 1-month percentage change      |
| `ytd`   | number | Year-to-date percentage change |
| `year`  | number | 1-year percentage change       |

## Example Usage

```bash
curl -X GET "https://api.datastack.io/api/sectors" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```javascript
const response = await fetch('https://api.datastack.io/api/sectors', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const { data } = await response.json();

// Sort sectors by daily performance
const sorted = data.sort((a, b) => b.performance.day - a.performance.day);

console.log('Top performing sectors today:');
sorted.slice(0, 3).forEach(sector => {
  console.log(`${sector.name}: ${sector.performance.day}%`);
});
```

## Sector Heat Map Data

The sectors endpoint is ideal for building sector heat maps and rotation analysis tools. Combine with the historical API to track sector rotations over time.

## Related Endpoints

- [GET /api/quotes/{symbol}](/docs/endpoints/quotes) - Get quotes for sector constituents
- [GET /api/historical/{symbol}](/docs/endpoints/historical) - Historical data for sector ETFs
