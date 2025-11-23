import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import UserProvider from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <CaptainContext>  
          <UserProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </UserProvider>
        </CaptainContext>
    </BrowserRouter>
  </StrictMode>,
)