# Squid Samples: Executables

## This sample app contains Squid React SDK code showing how you can use executables to run code on the backend.

### What it is:

- A Squid backend that has not been edited post-initialization.
- A React frontend that uses Squid's [React SDK](https://docs.squid.cloud/docs/development-tools/react-sdk/) and [built-in database](https://docs.squid.cloud/docs/integrations/database/built-in).

### What you'll need:

- A [Squid Cloud](https://console.squid.cloud) account
- Node.js and npm
- [The Squid CLI](https://docs.squid.cloud/docs/development-tools/local-dev-cli)
- An email account to use to send emails with [Nodemailer](https://nodemailer.com/).

### Running the project

1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `executables-sample`.
2. Connect the Squid backend to the new app you created by scrolling in the console to the **Backend** section and selecting **Create .env file**. Copy the command.
3. Enter your email login credentials to the **Secrets** section of the Console. The "Send an Email" example will use these credentials for sending the email.
   - The code is expecting the secrets to be called `email_username` and `email_password`. Adjust as needed.
4. Open a terminal window and change to the `backend` directory.

```bash
cd executables/backend
```

5. Install the required packages:

```bash
npm install
```

6. Create the `.env` file by running the command you copied. It will have this format:

```bash
squid init-env \
 --appId [YOUR_APP_ID] \
 --apiKey [YOUR_API_KEY] \
 --environmentId dev \
 --squidDeveloperId [YOUR_SQUID_DEVELOPER_ID]  \
 --region [YOUR_REGION]
```

7. Start the backend in this terminal window by running the following command:

```bash
squid start
```

8. Open a second terminal window. In this window, navigate to the frontend:

```bash
cd executables/frontend
```

9. Install the required dependencies:

```bash
npm install
```

10. Open the `frontend/src/main.tsx` file and update the configuration with your app's information. You can find the values in the Squid Cloud Console or in the `.env` file you downloaded.
11. Start the frontend by running:

```bash
npm run dev
```

12. Click the URL in the terminal logs to open the app (likely http://localhost:5173/).
13. Interact with the UI. There are two sections:
    - Send an Email
      - Enter your own email address on the form to verify that it sent as expected.
      - Possible use case: A support form where the user can submit an issue alongside an email address to reply to.
      - Invisible to the user/client, the backend executable is in charge of sending the message as an email to the support team.
    - API Keys
      - For a user to check that their API key is still valid, the check can be done on the backend via an executable.
      - Generate a key first and copy it into the box to check if it is a valid key.

### Next Steps:

To learn more, visit our [tutorials](https://docs.squid.cloud/docs/tutorials/) or read about [Squid Executables](https://docs.squid.cloud/docs/development-tools/backend/executables) and [Squid Secrets](https://docs.squid.cloud/docs/development-tools/client-sdk/secrets)!
