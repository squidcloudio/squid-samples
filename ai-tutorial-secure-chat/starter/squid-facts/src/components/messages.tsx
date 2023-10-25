import { useEffect, useRef } from 'react';

const Messages = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="messages">
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
