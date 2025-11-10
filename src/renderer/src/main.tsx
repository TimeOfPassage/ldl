import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SeaBoxLogin } from './components/SeaBoxLogin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SeaBoxLogin />
  </StrictMode>
)
