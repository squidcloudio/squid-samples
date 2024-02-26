# Squid Samples: NBA Demo

This sample app demos how to connect with a variety of different integrations, including:

- Squid's Built-In database integration
- An API integration (the NBA API)
- An AI Chatbot integration
- An auth integration (Auth0)

### What it is:

- `backend`- A Squid backend that contains security rules, webhooks and scheduled functions.
- `app` - A React frontend that uses Squid's [React SDK](https://docs.squid.cloud/docs/development-tools/react-sdk/) to integration with the integrations mentioned above.
- 
### What you'll need
* A [Squid Cloud](https://console.squid.cloud) account
* Node.js and npm
* [The Squid CLI](https://docs.squid.cloud/docs/development-tools/local-dev-cli)
- An [Auth0 account](https://auth0.com/) with a [single-page application configured to use React](https://auth0.com/docs/quickstart/spa/react)

## Creating the integrations

1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `nba-demo`.

### Adding the NBA API integration
1. In the Squid Console, ensure you are in the `dev` environment. If you are in the `prod` environment, click the **prod** button at the top of the window and select **dev** from the dropdown.
2. Select the **Integrations** tab.
3. Click the **Available integrations** tab to view all integrations.
4. Scroll to the API integration and click **Add integration**.
5. Enter `nba` as the Integration ID.
5. Enter `https://gist.githubusercontent.com/ohsnapitscolin/16b3df873e27815e0f1cdf86f7f97363/raw/dd44a6346e5e1ce0e06cba3bd9a54e1048bc2a18/nba-api` as the OpenAPI specification URL
7. Click **Add integration**.
8. On the next page, click **Save Schema**.

### Adding the Squid AI integration

1. In the Squid Console, ensure you are in the `dev` environment. If you are in the `prod` environment, click the **prod** button at the top of the window and select **dev** from the dropdown.
2. Select the **Integrations** tab.
3. Click the **Available integrations** tab to view all integrations.
4. Scroll to the AI Chatbot integration and click **Add integration**.
   Enter `nba-chat` as the Integration ID.
5. Click **Add profile** to add a profile to your chatbot. Name the profile **player-facts**. Toggle **Set profile to public** to **off**.
6. Select **GPT-3.5 Turbo** from the **Model name** dropdown menu.
7. Click Add. You have now added the Squid AI integration with a new profile!
8. Click the **+** next to Instructions to add a new instruction. Enter the following text as the instruction, and then press **Add instruction**:

```
You are a chatbot designed to answer with fun, random facts about NBA players. Do not make up any facts. Please only use data in your model to generate responses. Responses should be limited to a single sentence.
```

### Adding the Auth0 integration

1. If you haven't yet made an Auth0 API, set up an [Auth0 account](https://auth0.com/) and create a [single-page application configured to use React](https://auth0.com/docs/quickstart/spa/react) and an audience using an Auth0 [API](https://auth0.com/docs/get-started/apis). Use `'squid-backend'` as the API audience.
   When adding the callback and logout URLs, use `http://localhost:5173`.
2. In the Squid Cloud Console in the `dev` environment, select the **Integrations** tab.
3. Click the **Available integrations** tab to view all integrations.
4. Scroll to the Auth0 integration and click **Add integration**.
5. Enter **auth0** for the Integration ID.
6. Enter the domain ID for your Auth0 app. This can be found in the Auth0 console.
7. Enter `squid-backend` as the audience.
8. Click **Add integration**.

### Running the Project
1. In the [Squid Cloud Console](https://console.squid.cloud) navigate the "Overview" of your `nba-demo` application. Make sure you are in the `dev` environment.
2. Connect the Squid backend to the new app you created by scrolling in the console to the **Backend** section and selecting **Create .env file**. Copy the command.
2. Open a terminal window and change to the `backend` directory.


```bash
cd nba-demo/backend
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
cd queue/queue-frontend
```

8. Install the required dependencies:

```bash
npm install
```

9. Open the `frontend/src/main.tsx` file and update the configuration with your Squid and Auth0 information. You can find the Squid values in the Squid Cloud Console or in the `.env` file you downloaded, and the Auth0 values in the Auth0 console.
10. Start the frontend by running:

```bash
npm run dev
```

11. Click the URL in the terminal logs to open the app (likely http://localhost:5173/).
12. Interact with the UI!
    - Under the "Games" tab you should see a game summary that updates with a new game every 5 seconds.
    - Under the "Players" tab you should see a paginated list of players, sorted by total points.
    - Clicking the "?" button should generate a random fact about the NBA player.
    - Clicking the "↔" on one player, and then another, should generate a comparison of the two players' stats.

**Note**: For the player comparison (↔) to execute, you'll first need to save the auto-generated schema of the Built-In database integration. This can be done with the following steps:
- Navigate to the `built_in_db` integration in the `dev` application in the Squid Cloud Console.
- Click on the three dots (**...**) and then **Schema**.
- On the next page you should see `players` and `randomGame` collections.
- Click **Save Schema**.
