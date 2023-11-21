import { useSquid } from '@squidcloud/react';
import { Button } from '@mui/material';
import React, { useState } from 'react';

interface StatusProps {
  text: string;
}

const StatusComponent: React.FC<StatusProps> = ({ text }) => {
  return <p>{text}</p>;
};

const Secrets: React.FC = () => {
  const { executeFunction } = useSquid();

  const [generatedKey, setGeneratedKey] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');
  const [formData, setFormData] = useState({ apiKey: '' });

  const generateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedKey('⏳');
    executeFunction('generateApiKey', 'SOME_KEY_NAME').then((key) => {
      setGeneratedKey(key);
    });
  };

  const checkKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusText('⏳');
    executeFunction('validateApiKey', 'SOME_KEY_NAME', formData.apiKey).then(
      (confirmed) => {
        if (confirmed) {
          setStatusText('👍');
        } else {
          setStatusText('🙅');
        }
      },
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>API keys</h2>

      <h3>Generate yourself a key</h3>
      <form id="generate" onSubmit={generateKey}>
        <StatusComponent text={generatedKey} />
        <Button type="submit">Generate New Key</Button>
      </form>

      <h3>Check if your key is valid</h3>
      <form id="form" onSubmit={checkKey}>
        <input
          name="apiKey"
          value={formData.apiKey}
          onChange={handleInputChange}
          placeholder="Your API key"
        />
        <StatusComponent text={statusText} />
        <Button type="submit">Check Key</Button>
      </form>
    </div>
  );
};
export default Secrets;
