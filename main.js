// main.js
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// IPC 핸들러 모듈 import
require('./ipcHandlers/dbHandlers');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'ChatBase : Pay1oad',
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // 메뉴 제거
  Menu.setApplicationMenu(null);
  win.webContents.openDevTools();

  // React 앱이 빌드된 public 폴더의 index.html을 로드
  win.loadFile(path.join(__dirname, 'public', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
