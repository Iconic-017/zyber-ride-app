import React, { useState , useContext } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const toggleMode = () => setDarkMode(!darkMode);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const Captain = {
      email,
      password,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rider/login`, Captain);
      
      if (response.status === 200) {
        const data = response.data;
        
        setCaptain(data.captain); // from context
        localStorage.setItem('token', data.token);
        
        navigate('/captain-home');
      }
    } catch (err) {
      console.error('Login error:', err.response);
      alert('Login failed. Check email/password and try again.');
    }
  
    setEmail('');
    setpassword('');
  };

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-slate-900 to-indigo-900' : 'bg-slate-50'} min-h-screen w-full transition-all duration-500`}>
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className={`text-2xl font-bold tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>ZYBER</h1>

        <button
          onClick={toggleMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* Login Box */}
      <div className="flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          className={`w-full max-w-sm p-6 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-30 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white'}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Captain Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email<span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password<span className="text-red-500">*</span></label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-md border pr-10 ${darkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 p-1"
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
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              Log In
            </motion.button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <div>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>New Captain? </span>
              <Link 
                to="/rider-signup" 
                className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                Create account
              </Link>
            </div>

            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}>
              <Link
                to="/user-login"
                className={`inline-block w-full py-2 rounded-xl font-semibold text-center ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-gray-800'}`}
              >
                Login as User
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaptainLogin;
