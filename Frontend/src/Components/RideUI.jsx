// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown, Clock4, Star, Users } from 'lucide-react';

// const iconSizes = {
//   chevron: { width: 24, height: 24 },
//   vehicle: { width: 80, height: 60 },
//   small: { width: 16, height: 16 },
//   payment: { width: 20, height: 20 },
// };

// const vehicleOptions = [
//   {
//     name: 'Uber Go',
//     price: 769.93,
//     oldPrice: 1069.93,
//     description: 'Affordable compact rides',
//     eta: '2:42pm',
//     time: '4 min',
//     icon: 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png',
//     tag: null,
//     seat: 4
//   },
//   {
//     name: 'Go Sedan',
//     price: 977.16,
//     oldPrice: 1077.16,
//     description: 'Affordable sedans',
//     eta: '2:42pm',
//     time: '5 min',
//     icon: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1429,w_2144/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png',
//     tag: null,
//     seat: 6
//   },
//   {
//     name: 'Uber Moto',
//     price: 99.50,
//     oldPrice: 549.50,
//     description: 'Quick and affordable bike rides',
//     eta: '2:40pm',
//     time: '3 min',
//     icon: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1429,w_2144/v1649231046/assets/84/ad96b0-f8d6-41a7-babf-816237fe530d/original/Uber_Moto_Orange_696x464_pixels_Tablet.png',
//     tag: null,
//     seat: 1
//   },
//   {
//     name: 'Uber Auto',
//     price: 199.00,
//     oldPrice: 349.00,
//     description: 'Affordable auto rickshaw rides',
//     eta: '2:38pm',
//     time: '2 min',
//     icon: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1429,w_2144/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
//     tag: null,
//     seat: 3
//   },
// ];

// const RideUI = ({ isVisible, onClose , onSelectRide}) => {
//   const [selectedRide, setSelectedRide] = useState(null);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           role="dialog"
//           initial={{ y: '100%' }}
//           animate={{ y: 0 }}
//           exit={{ y: '100%' }}
//           transition={{ type: 'spring', damping: 25 }}
//           className="absolute bottom-0 left-0 right-0 bg-white text-gray-800 rounded-t-3xl z-50 p-5 h-[90%] overflow-y-scroll shadow-xl"
//         >
//           {/* Header */}
//           <div className="flex justify-between items-center mb-4 border-b pb-3">
//             <h2 className="text-lg font-semibold">Choose a ride</h2>
//             <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full" aria-label="Close ride selector">
//               <ChevronDown width={iconSizes.chevron.width} height={iconSizes.chevron.height} />
//             </button>
//           </div>

//           {/* Promo */}
//           <div className="bg-green-100 text-green-800 text-sm px-3 py-1 mb-4 rounded-md inline-block">
//             ₹75.00 promo applied
//           </div>

//           {/* Ride List */}
//           <div className="space-y-4">
//             {vehicleOptions.map((vehicle, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => setSelectedRide(vehicle)}
//                 className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition border 
//                   ${selectedRide?.name === vehicle.name 
//                     ? 'border-2 border-emerald-500 bg-emerald-50' 
//                     : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={vehicle.icon}
//                     alt={vehicle.name}
//                     width={iconSizes.vehicle.width}
//                     height={iconSizes.vehicle.height}
//                     className="mr-4 object-contain"
//                   />
//                   <div>
//                     <div className="flex items-center gap-1">
//                       <p className="font-semibold">{vehicle.name}</p>
//                       {vehicle.tag === 'clock' && <Clock4 width={iconSizes.small.width} height={iconSizes.small.height} />}
//                       {vehicle.tag === 'star' && <Star width={iconSizes.small.width} height={iconSizes.small.height} />}
//                       <Users width={iconSizes.small.width} height={iconSizes.small.height} className="ml-2 text-gray-500" />
//                       <span className="text-sm text-gray-500">{vehicle.seat}</span>
//                     </div>
//                     <p className="text-xs text-gray-500">{vehicle.description}</p>
//                     <p className="text-xs text-gray-500">{vehicle.eta} • {vehicle.time}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-green-600 font-bold">₹{vehicle.price.toFixed(2)}</p>
//                   <p className="text-xs line-through text-gray-400">₹{vehicle.oldPrice.toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Payment */}
//           <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl mt-6 border border-gray-200">
//             <div className="flex items-center gap-3">
//               <span className="text-green-600">💵</span>
//               <span>Cash</span>
//             </div>
//             <ChevronDown width={iconSizes.payment.width} height={iconSizes.payment.height} className="text-gray-500" />
//           </div>

