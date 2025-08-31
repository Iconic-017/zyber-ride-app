import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Square } from 'lucide-react';

const SearchingDriver = ({ isVisible, onClose, pickup = '', destination = '' }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 h-[90%] shadow-xl"
        >
          {/* Header Text */}
          <div className="text-center text-lg font-semibold mb-4">
            Looking for nearby drivers
          </div>

          {/* Car with Ping Animation */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            {/* Ping Circles */}
            <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping-slow opacity-75" />
            <span className="absolute inset-4 rounded-full border-2 border-blue-300 animate-ping-slower opacity-60" />
            <span className="absolute inset-8 rounded-full border-2 border-blue-200 animate-ping-slowest opacity-40" />

            {/* Car Image */}
            <img
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt="Car"
              className="w-full h-full object-contain relative z-10 animate-pulse"
            />
          </div>

          {/* Divider */}
          <hr className="my-6" />

          {/* Pickup & Destination */}
          <div className="space-y-6 px-2">
            {/* Pickup Location */}
            <div className="flex items-start gap-3">
              <MapPin className="text-black mt-1" />
              <div>
                <p className="font-semibold text-sm">{pickup || 'Your Pickup Location'}</p>
                <p className="text-xs text-gray-500">Kaikondrahalli, Bengaluru, Karnataka</p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <Square className="text-black mt-1" />
              <div>
                <p className="font-semibold text-sm">{destination || 'Your Destination'}</p>
                <p className="text-xs text-gray-500">
                  17th Cross Rd, PWD Quarters, 1st Sector, etc.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchingDriver;
