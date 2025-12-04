import { MdLeaderboard } from "react-icons/md";
import { loadStats } from "./data/statsStore";
import { Link } from "react-router-dom";

function TitleBar() {
  return (
    <div id="header-bar">
      <Link to="/how-to-play">
        <button> ? </button>
      </Link>
      <h1>Puckle</h1>
      <Link to="/">
        <button>
          <MdLeaderboard size={"15px"} />
        </button>
      </Link>
    </div>
  );
}

export default function Leaderboard() {
  const stats = loadStats();

  return (
    <div id="page" style={{ fontFamily: "'Courier New', monospace", color: "#5a4c3b" }}>
      <TitleBar />
      <h2>Your Stats</h2>
      <p>Games Played: {stats.gamesPlayed || 0}</p>
      <p>Wins: {stats.wins || 0}</p>
      <p>Win Rate: {(stats.gamesPlayed > 0 ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(0) : 0)}%</p>
      <p>Current Streak: {stats.currentStreak || 0}</p>
      <p>Best Streak: {stats.bestStreak || 0}</p>
    </div>
  );
}

