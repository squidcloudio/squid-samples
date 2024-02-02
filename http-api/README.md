# Integrate an HTTP API with Squid

This sample code accompanies a [tutorial](https://docs.squid.cloud/docs/tutorials/http-api/#create-an-api-integration) showing how to integrate an HTTP API with Squid Cloud and secure it using the Squid Backend SDK.

1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `cat-facts`.

2. Follow the steps in the [tutorial](https://docs.squid.cloud/docs/tutorials/http-api/#create-an-api-integration) to create a new API integration in the Squid Cloud Console.

3. Connect the Squid backend to the `cat-facts` by scrolling in the console **Overview** page to the **Backend project** section and selecting **Create .env file**. Copy the command.

4. Open a terminal window and change to the `http-api-backend` directory.

```bash
cd http-api/http-api-backend
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
 --region us-east-1.aws
```

7. Start the backend in this terminal window by running the following command:

```bash
squid start
```

8. Open a second terminal window. In this window, navigate to the frontend:

```bash
cd http-api/http-api-frontend
```

9. Install the required dependencies:

```bash
npm install
```

10. Open the `http-api-frontend/src/main.tsx` file and update the configuration with your app's information. You can find the values in the Squid Cloud Console or in the `.env` file you downloaded.

11. Start the frontend by running:

```bash
npm run dev
```

12. Click the URL in the terminal logs to open the app (likely http://localhost:5173/). The page displays the cat fact and its length in characters.

Check out the [tutorials](https://docs.squid.cloud/docs/tutorials) section in the Squid Cloud documentation for step-by-step instructions on building app features with Squid.
