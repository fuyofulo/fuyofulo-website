import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// original
// aurora
// ember
// synth
// ocean
// graphite
// obsidian
// coal
// abyss
// void

const ACTIVE_NEBULA_THEME = 'abyss'
document.documentElement.setAttribute('data-nebula-theme', ACTIVE_NEBULA_THEME)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
