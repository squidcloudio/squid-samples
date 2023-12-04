# Squid Samples: Angular CRUD App

## This sample app contains Squid Angular SDK code showing how to implement all the basic CRUD functionality (create, read, update, and delete) of a database

### What it is:
* A Squid backend that has not been edited post-initialization.
* An Angular frontend that uses Squid's [Angular SDK](https://docs.squid.cloud/docs/development-tools/angular-sdk/) and [built-in database](https://docs.squid.cloud/docs/integrations/database/built-in).

### What you'll need:
* A [Squid Cloud](https://console.squid.cloud) account
* Node.js and npm
* [The Squid CLI](https://docs.squid.cloud/docs/development-tools/local-dev-cli)
* [The Angular CLI](https://angular.io/cli)

### Notes
* This sample app contains similar code to our [Getting Started tutorial](https://docs.squid.cloud/docs/getting-started/dive-in/). To get a deep dive into the Squid code in this project, walkthrough the tutorial. The components that contain Squid code are `insert-user`, `read-users`, `update-user`, and `delete-user`. Note that this sample app contains additional organization and styling compared to the tutorial.

### Running the project
1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `angular-crud`.
2. Connect the Squid backend to the new app you created by scrolling in the console to the **Backend** section and selecting **Create .env file**. Copy the command.
3. Open a terminal window and change to the `angular-crud-backend` directory.
```bash
cd angular-crud/angular-crud-backend
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
cd angular-crud/angular-crud-frontend
```
8. Install the required dependencies, including the Angular CLI:
```bash
npm install -g @angular/cli
npm install
```
9. Open the `angular-crud-frontend/src/app/app.module.ts` file and update the configuration with your app's information. You can find the values in the Squid Cloud Console or in the `.env` file you downloaded.
10. Start the frontend by running:
```bash
ng serve
```
11. Click the URL in the terminal logs to open the app (likely http://localhost:4200/).
12. Interact with the UI. To add a new user, click the **Create user** button. You can then update a user's age using the **Update age** form, or delete a user using the **Delete user** form.
