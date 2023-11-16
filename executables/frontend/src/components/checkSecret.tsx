import { useSquid } from '@squidcloud/react';
import { Button } from '@mui/material';

export default function CheckSecret() {
  const { executeFunction } = useSquid();

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
      <h2>Validate an API key</h2>

      <form id="form">
        <input type="text" id="secret" name="text" placeholder="Your API key" />
        <p id="statusEmoji"></p>
        <Button type="button" onClick={() => check()}>Check Key</Button>
      </form>
    </div>
  );
}
