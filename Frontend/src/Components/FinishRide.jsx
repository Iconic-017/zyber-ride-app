import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinishRide = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed inset-0 z-50 bg-white rounded-t-3xl shadow-xl px-6 py-6 overflow-y-auto"
        >
          {/* Header */}
          <h2 className="text-lg font-bold mb-5">Finish this Ride</h2>

          {/* Rider Info */}
          <div className="flex justify-between items-center bg-yellow-400 px-4 py-3 rounded-xl mb-5">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Rider"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold text-sm text-black">Harshi Pateliya</p>
            </div>
            <p className="text-black font-medium text-sm">2.2 KM</p>
          </div>

          {/* Pickup & Drop */}
          <div className="space-y-4 text-sm text-gray-800 mb-6">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold">562/11-A</p>
                  <p className="text-xs text-gray-500">Kankariya Talab, Bhopal</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fare Info */}
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-6 h-6 text-gray-600" />
            <div>
              <p className="text-lg font-semibold">₹193.20</p>
              <p className="text-sm text-gray-500">Cash</p>
            </div>
          </div>

          {/* Finish Ride Button */}
          <Link to="/captain-home">
            <button className="w-full bg-green-600 hover:bg-green-700 transition text-white font-bold text-lg py-3 rounded-xl">
              Finish Ride
            </button>
          </Link>

          {/* Note */}
          <p className="text-xs text-red-500 text-center mt-3">
            Click on finish ride button if you have completed the payment
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FinishRide;
