#!/bin/bash
# Deployment script for easy deployment to Vercel

set -e

echo "🚀 Premium Todo App Deployment Script"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Premium Todo App"
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI already installed"
fi

# Build the project
echo ""
echo "🔨 Building project..."
npm run build
echo "✅ Project built successfully"

# Deploy to Vercel
echo ""
echo "🚀 Deploying to Vercel..."
echo ""
echo "Instructions:"
echo "1. Visit https://vercel.com/new"
echo "2. Connect your GitHub repository"
echo "3. Or run: vercel --prod"
echo ""
echo "For more info, check DEPLOYMENT.md"
