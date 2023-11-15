import { useSquid } from '@squidcloud/react';
import './App.css';
import { Button } from '@mui/material';

function App() {
  const { executeFunction } = useSquid();

  const send = async () => {
    const bodyContent = (document.getElementById("emailBody") as HTMLFormElement).value
    if (!bodyContent.trim()) {
      return;
    }
    await executeFunction('sendEmail', 'Hello!', (document.getElementById("emailBody") as HTMLFormElement).value);
    (document.getElementById("emailForm") as HTMLFormElement).reset();
  };

  return (
    <div>
      <h1>Send an Email</h1>

      <form id="emailForm">
        <input type="text" id="emailBody" name="textbox" />
        <br/>
        <Button type="button" onClick={() => send()}>Send</Button>
      </form>
    </div>
  );
}

export default App;
