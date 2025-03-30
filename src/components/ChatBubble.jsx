// src/components/ChatBubble.jsx
import React from 'react';

const ChatBubble = ({ sender, content, sentAt }) => {
  const isMine = sender === '.'; // 현재 사용자의 경우 (추후 인증 로직 적용 가능)

  // Convert Cocoa timestamp to human-readable format
  const formatTime = (temp) => {
    const unixEpoch = new Date(1970, 0, 1);
    const cocoaEpoch = new Date(2001, 0, 1);
    const delta = cocoaEpoch - unixEpoch;
    const timestamp = new Date(parseInt(temp) * 1000 + delta);
    return timestamp.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} mb-3`}>
      {!isMine && <div className="text-sm text-gray-700 ml-2 mb-1">{sender}</div>}
      <div className="flex items-end">
        <div
          className={`p-3 rounded-lg max-w-xs break-words ${
            isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {content}
        </div>
        <div className="text-xs text-gray-500 mx-2">
          {formatTime(sentAt)}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
