@echo off
set /p desc="Enter commit description: "
git add .
git commit -m "%desc%"
git push
pause
