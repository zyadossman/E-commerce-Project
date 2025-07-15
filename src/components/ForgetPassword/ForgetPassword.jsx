import React, { useEffect, useState } from 'react'
import style from './ForgetPassword.module.css'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



export default function ForgetPassword() {

  const [isLoading ,setisLoading] = useState(false)

  let navigate =useNavigate()

  function forgetPassword(values) {

    setisLoading(true)

    axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      { email: values.email }
    )
    .then((response) => {
         setisLoading(false)
           toast.success('Reset link has been sent to your email.' , {duration:3000,position:'top-right'})
    
      navigate('/resetcode')

    })
    .catch((err) => {
               setisLoading(false)
               toast.error('Something went wrong.')

     
    });
  }


     let formik =useFormik({
              initialValues:{
            email:""
            
        }
        
        ,
        
        onSubmit:forgetPassword
          
        
            })

    useEffect(()=>{

    } , [])

  return <>
<div className="min-h-screen flex items-center justify-center">
  <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
    <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email Address
        </label>
        <input value={formik.values.email} onChange={formik.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name='email' type="email" placeholder="Enter your email address" />
      </div>
      <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"> {isLoading ?  <i className="fas fa-circle-notch fa-spin"></i> : 'Reset Password' }   
          </button>
        </div>
    </form>
  </div>
</div>

  </>
}
