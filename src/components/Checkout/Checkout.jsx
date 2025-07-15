import React, { useContext, useEffect, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Checkout() {
  let {cartId , resetCart} =useContext(CartContext)
  
    const [isOnline ,setisOnline] = useState(true)

    function payCash(val){
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
        shippingAddress:val
      } , {
        headers:{
          token:localStorage.getItem('usertoken')
        }
      }).then((response)=>{console.log(response);
        if(response.data.status==='success'){
          toast.success('Checkout Done')
          resetCart()
        }else{toast.error('Error..')}
      }).catch((error)=>{console.log(error);
      })
      
    }

    function payOnline(val){
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/` , {
        shippingAddress:val
      } , {
        headers:{
          token:localStorage.getItem('usertoken')
        }
      }).then((response)=>{
        
        console.log(response);
        if(response.data.status==='success'){
          console.log(response.data.session.url);
          window.location.href=response.data.session.url
          
        }
      }).catch((error)=>{console.log(error);
      })
    }
    function detectPayment(val){
      if(isOnline){
        payOnline(val)
      }else{payCash(val)}
    }

     let formik =useFormik({
          initialValues:{
        city:"",
        phone:"",
        details:""
        
    }
    
    ,
    
    onSubmit:detectPayment
      
    
        })
    

    useEffect(()=>{

    } , [])

  return <>

<div className="container mx-auto p4-10">
  <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
    <div className="md:flex">
      <div className="w-full px-6 py-8 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        <p className="mt-4 text-gray-600">Please fill out the form below to complete your purchase.</p>
        <form onSubmit={formik.handleSubmit} className="mt-6">
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-2" htmlFor="details">
              Details
            </label>
            <input value={formik.values.details} onChange={formik.handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="details" name='details' type="text" placeholder="Eg. 33 Gesr Elswees" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input value={formik.values.phone} onChange={formik.handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" name='phone' type="tel" placeholder="Eg. 01225512812" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-2" htmlFor="city">
              City
            </label>
            <input value={formik.values.city} onChange={formik.handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" name='city' type="text" placeholder="Eg. Cairo" />
          </div>
          
          
          <div className='flex justify-between'>
          <button onClick={()=>{setisOnline(false)}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Pay Cash
          </button>
          <button onClick={()=>{setisOnline(true)}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Pay Online
          </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

</>

}
