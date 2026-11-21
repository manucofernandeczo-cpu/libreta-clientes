const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  load: () => ipcRenderer.invoke('load'),
  copy: (t) => ipcRenderer.invoke('copy', t),
  save: (d) => ipcRenderer.invoke('save', d),
  saveSync: (d) => ipcRenderer.sendSync('save-sync', d)
});
