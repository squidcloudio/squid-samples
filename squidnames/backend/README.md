# Backend for the Squid Names game

This is the Squid application backend for Squid Names, a Codenames implementation designed to showcase Squid Cloud
functionality.

## Architecture

There are three architectural parts to keep in mind when developing with Squid:

- **Client application** - This is the application that you are developing, and it uses the Squid Client SDK.
- **Squid cloud server** - This is provided by Squid and is responsible for orchestrating the middle tier by connecting
  to databases and other integrations, maintaining connected client state, executing backend functions, and much more.
- **Application backend** (this project) - This is a TypeScript project that runs alongside the Squid cloud server and
  is used for customizing the application's backend. It has access to the Squid Backend SDK. This part is developed by
  you.

## Developing locally

To develop locally, run `npm run start-squid`

## SquidnamesService

The backend service for Squid Names is relatively simple.

First, we have boilerplate functions to permit all clients to access Squid's built-in database and to acquire
programmatic locks for database mutations.

Second, to purge old games, we have a scheduled task that will find all games in the database with an access time older
than a day and delete them.

## Deploying your code

When you are ready to deploy your code, you can run `squid deploy`. This will deploy your code to the Squid cloud
server,
making it available to your client application.

While this is a relatively simple example, the Squid application backend has extensive power and flexibility, making it
a powerful tool for developers who need to build complex backend functionality for their applications.

For more information, see the [documentation](https://docs.squid.cloud/docs/backend/).
