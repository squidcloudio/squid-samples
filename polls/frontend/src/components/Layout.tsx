import { useAuth0 } from '@auth0/auth0-react';

export default function Layout({
  className,
  children,
}: {
  className: string;
  children: any;
}) {
  const { user, logout } = useAuth0();
  return (
    <>
      <div className={`header ${className}`}>
        <div>{user?.name}</div>
        <div className="buttons">
          <a href="/">User view</a>
          <a href="/admin">Admin view</a>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </div>
      </div>
      <div className={`content ${className}`}>{children}</div>
    </>
  );
}
