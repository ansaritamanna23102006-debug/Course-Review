# CourseReview - Customization Guide

Learn how to customize CourseReview to fit your needs!

## 🎨 Theme & Styling

### Change Color Scheme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      cream: '#F5F1E8',           // Lighter cream
      'pastel-green': '#B5D9B8',  // Different green
      'dark-green': '#4A6E46',    // Darker green
      'light-green': '#D4E7D9',   // Lighter accent
    },
  },
},
```

### Dark Mode Support

Update `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',  // Add this line
  // ... rest of config
}
```

Add a dark mode toggle component and update HTML elements:
```jsx
<div className="dark:bg-gray-900 dark:text-white">
  Content
</div>
```

### Custom Fonts

Edit `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

### Spacing & Sizing

Modify theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    spacing: {
      '128': '32rem',
    },
    fontSize: {
      'xxl': '1.75rem',
    },
  },
}
```

## 📝 Database Customization

### Add New Fields to Reviews

Edit `models/Review.js`:

```javascript
const reviewSchema = new mongoose.Schema({
  courseTitle: { /* ... */ },
  platform: { /* ... */ },
  
  // Add new fields:
  instructor: {
    type: String,
    trim: true,
  },
  courseUrl: {
    type: String,
    validate: {
      validator: (v) => !v || /^https?:\/\//.test(v),
      message: 'Must be valid URL'
    }
  },
  levelDifficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  },
  wouldRecommend: {
    type: Boolean,
    default: true,
  },
});
```

Update API route `/app/api/reviews/route.js` to handle new fields:

```javascript
export async function POST(request) {
  const body = await request.json();
  const { courseTitle, platform, instructor, courseUrl, wouldRecommend, /* ... */ } = body;
  
  // Validate and create
  const review = new Review({
    courseTitle,
    platform,
    instructor,
    courseUrl,
    wouldRecommend,
    // ...
  });
  
  await review.save();
  // ...
}
```

Update form component `/components/ReviewForm.js`:

```javascript
const [formData, setFormData] = useState({
  courseTitle: '',
  platform: 'Udemy',
  name: '',
  rating: 0,
  description: '',
  instructor: '',        // New field
  courseUrl: '',         // New field
  wouldRecommend: true,  // New field
});
```

## 🔧 Functional Features

### Add Review Sorting on Backend

Update `/app/api/reviews/route.js`:

```javascript
// Add to sort logic
switch (sort) {
  case 'price-high':
    sortObj = { price: -1 };
    break;
  case 'price-low':
    sortObj = { price: 1 };
    break;
  // ... more cases
}
```

### Add Review Categories/Tags

```javascript
// In Review model
tags: [{
  type: String,
  enum: ['Front-end', 'Backend', 'DevOps', 'AI/ML', 'Mobile', 'Other']
}]
```

### Add Review Helpfulness Voting

Create new file: `/app/api/reviews/[id]/helpful/route.js`:

```javascript
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';

export async function POST(request, { params }) {
  await connectDB();
  const review = await Review.findByIdAndUpdate(
    params.id,
    { $inc: { helpfulCount: 1 } },
    { new: true }
  );
  return NextResponse.json({ success: true, data: review });
}
```

Add field to model:
```javascript
helpfulCount: { type: Number, default: 0 }
```

### Add Comments to Reviews

Create `/models/Comment.js`:

```javascript
const commentSchema = new mongoose.Schema({
  reviewId: mongoose.Schema.Types.ObjectId,
  author: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
```

### Add Duplicate Review Detection

In API route:
```javascript
const exists = await Review.findOne({
  courseTitle: { $regex: courseTitle, $options: 'i' },
  platform,
  name
});

if (exists) {
  return NextResponse.json({
    success: false,
    error: 'Similar review already exists'
  }, { status: 409 });
}
```

## 🔐 Security Enhancements

### Hash Admin Password

Install bcryptjs:
```bash
npm install bcryptjs
```

In `lib/auth.js`:
```javascript
import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
```

### Add Rate Limiting

Install express-rate-limit for Next.js:
```bash
npm install ratelimit
```

In API route:
```javascript
const rateLimit = require('ratelimit');

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  tokensPerInterval: 5,
});

