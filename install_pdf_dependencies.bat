@echo off
echo ==========================================
echo   Installing PDF Processing Dependencies
echo ==========================================
echo.

echo Installing server dependencies...
cd server
npm install multer pdf-parse natural compromise @types/multer
echo.

echo Server dependencies installed successfully!
echo.

echo ==========================================
echo Installation complete!
echo.
echo You can now use the Mind Map Helper feature
echo to process real PDF files and generate
echo interactive mind maps.
echo ==========================================
pause