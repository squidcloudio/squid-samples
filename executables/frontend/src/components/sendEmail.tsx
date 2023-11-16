import { useSquid } from '@squidcloud/react';
import { Button } from '@mui/material';

export default function SendEmail() {
  const { executeFunction } = useSquid();

  const send = async () => {
    const status = (document.getElementById('status') as HTMLElement);
    const bodyContent = (document.getElementById("emailBody") as HTMLFormElement).value
    const returnAddress = (document.getElementById("emailAddress") as HTMLFormElement).value
    if (!bodyContent.trim() || !returnAddress.trim()) {
      status.textContent = 'Both text boxes are required.';
      return;
    }
    executeFunction('sendEmail', returnAddress, 'Message from the send email example', bodyContent).then((confirmed) => {
      if (confirmed) {
        status.textContent = 'Sent!';
        (document.getElementById("emailForm") as HTMLFormElement).reset();
      } else {
        status.textContent = 'Failed to send!';
      }
    });
  };

  return (
    <div>
      <h2>Send an Email</h2>
      <p>This could be your company's support form.</p>

      <form id="emailForm">
        <input type="text" id="emailAddress" name="address" placeholder="Your email address" />
        <br/>
        <input type="text" id="emailBody" name="text" placeholder="Your message here" />
        <p id="status"></p>
        <Button type="button" onClick={() => send()}>Send</Button>
      </form>
    </div>
  );
}
