import React from 'react';
import { motion } from 'framer-motion';
import {useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-end bg-gradient-to-br from-gray-900 to-black text-white relative px-6 py-10">
      
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-4 leading-tight"
      >
        Get started<br />with <span className="text-emerald-400">Zyber</span>
      </motion.h1>

      {/* Animated Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-sm text-gray-300 mb-8"
      >
        Book a ride in seconds, wherever you are.
      </motion.p>

      {/* Continue Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl shadow-lg text-center font-semibold text-lg w-full"
        onClick={()=> navigate('/user-login')}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default Home;
