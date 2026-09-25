module.exports = {
  appId: 'com.example.fastorder',
  productName: 'Fast Order',
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
    shortcutName: 'Fast Order',
    include: 'build/installer.nsh',
    license: 'LICENSE.txt',
    perMachine: false,
    deleteAppDataOnUninstall: true,
    artifactName: 'FastOrder.exe',
  },
};
