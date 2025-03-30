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

// 채팅방 목록 조회: 예를 들어 테이블 "chat_rooms"에 저장된 채팅방 정보를 불러온다고 가정
ipcMain.handle('get-chat-rooms', async (event, dbPath) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        reject(err);
      }
    });
    // chatId와 ZNAME을 함께 조회하도록 수정
    db.all("SELECT distinct chatId FROM Message", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
        console.log(rows);
      }
      db.close();
    });
  });
});

// 특정 채팅방의 메시지 조회: 테이블 "messages"에서 room_id로 필터링
ipcMain.handle('get-chat-messages', async (event, { dbPath, chatId }) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        reject(err);
      }
    });
    // messages 테이블에 id, room_id, sender, content, timestamp 컬럼 있다고 가정
    db.all(
      "SELECT chatId, ZNAME, message, sentAt FROM Message WHERE chatId = ? ORDER BY sentAt ASC",
      [chatId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
          console.log('dball', chatId, rows);
        }
        db.close();
      }
    );
  });
});
