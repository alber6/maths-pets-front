import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import ChoosePet from './pages/ChoosePet.jsx'
import Dashboard from './pages/Dashboard.jsx'
// gamecontext envuelve las routes y route para que en todas las partes de la página tengan los datos de la mascota
import GameContext from './context/GameContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <GameContext>
        <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/choose' element={<ChoosePet />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      </GameContext>
    </BrowserRouter>
  </StrictMode>
)
