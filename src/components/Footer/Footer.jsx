import React, { useEffect, useState } from 'react'
import style from './Footer.module.css'

export default function Footer() {
    const [counter ,setCounter] = useState(0)

    useEffect(()=>{

    } , [])

  return <>
 

  <footer className="bg-gray-800 text-white py-4">
    <div className="container mx-auto text-center">
      <p>© 2025 My Website. All rights reserved.</p>
    </div>
  </footer>


  
  </>
}