export async function POST(request) {
  const { success } = await limiter.removeTokens(1);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  // ... rest of code
}
```

### Add Input Sanitization

Install sanitize-html:
```bash
npm install sanitize-html
```

In API route:
```javascript
import sanitizeHtml from 'sanitize-html';

const cleanDescription = sanitizeHtml(description);
```

## 👥 User Management

### Add User Authentication

Install NextAuth.js:
```bash
npm install next-auth
```

Create `/app/api/auth/[...nextauth]/route.js` (see NextAuth docs for setup)

### Add User Profiles

Create `/models/User.js`:

```javascript
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  avatar: String,
  reviewsCount: Number,
  averageRating: Number,
  createdAt: { type: Date, default: Date.now }
});
```

Link reviews to users:
```javascript
// In Review model
userId: mongoose.Schema.Types.ObjectId,
```

## 📧 Notifications

### Add Email Notifications

Install nodemailer:
```bash
npm install nodemailer
```

Create `/lib/email.js`:

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function sendNotification(to, subject, html) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  });
}
```

### Add Push Notifications

Use Firebase Cloud Messaging (FCM) or OneSignal for browser notifications.

## 📊 Analytics

### Add Google Analytics

Add to `app/layout.js`:

```jsx
<Script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
<Script id="google-analytics">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
`}</Script>
```

### Add Detailed Stats Dashboard

Create `/app/admin/stats/page.js`:

```jsx
// Chart libraries: recharts, chart.js
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

export default function StatsPage() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch aggregated stats
    fetch('/api/stats').then(r => r.json()).then(d => setData(d));
  }, []);
  
  return (
    <BarChart data={data}>
      <XAxis />
      <YAxis />
      <Bar dataKey="count" fill="#A8D5BA" />
    </BarChart>
  );
}
```

## 🚀 Performance Optimization

### Add Caching

Use Next.js revalidate:

```javascript
export const revalidate = 300; // Cache for 5 minutes

export default async function ReviewsPage() {
  // This page is cached
  const reviews = await fetch('/api/reviews');
}
```

### Add Image Optimization

Use Next.js Image component:

```jsx
import Image from 'next/image';

<Image 
  src="/course.jpg" 
  alt="Course" 
  width={300} 
  height={200}
/>
```

### Add Database Indexes

In `/models/Review.js`:

```javascript
reviewSchema.index({ courseTitle: 'text' });
reviewSchema.index({ platform: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });
```

## 🧪 Testing

### Add Unit Tests

Install Jest:
```bash
npm install --save-dev jest @testing-library/react
```

Create `/components/ReviewCard.test.js`:

```javascript
import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';

describe('ReviewCard', () => {
  test('renders course title', () => {
    const review = {
      courseTitle: 'React 101',
      rating: 5,
      description: 'Great course!',
      name: 'John',
      createdAt: new Date()
    };
    
    render(<ReviewCard review={review} />);
    expect(screen.getByText('React 101')).toBeInTheDocument();
  });
});
```

## 📱 Mobile App Version

Create React Native version:

```bash
npx create-expo-app course-review-mobile
cd course-review-mobile
npm install @react-navigation/native
```

Use same backend API endpoints!

## 🌍 Internationalization (i18n)

Install next-i18next:

```bash
npm install next-i18next
```

This enables multi-language support.

## 📦 Deployment Variations

### Deploy to AWS

Create serverless application with AWS Lambda and RDS.

### Deploy to DigitalOcean

App Platform is a good alternative to Vercel.

### Docker Containerization

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

**Ready to customize? Start with colors and gradually add features! 🎨**
