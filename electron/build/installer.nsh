; Fast Order Installer - Full wizard page for Change / Repair / Remove

!addincludedir "${NSISDIR}\Include"
!include "nsDialogs.nsh"

Var changeBtn
Var repairBtn
Var removeBtn

Page custom foMaintPage foMaintSkip

Function foMaintSkip
  ReadRegStr $0 HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}" "DisplayVersion"
  StrCmp $0 "${VERSION}" +2
  Abort
FunctionEnd

Function foMaintPage
  nsDialogs::Create 1018
  Pop $0

  ${NSD_CreateLabel} 0 0 100% 24u "Change, repair, or remove installation"
  Pop $1
  CreateFont $2 "Segoe UI" 13 700
  SendMessage $1 ${WM_SETFONT} $2 0

  ${NSD_CreateLabel} 0 28u 100% 16u "Select the operation you wish to perform."
  Pop $3

  ${NSD_CreateRadioButton} 0 60u 100% 18u "Change"
  Pop $changeBtn

  ${NSD_CreateLabel} 24u 80u 100% 14u "Reinstall Fast Order with the current version."
  Pop $3

  ${NSD_CreateRadioButton} 0 108u 100% 18u "Repair"
  Pop $repairBtn

  ${NSD_CreateLabel} 24u 128u 100% 14u "Repair installation errors and fix broken files."
  Pop $3

  ${NSD_CreateRadioButton} 0 156u 100% 18u "Remove"
  Pop $removeBtn

  ${NSD_CreateLabel} 24u 176u 100% 14u "Removes Fast Order from your computer."
  Pop $3

  ${NSD_Check} $changeBtn

  nsDialogs::Show
FunctionEnd

!macro customInstall
  ReadRegStr $0 HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}" "DisplayVersion"
  StrCmp $0 "${VERSION}" check_action
  StrCmp $0 "" do_fresh_install
  Goto do_auto_update

  check_action:
    ${NSD_GetState} $changeBtn $1
    StrCmp $1 ${BST_CHECKED} do_change
    ${NSD_GetState} $repairBtn $1
    StrCmp $1 ${BST_CHECKED} do_repair
    ${NSD_GetState} $removeBtn $1
    StrCmp $1 ${BST_CHECKED} do_remove
    Goto done

  do_change:
    DetailPrint "Reinstalling Fast Order..."
    Goto done

  do_repair:
    DetailPrint "Repairing Fast Order..."
    Goto done

  do_remove:
    DetailPrint "Removing Fast Order..."
    ReadRegStr $0 HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}" "UninstallString"
    StrCmp $0 "" +2
    ExecWait '$0 /S _?=$INSTDIR'
    DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}"
    RMDir /r "$INSTDIR"
    Quit

  do_auto_update:
    MessageBox MB_YESNO|MB_ICONINFORMATION "Fast Order $0 is installed. Update to ${VERSION}?" IDYES do_update_yes IDNO do_update_no
    Goto done

  do_update_no:
    Quit

  do_update_yes:
    DetailPrint "Updating Fast Order..."
    ReadRegStr $0 HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}" "UninstallString"
    StrCmp $0 "" +2
    ExecWait '$0 /S _?=$INSTDIR'
    Goto done

  do_fresh_install:
    DetailPrint "Installing Fast Order ${VERSION}..."

  done:
!macroend

!macro customUnInstall
  DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}"
!macroend
