import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import image from './img/image.png';
import GamePage from './pages/gamePage.jsx'

let playerInfo = {image: image, name:'Wayne Fartzky', careerPoint: 2587};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Route for the Home Page */}
        <Route path="/" element={<GamePage/>} />
      </Routes>
    </Router>
  </StrictMode>,

)
