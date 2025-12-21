@echo off
echo ==========================================
echo   CAMPUSFLOW Environment Check
echo ==========================================
echo.

echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js is NOT installed or not in PATH.
    echo     Please download and install it from: https://nodejs.org/
    echo     Recommended version: 18.x or higher (LTS)
) else (
    echo [V] Node.js is installed: 
    node --version
)

echo.
echo Checking for NPM...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] NPM is NOT installed.
) else (
    echo [V] NPM is installed: 
    npm --version
)

echo.
echo ==========================================
echo If you see [X] above, you need to install Node.js.
echo After installation, RESTART your terminal/IDE.
echo ==========================================
pause
