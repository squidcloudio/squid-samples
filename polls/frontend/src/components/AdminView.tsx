import '../styles/globals.scss';
import CreatePoll from '@/components/CreatePoll';
import AllPolls from '@/components/AllPolls';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '@/components/Layout';

export default function AdminView() {
  const { user, loginWithRedirect } = useAuth0();

  if (!user) {
    return (
      <button className="login" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    );
  }

  return (
    <Layout className="admin">
      <CreatePoll />
      <AllPolls />
    </Layout>
  );
}
