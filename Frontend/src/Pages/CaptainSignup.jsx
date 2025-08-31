import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainSignup = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const toggleMode = () => setDarkMode(!darkMode);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  // State variables for form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🚗 Vehicle details
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rider/register`, CaptainData);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (err) {
      console.error('Signup error:', err.response);
      alert('Registration failed. Check console for details.');
    }

    // Clear form
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-slate-900 to-indigo-900' : 'bg-white'} min-h-screen w-full transition-all duration-500`}>
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ZYBER</h1>
        <button
          onClick={toggleMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
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
          className={`w-full max-w-sm p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-100'}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Create Captain Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name<span className="text-red-500">*</span></label>
              <input type="text" value={firstName} required onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-emerald-500`} />
            </div>

            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-emerald-500`} />
            </div>

            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email<span className="text-red-500">*</span></label>
              <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-emerald-500`} />
            </div>

            <div className="relative">
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password<span className="text-red-500">*</span></label>
              <input type={showPassword ? "text" : "password"} value={password} required onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border pr-10 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-emerald-500`} />
              <button type="button" onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 p-1 focus:outline-none">
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
              </button>
            </div>

            {/* Vehicle Info */}
            <div className="pt-2">
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Vehicle Color<span className="text-red-500">*</span></label>
              <input type="text" value={vehicleColor} required onChange={(e) => setVehicleColor(e.target.value)}
                placeholder="Red, Black, etc."
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border-gray-400 focus:ring-emerald-500`} />
            </div>

            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Vehicle Plate<span className="text-red-500">*</span>
                </label>
              <input type="text" value={vehiclePlate} required onChange={(e) => setVehiclePlate(e.target.value)}
                placeholder="DL01AB1234"
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border-gray-400 focus:ring-emerald-500`} />
            </div>

            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Vehicle Capacity<span className="text-red-500">*</span>
                </label>
              <input type="number" value={vehicleCapacity} required min={1} onChange={(e) => setVehicleCapacity(e.target.value)}
                placeholder="1-4"
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border-gray-400 focus:ring-emerald-500`} />
            </div>

            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Vehicle Type<span className="text-red-500">*</span></label>
              <select value={vehicleType} required onChange={(e) => setVehicleType(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border-gray-400 focus:ring-emerald-500`}>
                <option value="">Select type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold"
            >
              Sign Up
            </motion.button>
          </form>

          {/* Link */}
          <div className={`mt-6 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span>Already have an account? </span>
            <Link to="/rider-login" className={`font-medium ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`}>
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaptainSignup;
