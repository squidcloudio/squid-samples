import { useAuth0 } from '@auth0/auth0-react';
import Logout from './Logout';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <Logout />
    </div>
  );
};

export default Login;
