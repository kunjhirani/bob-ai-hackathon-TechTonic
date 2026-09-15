import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LogisticsProvider } from '../shared/LogisticsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LogisticsProvider>
      <App />
    </LogisticsProvider>
  </React.StrictMode>,
)
