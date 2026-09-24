; NSIS include file for KioskApp installer - Full Wizard with custom pages
; This file is included by electron-builder's NSIS target

!define LICENSE_FILE "${PROJECT_ROOT}\LICENSE.txt"

; Custom welcome text
!insertmacro !define MUI_PAGE_CUSTOM welcomePage
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_QUESTION
!insertmacro MUI_UNPAGE_DELETE

; Custom install pre-checks
!macro customInstallChecks
  !insertmacro checkInstallRights
!macroend

; Custom install section
!macro customInstall
  DetailPrint "Installing KioskApp..."
  DetailPrint "Installation directory: $INSTDIR"
!macroend

; Custom uninstall pre-checks
!macro customUnInstallChecks
  !insertmacro checkUninstallRights
!macroend

; Custom uninstall section
!macro customUnInstall
  DetailPrint "Uninstalling KioskApp..."
!macroend

; Welcome page customization
!macro welcomePage
  !insertmacro MUI_HEADER_TEXT "KioskApp Setup" "Install Wizard"
  nsDialogs::Create 1018
  Pop $0
  ${If} $0 == error
    Abort
  ${EndIf}

  ${NSD_Create_Label} 0 0 100% 48u "Welcome to the KioskApp Setup Wizard!"
  Pop $1
  ${NSD_SetText} $1 "This wizard will guide you through the installation of KioskApp - a kiosk application for Windows."

  ${NSD_Create_Label} 40u 56u 100% 12u "Version: 1.0.0"
  Pop $2

  nsDialogs::Show
!macroend
