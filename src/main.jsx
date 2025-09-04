import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './tietoa.css'
import App from './App.jsx'

function unload(){
    alert("aaaa");
    document.body.style = "";
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
