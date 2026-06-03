@echo off
setlocal
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo Git is not installed or not in PATH.
  echo Please install Git for Windows first:
  echo https://git-scm.com/download/win
  pause
  exit /b 1
)

if not exist ".git" (
  git init
)

git add .
git commit -m "init zhongtang school website"
git branch -M main

echo.
echo If you already created the GitHub repository, run:
echo git remote add origin https://github.com/YOUR_USERNAME/zt_website.git
echo git push -u origin main
echo.
pause
