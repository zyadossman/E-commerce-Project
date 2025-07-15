import React, { useContext, useEffect, useState } from 'react'
import style from './Productdetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios/unsafe/axios.js';

import Slider from "react-slick";
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../Context/CartContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import toast from 'react-hot-toast';


export default function Productdetails() {
  let {addToCart} =useContext(CartContext)

    const [allProducts ,setallProducts] = useState(null)

 async function addProdToCart(prodId){
      let response = await addToCart(prodId)
      console.log(response);
      if(response?.data?.status==='success'){
        toast.success(response?.data?.message , {duration:3000,position:'top-right'})
      }else{
        toast.error('Error...')
      }
      
    }


var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  let {id , category} =  useParams()
  console.log(category);
  
    const [ProductDetails ,setProductDetails] = useState(null)
    const [relatedProduct ,setrelatedProduct] = useState(null)

    function getAllProducts(){
      axios.get('https://ecommerce.routemisr.com/api/v1/products').then((data)=>{
        
      let related =  data?.data?.data?.filter((prod)=>{return prod.category.name === category})
      console.log('rel',related);
      setrelatedProduct(related)
      }).catch((error)=>{console.log(error);
      })
    }




function getProductDetails(){
axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{

setProductDetails(data?.data?.data)
}).catch((error)=>{
console.log(error);

})

}


    useEffect(()=>{
      getAllProducts()
      getProductDetails()
    } , [id])

  return <>
{ProductDetails? <div className='flex flex-wrap items-center'>

    <div className='w-full md:w-1/4'>
    <Slider {...settings}>

      {ProductDetails?.images.map((src)=>{ return <img className='w-full' src={src} alt={ProductDetails?.title} /> })}


    </Slider>
    
    </div>
    <div className='w-full md:w-3/4'>
    <div className='ms-5'>
      <h3 className='text-3xl font-black'>
    {ProductDetails.title}
      </h3>
      <p className='text-slate-500 my-2'>{ProductDetails.description}</p>
      <span className='text-green-400 text-xl'>{ProductDetails?.category?.name}</span>
      <div className="flex items-center justify-start gap-6 my-5">
        <span className="text-2xl font-bold text-indigo-600">{ProductDetails?.price} EGP</span>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-gray-600">{ProductDetails?.ratingsAverage}</span>
        </div>
      </div>
    </div>
    <button onClick={()=>{addProdToCart(ProductDetails?._id)}} className="ms-2 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        Add to Cart
      </button>
    </div>

    

  </div> : <Spinner/>}

  <div className='my-9'>
    <h3 className='text-3xl text-green-400 text-center my-4'>Related Products</h3>
    <div className='flex flex-wrap gap-y-6'>
      {relatedProduct?.map((prod)=>{ return <div key={prod._id} className='w-full md:w-1/3 lg:w-1/4 xl:w-1/5'>
      <Link to={`/productdetails/${prod.id}/${prod.category.name}`}>
  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl mx-1">
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
      <button   className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        Add to Cart
      </button>
    </div>
  </div>

      </Link>
  

      </div> })}
      

    </div>
  </div>
  
  </>
}
