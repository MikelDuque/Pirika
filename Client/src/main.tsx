import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider, WebsocketProvider, AudioProvider, NotificationProvider } from './contexts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider>
      <WebsocketProvider>
        <NotificationProvider>
          <AudioProvider>
            <App />
            <Toaster/>
          </AudioProvider>
        </NotificationProvider>
      </WebsocketProvider>
    </AuthProvider>
  // </StrictMode>
)
