const { defineConfig } = require('electron-builder');

module.exports = defineConfig({
  appId: 'com.example.kiosk',
  productName: 'KioskApp',
  productName: 'KioskApp',
  directories: {
    output: 'dist',
    buildResources: 'build',
  },
  files: [
    'main.js',
    'preload.js',
    'index.html',
    'styles.css',
    'renderer.js',
    'LICENSE.txt',
  ],
  win: {
    target: 'nsis',
    icon: 'build/icon.ico',
  },
  nsis: {
    oneClick: false,
    allowToChangePrompts: true,
    createGlobalShortcut: 'Ctrl+Shift+K',
    shortcutName: 'KioskApp',
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    startMenuShortcutName: 'KioskApp',
    include: 'build/installer.nsh',
    license: 'LICENSE.txt',
  },
});
