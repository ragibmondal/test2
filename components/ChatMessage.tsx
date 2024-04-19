import React from 'react';

interface ChatMessageProps {
  role: string;
  content: string;
  avatar: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, avatar }) => {
  return (
    <div className={`chat-message ${role}`}>
      <span className="avatar">{avatar}</span>
      <p>{content}</p>
    </div>
  );
};

export default ChatMessage;
