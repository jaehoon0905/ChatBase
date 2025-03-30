// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  selectDB: () => ipcRenderer.invoke('select-db'),
  getChatRooms: (dbPath) => ipcRenderer.invoke('get-chat-rooms', dbPath),
  getChatMessages: (dbPath, chatId) => ipcRenderer.invoke('get-chat-messages', { dbPath, chatId })
});
