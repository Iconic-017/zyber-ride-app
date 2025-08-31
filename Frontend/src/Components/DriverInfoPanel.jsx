import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ShieldCheck, Share2 } from 'lucide-react';

const DriverInfoPanel = ({ pickup, destination }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-5 h-[90%] shadow-xl"
    >
      {/* Driver and Vehicle */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" className="w-14 h-14 rounded-full" alt="Driver" />
          <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" className="w-20 h-14 object-contain" alt="Car" />
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">SANTH</p>
          <p className="text-lg font-bold">KA15AK00-0</p>
          <p className="text-sm text-gray-500">White Suzuki S-Presso LXI</p>
          <p className="text-sm">⭐ 4.9</p>
        </div>
      </div>

      {/* Message */}
      <div className="flex mb-5">
        <input type="text" placeholder="Send a message..." className="flex-1 border rounded-l-lg p-2 text-sm" />
        <button className="bg-black text-white px-4 rounded-r-lg text-sm">Send</button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around mb-6">
        <div className="flex flex-col items-center">
          <ShieldCheck className="text-blue-500 mb-1" />
          <span className="text-sm">Safety</span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 className="text-blue-500 mb-1" />
          <span className="text-sm">Share my trip</span>
        </div>
        <div className="flex flex-col items-center">
          <Phone className="text-blue-500 mb-1" />
          <span className="text-sm">Call driver</span>
        </div>
      </div>

      {/* Address Info */}
      <div className="space-y-4">
        <div>
          <p className="font-bold text-sm">📍 {pickup}</p>
          <p className="text-xs text-gray-500">Kaikondrahalli, Bengaluru, Karnataka</p>
        </div>
        <div>
          <p className="font-bold text-sm">▣ {destination}</p>
          <p className="text-xs text-gray-500">17th Cross Rd, PWD Quarters, etc.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverInfoPanel;
