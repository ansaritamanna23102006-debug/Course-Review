# CourseReview - API Reference

Complete reference for all API endpoints in CourseReview.

## Base URL

```
http://localhost:3000/api
```

Production:
```
https://your-vercel-url.vercel.app/api
```

## Content-Type

All requests and responses use:
```
Content-Type: application/json
```

---

## Reviews Endpoints

### GET `/api/reviews`

**Description**: Fetch all reviews with pagination, filtering, and sorting

**Method**: `GET`

**Query Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | 1 | Page number for pagination |
| `limit` | number | No | 10 | Reviews per page |
| `rating` | number | No | - | Filter by rating (1-5) |
| `search` | string | No | - | Search by course title (case-insensitive) |
| `sort` | string | No | latest | Sort order: `latest`, `oldest`, `highest`, `lowest` |

**Example URL**:
```
GET /api/reviews?page=1&limit=10&sort=highest&rating=5&search=react
```

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "courseTitle": "React Advanced Patterns",
      "platform": "Udemy",
      "name": "John Doe",
      "rating": 5,
      "description": "Excellent course covering advanced React patterns...",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "courseTitle": "JavaScript Fundamentals",
      "platform": "YouTube",
      "name": "Jane Smith",
      "rating": 4,
      "description": "Good introduction to JavaScript concepts...",
      "createdAt": "2024-01-14T15:45:00.000Z",
      "updatedAt": "2024-01-14T15:45:00.000Z"
    }
  ],
  "pagination": {
    "current": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "analytics": {
    "totalReviews": 25,
    "averageRating": 4.3
  }
}
```

**Error Response** (500):
```json
{
  "success": false,
  "error": "Failed to fetch reviews"
}
```

---

### POST `/api/reviews`

**Description**: Create a new course review

**Method**: `POST`

**Request Body**:

```json
{
  "courseTitle": "React from Scratch",
  "platform": "Udemy",
  "name": "Alice Johnson",
  "rating": 5,
  "description": "This course is fantastic! I learned so much about React hooks and component composition. The instructor explains concepts clearly with great examples."
}
```

**Request Body Schema**:

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `courseTitle` | string | Yes | 1-200 characters |
| `platform` | string | Yes | enum: Udemy, Coursera, YouTube, LinkedIn Learning, Pluralsight, Other |
| `name` | string | No | 0-100 characters, defaults to "Anonymous" |
| `rating` | number | Yes | integer 1-5 |
| `description` | string | Yes | 10-1000 characters |

**Success Response** (201):
```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "courseTitle": "React from Scratch",
    "platform": "Udemy",
    "name": "Alice Johnson",
    "rating": 5,
    "description": "This course is fantastic!...",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

**Error Responses**:

**Missing Required Fields** (400):
```json
{
  "success": false,
  "error": "Missing required fields: courseTitle, platform, rating, description"
}
```

**Validation Error** (400):
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Review must be at least 10 characters",
    "Rating must be at least 1"
  ]
}
```

**Server Error** (500):
```json
{
  "success": false,
  "error": "Failed to create review"
}
```

---

### DELETE `/api/reviews/:id`

**Description**: Delete a specific review (admin only)

**Method**: `DELETE`

**Path Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | MongoDB review ID (must be valid 24-char hex) |

**Request Body**:

```json
{
  "adminPassword": "admin123secure"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Review deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "courseTitle": "React Advanced Patterns",
    "platform": "Udemy",
    "name": "John Doe",
    "rating": 5,
    "description": "Excellent course...",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses**:

**Unauthorized** (401):
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

**Invalid ID Format** (400):
```json
{
  "success": false,
  "error": "Invalid review ID"
}
```

**Review Not Found** (404):
```json
{
  "success": false,
  "error": "Review not found"
}
```

**Server Error** (500):
```json
{
  "success": false,
  "error": "Failed to delete review"
}
```

---

## Usage Examples

### JavaScript/Fetch

**Get all 5-star reviews**:
```javascript
fetch('/api/reviews?rating=5&sort=latest')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

**Submit a new review**:
```javascript
fetch('/api/reviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    courseTitle: 'Next.js Mastery',
    platform: 'Udemy',
    name: 'Developer',
    rating: 5,
    description: 'Best Next.js course I have taken!'
  })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    console.log('Review created:', data.data);
  } else {
    console.error('Error:', data.error);
  }
})
.catch(err => console.error('Network error:', err));
```

**Search courses**:
```javascript
fetch('/api/reviews?search=javascript&page=1&limit=5')
  .then(res => res.json())
  .then(data => {
    console.log(`Found ${data.pagination.total} results`);
    console.log(data.data); // First 5 results
  });
