import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

const style = document.createElement('style')
style.innerHTML = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
    background-color: #0F100F;
    color: #E8E8E2;
    line-height: 1.5;
  }
  input, textarea, select, button { font-family: inherit; }
  button { cursor: pointer; }
  button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid #C8A358; outline-offset: 2px; }
`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
