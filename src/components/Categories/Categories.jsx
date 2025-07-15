import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'

export default function Categories() {
    const [allCategories ,setallCategories] = useState(null)

    function getAllCategories(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((response)=>{
        console.log(response?.data?.data);
        setallCategories(response?.data?.data)
        
      }).catch((error)=>{
        console.log(error);
        
      })
    }

    useEffect(()=>{
      getAllCategories()

    } , [])

  return <>

   {allCategories?.length > 0 ?  <div className='flex flex-wrap justify-evenly gap-y-4 my-4'>

 
  {allCategories?.map((category)=>{ return  <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/5 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
  <img src={category.image} alt={category.slug} className="w-[200px] h-[200px] object-cover" />
  <div className="p-6">
    <h2 className="text-xl font-semibold">{category.name}</h2>
    <p className="text-gray-600 dark:text-gray-400">{category.slug}</p>

  </div>
</div>

})}

 </div> : <Spinner/>  }
  
  </>
}
