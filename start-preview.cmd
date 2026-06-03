@echo off
set "ROOT=%~dp0"
set "NODE_DIR=D:\网站制作\.tools\node-v22.16.0-win-x64"
set "PATH=%NODE_DIR%;%PATH%"

if not exist "%ROOT%logs" mkdir "%ROOT%logs"
if not exist "%ROOT%.env" copy "%ROOT%.env.example" "%ROOT%.env" >nul

start "zt-api" /min /D "%ROOT%" "%ComSpec%" /c ""%NODE_DIR%\npm.cmd" run server >> "%ROOT%logs\server.log" 2>> "%ROOT%logs\server.err.log""
start "zt-vite" /min /D "%ROOT%" "%ComSpec%" /c ""%NODE_DIR%\npm.cmd" run dev >> "%ROOT%logs\vite.log" 2>> "%ROOT%logs\vite.err.log""

echo Preview started:
echo   http://127.0.0.1:5510
echo.
pause
