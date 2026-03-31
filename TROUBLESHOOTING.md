# CourseReview - FAQ & Troubleshooting

Common questions and solutions for CourseReview.

## 📱 Installation & Setup

### Q: "npm install" fails with dependencies error
**A**: Try clearing npm cache and reinstalling:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Q: MongoDB connection times out
**A**: 
- For local MongoDB: Ensure `mongod` is running
- For MongoDB Atlas: 
  - Verify connection string is correct
  - Check cluster is running
  - Whitelist your IP address in Atlas (0.0.0.0/0 for development)
  - Check network connectivity

### Q: "Cannot find module '@/lib/db'"
**A**: Ensure `jsconfig.json` has correct path aliases:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Q: Port 3000 is already in use
**A**: Run on different port:
```bash
npm run dev -- -p 3001
```
Or kill process on port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

---

## 🗄️ Database Issues

### Q: "MongoServerError: connect ECONNREFUSED"
**A**: 
1. Check MongoDB is running
2. Verify `MONGODB_URI` in `.env.local`
3. Check connection string format:
   ```
   mongodb://localhost:27017/course-review
   # OR
   mongodb+srv://user:pass@cluster.mongodb.net/course-review
   ```

### Q: "MongooseServerSelectionError"
**A**: MongoDB Atlas issues:
1. Check cluster is deployed (not paused)
2. Verify network access: Atlas → Network Access → add your IP
3. Verify database user credentials
4. Check database name in connection string

### Q: "ValidationError: Path `rating` is required"
**A**: 
- Review data is invalid
- Check API request includes `rating` field
- Rating must be number 1-5

### Q: Reviews are not persisting
**A**:
1. Verify MongoDB connection: Check browser console errors
2. Check database exists in MongoDB
3. Verify Mongoose model: `/models/Review.js`
4. Check write permissions on database

### Q: MongoDB is running but app can't connect
**A**: Check:
```bash
# MongoDB connection test
mongo mongodb://localhost:27017/course-review
# Should connect successfully
```

---

## 🎨 UI/Styling Issues

