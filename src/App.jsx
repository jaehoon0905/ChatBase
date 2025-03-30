// src/App.jsx
import React, { useState, useEffect } from 'react';
import ChatRoomList from './components/ChatRoomList';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [dbPath, setDbPath] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Select DB File
  const handleSelectDB = async () => {
    const filePath = await window.api.selectDB();
    if (filePath) {
      setDbPath(filePath);
      // 채팅방 목록 조회
      try {
        const rooms = await window.api.getChatRooms(filePath);
        setChatRooms(rooms);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // 채팅방 선택시
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  // DB 파일 닫기
  const handleCloseDB = () => {
    setDbPath(null);
    setChatRooms([]);
    setSelectedRoom(null);
  };

  // DB 파일 이름 추출
  const getFileName = (path) => {
    if (!path) return '';
    return path.split('\\').pop().split('/').pop();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <h1 className="text-2xl font-bold flex items-center">
          <img
            src="../assets/icon.png"
            alt="ChatBase"
            className="min-h-[40px] max-h-[60px] mr-2"
          />
        </h1>
        <img
          src="../assets/logo.png"
          alt="Pay1oad"
          className="min-h-[40px] max-h-[60px]"
        />
        {dbPath ? (
          <div className="flex items-center bg-blue-500 px-4 py-2 rounded">
            <span className="mr-3 max-w-xs truncate">{getFileName(dbPath)}</span>
            <button 
              onClick={handleCloseDB}
              className="text-white hover:text-red-200 font-bold"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={handleSelectDB}
          >
            찾아보기
          </button>
        )}
      </header>
      <main className="flex flex-1 pt-[100px]">
        <aside className="w-1/3 border-r p-4 overflow-y-auto">
          <ChatRoomList
            chatRooms={chatRooms}
            onSelectRoom={handleSelectRoom}
            selectedRoom={selectedRoom}
          />
        </aside>
        <section className="flex-1 p-4">
          {selectedRoom ? (
            <ChatWindow dbPath={dbPath} room={selectedRoom} />
          ) : (
            <div className="text-gray-600">채팅방을 선택해주세요.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
