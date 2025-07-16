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

   {allCategories?.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6 px-4">
    {allCategories.map((category) => (
      <div
        key={category._id || category.slug}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <img
          src={category.image}
          alt={category.slug}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg text-center font-semibold text-gray-800">
            {category.name}
          </h2>
          <p className="text-sm text-center text-gray-600">
            {category.slug}
          </p>
        </div>
      </div>
    ))}
  </div>
) : (
  <Spinner />
)}

  
  </>
}
