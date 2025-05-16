import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { AudioProvider } from './contexts/AudioContext.tsx'
import { SidebarProvider } from './components/ui/Sidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AudioProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </AudioProvider>
    </AuthProvider>
  </StrictMode>
)
