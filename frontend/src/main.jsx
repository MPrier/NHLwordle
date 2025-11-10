import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import StaticApp from './StaticPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StaticApp />
  </StrictMode>,

)
