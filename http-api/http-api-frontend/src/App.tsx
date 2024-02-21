import { useState, useEffect } from 'react';
import './App.css';
import { useSquid } from '@squidcloud/react';

interface RandomFact {
  fact: string;
  length: number;
}

function App() {
  const squid = useSquid();
  const [randomFact, setFact] = useState({ fact: '', length: 0 });

  useEffect(() => {
    squid.api()
      .request('catFacts', 'getRandomFact', { max_length: 70 })
      .then((data) => {
        setFact(data.body as RandomFact);
      });
  }, []);

  return (
    <>
      <div>
        Fact: {randomFact?.fact} <br />
        Length: {randomFact?.length}
      </div>
    </>
  );
}

export default App;
