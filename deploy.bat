@echo off
REM Deployment script for Windows - Deploy to Vercel

echo.
echo 🚀 Premium Todo App Deployment Script (Windows)
echo ================================================
echo.

REM Check if git repository exists
if not exist ".git" (
    echo 📦 Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit: Premium Todo App"
    echo ✅ Git initialized
) else (
    echo ✅ Git repository already initialized
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📥 Installing dependencies...
    call npm install
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

REM Build the project
echo.
echo 🔨 Building project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)
echo ✅ Project built successfully

REM Check if Vercel CLI is installed globally
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📥 Installing Vercel CLI globally...
    call npm install -g vercel
    echo ✅ Vercel CLI installed
) else (
    echo ✅ Vercel CLI already installed
)

echo.
echo 🚀 Ready to deploy!
echo.
echo Choose one option:
echo.
echo Option 1 (Recommended - GitHub Integration):
echo   1. Go to https://vercel.com/new
echo   2. Connect your GitHub repository
echo   3. Click "Deploy"
echo.
echo Option 2 (Vercel CLI):
echo   - Run: vercel --prod
echo.
echo Option 3 (This Script):
echo   - Run: deploy.bat after setting up GitHub
echo.
echo For more details, check DEPLOYMENT.md
echo.
pause
