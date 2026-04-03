# Deployment Guide - Premium Todo App

## Quick Start: Deploy to Vercel

### Option 1: Deploy with Git (Recommended - Automated CI/CD)

This setup automatically deploys your app whenever you push to the `main` branch.

#### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Premium Todo App"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign up/login
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Connect your GitHub account and select your repository
5. Vercel will auto-detect this is a React/Vite project
6. Click **"Deploy"**

**That's it!** Your app is now live! 🎉

#### Step 3: Future Deployments (Automatic)

Every time you push to `main` branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically build and deploy your changes.

---

### Option 2: Manual Deploy to Vercel CLI

If you prefer using the command line:

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
vercel
```

Follow the prompts and your app will be deployed!

For production deployment:
```bash
vercel --prod
```

---

## Build Process

Before deployment, the project will:

```bash
npm install    # Install dependencies
npm run build  # Build optimized production files
```

The output goes to the `dist/` folder (~100KB gzipped).

---

## Environment Variables (If Needed)

Create a `.env.local` file in the project root (don't commit this to git):

```env
VITE_API_URL=https://api.example.com
```

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add your variables
3. Click Save and Redeploy

---

## GitHub Actions CI/CD

The `.github/workflows/deploy.yml` file automates:

✅ **On Every Push:**
- Install dependencies
- Run linter
- Build application
- Upload artifacts

✅ **On Push to Main:**
- Automatically deploy to Vercel production

**To enable GitHub Actions deployment:**

1. Get your Vercel secrets:
   ```bash
   vercel env pull
   ```

2. In GitHub:
   - Go to Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VERCEL_TOKEN` - Get from [Vercel Settings](https://vercel.com/account/tokens)
     - `VERCEL_ORG_ID` - Get from Vercel project settings
     - `VERCEL_PROJECT_ID` - Get from Vercel project settings

3. The workflow will trigger automatically on push to `main`

---

## Performance Tips

✨ **Your app is already optimized:**
- React 18 with suspense
- Tailwind CSS tree-shaking
- Vite code splitting
- Production bundle: ~100KB gzipped

---

## Custom Domain

In Vercel Dashboard:

1. Go to your project settings
2. Click **Domains**
3. Add your custom domain (e.g., `mytodoapp.com`)
4. Follow DNS configuration instructions

---

## Rollback Deployment

If something goes wrong:

1. Go to your Vercel project
2. Click **Deployments**
3. Find a previous version
4. Click the three dots (⋮) → **Promote to Production**

---

## Monitoring & Logs

### View Live Logs
```bash
vercel logs
```

### Vercel Analytics
- Visit Vercel Dashboard → Analytics
- See real-time traffic, errors, and performance metrics

---

## Alternative Platforms

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/todo-app/',  // your repo name
  ...
})
```

2. Deploy:
```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Development
npm run dev -- --port 3001
```

### localStorage Not Working
- Check browser DevTools → Application → Local Storage
- Verify not in private/incognito mode

---

## Next Steps

1. ✅ Deploy to Vercel (this guide)
2. 🔒 Add authentication (optional)
3. 📱 Add PWA support (offline functionality)
4. 🎨 Add more themes
5. 📊 Add analytics
6. 🔔 Add notifications

---

**Your app is now deployed! Share it with the world! 🚀**
