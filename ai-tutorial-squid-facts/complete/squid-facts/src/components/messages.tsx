import { useEffect, useRef } from 'react';
import { ChatMessage } from '@squidcloud/react';

interface ChatHistoryProps {
  messages: ChatMessage[];
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
      {messages.map(({ id, message, type }) => (
        <div key={id}>
          <span key={id}>
            <b>{type}:</b> {message}
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
