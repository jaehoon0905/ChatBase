// src/components/ChatWindow.jsx
import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble';

const ChatWindow = ({ dbPath, room }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const msgs = await window.api.getChatMessages(dbPath, room.chatId);
      setMessages(msgs);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // 채팅방 변경시 초기화
    setMessages([]);
    if (room) {
      fetchMessages();
    }

    // 주기적으로 새 메시지 폴링
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [dbPath, room]);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">{room.ZNAME}</h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.length === 0 ? (
          <div className="text-gray-500">메시지 없음</div>
        ) : (
          messages.map((msg) => (
            <ChatBubble 
              key={msg.chatId} 
              sender={msg.ZNAME} 
              content={msg.message} 
              sentAt={msg.sentAt}
              photoUrl={msg.ZPHOTOURL}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
