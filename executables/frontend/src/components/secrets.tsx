import { useSquid } from '@squidcloud/react';
import { Button } from '@mui/material';
import React, { useState } from 'react';

interface StatusProps {
  text: string;
}

const StatusComponent: React.FC<StatusProps> = ({text}) => {
  return (
    <p>{text}</p>
  )
}

const Secrets: React.FC = () => {
  const { executeFunction } = useSquid();

  const [generationData, setGenerationData] = useState<string>('');
  const [statusData, setStatusData] = useState<string>('');

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerationData('⏳');
    executeFunction('generateApiKey', 'SOME_KEY_NAME').then((key) => {
      setGenerationData(key);
    });
  };

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    const secret = (document.getElementById("secret") as HTMLFormElement).value;
    setStatusData('⏳');
    executeFunction('validateApiKey', secret).then((confirmed) => {
      if (confirmed) {
        setStatusData('👍');
      } else {
        setStatusData('🙅');
      }
    });
  };

  return (
    <div>
      <h2>API keys</h2>

      <h3>Generate yourself a key</h3>
      <form id="generate" onSubmit={generate}>
        <StatusComponent text={generationData} />
        <Button type="submit">Generate New Key</Button>
      </form>

      <h3>Check if your key is valid</h3>
      <form id="form" onSubmit={check}>
        <input type="text" id="secret" name="text" placeholder="Your API key" />
        <StatusComponent text={statusData} />
        <Button type="submit">Check Key</Button>
      </form>
    </div>
  );
}
export default Secrets;
