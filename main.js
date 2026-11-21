const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const file = () => path.join(app.getPath('userData'), 'clientes.json');

function readData() {
  try { return JSON.parse(fs.readFileSync(file(), 'utf8')); }
  catch { return { clients: [] }; }
}
function writeData(data) {
  const tmp = file() + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data));
  fs.renameSync(tmp, file());
}

ipcMain.handle('load', () => readData());
ipcMain.handle('save', (_e, data) => { writeData(data); return true; });
ipcMain.on('save-sync', (e, data) => { writeData(data); e.returnValue = true; });

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1200, height: 800, autoHideMenuBar: true,
    title: 'Libreta de Clientes',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true }
  });
  win.loadFile('index.html');
});
app.on('window-all-closed', () => app.quit());
