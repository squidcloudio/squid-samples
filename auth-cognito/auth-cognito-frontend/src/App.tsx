import { useEffect, useState } from 'react';
import { useSquid } from '@squidcloud/react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure({
  Auth: {
    region: awsExports.region,
    userPoolId: awsExports.userPoolId,
    userPoolWebClientId: awsExports.userPoolWebClientId,
  },
});

function App() {
  const squid = useSquid();

  useEffect(() => {
    const idTokenPromise = Auth.currentSession().then((data) => {
      return data.getIdToken().getJwtToken();
    });
    console.log(idTokenPromise);
    // This will also support the accessToken.
    squid.setAuthIdToken(idTokenPromise, 'cognito');

    //https://us-east-2.console.aws.amazon.com/cognito/v2/home
    //https://us-east-2.console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-2_DbqgBv3Qy/app-integration?region=us-east-2
    // https://us-east-2.console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-2_DbqgBv3Qy/users?region=us-east-2
    // client id 3c8i2a402sja2ti4baa8hfskst
    // user pool id us-east-2_DbqgBv3Qy
  });

  return (
    <>
      {' '}
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <p>Welcome {user.username}</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </>
  );
}

export default App;
