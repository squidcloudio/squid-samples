import { useSquid } from '@squidcloud/react';
import { Button } from '@mui/material';
import React, { useState } from 'react';

interface StatusProps {
  text: string;
}

const StatusComponent: React.FC<StatusProps> = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

const SendEmail: React.FC = () => {
  const { executeFunction } = useSquid();

  const [formData, setFormData] = useState({ address: '', body: '' });
  const [emailStatus, setEmailStatus] = useState<string>('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyContent = formData.body;
    const returnAddress = formData.address;
    if (!bodyContent.trim() || !returnAddress.trim()) {
      setEmailStatus('Both text boxes are required.');
      return;
    } else {
      setEmailStatus('Sending...');
    }
    executeFunction(
      'sendEmail',
      returnAddress,
      'Message from the send email example',
      bodyContent,
    ).then((confirmed) => {
      if (confirmed) {
        setEmailStatus('Sent!');
        setFormData({ address: '', body: '' });
      } else {
        setEmailStatus('Failed to send! Is your Nodemailer config correct?');
      }
    });
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
      <h2>Send an Email</h2>
      <p>This could be your company's support form.</p>

      <form id="emailForm" onSubmit={sendEmail}>
        <input
          type="email"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Your email address"
        />
        <br />
        <input
          name="body"
          value={formData.body}
          onChange={handleInputChange}
          placeholder="Your message here"
        />
        <StatusComponent text={emailStatus} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default SendEmail;
