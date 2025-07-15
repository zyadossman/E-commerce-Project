import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios/unsafe/axios.js'
import Slider from "react-slick";


export default function CategoriesSlider() {

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
    <div className='my-3'>
    <h2 className='text-xl font-semibold my-2'>
      Shop Popular Categories
    </h2>
<Slider {...settings}>
{categoriesSlider?.map((category)=>{ return <div className='my-4'>

<img className='h-[175px]' src={category?.image} alt={category?.name} />
  <h4 className='text-center'>{category?.name}</h4>
</div>
  
   })}

</Slider>


    </div>
  
  
  
  </>
}
