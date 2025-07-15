import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function VerifyResetCode() {

 const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(values) {
setisLoading(true)
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        resetCode: values.resetCode,
      })
      .then((res) => {
        setisLoading(false)
          toast.success('Code verified successfully.' , {duration:3000,position:'top-right'})
        navigate('/resetpassword')
      })
      .catch((err) => {
        setisLoading(false)
        toast.error('Invalid or expired code.')
      
      });
  }

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-6">Enter Reset Code</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="resetCode" className="block text-gray-700 font-bold mb-2">
              Reset Code
            </label>
            <input
              id="resetCode"
              name="resetCode"
              type="text"
              placeholder="Enter the reset code from your email"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {isLoading ?  <i className="fas fa-circle-notch fa-spin"></i> : 'Verify Code' }
          </button>
        </form>
      </div>
    </div>
  );
}
