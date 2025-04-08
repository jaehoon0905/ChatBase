// src/components/ChatWindow.jsx
import React, { useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import path from 'path-browserify';

const ChatWindow = ({ dbPath, room, rootDir }) => {
  const [messages, setMessages] = useState([]);

  // Convert timestamp to human-readable format
  const formatTime = (temp) => {
    const unixEpoch = new Date(1970, 0, 1);
    const cEpoch = new Date(2001, 0, 1);
    const delta = cEpoch - unixEpoch;
    const timestamp = new Date(parseInt(temp) * 1000 + delta);
    return timestamp.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  // URL을 로컬 파일 경로로 변환
  const convertUrlToLocalPath = (url) => {
    console.log(rootDir, url);
    if (!rootDir || !url) return url;
    
    try {
      const splitedUrl = url.split('/');
      const dir = path.join(rootDir, 'Library', 'PrivateDocuments', 'chat', room.chatId);
      // URL에서 파일명 추출
      const fileName = '_talkm_' + splitedUrl[splitedUrl.length-3] + '_' + splitedUrl[splitedUrl.length-2] + '_' + splitedUrl[splitedUrl.length-1].split('?')[0];
      return `file:///${path.join(dir, fileName).replace(/\\/g, '/')}`;
    } catch (error) {
      console.error('URL to local path conversion error:', error);
      return url;
    }
  };

  const fetchMessages = async () => {
    try {
      const msgs = await window.api.getChatMessages(dbPath, room.chatId);
      // 메시지 처리 및 첨부파일 정보 추가
      const processedMsgs = msgs.map((msg) => {
        let attachments = null;
        
        // attachment 컬럼이 있고 type이 2(단일 이미지) 또는 27(다중 이미지)인 경우 처리
        if (msg.attachment && (parseInt(msg.type) === 2 || parseInt(msg.type) === 27)) {
          try {
            // JSON 파싱
            const attachmentData = JSON.parse(msg.attachment);
            
            if (parseInt(msg.type) === 2) {
              // 단일 이미지인 경우 url 추출
              const urlList = attachmentData.k ? [attachmentData.k] : null;
              // 로컬 경로로 변환
              attachments = urlList ? urlList.map(url => convertUrlToLocalPath(url)) : null;
            } else if (parseInt(msg.type) === 27) {
              // 다중 이미지인 경우 imageUrls 배열 추출
              const urlList = attachmentData.kl || null;
              // 로컬 경로로 변환
              attachments = urlList ? urlList.map(url => convertUrlToLocalPath(url)) : null;
            }
          } catch (error) {
            console.error("JSON 파싱 오류:", error);
          }
        }

        // 시간 포맷 변환
        const formattedTime = formatTime(msg.sentAt);

        return {
          ...msg,
          attachments,
          formattedTime,
          photoUrl: msg.ZPROFILEURL
        };
      });

      setMessages(processedMsgs);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // 채팅방 변경시 초기화
    setMessages([]);
    if (room) {
      fetchMessages();
    }

    return () => {
      setMessages([]);
    };
  }, [dbPath, room, rootDir]);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">{room.participants || room.chatId}</h2>
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {messages.length === 0 ? (
          <div className="text-gray-500">메시지 없음</div>
        ) : (
          messages.map((msg, index) => (
            <ChatBubble
              key={index}
              sender={msg.ZNAME}
              content={msg.message}
              formattedTime={msg.formattedTime}
              photoUrl={msg.photoUrl}
              attachments={msg.attachments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
