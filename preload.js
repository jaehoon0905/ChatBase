// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  selectDB: () => ipcRenderer.invoke('select-db'),
  selectRootDir: () => ipcRenderer.invoke('select-root-dir'),
  getChatRooms: (dbPath) => ipcRenderer.invoke('get-chat-rooms', dbPath),
  getChatMessages: (dbPath, chatId) => ipcRenderer.invoke('get-chat-messages', { dbPath, chatId })
});
