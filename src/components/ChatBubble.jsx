// src/components/ChatBubble.jsx
import React from 'react';

const ChatBubble = ({ sender, content, formattedTime, photoUrl, attachments }) => {
  const isMine = sender === '.'; // 현재 사용자의 경우 (추후 인증 로직 적용 가능)

  // Default placeholder image if no profile image is available
  const defaultImage = "https://avatars.githubusercontent.com/u/38221794?s=280&v=4";
  
  // 첨부 이미지 렌더링 함수
  const renderAttachments = () => {
    if (!attachments || attachments.length === 0) return null;
    
    // 첨부파일이 한 장인 경우
    if (attachments.length === 1) {
      return (
        <div className="mt-2 rounded-lg overflow-hidden max-w-sm">
          <img 
            src={attachments[0]} 
            alt="Attachment" 
            className="w-full h-auto object-cover cursor-pointer hover:opacity-90"
            onClick={() => window.open(attachments[0], '_blank')}
          />
        </div>
      );
    }
    
    // 첨부파일이 여러 장인 경우
    return (
      <div className="mt-2 grid grid-cols-2 gap-1 max-w-sm">
        {attachments.map((localPath, index) => (
          <div key={index} className="rounded-lg overflow-hidden aspect-square">
            <img 
              src={localPath}
              alt={`Attachment ${index + 1}`} 
              className="w-full h-full object-cover cursor-pointer hover:opacity-90"
              onClick={() => window.open(localPath, '_blank')}
            />
          </div>
        ))}
        {attachments.length > 4 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            +{attachments.length - 4}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} mb-3`}>
      {!isMine && <div className="text-sm text-gray-700 ml-2 mb-1">{sender}</div>}
      <div className={`flex items-end ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-10 h-10 rounded-md overflow-hidden flex-shrink-0 ${isMine ? 'ml-2' : 'mr-2'}`}>
          <img 
            src={photoUrl || defaultImage} 
            alt={`${sender}'s profile`} 
            className="w-full h-full object-cover"
            onError={(e) => {e.target.src = defaultImage}}
          />
        </div>
        <div
          className={`p-3 rounded-lg max-w-xs break-words ${
            isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {content && <div className="mb-1">{content}</div>}
          {renderAttachments()}
        </div>
        <div className={`text-xs text-gray-500 ${isMine ? 'mr-2' : 'ml-2'}`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
