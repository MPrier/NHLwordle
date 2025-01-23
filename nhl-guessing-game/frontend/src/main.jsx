import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/homePage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyChallenge from './DailyChallenge.jsx'
import StaticApp from './StaticPage.jsx'
import image from './img/image.png';
import GamePage from './pages/gamePage.jsx'

let playerInfo = {image: image, name:'Wayne Fartzky', careerPoint: 2587};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Route for the Home Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route for the Game Page */}
        <Route path="/app" element={<App />} />

        <Route path="/dailychallenge" element={<DailyChallenge />} />

        <Route path="/staticpage" element={<StaticApp playerInfo={playerInfo}/>}/>

        <Route path="/gamepage" element={<GamePage/>}/>

      </Routes>
    </Router>
  </StrictMode>,

)
