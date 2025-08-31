import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {UserContext} from '../context/UserContext';

const UserSignup = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const toggleMode = () => setDarkMode(!darkMode);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const {user , setuser} = React.useContext(UserContext)

  // Separate state variables for each field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const [errors, setErrors] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newuser = {
      fullname:{
      firstname: firstName,
      lastname: lastName,
      },
      email,
      password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register` , newuser);

    if(response.status === 201){
      const data = response.data
      setuser(data.user)
      localStorage.setItem('token' , data.token)
      navigate('/user-Home')
    }


    setUserData(newuser);

    // Clear form
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    // navigate('/');
  };

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} min-h-screen w-full transition-all duration-500`}>
      
      {/* Header with Mode Toggle */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ZYBER</h1>

        <button
          onClick={toggleMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* Signup Form */}
      <div className="flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          className={`w-full max-w-sm p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Create Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
            </div>

            {/* Email */}
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 p-1 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold"
            >
              Sign Up
            </motion.button>
          </form>

          {/* Login Link */}
          <div className={`mt-6 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span>Already have an account? </span>
            <Link 
              to="/user-login" 
              className={`font-medium ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`}
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSignup;