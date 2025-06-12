import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider, WebsocketProvider, AudioProvider } from './contexts'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider>
      <WebsocketProvider>
          <AudioProvider>
            <App />
          </AudioProvider>
      </WebsocketProvider>
    </AuthProvider>
  // </StrictMode>
)
