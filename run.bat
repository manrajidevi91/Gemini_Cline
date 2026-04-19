@echo off
setlocal enabledelayedexpansion

echo.
echo ===================================================
echo   GEMINI-CLINE MONOREPO SETUP ^& INSTALLER
echo ===================================================
echo.

cd /d "%~dp0"

:: -------------------------------------------------------
:: Step 1: Install all monorepo dependencies
:: -------------------------------------------------------
echo [1/4] Installing Monorepo Dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm install failed. Check the output above.
    pause
    exit /b 1
)

:: -------------------------------------------------------
:: Step 2: Build the entire monorepo (CLI core + all packages)
::   This runs scripts/build.js which builds core first,
::   then all other workspaces in parallel (including our extension).
:: -------------------------------------------------------
echo [2/4] Building All Packages (CLI Backend + Extension Host)...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Root build had errors. Attempting extension-only build...
    cd packages\extension
    call npm run build
    cd ..\..
)

:: -------------------------------------------------------
:: Step 3: Build the Webview UI (React/Vite)
::   This is separate because it lives inside the extension
::   package and is NOT part of the monorepo workspace build.
:: -------------------------------------------------------
echo [3/4] Building Cline-inspired Webview UI...
cd packages\extension\webview-ui
call npm install
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Webview UI build failed. Check the output above.
    cd ..\..\..
    pause
    exit /b 1
)
cd ..\..\..

:: -------------------------------------------------------
:: Step 4: Package and install the VS Code extension
:: -------------------------------------------------------
echo [4/4] Packaging ^& Installing Extension...
cd packages\extension
call npx -y @vscode/vsce package --out gemini-cline.vsix
echo.
echo Setup complete. You can now install the extension from the .vsix file:
echo ^> code --install-extension packages\extension\gemini-cline.vsix
echo.
pause