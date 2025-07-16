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
<div className="flex flex-col md:flex-row mt-24 gap-1 px-4">
  <div className="w-full md:w-3/4 mb-7 md:mb-0">
    <Slider {...settings}>
      <img className="w-full h-[300px] md:h-[445px] object-cover rounded-md" src={img1} alt="slide 1" />
      <img className="w-full h-[300px] md:h-[445px] object-cover rounded-md" src={img2} alt="slide 2" />
      <img className="w-full h-[300px] md:h-[445px] object-cover rounded-md" src={img3} alt="slide 3" />
    </Slider>
  </div>

  <div className="w-full md:w-1/4 flex flex-col gap-1">
    <img className="w-full h-[150px] md:h-[220px] object-cover rounded-md" src={img1} alt="side 1" />
    <img className="w-full h-[150px] md:h-[220px] object-cover rounded-md" src={img2} alt="side 2" />
  </div>
</div>

  
  </>
}
