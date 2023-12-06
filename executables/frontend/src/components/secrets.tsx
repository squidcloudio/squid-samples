import { useSquid } from '@squidcloud/react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useState } from 'react';
import {
  ApiKeyDisplay,
  StatusStates,
  ValidationStatus,
} from './secretsHelper.tsx';

const Secrets: React.FC = () => {
  const { executeFunction } = useSquid();

  const [generatedKey, setGeneratedKey] = useState<string>('N/A');
  const [status, setStatus] = useState<StatusStates>(StatusStates.Idle);
  const [formData, setFormData] = useState({ apiKey: '' });

  const generateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    executeFunction('generateApiKey', 'SOME_KEY_NAME').then((key) => {
      setGeneratedKey(key);
    });
  };

  const checkKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(StatusStates.Loading);
    executeFunction('validateApiKey', 'SOME_KEY_NAME', formData.apiKey).then(
      (confirmed) => {
        if (confirmed) {
          setStatus(StatusStates.Valid);
        } else {
          setStatus(StatusStates.Invalid);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div>
      <h2>API keys</h2>

      <div className="section">
        <h3>Your generated key</h3>
        <div className="side-by-side justify-left key-container">
          <ApiKeyDisplay text={generatedKey} />
          <IconButton
            onClick={() => copyToClipboard(generatedKey)}
            aria-label="copy"
            className="key-action"
          >
            <ContentCopyIcon />
          </IconButton>
        </div>
      </div>

      <div className="section">
        <h3>Generate yourself a key</h3>
        <form id="generate" onSubmit={generateKey}>
          <button type="submit">Generate New Key</button>
        </form>
      </div>

      <div className="section">
        <h3>Check if your key is valid</h3>
        <form id="form" onSubmit={checkKey}>
          <input
            name="apiKey"
            value={formData.apiKey}
            onChange={handleInputChange}
            placeholder="Enter API key"
          />
          <ValidationStatus status={status} />
          <button type="submit">Check Key</button>
        </form>
      </div>
    </div>
  );
};
export default Secrets;
