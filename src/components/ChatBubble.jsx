// src/components/ChatBubble.jsx
import React from 'react';

const ChatBubble = ({ sender, content }) => {
  const isMine = sender === '.'; // 현재 사용자의 경우 (추후 인증 로직 적용 가능)
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-lg max-w-xs break-words ${
          isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatBubble;
