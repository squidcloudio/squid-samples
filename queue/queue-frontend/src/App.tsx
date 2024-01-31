import { useEffect, useState } from 'react';
import './App.css';
import { useSquid } from '@squidcloud/react';

function App() {
  const [message, setMessage] = useState('');
  const [outgoingMessage, setOutgoingMessage] = useState('');
  const squid = useSquid();
  const queue = squid.queue('test_topic');

  useEffect(() => {
    const subscription = queue.consume<string>().subscribe(message => setMessage(message));
    return () => subscription.unsubscribe();
  }, []);

  const writeMessage = (e: React.FormEvent) => {
    e.preventDefault();
    queue.produce([outgoingMessage]).then();
    setOutgoingMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOutgoingMessage(value);
  };

  return (
    <>
      <div>{message}</div>
      <form onSubmit={writeMessage}>
        <input
          name="message"
          value={outgoingMessage}
          onChange={handleInputChange}
        />
        <button type="submit">Write Message</button>
      </form>
    </>
  );
}

export default App;
