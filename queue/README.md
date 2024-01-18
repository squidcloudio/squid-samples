# Squid Samples: Squid Queues with Confluent

## This sample app contains client and backend code to demonstrate using Squid Queues

Squid Queues enable you to publish messages and subscribe to topics in a client without the need for additional backend infrastructure.

You can access this functionality through 3 integration options. Select an option to learn how to configure it:

- Squid's built-in queue integration. [Read more](https://docs/squid.cloud/integrations/queue/built-in-queue)
- Your own Apache Kafka integration. [Read more](https://docs/squid.cloud/integrations/queue/kafka)
- [Confluent](https://www.confluent.io/). [Read more](https://docs/squid.cloud/integrations/queue/confluent)

### What it is:

- A Squid backend with a security service function to enable access to a Squid queue topic.
- A React frontend that uses Squid's [React SDK](https://docs.squid.cloud/docs/development-tools/react-sdk/) and [Squid queues](https://docs.squid.cloud/integrations/queue). To get up and running quickly, you can use the [built-in queue](https://docs/squid.cloud/integrations/queue/built-in-queue).

### What you'll need:

- A [Squid Cloud](https://console.squid.cloud) account
- Node.js and npm
- [The Squid CLI](https://docs.squid.cloud/docs/development-tools/local-dev-cli)

### Running the project

1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `queue`.
2. Connect the Squid backend to the new app you created by scrolling in the console to the **Backend** section and selecting **Create .env file**. Copy the command.
3. Open a terminal window and change to the `queue-backend` directory.

```bash
cd queue/queue-backend
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

9. Open the `queue-frontend/src/main.tsx` file and update the configuration with your app's information. You can find the values in the Squid Cloud Console or in the `.env` file you downloaded.
10. Start the frontend by running:

```bash
npm run dev
```

11. Click the URL in the terminal logs to open the app (likely http://localhost:5173/).
12. Interact with the UI. Write a message in the field, and click **Write Message**. Your message then appears.

### Next Steps:

To learn more about Squid Queues, view the [docs on queues](https://docs/squid.cloud/integrations/queue/). [learn how to secure your queues](https://docs.squid.cloud/developer-tools/backend/security-rules/secure-queue)
