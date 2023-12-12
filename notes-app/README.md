# Create a Squid notes web application with Next.js and Netlify

This sample code accompanies a [tutorial](https://docs.squid.cloud/docs/tutorials/notes-app) on using Squid Cloud with Next.js and Netlify. For complete details, check out the tutorial.

## Environment setup

1. Install the Squid CLI using the following command:

```bash
npm install -g @squidcloud/cli
```

2. Install the Netlify CLI using the following command:

```bash
npm install -g netlify-cli
```

3. Navigate to the [Squid Console](https://console.squid.cloud) and create a new application named `notes-app`.

4. In the Squid Console, navigate to the application overview page and scroll to the **Backend project** section. Click **Create .env file** and copy the command.

5. Change to the backend directory.

```bash
cd notes-app/backend
```

6. Create the `.env` file using the command you copied from the console. The command has the following format:

```bash
squid init-env \
--appId YOUR_APP_ID \
--apiKey YOUR_API_KEY \
--environmentId dev \
--squidDeveloperId YOUR_SQUID_DEVELOPER_KEY \
--region us-east-1.aws
```

7. Install the required dependencies:

```bash
npm install
```

8. Open a new terminal window and navigate to the notes app frontend. You should now have two open terminal windows: one for the app's backend and one for the frontend.

```bash
cd notes-app/frontend
```

9. Install the required dependencies:

```bash
npm install
```

10. Create the Netlify project:

```bash
netlify sites:create
```

11. Create a file called `.env.local` and replace the placeholder in the file with your Squid developer ID. You can find the ID in the `.env` file of your backend and in the [Squid Cloud Console](https://console.squid.cloud).

```bash
touch .env.local
```

```properties title=".env.local"
SQUID_DEVELOPER_ID=[YOUR_SQUID_DEVELOPER_ID]
```

12. Open the `netlify.toml` file. Replace the placeholder with your app ID. The app ID is found in the `.env` file of your backend and in the [Squid Cloud Console](https://console.squid.cloud).

```toml title="netlify.toml"
...
SQUID_APP_ID = "YOUR_APP_ID"
...
```
