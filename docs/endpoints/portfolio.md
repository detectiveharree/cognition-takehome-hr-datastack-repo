# Portfolio API

The Portfolio API allows you to create, manage, and analyze investment portfolios. Track positions, calculate returns, and get performance metrics.

> **Note**: Portfolio endpoints require authentication. See [Authentication](/docs/authentication) for details.

## Endpoints

### List Portfolios

```http
GET /api/portfolio
```

Returns all portfolios for the authenticated user.

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "pf_abc123",
      "name": "Tech Growth",
      "description": "Long-term technology investments",
      "currency": "USD",
      "totalValue": 125450.67,
      "totalCost": 98000.00,
      "totalReturn": 27450.67,
      "totalReturnPercent": 28.01,
      "positionCount": 8,
      "createdAt": "2023-06-15T10:00:00Z",
      "updatedAt": "2024-01-15T14:30:00Z"
    }
  ],
  "meta": {
    "total": 3,
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

### Get Portfolio Details

```http
GET /api/portfolio/{id}
```

Returns detailed information about a specific portfolio, including all positions.

#### Response

```json
{
  "success": true,
  "data": {
    "id": "pf_abc123",
    "name": "Tech Growth",
    "description": "Long-term technology investments",
    "currency": "USD",
    "totalValue": 125450.67,
    "totalCost": 98000.00,
    "totalReturn": 27450.67,
    "totalReturnPercent": 28.01,
    "dayChange": 1245.89,
    "dayChangePercent": 1.00,
    "positions": [
      {
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "shares": 100,
        "avgCost": 150.00,
        "currentPrice": 178.52,
        "marketValue": 17852.00,
        "totalCost": 15000.00,
        "unrealizedGain": 2852.00,
        "unrealizedGainPercent": 19.01,
        "weight": 14.23
      }
    ],
    "performance": {
      "day": 1.00,
      "week": 2.34,
      "month": 5.67,
      "ytd": 12.34,
      "year": 28.01
    }
  }
}
```

### Create Portfolio

```http
POST /api/portfolio
```

Creates a new portfolio.

#### Request Body

```json
{
  "name": "Dividend Income",
  "description": "High-yield dividend stocks",
  "currency": "USD"
}
```

### Add Position

```http
POST /api/portfolio/{id}/positions
```

Adds a new position to a portfolio.

#### Request Body

```json
{
  "symbol": "AAPL",
  "shares": 100,
  "avgCost": 150.00,
  "purchaseDate": "2024-01-10"
}
```

### Update Position

```http
PATCH /api/portfolio/{id}/positions/{symbol}
```

Updates an existing position.

### Remove Position

```http
DELETE /api/portfolio/{id}/positions/{symbol}
```

Removes a position from the portfolio.

## Portfolio Analytics

### Get Performance Metrics

```http
GET /api/portfolio/{id}/analytics
```

Returns detailed performance analytics for a portfolio.

#### Response

```json
{
  "success": true,
  "data": {
    "sharpeRatio": 1.45,
    "beta": 1.12,
    "alpha": 2.34,
    "volatility": 15.67,
    "maxDrawdown": -8.45,
    "correlation": {
      "SPY": 0.87,
      "QQQ": 0.92
    },
    "sectorAllocation": [
      { "sector": "Technology", "weight": 65.5 },
      { "sector": "Consumer", "weight": 20.3 },
      { "sector": "Healthcare", "weight": 14.2 }
    ]
  }
}
```

## Example Usage

```javascript
// Create a new portfolio
const portfolio = await fetch('https://api.datastack.io/api/portfolio', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'My Portfolio',
    description: 'Personal investments',
    currency: 'USD'
  })
});

// Add a position
await fetch(`https://api.datastack.io/api/portfolio/${portfolio.id}/positions`, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    symbol: 'AAPL',
    shares: 50,
    avgCost: 175.00
  })
});
```
