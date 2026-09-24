@echo off
setlocal

echo ===========================================
echo KioskApp - Windows Installer Build Wizard
echo ===========================================

cd /d "%~dp0"

echo [1/4] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed
    exit /b 1
)

echo [2/4] Building Electron application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed
    exit /b 1
)

echo [3/4] Installer creation complete.
echo Output location: dist\
dir /s /b dist\*.exe

echo [4/4] Done!
echo.
echo The Windows installer (.exe) has been created.
echo Run setup-kiosk-app-1.0.0.exe to install on any Windows PC.

endlocal
