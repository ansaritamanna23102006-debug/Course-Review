# CourseReview - Full-Stack Course Review System

A modern, full-stack web application built with **Next.js (App Router)**, **MongoDB**, and **Tailwind CSS** for sharing and discovering course reviews.

## 🎯 Features

- ✅ **Modern UI** - Cream background + pastel green theme, fully responsive
- ✅ **User Reviews** - Submit reviews with ratings, platform selection, and descriptions
- ✅ **Review Discovery** - Browse, filter, sort, and search all reviews
- ✅ **Admin Dashboard** - Manage reviews with password-protected authentication
- ✅ **Analytics** - Display total reviews and average ratings
- ✅ **Pagination** - Efficient review browsing with page navigation
- ✅ **Form Validation** - Client-side and server-side validation
- ✅ **Toast Notifications** - Success/error feedback messages
- ✅ **Loading States** - Spinners for async operations
- ✅ **Star Rating Component** - Interactive 5-star rating system
- ✅ **Search & Filter** - Filter by rating, search by course title, sort reviews
- ✅ **Responsive Design** - Mobile-first approach, works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React 18+, Tailwind CSS
- **Backend**: Next.js API Routes (Route Handlers)
- **Database**: MongoDB + Mongoose
- **Language**: JavaScript
- **Styling**: Tailwind CSS with custom theme colors
- **Deployment**: Vercel-ready

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB (local or cloud - e.g., MongoDB Atlas)
- npm or yarn package manager

### 1. Clone and Install Dependencies

```bash
cd course-review
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/course-review
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-review

# Admin password for dashboard
ADMIN_PASSWORD=admin123secure

# App configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Update these values:
- `MONGODB_URI` - Your MongoDB connection string
- `ADMIN_PASSWORD` - Set a secure password for admin access (change from default)

### 3. Start MongoDB (if using local)

```bash
mongod
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at **http://localhost:3000**

## 🚀 Building for Production

```bash
npm run build
npm start
```

## 📱 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with analytics and featured reviews
- **Add Review** (`/add-review`) - Form to submit new reviews
- **All Reviews** (`/reviews`) - Browse all reviews with filtering and pagination

### Admin Page
- **Admin Dashboard** (`/admin`) - Password-protected admin panel
  - View all reviews in a table format
  - Delete reviews
  - Search and filter reviews
  - Default password: `admin123secure`

## 📋 API Routes

### Reviews API

#### GET `/api/reviews`
Fetch reviews with pagination, filtering, and sorting

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `rating` - Filter by rating (1-5)
- `search` - Search by course title
- `sort` - Sort by: `latest`, `oldest`, `highest`, `lowest`

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "current": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  },
  "analytics": {
    "totalReviews": 50,
    "averageRating": 4.5
  }
}
```

#### POST `/api/reviews`
Create a new review

**Request Body:**
```json
{
  "courseTitle": "React Fundamentals",
  "platform": "Udemy",
  "name": "John Doe",
  "rating": 5,
  "description": "Great course, highly recommended!"
}
```

#### DELETE `/api/reviews/:id`
Delete a review (requires admin password)

**Request Body:**
```json
{
  "adminPassword": "admin123secure"
}
```

## 📁 Project Structure

```
course-review/
├── app/
│   ├── api/
│   │   └── reviews/
│   │       ├── route.js           # GET & POST reviews
│   │       └── [id]/
│   │           └── route.js       # DELETE review
│   ├── add-review/
│   │   └── page.js               # Add review page
│   ├── reviews/
│   │   └── page.js               # All reviews page
│   ├── admin/
│   │   └── page.js               # Admin dashboard
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── Header.js                 # Navigation header
│   ├── Footer.js                 # Footer
│   ├── ReviewForm.js             # Review submission form
│   ├── ReviewCard.js             # Review display card
│   ├── StarRating.js             # Interactive star rating
│   ├── Pagination.js             # Pagination controls
│   ├── AdminTable.js             # Admin review table
│   ├── Toast.js                  # Notification toast
│   └── LoadingSpinner.js         # Loading indicator
├── lib/
│   └── db.js                     # MongoDB connection utility
├── models/
│   └── Review.js                 # Review Mongoose schema
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── jsconfig.json
```

## 🎨 UI Theme

### Color Palette
- **Cream**: `#FFFAF0` (Background)
- **Pastel Green**: `#A8D5BA` (Primary accent)
- **Dark Green**: `#5B8C5A` (Text/contrast)
- **Light Green**: `#D4E7D9` (Secondary accent)

### Design Features
- Clean, modern interface
- Soft shadows and rounded corners
- Responsive grid layouts
- Interactive hover states
- Smooth transitions

## 🔐 Security Notes

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Admin Password**: Change the default password in production
3. **Password Hashing**: For production, consider hashing the admin password
4. **CORS**: Configure CORS if frontend and backend are on different domains
5. **Rate Limiting**: Consider adding rate limiting to API routes for production

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel settings:
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
4. Deploy automatically

### Deploy to Other Platforms

Ensure Node.js 18+ is available and environment variables are set properly.

## 📝 Development Tips

### Running Tests
```bash
# Add testing setup with Jest for production
npm install --save-dev jest @testing-library/react
```

### Code Quality
- Components follow React best practices
- Props are validated through function signatures
- Comments explain complex logic
- Error handling is implemented throughout

### Database Tips
- Use MongoDB Atlas for cloud hosting (free tier available)
- Regular backups recommended
- Indexes on frequently queried fields for performance

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running
- Check connection string in `.env.local`
- Ensure network access is allowed (for MongoDB Atlas)

### Tailwind CSS Not Applying
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run dev`

### Admin Login Not Working
- Verify `ADMIN_PASSWORD` is set in `.env.local`
- Default password is `admin123secure`
- Restart dev server after changing `.env.local`

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## 📄 License

MIT License - Feel free to use this project for learning and personal use.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using Next.js, MongoDB, and Tailwind CSS**
