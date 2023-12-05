import { useSquid } from '@squidcloud/react';
import React, { useState } from 'react';
import { StatusComponent, StatusStates } from './sendEmailHelper.tsx';

const SendEmail: React.FC = () => {
  const { executeFunction } = useSquid();

  const [formData, setFormData] = useState({ address: '', body: '' });
  const [emailStatus, setEmailStatus] = useState<{
    status: StatusStates;
    message?: string;
  }>({ status: StatusStates.Idle });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyContent = formData.body;
    const returnAddress = formData.address;
    if (!bodyContent.trim() || !returnAddress.trim()) {
      setEmailStatus({
        status: StatusStates.Error,
        message: 'Both text boxes are required.',
      });
      return;
    } else {
      setEmailStatus({ status: StatusStates.Sending });
    }
    executeFunction(
      'sendEmail',
      returnAddress,
      'Message from the send email example',
      bodyContent,
    ).then((confirmed) => {
      if (confirmed) {
        setEmailStatus({ status: StatusStates.Sent });
        setFormData({ address: '', body: '' });
      } else {
        setEmailStatus({
          status: StatusStates.Error,
          message: 'Failed to send! Is your Nodemailer config correct?',
        });
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
          placeholder="Email Address"
        />
        <input
          name="body"
          value={formData.body}
          onChange={handleInputChange}
          placeholder="Message"
        />
        <StatusComponent
          status={emailStatus.status}
          message={emailStatus.message}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendEmail;
