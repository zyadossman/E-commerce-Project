import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetPassword() {

  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  function handleReset(values) {

    setisLoading(true)

    axios
      .put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email: values.email,
        newPassword: values.newPassword,
      })
      .then((res) => {
            setisLoading(false)
       toast.success('Password updated successfully. You can now log in.' , {duration:3000,position:'top-right'})
   
        navigate('/login')
      })
      .catch((err) => {
        setisLoading(false)
        toast.error('Failed to reset password.')
      });
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    onSubmit: handleReset,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-6">Reset Your Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {isLoading ?  <i className="fas fa-circle-notch fa-spin"></i> : 'Update Password' }
          </button>
        </form>


      </div>
    </div>
  );
}