import React, { createContext, useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios/unsafe/axios.js'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'




export default function RecentProducts() {

  let {addToCart} =useContext(CartContext)

    const [allProducts ,setallProducts] = useState(null)

 async function addProdToCart(prodId){
      let response = await addToCart(prodId)
      console.log(response);
      if(response.data.status==='success'){
        toast.success(response?.data?.message , {duration:3000,position:'top-right'})
      }else{
        toast.error('Error...')
      }
      
    }


    function getAllProducts(){
      axios.get('https://ecommerce.routemisr.com/api/v1/products').then((data)=>{
        
        setallProducts(data?.data?.data)
      }).catch((error)=>{
        console.log(error);
        
      })
    }


    useEffect(()=>{
      getAllProducts()
    } , [])

  return <>
  {allProducts?.length > 0 ? <div className='flex flex-wrap'>
  {allProducts?.map((prod)=>{
    return <div key={prod.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 m-4">
  <Link to={`/productdetails/${prod.id}/${prod.category.name}`}>
  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-75" />
      <img src={prod.imageCover} alt={prod.title} className="w-full object-cover object-center relative" />
    
    </div>
    <div className="p-6">
      <p className="text-green-600 mb-4">{prod.category.name}</p>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{prod.title.split(' ').slice(0,2).join(' ')}</h2>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-indigo-600">{prod.price} EGP</span>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-gray-600">{prod.ratingsAverage}</span>
        </div>
      </div>
      
    </div>
  </div>
  </Link>
  <button onClick={()=>{addProdToCart(prod._id)}}  className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        Add to Cart
      </button>
</div>
  })}
    


  </div>  : <Spinner/>   }

  
  
  
  </>
}
