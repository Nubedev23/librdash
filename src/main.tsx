import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BooksProvider } from './context/BooksContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BooksProvider>
        <App />
      </BooksProvider>
    </AuthProvider>
  </StrictMode>,
)