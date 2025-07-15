import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
    const [counter ,setCounter] = useState(0)

    useEffect(()=>{

    } , [])

  return <>
  <h2 className='mt-3 text-3xl text-center font-semibold'>Welcome to <span className='text-4xl text-green-400 font-bold'>FreshCart</span></h2>
  <MainSlider/>
  <CategoriesSlider/>
  <RecentProducts/>
  
  
  </> 
}

