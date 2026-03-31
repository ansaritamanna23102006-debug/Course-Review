# Deployment Guide - CourseReview

## 🚀 Deploy to Vercel (Recommended)

Vercel is the optimal platform for Next.js applications.

### Prerequisites
- GitHub account
- MongoDB Atlas account (free tier available)
- Vercel account

### Step 1: Prepare MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Create a database user with username and password
5. Whitelist your IP (or allow all from 0.0.0.0/0 for development)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/course-review`)

### Step 2: Push Code to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: CourseReview application"
```

2. Create repository on GitHub and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/course-review.git
git branch -M main
git push -u origin main
```

### Step 3: Create Vercel Project

1. Go to https://vercel.com
2. Sign up (use GitHub account)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (default)

### Step 4: Add Environment Variables

In Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add the following variables:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/course-review
```

Replace with your actual MongoDB Atlas connection string.

```
ADMIN_PASSWORD = your_secure_password_here
```

Change this to a strong password!

```
NEXT_PUBLIC_APP_URL = https://your-vercel-url.vercel.app
```

**Important**: 
- ✅ `MONGODB_URI` - Keep it secret
- ⚠️ `ADMIN_PASSWORD` - Use a strong password
- ⚠️ `NEXT_PUBLIC_*` - Accessible in browser, use for non-sensitive data

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Visit your live URL (shown on success page)

Your app is now live! 🎉

## 🔄 Continuous Deployment

Any push to your main branch automatically triggers a new deployment:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Wait for Vercel to automatically build and deploy.

## 📊 Vercel Analytics & Monitoring

1. **Performance**: Analytics tab shows speed metrics
2. **Deployments**: Deployment history and rollback options
3. **Functions**: Serverless function monitoring
4. **Logs**: Real-time application logs

## 🔐 Security Best Practices

1. **Never commit `.env.local`**: Already in `.gitignore`
2. **Strong admin password**: Use at least 16 characters
3. **MongoDB Atlas Network**: 
   - Restrict IP access OR
   - Use VPC peering for production
4. **Rate Limiting**: Add to production API routes:

```javascript
// Example: Add to route.js
const RATE_LIMIT = 10; // requests per minute
const store = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const limit = store.get(ip) || [];
  const recent = limit.filter(t => now - t < 60000);
  if (recent.length >= RATE_LIMIT) return false;
  recent.push(now);
  store.set(ip, recent);
  return true;
}
```

## 🆘 Troubleshooting

### Build Fails
1. Check build logs in Vercel dashboard
2. Verify `package.json` has all dependencies
3. Test locally: `npm run build`

### MongoDB Connection Error
```
MongoServerError: connect ECONNREFUSED
```
- Verify `MONGODB_URI` in Vercel environment variables
- Check MongoDB Atlas IP whitelist
- Ensure cluster is running

### Admin Dashboard Not Working
- Verify `ADMIN_PASSWORD` environment variable is set
- Check browser console for errors
- Restart deployment: Go to Deployments → click latest → "Redeploy"

### Reviews Not Displaying
- Check MongoDB connection
- Verify database is created and has data
- Check browser DevTools Network tab for API errors

## 📈 Monitoring & Scaling

### View Logs
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Click latest deployment
4. View real-time logs

### Pro Tier Features (if needed)
- Analytics Pro
- More bandwidth
- Priority support
- Database integrations

## 💰 Cost Estimation

**Free Vercel Plan**:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions

**MongoDB Atlas Free Tier**:
- ✅ 512MB storage
- ✅ Shared cluster
- ✅ 3 nodes replica set

*Perfect for learning and small projects!*

## 🎓 Next Steps

1. ✅ Visit your live URL
2. 🧪 Test all features in production
3. 📝 Collect feedback
4. 🔐 Monitor logs regularly
5. 📊 Track analytics
6. 🚀 Scale as needed

## 🤝 Custom Domain

1. Go to Vercel → Project Settings → Domains
2. Add custom domain
3. Update DNS records (instructions provided)
4. Wait for SSL certificate (automatic)

---

**Your CourseReview app is officially deployed! 🎉**

Questions? Check [Vercel Documentation](https://vercel.com/docs) or [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
