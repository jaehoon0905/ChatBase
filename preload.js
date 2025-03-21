// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  selectDB: () => ipcRenderer.invoke('select-db'),
  getChatRooms: (dbPath) => ipcRenderer.invoke('get-chat-rooms', dbPath),
  getChatMessages: (dbPath, roomId) => ipcRenderer.invoke('get-chat-messages', { dbPath, roomId })
});
