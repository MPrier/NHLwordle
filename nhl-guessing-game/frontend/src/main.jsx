import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './homePage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyChallenge from './DailyChallenge.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Route for the Home Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route for the Game Page */}
        <Route path="/app" element={<App />} />

        <Route path="/dailychallenge" element={<DailyChallenge />} />

      </Routes>
    </Router>
  </StrictMode>,

)
