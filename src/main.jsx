import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Connect4 from './Connect4'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="min-h-screen grid place-items-center bg-gradient-to-r from-red-500 to-orange-500">
      <Connect4 />
    </div>
  </StrictMode>,
)
