import React, { useContext, useEffect, useState } from 'react'
import style from './Register.module.css'
import axios from './../../../node_modules/axios/lib/axios';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';




export default function Register() {
 let {userLogin , setuserLogin} = useContext(UserContext)
    const [errMsg ,seterrMsg] = useState(null)
    const [isLoading ,setisLoading] = useState(false)
 let navigate=useNavigate()
 function submitForm(values){
  setisLoading(true)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' ,  values).then(({data})=>{
    setisLoading(false)
    if(data.message==='success'){
      setuserLogin(data?.token)
      
      navigate('/')
      localStorage.setItem('usertoken'  , data?.token)
    }
    
  }).catch((error)=>{
    setisLoading(false)
    console.log(error?.response?.data?.message);
    seterrMsg(error?.response?.data?.message)
    
  })
      
      
    }

    let validation = Yup.object().shape({
      name:Yup.string().required('Name is required ').min(3 , 'Min 3 letters').max(8 , 'Max 8 letters'),
      email:Yup.string().required('Email is required').email('Invalid email'),
      password:Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{4,10}$/  ,  'Invalid password'),
      rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')]),
      phone:Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/ , 'Invalid phone number')
    })

    let formik =useFormik({
      initialValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
}, validationSchema:validation

,

onSubmit:submitForm
  

    })

    useEffect(()=>{

    } , [])

    
  return <>

  <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="bg-white shadow-md rounded-md p-6">
      
      <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-500">
        Register <i className="fa-solid px-4 fa-user-plus" />

      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
          <div className="mt-1">
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id='name' name="name" type="username" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
         
          {/* alert */}

          {formik.errors.name  && formik.touched.name? <div id="toast-warning" className="flex justify-center items-center w-full p-2 text-white bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-800  rounded-lg dark:bg-orange-700 dark:text-orange-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
    <span className="sr-only">Warning icon</span>
  </div>
  <div className="ml-3 text-sm font-normal">{formik.errors.name}</div>
</div>  : null }
          


          {/* alert */}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1">
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' name="email" type="email-address" autoComplete="email-address" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.email  &&  formik.touched.email? <div id="toast-warning" className="flex justify-center items-center w-full p-2 text-white bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-800  rounded-lg dark:bg-orange-700 dark:text-orange-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
    <span className="sr-only">Warning icon</span>
  </div>
  <div className="ml-3 text-sm font-normal">{formik.errors.email}</div>
</div>  : null }
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' name="password" type="password" autoComplete="password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.password  &&  formik.touched.password? <div id="toast-warning" className="flex justify-center items-center w-full p-2 text-white bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-800  rounded-lg dark:bg-orange-700 dark:text-orange-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
    <span className="sr-only">Warning icon</span>
  </div>
  <div className="ml-3 text-sm font-normal">{formik.errors.password}</div>
</div>  : null }
        </div>
        <div>
          <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="mt-1">
            <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id='rePassword' name="rePassword" type="password" autoComplete="confirm-password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.rePassword  && formik.touched.rePassword? <div id="toast-warning" className="flex justify-center items-center w-full p-2 text-white bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-800  rounded-lg dark:bg-orange-700 dark:text-orange-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
    <span className="sr-only">Warning icon</span>
  </div>
  <div className="ml-3 text-sm font-normal">{formik.errors.rePassword}</div>
</div>  : null }
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <div className="mt-1">
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' name="phone" type="tel" autoComplete="confirm-password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.phone  && formik.touched.phone? <div id="toast-warning" className="flex justify-center items-center w-full p-2 text-white bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-800  rounded-lg dark:bg-orange-700 dark:text-orange-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
    <span className="sr-only">Warning icon</span>
  </div>
  <div className="ml-3 text-sm font-normal">{formik.errors.phone}</div>
</div>  : null }
        </div>
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"> {isLoading ?  <i class="fas fa-circle-notch fa-spin"></i> : 'Register' }   
          </button>
        </div>
         {/* alert */}

          {errMsg? <div id="toast-warning" className="flex justify-center items-center w-full p-2 text-white bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-800  rounded-lg dark:bg-orange-700 dark:text-orange-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
    <span className="sr-only">Warning icon</span>
  </div>
  <div className="ml-3 text-sm font-normal">{errMsg}</div>
</div>  : null }
          


          {/* alert */}
      </form>
    </div>
  </div>
</div>

  </>
}
