import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom'

{/* Import des pages */ }
import Header from './components/Header'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SupportPage from './pages/SupportPage'
import LoginPage from './pages/Account/LoginPage'
import NewAccountPage from './pages/Account/NewAccountPage'
import ProfilePage from './pages/Account/ProfilPage'
import { ToastContainer } from 'react-toastify'



function App() {

  return (
    <>
      <div className='bg-[#fbf8f1]'>
        <Header />

      </div>
      <ToastContainer />
      <div className='bg-[#fbf8f1] min-h-screen'>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path='/dashboard' element={<DashboardPage />}></Route>
          <Route path='/support' element={<SupportPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<NewAccountPage />}></Route>
          <Route path='/profil' element={<ProfilePage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
