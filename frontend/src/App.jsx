import React, { Fragment } from 'react'
import { Routes , Route } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import {ToastContainer} from 'react-toastify'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <ToastContainer/>
    <Fragment>
      <Routes>
          <Route element={<Register/>} path='/register' />
          <Route element={<Login/>} path='/login' />
          <Route element={<Home/>} path='/' />
          <Route element={<Profile/>} path='/profile' />
      </Routes>
    </Fragment>
    <Footer/>
    </div>
  )
}

export default App