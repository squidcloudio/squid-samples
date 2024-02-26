import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isLoading) return null;

  return isAuthenticated ? (
    <button onClick={() => logout()}>Sign Out</button>
  ) : (
    <button onClick={() => loginWithRedirect()}>Sign In</button>
  );
};

export default LoginButton;
