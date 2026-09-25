@echo off
setlocal

echo ===========================================
echo Fast Order - APK Installer Build Script
echo ===========================================

cd /d "%~dp0\android"

echo [1/3] Generating signing key from keystore.properties...

set KEYSTORE_PROPS=%~dp0\android\app\keystore.properties

if not exist "%KEYSTORE_PROPS%" (
    echo WARNING: keystore.properties not found.
    echo Please create app\keystore.properties with your signing credentials.
    copy /b app\keystore.properties app\keystore.properties.template >nul
    echo Created template at app\keystore.properties.template
    echo.
    echo Run this script again after filling in your signing credentials.
    exit /b 1
)

for /f "tokens=*" %%i in ('type "%KEYSTORE_PROPS%" ^| findstr "="') do (
    set %%i
)

echo storeFile=%storeFile%
echo storePassword=***
echo keyAlias=%keyAlias%
echo keyPassword=***

if not exist "app\%storeFile%" (
    echo.
    echo [2/3] Generating release keystore: app\%storeFile%
    keytool -genkeypair -v ^
        -keystore "app\%storeFile%" ^
        -storepass %storePassword% ^
        -keypass %keyPassword% ^
        -alias %keyAlias% ^
        -keyalg RSA -keysize 2048 -validity 10000 ^
        -dname "CN=Fast Order, OU=FastOrder, O=Example, L=City, ST=State, C=US"
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Key generation failed. Do you have Java JDK installed?
        exit /b 1
    )
)

echo.
echo [3/3] Building signed release APK...
call gradlew assembleRelease -PstoreFile=%storeFile% -PstorePassword=%storePassword% -PkeyAlias=%keyAlias% -PkeyPassword=%keyPassword%
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: APK build failed
    exit /b 1
)

echo.
echo APK created at: app\build\outputs\apk\release\app-release.apk
dir /s /b app\build\outputs\apk\release\*.apk

echo.
echo Done! You can install app-release.apk on your tablet.

endlocal
