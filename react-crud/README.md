# Squid Samples: React CRUD App

## This sample app contains Squid React SDK code showing how to implement all the basic CRUD functionality (create, read, update, and delete) of a database

### What it is:
* A Squid backend that has not been edited post-initialization.
* A React frontend that uses Squid's [React SDK](https://docs.squid.cloud/docs/development-tools/react-sdk/) and [built-in database](https://docs.squid.cloud/docs/integrations/database/built-in).

### What you'll need:
* A [Squid Cloud](https://console.squid.cloud) account
* Node.js and npm
* [The Squid CLI](https://docs.squid.cloud/docs/development-tools/local-dev-cli)

### Running the project
1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `react-crud`. 
2. Connect the Squid backend to the new app you created by scrolling in the console to the **Backend** section and selecting **Create .env file**. Copy the command.
3. Open a terminal window and change to the `react-crud-backend` directory.
```bash
cd react-crud/react-crud-backend
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
 --region us-east-1.aws
```
6. Start the backend in this terminal window by running the following command:
```bash
squid start
```
7. Open a second terminal window. In this window, navigate to the frontend:
```bash
cd react-crud/react-crud-frontend
```
8. Install the required dependencies:
```bash
npm install
```
9. Open the `react-crud-frontend/src/main.tsx` file and update the configuration with your app's information. You can find the values in the Squid Cloud Console or in the `.env` file you downloaded.
10. Start the frontend by running:
```bash
npm run dev
```
11. Click the URL in the terminal logs to open the app (likely http://localhost:5173/).
12. Interact with the UI. To add a new user, click the **Insert new user** button. You can then update a user's age or delete a user by clicking the options button on the user's row. 

### Next Steps:
To understand the code better, visit our [Getting Started tutorial](https://docs.squid.cloud/docs/getting-started/dive-in/). This React application is based on this tutorial, expanding upon it for styling purposes. 
