// ipcHandlers/dbHandlers.js
const { ipcMain, dialog } = require('electron');
const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 파일 선택
ipcMain.handle('select-db', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'SQLite DB', extensions: ['db', 'sqlite'] }]
  });
  return result.canceled ? null : result.filePaths[0];
});

// 이미지 루트 디렉토리 선택
ipcMain.handle('select-root-dir', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  return result.canceled ? null : result.filePaths[0];
});

// 채팅방 목록 조회: chatId와 참여자 이름을 함께 조회
ipcMain.handle('get-chat-rooms', async (event, dbPath) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        reject(err);
      }
    });
    
    // 각 chatId 그룹별로 참여자 이름을 쉼표로 구분해서 연결
    db.all(
      `SELECT chatId, GROUP_CONCAT(DISTINCT ZNAME) AS participants 
       FROM Message 
       GROUP BY chatId`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        db.close();
      }
    );
  });
});

// 특정 채팅방의 메시지 조회: attachment 컬럼 추가하여 조회
ipcMain.handle('get-chat-messages', async (event, { dbPath, chatId }) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        reject(err);
      }
    });
    db.all(
      "SELECT chatId, ZNAME, message, sentAt, ZPROFILEURL, type, attachment FROM Message WHERE chatId = ? ORDER BY sentAt ASC",
      [chatId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        db.close();
      }
    );
  });
});
