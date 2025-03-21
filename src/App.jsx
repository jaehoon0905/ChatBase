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
    console.log('handleSelectDB');
    const filePath = await window.api.selectDB();
    console.log(filePath);
    if (filePath) {
      setDbPath(filePath);
      // 채팅방 목록 조회
      try {
        const rooms = await window.api.getChatRooms(filePath);
        console.log(rooms);
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <img
            src="../assets/icon.png"
            alt="ChatBase"
            className="min-h-[40px] max-h-[60px] mr-2"
          />
          ChatBase
        </h1>
        <img
          src="../assets/logo.png"
          alt="Pay1oad"
          className="min-h-[40px] max-h-[60px]"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={handleSelectDB}
        >
          찾아보기
        </button>
      </header>
      <main className="flex flex-1">
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
