# Archer sample project

This is a sample project that demonstrates how to use the Squid framework to build a full-stack application.

The main files in the project are:

- `main.tsx` - the main entry point of the application, where we initialize the Squid SDK and Archer context
- `App.tsx` - the main application component, where we define the main application layout
- `ArcherContextProvider.tsx` - the Archer context provider, where we initialize the Archer context and provide it to
  the rest of the application. This is where most of the queries are done
- `components/` - in this directory we have all the components used for the UI of the sample app.
- `package.json` - where we added the `@squidcloud/react` dependency so we can use Squid and react hooks with it
- `.env` - where we define the Squid app ID, region and more configuration that is needed

## Running the sample

To run the sample, run this in the root directory:

```bash
npm run squid-start
```

For more information, see the [documentation](https://docs.squid.cloud/docs/getting-started/what-is-squid/)
