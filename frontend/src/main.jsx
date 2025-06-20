import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster/>
  </StrictMode>
)
