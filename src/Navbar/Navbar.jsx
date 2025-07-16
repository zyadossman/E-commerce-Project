import React, { useContext, useState } from 'react'
import logo from '../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { CounterContext } from '../Context/CounterContext'
import { CartContext } from '../Context/CartContext'
import { Menu, X } from 'lucide-react'


export default function Navbar() {
    
   let {numOfCartItems}= useContext(CartContext)
   let {userLogin , setuserLogin} =useContext(UserContext)
    const [menuOpen, setMenuOpen] = useState(false);
   let {counter} = useContext(CounterContext)
    let navigate = useNavigate()
   function logout(){
    localStorage.removeItem('usertoken')
    setuserLogin(null)
    navigate('/login')
   }
  return <>
<nav className="bg-gray-100 shadow-md fixed top-0 left-0 right-0 z-50">
  <div className="container mx-auto flex items-center justify-between px-4 py-3">
    <div className="flex items-center gap-2 w-1/3">
      <img src={logo} className="w-24" alt="Logo" />
    </div>
    <ul className="hidden md:flex justify-center items-center gap-6 w-1/3 text-gray-800">
      {userLogin && (
        <>
          <li><NavLink to="/" className="hover:text-gray-900">Home</NavLink></li>
          <li><NavLink to="/products" className="hover:text-gray-900">Products</NavLink></li>
          <li><NavLink to="/categories" className="hover:text-gray-900">Categories</NavLink></li>
          <li><NavLink to="/brands" className="hover:text-gray-900">Brands</NavLink></li>
          <li className="relative">
            <NavLink className="relative hover:text-gray-900" to="/cart">
              Cart
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs px-1 rounded-full">
                {numOfCartItems}
              </span>
            </NavLink>
          </li>
        </>
      )}
      {userLogin === null && (
        <>
          <li><NavLink to="/register" className="hover:text-gray-900">Register</NavLink></li>
          <li><NavLink to="/login" className="hover:text-gray-900">Login</NavLink></li>
        </>
      )}
    </ul>
    <div className="hidden md:flex justify-end items-center gap-4 w-1/3 text-gray-600">
      <i className="fa-brands fa-facebook-f hover:text-gray-900"></i>
      <i className="fa-brands fa-twitter hover:text-gray-900"></i>
      <i className="fa-brands fa-youtube hover:text-gray-900"></i>
      <i className="fa-brands fa-tiktok hover:text-gray-900"></i>

      {userLogin && (
        <button
          onClick={logout}
          className="cursor-pointer text-red-600 hover:text-red-800 font-medium ml-2"
        >
          Logout
        </button>
      )}
    </div>
    <button
      className="md:hidden text-gray-800"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
    </button>
  </div>

 
  <ul
    className={`${
      menuOpen ? "block" : "hidden"
    } md:hidden flex flex-col bg-gray-200 shadow-md p-4 text-center text-gray-800`}
  >
    {userLogin && (
      <>
        <li className="py-2"><NavLink to="/">Home</NavLink></li>
        <li className="py-2"><NavLink to="/products">Products</NavLink></li>
        <li className="py-2"><NavLink to="/categories">Categories</NavLink></li>
        <li className="py-2"><NavLink to="/brands">Brands</NavLink></li>
        <li className="py-2 relative">
          <NavLink className="relative" to="/cart">
            Cart
            <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs px-1 rounded-full">
              {numOfCartItems}
            </span>
          </NavLink>
        </li>
        <li className="py-2">
          <button onClick={logout} className="text-red-600 hover:text-red-800 font-medium">
            Logout
          </button>
        </li>
      </>
    )}
    {userLogin === null && (
      <>
        <li className="py-2"><NavLink to="/register">Register</NavLink></li>
        <li className="py-2"><NavLink to="/login">Login</NavLink></li>
      </>
    )}
    <li className="flex justify-center gap-4 mt-2">
      <i className="fa-brands fa-facebook-f hover:text-gray-900"></i>
      <i className="fa-brands fa-twitter hover:text-gray-900"></i>
      <i className="fa-brands fa-youtube hover:text-gray-900"></i>
      <i className="fa-brands fa-tiktok hover:text-gray-900"></i>
    </li>
  </ul>
</nav>


  </>
}