//           {/* Confirm Button */}
//           <button
//             disabled={!selectedRide}
//             className={`w-full mt-4 font-semibold py-3 rounded-xl transition
//               ${selectedRide 
//                 ? 'bg-black text-white hover:bg-gray-800' 
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//               onClick={onSelectRide}   // ✅ Trigger passed function
//           >
//             {selectedRide ? `Choose ${selectedRide.name}` : 'Select a ride to continue'}
//           </button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default RideUI;


























import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock4, Star, Users } from 'lucide-react';

const iconSizes = {
  chevron: { width: 24, height: 24 },
  vehicle: { width: 80, height: 60 },
  small: { width: 16, height: 16 },
  payment: { width: 20, height: 20 },
};

const vehicleTemplates = [
  {
    name: 'Uber Go',
    type: 'car',
    description: 'Affordable compact rides',
    eta: '2:42pm',
    time: '4 min',
    icon: 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png',
    tag: null,
    seat: 4
  },
  {
    name: 'Uber Moto',
    type: 'bike',
    description: 'Quick and affordable bike rides',
    eta: '2:40pm',
    time: '3 min',
    icon: 'https://img.autocarpro.in/autocarpro/4d3ef0c9-c75e-46a3-af25-fab216e0bfe8_Untitled.jpg?w=750&h=490&q=75&c=1',
    tag: null,
    seat: 1
  },
  {
    name: 'Uber Auto',
    type: 'auto',
    description: 'Affordable auto rickshaw rides',
    eta: '2:38pm',
    time: '2 min',
    icon: 'https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png',
    tag: null,
    seat: 3
  }
];

const RideUI = ({ isVisible, onClose, onSelectRide, fareInfo }) => {
  const [selectedRide, setSelectedRide] = useState(null);

  const vehicleOptions = useMemo(() => {
    if (!fareInfo) return [];
    return vehicleTemplates.map(vehicle => ({
      ...vehicle,
      price: fareInfo.fares?.[vehicle.type] || 0,
      oldPrice: (fareInfo.fares?.[vehicle.type] || 0) + 100
    }));
  }, [fareInfo]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute bottom-0 left-0 right-0 bg-white text-gray-800 rounded-t-3xl z-50 p-5 h-[90%] overflow-y-scroll shadow-xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <h2 className="text-lg font-semibold">Choose a ride</h2>
            <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
              <ChevronDown width={iconSizes.chevron.width} height={iconSizes.chevron.height} />
            </button>
          </div>

          {/* Promo */}
          <div className="bg-green-100 text-green-800 text-sm px-3 py-1 mb-4 rounded-md inline-block">
            ₹75.00 promo applied
          </div>

          {/* Ride List */}
          <div className="space-y-4">
            {vehicleOptions.map((vehicle, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedRide(vehicle)}
                className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition border 
                  ${selectedRide?.name === vehicle.name
                    ? 'border-2 border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="flex items-center">
                  <img
                    src={vehicle.icon}
                    alt={vehicle.name}
                    width={iconSizes.vehicle.width}
                    height={iconSizes.vehicle.height}
                    className="mr-4 object-contain"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">{vehicle.name}</p>
                      {vehicle.tag === 'clock' && <Clock4 width={iconSizes.small.width} height={iconSizes.small.height} />}
                      {vehicle.tag === 'star' && <Star width={iconSizes.small.width} height={iconSizes.small.height} />}
                      <Users width={iconSizes.small.width} height={iconSizes.small.height} className="ml-2 text-gray-500" />
                      <span className="text-sm text-gray-500">{vehicle.seat}</span>
                    </div>
                    <p className="text-xs text-gray-500">{vehicle.description}</p>
                    <p className="text-xs text-gray-500">{vehicle.eta} • {vehicle.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">₹{vehicle.price.toFixed(2)}</p>
                  <p className="text-xs line-through text-gray-400">₹{vehicle.oldPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment */}
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl mt-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-green-600">💵</span>
              <span>Cash</span>
            </div>
            <ChevronDown width={iconSizes.payment.width} height={iconSizes.payment.height} className="text-gray-500" />
          </div>

          {/* Confirm Button */}
          <button
            disabled={!selectedRide}
            className={`w-full mt-4 font-semibold py-3 rounded-xl transition
              ${selectedRide
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            onClick={() => onSelectRide(selectedRide)}
          >
            {selectedRide ? `Choose ${selectedRide.name}` : 'Select a ride to continue'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RideUI;
