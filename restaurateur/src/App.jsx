import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom'

{/* Import des pages */ }
import Header from './components/Header'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SupportPage from './pages/SupportPage'
import ProductViewPage from './pages/ProductViewPage'
import RestaurantViewPage from './pages/RestaurantView'
import CreateArticlePage from './pages/CreateArticlePage'
import EditArticlePage from './pages/EditArticlePage'
import CreateMenuPage from './pages/CreateMenuPage'
import EditMenuPage from './pages/EditMenuPage'
import LoginPage from './pages/Account/LoginPage'
import NewAccountPage from './pages/Account/NewAccountPage'
import ProfilePage from './pages/Account/ProfilPage'
import { ToastContainer } from 'react-toastify'
import CreateRestaurantPage from './pages/CreateRestaurantPage'
import UpdateRestaurantPage from './pages/updateRestaurant'



function App() {
  const [count, setCount] = useState(0)

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
          <Route path='/product' element={<ProductViewPage />}></Route>
          <Route path='/restaurantView/:id' element={<RestaurantViewPage />}></Route>
          <Route path='/newArticle' element={<CreateArticlePage />}></Route>
          <Route path='/newMenu' element={<CreateMenuPage />}></Route>
          <Route path='/editMenu/:id' element={<EditMenuPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<NewAccountPage />}></Route>
          <Route path='/profil' element={<ProfilePage />}></Route>
          <Route path='/newRestaurant' element={<CreateRestaurantPage />}></Route>
          <Route path='/updateRestaurant/:id' element={<UpdateRestaurantPage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
