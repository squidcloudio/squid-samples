# Squid Samples: Executables

## This sample app contains Squid React SDK code showing how you can use executables to run code on the backend.

### What it is:
* A Squid backend that has not been edited post-initialization.
* A React frontend that uses Squid's [React SDK](https://docs.squid.cloud/docs/development-tools/react-sdk/) and [built-in database](https://docs.squid.cloud/docs/integrations/database/built-in).

### What you'll need:
* A [Squid Cloud](https://console.squid.cloud) account
* Node.js and npm
* [The Squid CLI](https://docs.squid.cloud/docs/development-tools/local-dev-cli)

### Running the project
1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `executables-sample`.
2. Connect the Squid backend to the new app you created by scrolling in the console to the **Backend** section and selecting **Create .env file**. Copy the command.
3. Open a terminal window and change to the `backend` directory.
```bash
cd executables/backend
```
4. Install the required packages:
```bash
npm install
```
5. Create the `.env` file by running the command you copied. It will have this format:
```bash
squid init-env \
 --appId [YOUR_APP_ID] \
 --apiKey [YOUR_API_KEY] \
 --environmentId dev \
 --squidDeveloperId [YOUR_SQUID_DEVELOPER_ID]  \
 --region [YOUR_REGION]
```
6. Start the backend in this terminal window by running the following command:
```bash
squid start
```
7. Open a second terminal window. In this window, navigate to the frontend:
```bash
cd executables/frontend
```
8. Install the required dependencies:
```bash
npm install
```
9. Open the `frontend/src/main.tsx` file and update the configuration with your app's information. You can find the values in the Squid Cloud Console or in the `.env` file you downloaded.
10. Start the frontend by running:
```bash
npm run dev
```
11. Click the URL in the terminal logs to open the app (likely http://localhost:5173/).
12. Interact with the UI. There are two sections:
    - Send an Email
      - Could be a support form where the user can submit an issue alongside an email address to reply to.
      - Invisible to the user/client, the backend executable is in charge of sending the message as an email to the support team.
    - API Keys
      - For a user to check that their API key is still valid, the check can be done on the backend via an executable.
      - Generate a key first and copy it into the box to check if it is a valid key.

### Next Steps:
To understand the code better, visit our [Getting Started tutorial](https://docs.squid.cloud/docs/getting-started/dive-in/) which walks through the creation of this React application. 
