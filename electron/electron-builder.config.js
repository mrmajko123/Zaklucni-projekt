module.exports = {
  appId: 'com.example.kiosk',
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
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'KioskApp',
    include: 'build/installer.nsh',
    license: 'LICENSE.txt',
  },
};
