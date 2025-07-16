import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'

export default function Brands() {
    const [allBrands ,setallBrands] = useState(null)


    function getAllBrands(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((data)=>{
        console.log(data?.data?.data);
        setallBrands(data?.data?.data)
        
      }).catch((error)=>{
        console.log(error);
        
      })
    }

    useEffect(()=>{
      getAllBrands()
    } , [])

  return <>
  {allBrands?.length > 0 ?  <div className='flex flex-wrap justify-evenly gap-y-4 my-4'>

 
  {allBrands?.map((brand)=>{ return  <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
  <img src={brand.image} alt={brand.slug} className="w-full object-cover" />
  <div className="p-6">
    <h2 className="text-xl font-semibold text-center">{brand.name}</h2>
    <p className="text-gray-600 text-center">{brand.slug}</p>

  </div>
</div>

})}

 </div> : <Spinner/>  }
 
  
  </>
}
