import { useState } from 'react'

import './App.css'
import Navbar from './Navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Notfound from './components/Notfound/Notfound';
import Home from './components/Home/Home';
import { CounterContextProvider } from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import Products from './components/Products/Products';
import Checkout from './components/Checkout/Checkout';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import Productdetails from './components/Productdetails/Productdetails';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import ResetCode from './components/ResetCode/ResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword';





let route= createBrowserRouter([
  {path:'' , element:<Layout/>  , children:[
    {path:'register'  , element:<Register/>},
    {index:true  , element:<ProtectRoute><Home/></ProtectRoute>},
    {path:'brands'  , element:<ProtectRoute><Brands/></ProtectRoute>},
    {path:'categories'  , element:<ProtectRoute><Categories/></ProtectRoute>},
    {path:'checkout'  , element:<ProtectRoute><Checkout/></ProtectRoute>},
    {path:'login'  , element:<Login/>},
    {path:'forgetpassword'  , element:<ForgetPassword/>},
    {path:'resetcode'  , element:<ResetCode/>},
    {path:'resetpassword'  , element:<ResetPassword/>},
    {path:'cart'  , element:<ProtectRoute><Cart/></ProtectRoute>},
    {path:'productdetails/:id/:category'  , element:<ProtectRoute><Productdetails/></ProtectRoute>},
    {path:'products'  , element:<ProtectRoute><Products/></ProtectRoute>},
    {path:'*'  , element:<Notfound/>},

  ]}
])
function App() {


  return (
    <>
  <UserContextProvider>
    <CartContextProvider>

    
<CounterContextProvider>
<RouterProvider router={route}>

    </RouterProvider>
    <Toaster/>
    </CounterContextProvider>

   
    
    </CartContextProvider>
     </UserContextProvider>


    
    
   
    </>
  )
}

export default App