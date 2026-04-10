# News API

The News API provides real-time financial news and market updates for stocks, sectors, and the broader market. Includes sentiment analysis and relevance scoring.

## Endpoints

### Get News for Symbol

```http
GET /api/news/{symbol}
```

Returns news articles related to a specific stock symbol.

#### Parameters

| Parameter   | Type   | Required | Default | Description                              |
|-------------|--------|----------|---------|------------------------------------------|
| `symbol`    | string | Yes      | -       | Stock ticker symbol                      |
| `limit`     | number | No       | 10      | Maximum number of articles (1-50)        |
| `sentiment` | string | No       | -       | Filter by sentiment (`positive`, `negative`, `neutral`) |

#### Response

```json
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "articles": [
      {
        "id": "news-001",
        "title": "Apple Reports Record Q4 Revenue Driven by iPhone 15 Sales",
        "summary": "Apple Inc. announced record-breaking quarterly revenue of $89.5 billion, exceeding analyst expectations as iPhone 15 sales surpassed projections.",
        "source": "Reuters",
        "author": "Stephen Nellis",
        "url": "https://example.com/news/apple-q4-2024",
        "publishedAt": "2024-01-15T14:30:00Z",
        "sentiment": "positive",
        "relevanceScore": 0.95,
        "tickers": ["AAPL"],
        "categories": ["earnings", "technology"]
      }
    ]
  },
  "meta": {
    "total": 15,
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

## Response Fields

| Field           | Type     | Description                                     |
|-----------------|----------|-------------------------------------------------|
| `id`            | string   | Unique article identifier                       |
| `title`         | string   | Article headline                                |
| `summary`       | string   | Brief summary (150-300 characters)              |
| `source`        | string   | News source/publisher                           |
| `author`        | string   | Article author                                  |
| `url`           | string   | Link to full article                            |
| `publishedAt`   | string   | Publication timestamp (ISO 8601)                |
| `sentiment`     | string   | AI-analyzed sentiment                           |
| `relevanceScore`| number   | Relevance to symbol (0-1)                       |
| `tickers`       | string[] | Related ticker symbols                          |
| `categories`    | string[] | Content categories                              |

## Sentiment Values

| Value      | Description                                      |
|------------|--------------------------------------------------|
| `positive` | Article has positive market implications         |
| `negative` | Article has negative market implications         |
| `neutral`  | Article is factual/neutral in tone               |

## News Categories

- `earnings` - Earnings reports and financial results
- `technology` - Tech sector news
- `product-launch` - New product announcements
- `artificial-intelligence` - AI-related news
- `legal` - Legal and regulatory news
- `regulation` - Government regulation news
- `cloud` - Cloud computing news
- `enterprise` - Enterprise adoption news
- `acquisitions` - M&A activity
- `manufacturing` - Manufacturing and production news
- `expansion` - Business expansion news

## Example Usage

```bash
# Get positive news for AAPL
curl -X GET "https://api.datastack.io/api/news/AAPL?sentiment=positive&limit=5" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```python
import requests

response = requests.get(
    'https://api.datastack.io/api/news/AAPL',
    params={'limit': 10, 'sentiment': 'positive'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

for article in response.json()['data']['articles']:
    print(f"[{article['sentiment']}] {article['title']}")
```

## Rate Limits

- **Free tier**: 100 requests per day
- **Pro tier**: 10,000 requests per day
- **Enterprise tier**: Unlimited
