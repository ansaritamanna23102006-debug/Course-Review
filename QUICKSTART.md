# CourseReview - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up MongoDB
Choose one:

**Option A: Local MongoDB**
```bash
# Install MongoDB locally, then start it
mongod
```

**Option B: MongoDB Atlas (Recommended for Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/course-review`)

### Step 3: Environment Variables
Update `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/course-review
# OR for Atlas: mongodb+srv://username:password@cluster.mongodb.net/course-review

ADMIN_PASSWORD=admin123secure
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Run Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Visit: http://localhost:3000

## 📖 What to Try First

1. **Home Page**: View analytics and featured reviews
2. **Add Review**: Submit your first course review
3. **Browse Reviews**: See all submitted reviews with filters
4. **Admin Dashboard**: 
   - Visit http://localhost:3000/admin
   - Password: `admin123secure`
   - View all reviews and manage them

## 🎯 Common Tasks

### Change Admin Password
Edit `.env.local`:
```env
ADMIN_PASSWORD=your_new_secure_password
```
Restart dev server.

### Connect to MongoDB Atlas
1. Create account at https://www.mongodb.com/cloud/atlas
2. Copy connection string
3. Update `MONGODB_URI` in `.env.local`

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Enter environment variables when prompted.

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB Connection Error | Check MongoDB is running, verify connection string |
| Admin password not working | Restart dev server after `.env.local` change |
| Tailwind CSS not applying | Clear cache: `rm -rf .next` and restart |
| Port 3000 in use | `npm run dev -- -p 3001` (use different port) |

## 📚 Project Features

- ✅ Add/browse/delete course reviews
- ✅ 5-star rating system
- ✅ Search and filter reviews
- ✅ Pagination support
- ✅ Admin dashboard (password protected)
- ✅ Analytics (total reviews, average rating)
- ✅ Responsive mobile design
- ✅ Form validation
- ✅ Toast notifications

## 🔑 Default Credentials

- **Admin Password**: `admin123secure`
- **Admin URL**: `/admin`

⚠️ Change password in production!

## 📚 API Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/reviews` | Get all reviews |
| POST | `/api/reviews` | Create review |
| DELETE | `/api/reviews/:id` | Delete review |

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```js
colors: {
  cream: '#FFFAF0',
  'pastel-green': '#A8D5BA',
  'dark-green': '#5B8C5A',
  'light-green': '#D4E7D9',
}
```

### Adjust Pagination
Edit `app/reviews/page.js` - change `limit` parameter in fetch URL.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 💡 Next Steps

1. ✅ Test all features locally
2. 📝 Review the README.md for complete documentation
3. 🔐 Change admin password
4. 🌐 Deploy to Vercel
5. 📊 Monitor analytics

Happy reviewing! 🎓
