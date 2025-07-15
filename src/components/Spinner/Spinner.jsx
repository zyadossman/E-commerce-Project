import React, { useEffect, useState } from 'react'
import style from './Spinner.module.css'
import { Oval } from 'react-loader-spinner'

export default function Spinner() {
    const [counter ,setCounter] = useState(0)

    useEffect(()=>{

    } , [])

  return <>
  <div className='h-screen flex justify-center items-center'>
    <Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

  </div>
  
  </>
}
