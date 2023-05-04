import { useAuth0 } from '@auth0/auth0-react';
import { useSquid } from '@squidcloud/react';

import { useEffect } from 'react';

const Login = () => {
  const { loginWithRedirect, getIdTokenClaims } = useAuth0();
  const { setAuthIdToken } = useSquid();

  useEffect(() => {
    const fetchIdToken = async () => {
      const claims = await getIdTokenClaims();
      if (claims) {
        setAuthIdToken(claims.__raw);
      }
    };
    fetchIdToken();
  }, [getIdTokenClaims, setAuthIdToken]);

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default Login;
