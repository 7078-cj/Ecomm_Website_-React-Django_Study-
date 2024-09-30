import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import ProductPage from './pages/ProductCrud/ProductPage'
import Allproducts from './pages/Allproducts'
import Cart from './pages/Cart'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AuthContext from './fetch/AuthContext'
import { AuthProvider } from './fetch/AuthContext'
import PrivateRoutes from './fetch/PrivateRoutes'
import LoginPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'
import NewProduct from './pages/ProductCrud/NewProduct'
import UpdateProd from './pages/ProductCrud/UpdateProd'
import DeleteProd from './pages/ProductCrud/DeleteProd'
import { FetchProvider } from './fetch/FetchContext'
import UserEdit from './pages/UserUpdate/UserEdit'
import Header from './components/Header'

function App() {
  

  return (
    <>
    <Router>
      <AuthProvider>
        
      <FetchProvider>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          
          <Route path='/' element={
            <PrivateRoutes><Home/></PrivateRoutes>}/>

         
          <Route path='/user/:id' element={
            <PrivateRoutes>
              <UserEdit/>
            </PrivateRoutes>}/>

          <Route path='/product/:id' element={
            <PrivateRoutes>
              <ProductPage/>
            </PrivateRoutes>}/>

            <Route path='/updateproduct/:id' element={
            <PrivateRoutes>
              <UpdateProd/>
            </PrivateRoutes>}/>

            <Route path='/Deleteproduct/:id' element={
            <PrivateRoutes>
              <DeleteProd/>
            </PrivateRoutes>}/>

          <Route path='/shop' element={
            <PrivateRoutes>
              <Allproducts/>
            </PrivateRoutes>}/>


          <Route path='/cart' element={
            <PrivateRoutes>
              <Cart/>
            </PrivateRoutes>}/>
          
            <Route path='/createProd' element={
            <PrivateRoutes>
              <NewProduct/>
            </PrivateRoutes>}/>
          
          

          
        </Routes>
        </FetchProvider>
        </AuthProvider>
    </Router>
      
    </>
  )
}

export default App
