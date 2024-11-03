
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='w-full p-4 sm:p-6 md:p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'
        >
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className='text-2xl sm:text-3xl font-bold text-center text-black mb-4 sm:mb-6'
          >
            Signup
          </motion.h1>
          <form onSubmit={onSubmitHandler} action="" className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className='label p-2'>
                <span className='text-sm sm:text-base label-text text-black font-semibold'>Full Name</span>
              </label>
              <input
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className='w-full input input-bordered h-10 sm:h-12 text-sm sm:text-base px-3'
                type="text"
                placeholder='Full Name' />
            </motion.div>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className='label p-2'>
                <span className='text-sm sm:text-base label-text text-black font-semibold'>Username</span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className='w-full input input-bordered h-10 sm:h-12 text-sm sm:text-base px-3'
                type="text"
                placeholder='Username' />
            </motion.div>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className='label p-2'>
                <span className='text-sm sm:text-base label-text text-black font-semibold'>Password</span>
              </label>
              <div className="relative">
                <input
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className='w-full input input-bordered h-10 sm:h-12 pr-10 text-sm sm:text-base px-3'
                  type={showPassword ? "text" : "password"}
                  placeholder='Password' />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6"
                  >
                    {showPassword ? 
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : 
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    }
                  </motion.button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className='label p-2'>
                <span className='text-sm sm:text-base label-text text-black font-semibold'>Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  value={user.confirmPassword}
                  onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                  className='w-full input input-bordered h-10 sm:h-12 pr-10 text-sm sm:text-base px-3'
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Confirm Password' />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6"
                  >
                    {showConfirmPassword ? 
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : 
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    }
                  </motion.button>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className='flex items-center my-4 text-black font-semibold'
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className='flex items-center'
              >
                <p>Male</p>
                <input
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                  defaultChecked
                  className="checkbox mx-2 border-black" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className='flex items-center'
              >
                <p>Female</p>
                <input
                  type="checkbox"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                  defaultChecked
                  className="checkbox mx-2 border-black" />
              </motion.div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className='text-center text-sm sm:text-base text-black font-semibold pt-2'
            >
              Already have an account?{' '}
              <Link to="/login" className="hover:text-blue-600 transition-colors">
                login
              </Link>
            </motion.p>
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.9 }}
              className="pt-2"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit' 
                className='btn btn-block h-10 sm:h-12 text-sm sm:text-base border border-slate-700'
              >
                Signup
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Signup