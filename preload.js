const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  load: () => ipcRenderer.invoke('load'),
  save: (d) => ipcRenderer.invoke('save', d),
  saveSync: (d) => ipcRenderer.sendSync('save-sync', d)
});