### Q: Tailwind CSS classes not applied
**A**:
1. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```
2. Verify `tailwind.config.js` content paths:
   ```js
   content: [
     './app/**/*.{js,ts,jsx,tsx,mdx}',
     './components/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   ```
3. Check spelling of Tailwind classes

### Q: Custom colors (cream, pastel-green) not working
**A**: Verify `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      cream: '#FFFAF0',
      'pastel-green': '#A8D5BA',
      'dark-green': '#5B8C5A',
      'light-green': '#D4E7D9',
    },
  },
}
```

### Q: Mobile layout looks broken
**A**: 
1. Check responsive classes: `md:`, `lg:` prefixes
2. Use Chrome DevTools mobile view
3. Clear browser cache
4. Verify viewport meta tag in layout

### Q: Fonts look wrong
**A**: 
1. Clear browser cache with hard refresh: `Ctrl+Shift+R`
2. Check if custom fonts are loaded (if added)
3. Verify `globals.css` settings

---

## 🔐 Authentication & Admin Issues

### Q: Admin login always fails
**A**:
1. Verify `.env.local` has `ADMIN_PASSWORD` set:
   ```env
   ADMIN_PASSWORD=admin123secure
   ```
2. Restart dev server after changing `.env.local`
3. Check password matches exactly (case-sensitive)
4. Try default: `admin123secure`

### Q: Admin password not updating
**A**: Environment variables require server restart:
1. Stop dev server: `Ctrl+C`
2. Edit `.env.local`
3. Run: `npm run dev`

### Q: Can access home page but admin redirects
**A**: Password verification issue:
1. Check admin password in `.env.local`
2. Ensure no extra spaces in password
3. Clear browser cookies/cache
4. Try incognito mode

---

## 📝 Form & Submission Issues

### Q: Form submission hangs (never completes)
**A**:
1. Check MongoDB connection
2. Check API route `/app/api/reviews/route.js` is correct
3. Verify network tab in DevTools for API errors
4. Check server console for errors

### Q: "Course title required" error but field has text
**A**: 
1. Validation might be checking *trimmed* value
2. Form state might not be updating
3. Check ReviewForm component state handling

### Q: Form data not saving to database
**A**:
1. Check MongoDB connection working
2. Verify all required fields are provided
3. Check validation rules in `/models/Review.js`
4. Look at server logs for errors

### Q: Can't submit review - form won't validate
**A**: Check form validation in `ReviewForm.js`:
- Course Title: required, 1-200 chars
- Platform: must select one
- Rating: must select 1-5
- Description: required, 10-1000 chars

---

## 📊 Data & Analytics Issues

### Q: Total reviews count is wrong
**A**:
1. Check MongoDB has correct data
2. Verify query filters in GET API
3. Check if some reviews were manually deleted from DB

### Q: Average rating calculation is off
**A**:
1. Formula in API: `$avg: '$rating'`
2. Verify all reviews have rating field
3. Check MongoDB aggregation in `/app/api/reviews/route.js`

### Q: Reviews not showing in list
**A**:
1. Check API returns data: `/api/reviews` in browser
2. Verify component is fetching data
3. Check filters aren't hiding all reviews
4. Look at browser console for errors

---

## 🔍 Search & Filter Issues

### Q: Search doesn't work
**A**:
1. Verify search query is being sent to API
2. Check API handles search parameter
3. Database might need text index: 
   ```javascript
   // In Review.js
   reviewSchema.index({ courseTitle: 'text' });
   ```

### Q: Rating filter shows no results
**A**:
1. Check reviews exist with that rating
2. Verify filter is sending number, not string
3. Check API correctly filters by rating

### Q: Sorting doesn't work
**A**:
1. Check sort parameter value is valid
2. Valid values: latest, oldest, highest, lowest
3. Verify API sorts correctly in `/route.js`

---

## 🔄 Pagination Issues

### Q: Pagination buttons don't work
**A**:
1. Check page number is updating in state
2. Verify API returns pagination data
3. Check `Pagination.js` component logic

### Q: "pages: 0" or "pages: NaN"
**A**: 
- Math.ceil() error likely
- Check total and limit values
- Formula: `pages = Math.ceil(total / limit)`

### Q: Stuck on page 1
**A**:
1. setPage() might not be updating
2. Check useEffect dependencies
3. Verify API pagination parameters

---

## 🚀 Performance Issues

### Q: App is very slow
**A**:
1. Check MongoDB query performance
2. Add database indexes (see CUSTOMIZATION.md)
3. Check DevTools Network tab for slow requests
4. Reduce `limit` parameter for fewer items

### Q: API takes 5+ seconds to respond
**A**:
1. MongoDB Atlas cluster might be sleeping (upgrade to paid)
2. Network latency (try different region)
3. Too much data being loaded
4. Check server logs for slow queries

---

## 🌐 Deployment Issues

### Q: App works locally but not on Vercel
**A**:
1. Verify all environment variables are set in Vercel
2. Check MongoDB Atlas whitelist includes Vercel IP (0.0.0.0/0)
3. Check logs in Vercel dashboard
4. Verify build succeeds: see build logs

### Q: "Cannot find module" error on Vercel
**A**:
1. Ensure all imports use correct paths
2. Check `.gitignore` doesn't exclude needed files
3. Verify `package.json` has all dependencies
4. Run `npm run build` locally to test

### Q: Database connection fails on Vercel
**A**:
1. Check `MONGODB_URI` is set in Vercel Environment Variables
2. MongoDB Atlas: whitelist 0.0.0.0/0 or Vercel IP ranges
3. Verify connection string format
4. Check database exists and is accessible

### Q: Form doesn't work on Vercel
**A**:
1. Check API route is deployed: POST to API endpoint in browser
2. Verify environment variables include `ADMIN_PASSWORD`
3. CORS might be issue: check headers
4. Check Vercel function logs for errors

---

## 🆘 Browser Console Errors

### Q: "Uncaught SyntaxError: Unexpected token"
**A**: 
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Hard refresh: `Ctrl+Shift+R`
3. Check for JavaScript errors in build

### Q: "TypeError: Cannot read property 'map' of undefined"
**A**:
1. State variable is undefined
2. Check API response structure
3. Add null check: `reviews?.map()`

### Q: "SyntaxError: JSON.parse: unexpected character"
**A**:
1. API returned non-JSON response
2. Check API response format
3. Look at Network tab to see actual response

---

## 🐛 Development Tips

### Enable Debugging

```javascript
// In any file
console.log('Debug:', variable);

// Check API request/response
fetch('/api/reviews')
  .then(r => {
    console.log('Status:', r.status);
    return r.json();
  })
  .then(d => console.log('Data:', d));
```

### View MongoDB Data

```bash
# Connect to MongoDB
mongo

# Switch database
use course-review

# View collections
show collections

# View reviews
db.reviews.find().pretty()

# Count reviews
db.reviews.count()
```

### Check Environment Variables

```javascript
// In API route
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('ADMIN_PASSWORD set:', !!process.env.ADMIN_PASSWORD);
```

---

## 📞 Still Need Help?

1. **Check README.md** - Basic setup
2. **Check QUICKSTART.md** - Quick reference
3. **Check API_REFERENCE.md** - API endpoints
4. **Check CUSTOMIZATION.md** - How to extend
5. **Check code comments** - Inline documentation

### Common File Locations

- Database connection: `[lib/db.js](lib/db.js)`
- Review model: `[models/Review.js](models/Review.js)`
- API routes: `[app/api/](app/api/)`
- Components: `[components/](components/)`
- Styling: `[app/globals.css](app/globals.css)`

---

## ✅ Checklist for Troubleshooting

- [ ] Checked `.env.local` is set correctly
- [ ] Verified MongoDB is running/accessible
- [ ] Cleared `.next` cache: `rm -rf .next`
- [ ] Restarted dev server: `npm run dev`
- [ ] Cleared browser cache: hard refresh
- [ ] Checked browser console for errors
- [ ] Checked server console/terminal for errors
- [ ] Verified all required fields in forms
- [ ] Tested with sample data
- [ ] Checked Network tab in DevTools

---

**Still stuck? Check the code comments in the files - they explain the logic! 💡**
