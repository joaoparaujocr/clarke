import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Providers from './providers/index.tsx'
import AppRoutes from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <AppRoutes />
    </Providers>
  </StrictMode>,
)
