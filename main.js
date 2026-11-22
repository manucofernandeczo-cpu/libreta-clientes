const { app, BrowserWindow, ipcMain, clipboard } = require('electron');
const path = require('path');
const fs = require('fs');

// Compatibilidad: PCs con graficos viejos o app abierta desde carpeta de red
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('no-sandbox');

function log(msg) {
  try {
    fs.appendFileSync(path.join(app.getPath('userData'), 'error-log.txt'),
      new Date().toISOString() + ' ' + String(msg && msg.stack || msg) + '\n');
  } catch {}
}
process.on('uncaughtException', log);
process.on('unhandledRejection', log);

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
ipcMain.handle('copy', (_e, t) => { clipboard.writeText(String(t)); return true; });
ipcMain.handle('save', (_e, data) => { writeData(data); return true; });
ipcMain.on('save-sync', (e, data) => { writeData(data); e.returnValue = true; });

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1200, height: 800, autoHideMenuBar: true,
    title: 'Libreta de Clientes',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true }
  });
  win.webContents.on('render-process-gone', (_e, d) => log('render-process-gone: ' + JSON.stringify(d)));
  win.webContents.on('did-fail-load', (_e, code, desc) => log('did-fail-load: ' + code + ' ' + desc));
  win.loadFile('index.html');
});
app.on('window-all-closed', () => app.quit());
