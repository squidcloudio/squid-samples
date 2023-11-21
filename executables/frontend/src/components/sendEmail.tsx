import { useSquid } from '@squidcloud/react';
import { Button } from '@mui/material';
import React, { useState } from 'react';

interface StatusProps {
  text: string;
}

const StatusComponent: React.FC<StatusProps> = ({text}) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  )
}

const SendEmail: React.FC = () => {
  const { executeFunction } = useSquid();

  const [formData, setFormData] = useState({ address: '', body: '' });
  const [statusData, setStatusData] = useState<string>('');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyContent = formData.body
    const returnAddress = formData.address
    if (!bodyContent.trim() || !returnAddress.trim()) {
      setStatusData('Both text boxes are required.');
      return;
    } else {
      setStatusData('Sending...');
    }
    executeFunction('sendEmail', returnAddress, 'Message from the send email example', bodyContent).then((confirmed) => {
      if (confirmed) {
        setStatusData('Sent!');
        setFormData({ address: '', body: '' });
      } else {
        setStatusData('Failed to send!');
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Send an Email</h2>
      <p>This could be your company's support form.</p>

      <form id="emailForm" onSubmit={send}>
        <input
          type="email"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Your email address"
        />
        <br/>
        <input
          type="text"
          name="body"
          value={formData.body}
          onChange={handleInputChange}
          placeholder="Your message here"
        />
        <StatusComponent text={statusData} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}

export default SendEmail;
