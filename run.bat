@echo off
echo Starting UEFN Website Development Server...

:: Check if node_modules exists, if not, install dependencies
if not exist "node_modules\" (
    echo node_modules not found. Installing dependencies...
    call npm install
)

:: Start the development server and open the browser
:: Vite's --open flag automatically opens the default browser
echo Launching Vite...
call npm run dev -- --open

pause
