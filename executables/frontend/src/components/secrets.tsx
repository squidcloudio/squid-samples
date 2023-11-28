import { useSquid } from '@squidcloud/react';
import { IconButton } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import React, { useState } from 'react';

interface ApiKeyProps {
  text: string;
}

enum StatusStates {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Valid = 'VALID',
  Invalid = 'INVALID',
}

interface StatusProps {
  status: StatusStates;
}

function obfuscateText(
  text: string,
  visibleStart = 5,
  hiddenLen = 16,
  visibleEnd = 2,
) {
  if (text.length <= visibleStart) {
    return text;
  }
  return (
    text.slice(0, visibleStart) +
    '*'.repeat(hiddenLen) +
    text.slice(-visibleEnd)
  );
}

const ApiKeyDisplay: React.FC<ApiKeyProps> = ({ text }) => {
  const transformedText = obfuscateText(text);

  return <div className="key-text text">{transformedText}</div>;
};

const ValidationStatus: React.FC<StatusProps> = ({ status }) => {
  switch (status) {
    case StatusStates.Valid:
      return (
        <div className="status-box happy-color text">
          <CelebrationIcon />
          <span>Valid!</span>
        </div>
      );
    case StatusStates.Invalid:
      return (
        <div className="status-box sad-color text">
          <ErrorIcon />
          <span>Not valid</span>
        </div>
      );
    case StatusStates.Loading:
      return (
        <div className="status-box text">
          <HourglassTopIcon />
          <span>Checking...</span>
        </div>
      );
    default:
      return <div className="status-box" />;
  }
};

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
