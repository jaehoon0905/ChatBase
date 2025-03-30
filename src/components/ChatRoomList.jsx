// src/components/ChatRoomList.jsx
import React from 'react';

const ChatRoomList = ({ chatRooms, onSelectRoom, selectedRoom }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">채팅 목록</h2>
      {chatRooms.length === 0 ? (
        <div className="text-gray-500">채팅 없음</div>
      ) : (
        chatRooms.map((room) => (

          <div
            key={room.chatId}
            onClick={() => onSelectRoom(room)}
            className={`p-4 mb-2 border rounded cursor-pointer ${
              selectedRoom && selectedRoom.chatId === room.chatId
                ? 'bg-blue-100'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <h3 className="font-semibold">{room.chatId}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatRoomList;
