const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // API metode bodo dodane v prihodnosti
});