```

**Delete a review (admin)**:
```javascript
fetch('/api/reviews/507f1f77bcf86cd799439011', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    adminPassword: 'admin123secure'
  })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    console.log('Review deleted');
  } else {
    console.error('Error:', data.error);
  }
});
```

### JavaScript/Axios

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

// Get reviews
API.get('/reviews', {
  params: { rating: 5, sort: 'highest', page: 1 }
})
.then(res => console.log(res.data));

// Create review
API.post('/reviews', {
  courseTitle: 'Course Name',
  platform: 'Udemy',
  rating: 5,
  description: 'Great course!'
})
.then(res => console.log(res.data));

// Delete review
API.delete('/reviews/507f1f77bcf86cd799439011', {
  data: { adminPassword: 'admin123secure' }
})
.then(res => console.log(res.data));
```

### React Component Example

```jsx
'use client';

import { useState, useEffect } from 'react';

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          '/api/reviews?sort=latest&limit=5'
        );
        const data = await res.json();
        if (data.success) {
          setReviews(data.data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Latest Reviews</h2>
      {reviews.map(review => (
        <div key={review._id}>
          <h3>{review.courseTitle}</h3>
          <p>{review.rating} ⭐</p>
          <p>{review.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Pagination Guide

### Get Page 2 with Custom Limit

```
GET /api/reviews?page=2&limit=20
```

Response:
```json
{
  "pagination": {
    "current": 2,
    "limit": 20,
    "total": 100,
    "pages": 5
  },
  "data": [ /* 20 items */ ]
}
```

### Calculate Total Pages

```javascript
const totalPages = Math.ceil(total / limit);
// If total=100, limit=10 → pages=10
```

---

## Filtering Guide

### Multiple Filters

Combine query parameters:

```
GET /api/reviews?rating=4&platform=Udemy&sort=highest
```

**Note**: Currently `platform` filter is not in the default query handlers. To add it:

1. Update `/app/api/reviews/route.js` GET handler:

```javascript
if (platform) {
  filter.platform = platform;
}
```

2. Use in requests:

```
GET /api/reviews?platform=Udemy&rating=5
```

---

## Sorting Guide

| Sort Value | Order |
|-----------|-------|
| `latest` | Newest first (default) |
| `oldest` | Oldest first |
| `highest` | Highest rating first |
| `lowest` | Lowest rating first |

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | ✅ Success (GET, DELETE) |
| 201 | ✅ Created (POST) |
| 400 | ❌ Bad request (validation error) |
| 401 | ❌ Unauthorized (wrong admin password) |
| 404 | ❌ Not found (review doesn't exist) |
| 500 | ❌ Server error |

---

## Rate Limiting

Current setup has no rate limits. For production, add:

```javascript
// In API route
const RATE_LIMIT = 10; // requests per minute
```

---

## CORS Configuration

If frontend and backend are on different domains, add CORS headers:

```javascript
export async function GET(request) {
  const headers = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  // ... rest of code
}
```

---

## Webhooks (Future Feature)

Plans to add webhooks for review events:

```json
{
  "event": "review.created",
  "data": { /* review data */ },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

---

## API Performance

Typical response times:

| Endpoint | Time |
|----------|------|
| GET reviews (10 items) | 50-100ms |
| POST review | 100-200ms |
| DELETE review | 50-100ms |

---

**API Reference Complete! 🚀**

For questions, refer to code comments in `/app/api/` directory.
