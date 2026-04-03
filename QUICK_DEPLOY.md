# 🚀 Quick Deployment Commands

## Vercel (Recommended)

### Setup
```bash
npm install -g vercel
vercel login
```

### Deploy to Staging
```bash
vercel
```

### Deploy to Production
```bash
vercel --prod
```

### View Logs
```bash
vercel logs
```

---

## Git Setup (Required First)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Premium Todo App"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## GitHub-Vercel Integration (Best for CI/CD)

1. Push to GitHub (above)
2. Go to https://vercel.com/new
3. Click "Import Git Repository"
4. Select your repo
5. Click "Deploy"
6. Every push to `main` = automatic deployment ✨

---

## Docker Deployment

### Build locally
```bash
docker build -t todo-app .
```

### Run locally
```bash
docker run -p 3000:3000 todo-app
```

### View running container
```bash
docker ps
docker logs -f <container-id>
```

### Stop container
```bash
docker stop <container-id>
```

### Docker Compose
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

---

## Netlify

### Install CLI
```bash
npm install -g netlify-cli
```

### Login
```bash
netlify login
```

### Deploy
```bash
netlify deploy --prod --dir=dist
```

---

## Manual Build & Deploy

### Build
```bash
npm install
npm run build
```

Output folder: `dist/`

### Upload to any host
- Get your built files from `dist/` folder
- Upload to your hosting provider
- Set root to `dist/`
- That's it!

---

## GitHub Pages

```bash
# Build
npm run build

# Add dist to git
git add dist -f

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git subtree push --prefix dist origin gh-pages

# Your site: https://YOUR_USERNAME.github.io/REPO_NAME
```

---

## Environment Variables

### Local Development
Create `.env.local`:
```env
VITE_API_URL=http://localhost:3000
```

### Vercel Dashboard
1. Project Settings
2. Environment Variables
3. Add variables
4. Redeploy

---

## Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build locally
npm run preview

# Lint
npm run lint

# Format code
npx prettier --write src/

# Type check
tsc --noEmit
```

---

## Common Issues & Fixes

### Build fails
```bash
rm -rf node_modules dist package-lock.json
npm install
npm run build
```

### Port 3000 in use
```bash
npm run dev -- --port 3001
```

### Git branch issues
```bash
# Rename to main
git branch -M main
git push -u origin main
```

---

💡 **Pro Tip:** Use Vercel + GitHub for completely automated deployments!

Check `DEPLOYMENT.md` for detailed guide.
