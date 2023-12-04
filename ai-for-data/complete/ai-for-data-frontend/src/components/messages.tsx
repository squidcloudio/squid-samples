import { useEffect, useRef } from 'react';
import React from 'react';
import { AiResponse } from '../common/favoritePets';
interface ChatHistoryProps {
  messages: AiResponse[];
}

const Messages: React.FC<ChatHistoryProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messages">
      {messages.map(({ author, answer, executedQuery, explanation }, index) => (
        <div key={index}>
          <span key={index}>
            <b>{author}:</b> {answer}
            <br />
            {executedQuery}
            <br />
            {explanation}
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
