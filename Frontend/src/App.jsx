import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignup from './Pages/CaptainSignup'
import UserProtectedWrapper from './Pages/userProtectedWrapper.jsx'
import UserLogout from './Pages/UserLogout.jsx'
import UserHome from './Pages/UserHome.jsx'
import CaptainHome from './Pages/CaptainHome.jsx'
import CaptainRiding from './Pages/CaptainRiding.jsx'

import CaptainProtectedWrapper from './Pages/CaptainProtectedWrapper.jsx'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user-login' element={<UserLogin />} />
      <Route path='/user-signup' element={<UserSignup />} />
      <Route path='/rider-login' element={<CaptainLogin />} />
      <Route path='/rider-signup' element={<CaptainSignup />} />

      <Route path='/rider-riding' element={<CaptainRiding/>}/>

      <Route path='/user-Home' element={<UserProtectedWrapper>
        <UserHome />
      </UserProtectedWrapper>} />

      <Route path='/user/logout' element={<UserProtectedWrapper>
        <UserLogout/>
      </UserProtectedWrapper>} />

      <Route path='/captain-home' element={
        <CaptainProtectedWrapper>
          <CaptainHome/>
        </CaptainProtectedWrapper>
      }  />


    </Routes>
  )
}

export default App