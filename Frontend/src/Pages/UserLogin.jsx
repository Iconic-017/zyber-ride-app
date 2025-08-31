import React, { useState , useContext } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const toggleMode = () => setDarkMode(!darkMode);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const {user , setuser} = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [userData, setUserData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const Userdata = {
      email,
      password,
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        Userdata
      );
  
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setuser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/user-Home'); // ✅ Only happens if login succeeds
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please check your credentials or server.');
    }
  
    // Optional: Reset form only on success
    setEmail('');
    setpassword('');
  };
  
  



  
  
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });


  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} min-h-screen w-full transition-all duration-500`}>
      
      {/* Header with Mode Toggle */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className={` text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ZYBER</h1>

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

      {/* Login Form */}
      <div className="flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          className={`w-full max-w-sm p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            User
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email<span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="relative">
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password<span className="text-red-500">*</span></label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) =>{setpassword(e.target.value)}}
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
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold"
            >
              Log In
            </motion.button>
          </form>

          {/* Additional Options */}
          <div className="mt-6 text-center space-y-3">
            <div>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>New here? </span>
              <Link 
                to="/user-signup" 
                className={`font-medium ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`}
              >
                Create account
              </Link>
            </div>
            
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link
                to="/rider-login"
                className={`inline-block w-full py-2 rounded-xl font-semibold text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                Login as Captain
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserLogin;