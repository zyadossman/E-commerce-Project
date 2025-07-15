import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
    const [counter ,setCounter] = useState(0)

    useEffect(()=>{

    } , [])

  return <>

  <Navbar/>

<div className="container min-h-dvh mx-auto max-w-6xl pt-12">
  <Outlet/>
</div>

<Footer/>

    
  </>
  
}
