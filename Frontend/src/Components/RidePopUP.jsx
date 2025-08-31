import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleRides = [
  {
    name: 'Esther Berry',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    pickup: '7958 Swift Village',
    drop: '105 William St, Chicago, US',
    amount: '$25.00',
    distance: '2.2 km',
    tags: ['ApplePay', 'Discount'],
  },
  {
    name: 'Daniel Smith',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    pickup: '120 Park Ave',
    drop: '980 Lincoln Blvd, NY',
    amount: '$18.75',
    distance: '3.5 km',
    tags: ['Promo'],
  },
  {
    name: 'Anna Keller',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    pickup: '452 Elm Street',
    drop: '22 Maple Dr, Texas',
    amount: '$30.00',
    distance: '4.1 km',
    tags: ['Cash', 'First Ride'],
  },
];

const RidePopUp = ({ onAccept }) => {
  const [index, setIndex] = useState(0);
  const current = sampleRides[index];

  const handleIgnore = () => {
    setIndex((prev) => (prev + 1) % sampleRides.length);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className=" w-full h-screen mx-auto bg-white rounded-t-2xl shadow-xl p-4 space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={current.photo} alt={current.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{current.name}</p>
              <div className="flex gap-1 mt-1">
                {current.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-yellow-300 text-xs text-black px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">{current.amount}</p>
            <p className="text-sm text-gray-400">{current.distance}</p>
          </div>
        </div>

        {/* Pickup & Drop Info */}
        <div className="text-sm">
          <div className="mb-2">
            <p className="text-gray-400 text-xs font-medium">PICK UP</p>
            <p className="font-semibold">{current.pickup}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-medium">DROP OFF</p>
            <p className="font-semibold">{current.drop}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handleIgnore}
            className="text-gray-400 bg-gray-600 px-6 py-2 rounded-xl font-medium text-sm"
          >
            Ignore
          </button>
          <button
            onClick={() => onAccept(current)}
            className="bg-green-400 hover:bg-emerald-500 text-black px-6 py-2 rounded-xl font-semibold shadow"
          >
            Accept
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RidePopUp;
