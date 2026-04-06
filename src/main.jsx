import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/georama'
import '@fontsource-variable/mona-sans'
import '@fontsource-variable/outfit'
import '@fontsource-variable/roboto-mono'
import '@fontsource-variable/bricolage-grotesque'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
