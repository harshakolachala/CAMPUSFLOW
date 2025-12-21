@echo off
title CAMPUSFLOW Launcher
echo ==========================================
echo      Starting CAMPUSFLOW System
echo ==========================================
echo.

:: 1. Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [CRITICAL ERROR] Node.js is NOT installed.
    echo.
    echo You MUST install Node.js to run this application.
    echo 1. Download from: https://nodejs.org/
    echo 2. Install (Check "Add to PATH")
    echo 3. Restart this script.
    echo.
    pause
    exit /b
)

echo [V] Node.js detected.

:: 2. Start Server (Backend) in a new window
echo.
echo Launching Server...
start "CAMPUSFLOW Server" cmd /k "cd server && echo Installing Server Dependencies... && npm install && echo Setting up Database... && npx prisma db push && echo Starting Server... && npm run dev"

:: 3. Start Client (Frontend) in a new window
echo.
echo Launching Client...
start "CAMPUSFLOW Client" cmd /k "cd client && echo Installing Client Dependencies... && npm install && echo Starting Frontend... && npm run dev"

echo.
echo ==========================================
echo Startup Initiated!
echo.
echo 1. A 'Server' window will open. Wait for 'Server running at http://localhost:3000'
echo 2. A 'Client' window will open. It will launch your browser at http://localhost:5173
echo.
echo If the windows close immediately, there was an error (usually missing Node.js).
echo ==========================================
pause
