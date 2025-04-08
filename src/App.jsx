// src/App.jsx
import React, { useState, useEffect } from 'react';
import ChatRoomList from './components/ChatRoomList';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [dbPath, setDbPath] = useState(null);
  const [rootDir, setRootDir] = useState(null);
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

  // Select Root Directory
  const handleSelectRootDir = async () => {
    const dirPath = await window.api.selectRootDir();
    if (dirPath) {
      setRootDir(dirPath);
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

  // 루트 디렉토리 닫기
  const handleCloseRootDir = () => {
    setRootDir(null);
  };

  // 파일 이름 추출
  const getFileName = (path) => {
    if (!path) return '';
    return path.split('\\').pop().split('/').pop();
  };

  // 경로 표시를 위한 텍스트 단축
  const shortenPath = (path, maxLength = 15) => {
    if (!path) return '';
    const filename = getFileName(path);
    if (filename.length <= maxLength) return filename;
    return filename.substring(0, maxLength - 3) + '...';
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
        
        <div className="flex space-x-2">
          {/* 두 버튼을 같은 너비로 만들기 위한 컨테이너 */}
          <div className="w-32">
            {/* DB 선택 영역 */}
            {dbPath ? (
              <div className="flex items-center bg-blue-500 px-3 py-2 rounded">
                <i className="ri-database-2-line mr-2"></i>
                <span className="mr-1 truncate" title={getFileName(dbPath)}>
                  {shortenPath(dbPath)}
                </span>
                <button 
                  onClick={handleCloseDB}
                  className="text-white hover:text-red-200 font-bold ml-auto"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            ) : (
              <button
                className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded"
                onClick={handleSelectDB}
                title="DB 찾아보기"
              >
                <i className="ri-database-2-line mr-2"></i>
                <span>DB</span>
              </button>
            )}
          </div>
          
          <div className="w-32">
            {/* 루트 디렉토리 선택 영역 */}
            {rootDir ? (
              <div className="flex items-center bg-blue-500 px-3 py-2 rounded">
                <i className="ri-folder-open-line mr-2"></i>
                <span className="mr-1 truncate" title={rootDir}>
                  {shortenPath(rootDir, 10)}
                </span>
                <button 
                  onClick={handleCloseRootDir}
                  className="text-white hover:text-red-200 font-bold ml-auto"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            ) : (
              <button
                className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded"
                onClick={handleSelectRootDir}
                title="폴더 찾아보기"
              >
                <i className="ri-folder-open-line mr-2"></i>
                <span>폴더</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex flex-1 pt-[100px]"> {/* 헤더 높이 조정에 따른 패딩 감소 */}
        <aside className="w-1/3 border-r p-4 overflow-y-auto">
          <ChatRoomList
            chatRooms={chatRooms}
            onSelectRoom={handleSelectRoom}
            selectedRoom={selectedRoom}
          />
        </aside>
        <section className="flex-1 p-4">
          {selectedRoom ? (
            <ChatWindow dbPath={dbPath} room={selectedRoom} rootDir={rootDir} />
          ) : (
            <div className="text-gray-600">채팅방을 선택해주세요.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
