# 🚀 Vercel Deployment Guide - MeetSync

## Quick Deploy to Vercel (5 minutes)

### Step 1: Prepare Your Repository

1. **Commit all changes:**
```bash
git add .
git commit -m "Ready for deployment"
```

2. **Push to GitHub:**
```bash
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub account
   - Find "zoomApp-clone" repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next
   - **Install Command:** `npm install`

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STREAM_API_KEY=...
   STREAM_SECRET_KEY=...
   NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
   ```
   ⚠️ **Important:** Update `NEXT_PUBLIC_BASE_URL` after first deploy

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

#### Option B: Using Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? meetsync
# - In which directory is your code located? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### Step 3: Update Clerk Settings

1. **Go to Clerk Dashboard:**
   - Visit https://dashboard.clerk.com
   - Select your application

2. **Add Production Domain:**
   - Go to "Domains" section
   - Add your Vercel URL: `https://your-app.vercel.app`
   - Save changes

3. **Update Environment Variables:**
   - Note down production API keys
   - Update in Vercel if needed

### Step 4: Update Stream Settings

1. **Go to Stream Dashboard:**
   - Visit https://dashboard.getstream.io
   - Select your application

2. **Add Domain to Allowed Origins:**
   - Go to Settings
   - Add: `https://your-app.vercel.app`
   - Save changes

### Step 5: Update BASE_URL

1. **In Vercel Dashboard:**
   - Go to Project Settings
   - Click "Environment Variables"
   - Update `NEXT_PUBLIC_BASE_URL` to your Vercel URL
   - Redeploy (automatic)

### Step 6: Test Your Production App

✅ **Test Checklist:**
- [ ] Visit your Vercel URL
- [ ] Sign up/Sign in works
- [ ] Create a meeting
- [ ] Join a meeting
- [ ] Video/audio works
- [ ] Screen sharing works
- [ ] All features functional

## 🔄 Continuous Deployment

### Automatic Deployments
Every push to GitHub automatically triggers a new deployment:

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main
# Vercel automatically deploys! 🚀
```

### Preview Deployments
Every pull request gets its own preview URL:
- Create branch → Push → Open PR → Get preview link
- Test before merging to main

## 🎯 Custom Domain (Optional)

### Add Your Own Domain

1. **Buy a domain** (GoDaddy, Namecheap, etc.)

2. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `meetsync.com`)

3. **Configure DNS:**
   Vercel shows you what DNS records to add:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Update Environment Variables:**
   ```
   NEXT_PUBLIC_BASE_URL=https://meetsync.com
   ```

5. **Update Clerk & Stream:**
   - Add custom domain to both dashboards
   - Remove vercel.app domain if desired

## 🔧 Troubleshooting

### Build Fails
```bash
# Check build logs in Vercel dashboard
# Common fixes:

# 1. TypeScript errors
npm run build  # Test locally first

# 2. Missing environment variables
# Add all required vars in Vercel dashboard

# 3. Node version
# Add to package.json:
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Environment Variables Not Working
- Make sure they start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding/changing variables
- Check spelling and no extra spaces

### Video/Auth Not Working
- Verify domain is added in Clerk dashboard
- Verify domain is added in Stream dashboard
- Check CORS settings
- Clear browser cache

## 📊 Monitoring

### Vercel Dashboard
- **Analytics:** View traffic and performance
- **Logs:** Check function logs and errors
- **Speed Insights:** Monitor page load times
- **Usage:** Track bandwidth and function executions

### Free Tier Limits
- ✅ 100 GB bandwidth/month
- ✅ 100 hours serverless function execution
- ✅ Unlimited deployments
- ✅ Automatic SSL
- ✅ Global CDN

## 🎉 You're Live!

Your MeetSync app is now:
- ✅ Hosted on Vercel
- ✅ Accessible worldwide
- ✅ HTTPS enabled
- ✅ Auto-deploying on push
- ✅ Production ready

**Share your link:**
`https://your-app.vercel.app`

---

## Next Steps

1. **Share with users** 📱
2. **Monitor performance** 📊
3. **Add custom domain** 🌐
4. **Enable analytics** 📈
5. **Scale as needed** 🚀
