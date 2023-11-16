import { useSquid } from '@squidcloud/react';
import { Button } from '@mui/material';

export default function Secrets() {
  const { executeFunction } = useSquid();

  const generate = async () => {
    const keyElement = (document.getElementById('generatedKey') as HTMLElement);
    keyElement.textContent = '⏳';
    executeFunction('generateApiKey', 'SOME_KEY_NAME').then((key) => {
      keyElement.textContent = key;
    });
  };

  const check = async () => {
    const secret = (document.getElementById("secret") as HTMLFormElement).value;
    const status = (document.getElementById('statusEmoji') as HTMLElement);
    status.textContent = '⏳';
    executeFunction('validateApiKey', secret).then((confirmed) => {
      if (confirmed) {
        status.textContent = '👍';
      } else {
        status.textContent = '🙅';
      }
    });
  };

  return (
    <div>
      <h2>API keys</h2>

      <h3>Generate yourself a key</h3>
      <p id="generatedKey"></p>
      <Button type="button" onClick={() => generate()}>Generate New Key</Button>

      <h3>Check if your key is valid</h3>
      <form id="form">
        <input type="text" id="secret" name="text" placeholder="Your API key" />
        <p id="statusEmoji"></p>
        <Button type="button" onClick={() => check()}>Check Key</Button>
      </form>
    </div>
  );
}
