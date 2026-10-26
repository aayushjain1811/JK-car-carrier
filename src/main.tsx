import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Pages are pre-rendered to HTML at build time (for SEO); attach to that HTML instead of re-drawing it.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
