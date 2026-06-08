import { MdLeaderboard } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

function TitleBar() {
  return (
    <div id="header-bar">
    <Link to="/">
      <button> ? </button>
    </Link>

    <h1>Puckle</h1>

    <Link to="/stats">
        <button>
          <MdLeaderboard size={"15px"} />
        </button>
    </Link>
    </div>
  );
}

export default function HowToPlay() {
  return (
    <div id="page" style={{ fontFamily: "'Courier New', monospace", color: "#5a4c3b" }}>
      <TitleBar />
      <h2>How to Play</h2>
      <p>Guess the NHL player's career total points in 5 tries or less!</p>
      
      <h3>Rules:</h3>
      <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
        <li>You have 5 guesses to match the player's career points</li>
        <li>After each guess, you'll receive feedback:</li>
        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
          <li style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <IoIosCheckmark color="#1e8f0f" size="100px" />
            <span><strong>Green checkmark:</strong> You got it! (within 5%)</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <FaArrowUp color="#FFD43B" size="50px" />
            <span><strong>Yellow arrow:</strong> You're close! (within 15%)</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <FaArrowUp color="#ce1c1c" size="50px" />
            <span><strong>Red arrow:</strong> Keep trying! (more than 15% off)</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <FaArrowUp color="#5a4c3b" size="50px" />
            <span><strong>Arrow up:</strong> Guess higher</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <FaArrowDown color="#5a4c3b" size="50px" />
            <span><strong>Arrow down:</strong> Guess lower</span>
          </li>
        </ul>
        <li style={{ marginTop: "8px" }}>A new player is available each day</li>
        <li>Track your stats to see your progress!</li>
      </ul>
      
      <p style={{ marginTop: "20px", fontStyle: "italic" }}>Good luck!</p>
    </div>
  );
}
