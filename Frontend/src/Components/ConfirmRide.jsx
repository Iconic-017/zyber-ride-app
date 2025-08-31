// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MapPin, Square } from 'lucide-react';

// const ConfirmRide = ({ isVisible, pickup = '', destination = '', onConfirm }) => {
//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial={{ y: '100%' }}
//           animate={{ y: 0 }}
//           exit={{ y: '100%' }}
//           transition={{ type: 'spring', damping: 25 }}
//           className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 h-[90%] shadow-xl"
//         >
//           <div className="text-center text-lg font-semibold mb-6">
//             Confirm Your Ride
//           </div>

//           {/* Ride Details */}
//           <div className="space-y-6 px-2">
//             {/* Pickup Location */}
//             <div className="flex items-start gap-3">
//               <MapPin className="text-black mt-1" />
//               <div>
//                 <p className="font-semibold text-sm">{pickup || 'Pickup location'}</p>
//                 <p className="text-xs text-gray-500">Kaikondrahalli, Bengaluru, Karnataka</p>
//               </div>
//             </div>

//             {/* Destination */}
//             <div className="flex items-start gap-3">
//               <Square className="text-black mt-1" />
//               <div>
//                 <p className="font-semibold text-sm">{destination || 'Destination'}</p>
//                 <p className="text-xs text-gray-500">
//                   17th Cross Rd, PWD Quarters, 1st Sector, etc.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Confirm Button */}
//           <button
//             onClick={onConfirm}
//             className="w-full mt-8 bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
//           >
//             Confirm Ride
//           </button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ConfirmRide;















import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Square, Timer, Ruler } from 'lucide-react';

const ConfirmRide = ({
  isVisible,
  pickup = '',
  destination = '',
  selectedRide,
  distance,         // e.g., 12.5 (in km)
  duration,         // e.g., 22 (in minutes)
  onConfirm
}) => {
  if (!selectedRide) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 h-[90%] shadow-xl overflow-y-auto"
        >
          {/* Vehicle Image */}
          <div className="flex justify-center mb-4">
            <img
              src={selectedRide.icon}
              alt={selectedRide.name}
              className="w-28 h-20 object-contain"
            />
          </div>

          {/* Ride Title */}
          <div className="text-center text-xl font-bold mb-2">
            {selectedRide.name}
          </div>

          {/* Fare */}
          <div className="text-center text-green-600 font-semibold text-lg mb-4">
            ₹{selectedRide.price.toFixed(2)}
          </div>

          {/* Distance & Duration */}
          <div className="flex justify-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              {distance ? `${distance.toFixed(1)} km` : '...'}
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              {duration ? `${duration} min` : '...'}
            </div>
          </div>

          {/* Ride Summary */}
          <div className="space-y-6 px-2">
            {/* Pickup */}
            <div className="flex items-start gap-3">
              <MapPin className="text-black mt-1" />
              <div>
                <p className="font-semibold text-sm">{pickup || 'Pickup location'}</p>
                <p className="text-xs text-gray-500">We'll notify your captain</p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <Square className="text-black mt-1" />
              <div>
                <p className="font-semibold text-sm">{destination || 'Destination'}</p>
                <p className="text-xs text-gray-500">Best route will be chosen</p>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="w-full mt-10 bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Confirm Ride
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmRide;
