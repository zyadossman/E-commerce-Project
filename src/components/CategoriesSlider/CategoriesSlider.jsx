import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios/unsafe/axios.js'
import Slider from "react-slick";


export default function CategoriesSlider() {

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
autoplaySpeed: 2000,
pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};




    const [categoriesSlider ,setcategoriesSlider] = useState(null)

  function getAllCategories(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((data)=>{
      setcategoriesSlider(data?.data?.data)
      
    }).catch((error)=>{
      console.log(error);
      
    })
  }


    useEffect(()=>{
getAllCategories()
    } , [])

  return <>
<div className='mt-24 mb-6 px-4'>
  <h2 className='text-xl font-semibold mb-4 text-center'>
    Shop Popular Categories
  </h2>

  <Slider {...settings}>
    {categoriesSlider?.map((category, index) => (
      <div key={index} className='px-2'>
        <div className='bg-white rounded-lg shadow-sm p-2 flex flex-col items-center'>
          <img
            src={category?.image}
            alt={category?.name}
            className='w-full h-44 object-contain rounded-md'
          />
          <h4 className='text-center mt-2 text-sm font-medium'>{category?.name}</h4>
        </div>
      </div>
    ))}
  </Slider>
</div>

  
  
  
  </>
}
