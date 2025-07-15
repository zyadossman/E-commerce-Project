import React, { useContext } from 'react'
import so from '../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { CounterContext } from '../Context/CounterContext'
import { CartContext } from '../Context/CartContext'

export default function Navbar() {
   let {numOfCartItems}= useContext(CartContext)
   let {userLogin , setuserLogin} =useContext(UserContext)
   let {counter} = useContext(CounterContext)
    let navigate = useNavigate()
   function logout(){
    localStorage.removeItem('usertoken')
    setuserLogin(null)
    navigate('/login')
   }
  return <>
  <nav className='bg-slate-200 p-2 static lg:fixed top-0 start-0 end-0 z-50'>
    <div className="container max-w-7xl m-auto flex flex-col md:flex-row justify-between">
        <div className='flex flex-col md:flex-row items-center'>
            <img width={100} src={so} alt="Logo" />
            <ul className='flex flex-col md:flex-row items-center'>
                {userLogin != null ? <><li className='text-md mx-2 text-shadow-amber-600 py-2'><NavLink to='/'> Home</NavLink></li>
                <li className='text-md mx-2 text-shadow-amber-600 py-2'><NavLink to='/products'>Products</NavLink></li>
                <li className='text-md mx-2 text-shadow-amber-600 py-2'><NavLink to='categories'>Categories</NavLink></li>
                <li className='text-md mx-2 text-shadow-amber-600 py-2'><NavLink to='/brands'>Brands</NavLink></li>
                <li className='text-md mx-2 text-shadow-amber-600 py-2 relative'><NavLink to='/cart'>Cart<span className=" shrink-0 rounded-full bg-emerald-500 px-2 font-mono text-sm font-small tracking-tight absolute -top-1 -end-4 text-white">{numOfCartItems}</span>
</NavLink></li></> : null}
                
            </ul>
        </div>
        <div className='flex flex-col md:flex-row items-center'>
            <ul className='flex flex-col md:flex-row items-center'>
                {userLogin === null ? <><li className='text-md mx-2 text-shadow-amber-600 py-2'><NavLink to="/register">Register</NavLink></li>
                <li className='text-md mx-2 text-shadow-amber-600 py-2'><NavLink to="/login">Login</NavLink></li></>  : <><li onClick={logout} className='text-md mx-2 text-shadow-amber-600 py-2'><NavLink className='cursor-pointer'>Logout</NavLink></li></>  }
                
                
                <li className='text-md mx-2 text-shadow-amber-600 py-2'>
                <i className="fa-brands mx-2 fa-facebook-f"></i>
                <i className="fa-brands mx-2 fa-youtube"></i>
                <i className="fa-brands mx-2 fa-twitter"></i>
                <i className="fa-brands mx-2 fa-tiktok"></i>
                </li>
            </ul>
        </div>
    </div>
  </nav>
  </>
}
