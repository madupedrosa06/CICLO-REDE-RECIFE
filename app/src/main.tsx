import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { MODO_PREVIA } from './lib/modo'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {MODO_PREVIA ? <MemoryRouter><App /></MemoryRouter> : <BrowserRouter basename={import.meta.env.BASE_URL}><App /></BrowserRouter>}
  </React.StrictMode>
)
