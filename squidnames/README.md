# Squid Samples: Squid Names

###### Squid Names is a Codenames implementation designed to showcase [Squid Cloud](https://docs.squid.cloud/)

functionality.

### What it is:

- A Squid backend with functionality handling access to the built-in database and a scheduler to run periodically and clean up unused games from the database.
- A React frontend that uses Squid's [React SDK](https://docs.squid.cloud/docs/development-tools/react-sdk/) and [built-in database](https://docs.squid.cloud/docs/integrations/database/built-in).

### What you'll need:

- A [Squid Cloud](https://console.squid.cloud) account
- Node.js and npm
- [The Squid CLI](https://docs.squid.cloud/docs/development-tools/local-dev-cli)

### Running the project

1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `squidnames`.
2. Connect the Squid backend to the new app you created by scrolling in the console to the **Backend** section and selecting **Create .env file**. Copy the command.
3. Open a terminal window and change to the `squidnames/backend` directory.

```bash
cd squidnames/backend
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
cd squidnames/frontend
```

8. Install the required dependencies:

```bash
npm install
```

9. Open the `squidnames-frontend/src/main.tsx` file and update the configuration with your app's information. You can find the values in the Squid Cloud Console or in the `.env` file you downloaded.
10. Start the frontend by running:

```bash
npm run dev
```

11. Click the URL in the terminal logs to open the app (likely http://localhost:5173/).
