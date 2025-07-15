import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import img1 from '../../assets/slider-image-2.jpeg'
import img2 from '../../assets/slider-image-1.jpeg'
import img3 from '../../assets/slider-image-3.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false}


    const [counter ,setCounter] = useState(0)

    useEffect(()=>{

    } , [])

  return <>
  <div className='flex flex-wrap my-5'>
    <div className='w-3/4'>
    <Slider {...settings}>
    <img className='h-[440px]'  src={img1} alt="" />
    <img className='h-[440px]'  src={img2} alt="" />
    <img className='h-[440px]'  src={img3} alt="" />

    </Slider>

    </div>
    <div className='w-1/4'>
    <img className='w-full h-[220px]' src={img1} alt="" />
    <img className='w-full h-[220px]' src={img2} alt="" />
    </div>

  </div>
  
  </>
}
