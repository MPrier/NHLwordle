import { Routes, Route } from "react-router-dom";
import StaticPage from "./StaticPage";
import Leaderboard from "./UserStats";
import HowToPlay from "./HowToPlay";
export default function App() {
  return (
    <Routes>
      {/* Your main game */}
      <Route path="/" element={<StaticPage />} />
      <Route path="/stats" element={<Leaderboard />} />
      <Route path="/how-to-play" element={<HowToPlay />} />

      {/* More pages later if you need */}
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}
