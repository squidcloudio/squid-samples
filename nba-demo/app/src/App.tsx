import "./App.css";
import { useSquid } from "@squidcloud/react";
import GameCard from "./components/GameCard";
import PlayersList from "./components/PlayersList";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";

function App() {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const { setAuthProvider } = useSquid();
  const [tab, setTab] = useState(
    new URLSearchParams(window.location.search).get("tab") || "games",
  );

  const handleTabChange = (tab: string) => {
    const newPath = `${window.location.pathname}?tab=${tab}`;
    window.history.pushState(null, "", newPath);
    setTab(tab);
  };

  useEffect(() => {
    setAuthProvider({
      integrationId: "auth0",
      getToken: async () => (user ? await getAccessTokenSilently() : undefined),
    });
  }, [user, getAccessTokenSilently, setAuthProvider]);

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-5 items-center">
      <LoginButton />
      <div>
        <button onClick={() => handleTabChange("games")}>Games</button>
        <button onClick={() => handleTabChange("players")}>Players</button>
      </div>
      <div className={tab !== "games" ? "hidden" : ""}>
        <GameCard />
      </div>
      <div className={tab !== "players" ? "hidden" : ""}>
        <PlayersList />
      </div>
    </div>
  );
}

export default App;
