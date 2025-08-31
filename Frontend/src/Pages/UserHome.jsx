// import React, { useState , useEffect} from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, MapPin, Navigation , ChevronDown} from 'lucide-react';
// import LocationPanel from '../Components/LocationPanel';
// import RideUI from '../Components/RideUI';
// import SearchingDriver from '../Components/SearchingDriver';
// import ConfirmRide from '../Components/ConfirmRide';
// import DriverInfoPanel from '../Components/DriverInfoPanel';

// const UserHomepage = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeInput, setActiveInput] = useState(null);
//   const [pickup, setPickup] = useState('');
  
//   const [destination, setDestination] = useState('');
//   const [showRideOptions, setShowRideOptions] = useState(false);
//   const [showConfirmRide, setShowConfirmRide] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [showDriverInfo, setShowDriverInfo] = useState(false);



//   const handleRideSelect = () => {
//     setShowRideOptions(false);   // hide RideUI
//     setShowConfirmRide(true);           // show SearchingDriver
//   };
  


//   const handleInputClick = (type) => {
//     setActiveInput(type);
//     setIsExpanded(true);
//   };

//   const handleClose = () => {
//     setIsExpanded(false);
//     setActiveInput(null);
//   };

//   const handleSuggestionClick = (value) => {
//     if (activeInput === 'pickup') setPickup(value);
//     else setDestination(value);
//     // setIsExpanded(false);
//   };

//   useEffect(() => {
//     if (searching) {
//       const delay = Math.floor(Math.random() * 6) + 2; // random between 2–7
//       const timer = setTimeout(() => {
//         setSearching(false);      // hide Searching UI
//         setShowDriverInfo(true);  // show Driver Info UI
//       }, delay * 1000);
  
//       return () => clearTimeout(timer); // cleanup
//     }
//   }, [searching]);
  

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* Map Placeholder */}
//       <div className="absolute inset-0">
//         <img
//           src="https://via.placeholder.com/800x800.png?text=Map+Placeholder"
//           alt="Map"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40" />
//       </div>

//       {/* Company Name */}
//       <div className="absolute top-4 left-4 z-10">
//         <h1 className="text-2xl font-bold text-white bg-black/60 px-4 py-2 rounded-xl shadow-lg">Zyber</h1>
//       </div>

//       {/* Bottom Panel */}
//       <AnimatePresence>
//         <motion.div
//           className={`absolute bottom-0 left-0 right-0 bg-white z-20 rounded-t-3xl shadow-2xl p-5`}
//           initial={{ y: '100%' }}
//           animate={{
//             y: isExpanded ? '10%' : '30%',
//             height: isExpanded ? '100%' : '30%',
//           }}
//           exit={{ y: '100%' }}
//           transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//         >
//           {/* Close Button */}
//           {isExpanded && (
//             <button onClick={handleClose} className="absolute top-5 right-5 text-gray-500">
//               <ChevronDown className="w-8 h-8" />
//             </button>
//           )}

//           {/* Input Fields */}
//           <div className="space-y-4 pb-3">
//             <div
//               className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer"
//               onClick={() => handleInputClick('pickup')}
//             >
//               <Navigation className="w-5 h-5 text-green-500 mr-3" />
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500">Pickup location</p>
//                 <input
//                   type="text"
//                   placeholder="Enter pickup location"
//                   value={pickup}
//                   onChange={(e) => setPickup(e.target.value)}
//                   onFocus={() => handleInputClick('pickup')}
//                   className="w-full bg-transparent focus:outline-none text-sm"
//                 />
//               </div>
//             </div>

//             <div
//               className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer"
//               onClick={() => handleInputClick('destination')}
//             >
//               <MapPin className="w-5 h-5 text-red-500 mr-3" />
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500">Destination</p>
//                 <input
//                   type="text"
//                   placeholder="Where to?"
//                   value={destination}
//                   onChange={(e) => setDestination(e.target.value)}
//                   onFocus={() => handleInputClick('destination')}
//                   className="w-full bg-transparent focus:outline-none text-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           {pickup && destination && isExpanded && (
//             <button
//               onClick={() => setShowRideOptions(true)}
//               className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md"
//             >
//               Confirm Pickup & Destination
//             </button>
//           )}


          
//             <LocationPanel
//             inputType={activeInput}
//             onSelect={handleSuggestionClick}
//           />          

//             {/* {showRideOptions && (
//               <RideUI
//                 onClose={() => setShowRideOptions(false)}
//               />
//             )} */}


//         </motion.div>
//       </AnimatePresence>

//       {showRideOptions && (
//         <RideUI
//           isVisible={showRideOptions}
//           onClose={() => setShowRideOptions(false)}
//           onSelectRide={() => {
//             setShowRideOptions(false);
//             setShowConfirmRide(true);  // ✅ Open confirm screen
//           }}
//         />
//       )}


//       {showConfirmRide && (
//         <ConfirmRide
//           isVisible={showConfirmRide}
//           pickup={pickup}
//           destination={destination}
//           onConfirm={() => {
//             setShowConfirmRide(false);  // ✅ Close confirm
//             setSearching(true);         // ✅ Show SearchingDriver
//           }}
//         />
//       )}

//       {searching && (
//         <SearchingDriver
//           isVisible={searching}
//           pickup={pickup}
//           destination={destination}
//           onClose={() => setSearching(false)}
//         />
//       )}

//       {showDriverInfo && (
//         <DriverInfoPanel
//           pickup={pickup}
//           destination={destination}
//           // optionally: onCancel={() => setShowDriverInfo(false)}
//         />
//       )}






//     </div>
//   );
// };

// export default UserHomepage;













import React, { useState, useEffect } from 'react';
import {ChevronUp, ChevronDown, Navigation, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import LocationPanel from '../Components/LocationPanel';
import RideUI from '../Components/RideUI';
import ConfirmRide from '../Components/ConfirmRide';

const UserHome = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showRideUI, setShowRideUI] = useState(false);

  const [fareInfo, setFareInfo] = useState(null);
  const [showConfirmRide, setShowConfirmRide] = useState(false);
  const [rideSummary, setRideSummary] = useState(null);




  const handleInputClick = (type) => {
    setActiveInput(type);
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setActiveInput(null);
    setSuggestions([]);
  };

  const handleSuggestionClick = (value) => {
    if (activeInput === 'pickup') {
      setPickup(value);
    } else if (activeInput === 'destination') {
      setDestination(value);
    }
    setSuggestions([]); // Clear suggestions
    // setIsExpanded(false);
  };

  // Fetch suggestions on input change
  const fetchSuggestions = async (input) => {
    try {
      if (input.length < 3) return setSuggestions([]);
      const token = localStorage.getItem('token'); // Make sure token is stored

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(input)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res)

      setSuggestions(res.data.suggestions || []);
    } catch (error) {
      console.error('❌ Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    if (activeInput === 'pickup') fetchSuggestions(pickup);
    else if (activeInput === 'destination') fetchSuggestions(destination);
  }, [pickup, destination]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white bg-black/60 px-4 py-2 rounded-xl shadow-lg">Zyber</h1>
      </div>

      {/* Background Map */}
      <div className="absolute inset-0">
        <img
          src="https://via.placeholder.com/800x800.png?text=Map+Placeholder"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Sliding Bottom Panel */}
      <AnimatePresence>
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white z-20 rounded-t-3xl shadow-2xl p-5"
          initial={{ y: '100%' }}
          animate={{ y: isExpanded ? '10%' : '30%', height: isExpanded ? '100%' : '30%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >

        {!isExpanded && (
              <div className="absolute top-1 left-0 right-0 flex justify-center">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="bg-white p-1 rounded-full shadow-md"
                >
                  <ChevronUp className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            )}

          {/* Close Button */}
          {isExpanded && (
            <button onClick={handleClose} className="absolute top-5 right-5 text-gray-500">
              <ChevronDown className="w-8 h-8" />
            </button>
          )}

          {/* Input Fields */}
          <div className="space-y-4 pb-3">
            {/* Pickup Field */}
            <div
              className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer"
              onClick={() => handleInputClick('pickup')}
            >
              <Navigation className="w-5 h-5 text-green-500 mr-3" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Pickup location</p>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Destination Field */}
            <div
              className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer"
              onClick={() => handleInputClick('destination')}
            >
              <MapPin className="w-5 h-5 text-red-500 mr-3" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Destination</p>
                <input
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          {pickup && destination && isExpanded && (
            <button
              className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md"
              onClick={async () => {
                try {
                  const token = localStorage.getItem('token');
                  const res = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
                    {
                      params: { pickup, destination },
                      headers: { Authorization: `Bearer ${token}` }
                    }
                  );
                  setFareInfo(res.data);       // 🟢 Store the fare
                  setShowRideUI(true);         // 🟢 Show the RideUI after fetch
                } catch (err) {
                  console.error('❌ Error fetching fare:', err);
                }
              }}
            >
              Confirm Pickup & Destination
            </button>
          )}



          {/* Location Panel Suggestions */}
          {isExpanded && (
            <LocationPanel
              inputType={activeInput}
              onSelect={handleSuggestionClick}
              suggestions={suggestions}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {showRideUI && (
        <RideUI
          isVisible={showRideUI}
          onClose={() => setShowRideUI(false)}
          fareInfo={fareInfo} // ✅ Pass the data to RideUI
          // onSelectRide={(selected) => {
          //   console.log('🚕 Ride Selected:', selected);
          //   setShowRideUI(false);
          // }}

          onSelectRide={async (selected) => {
            try {
              const token = localStorage.getItem('token');
              console.log({ pickup, destination, vehicleType: selected.type });

              const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                {
                  pickup: pickup,                    // string
                  destination: destination,          // string
                  vehicleType: selected.type.toLowerCase(),
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
          
              const ride = res.data.ride;         

              // Create ride summary for ConfirmRide
              setRideSummary({
                pickup: ride.pickup,
                destination: ride.destination,
                fare: ride.fare,
                distance: ride.distance,
                duration: ride.duration,
                vehicleType: selected.name,
                icon: selected.icon,
              });
          
              setShowRideUI(false);
              setShowConfirmRide(true);
            } catch (error) {
              console.error('❌ Failed to create ride:', error);            
            }
          }}
          
          



        />
      )}

{showConfirmRide && rideSummary &&(
  <ConfirmRide
  isVisible={showConfirmRide}
  pickup={rideSummary.pickup}
  destination={rideSummary.destination}
  selectedRide={{
    name: rideSummary.vehicleType,
    icon: rideSummary.icon,
    price: rideSummary.fare
  }}
  distance={rideSummary.distance} // convert to km
  duration={Math.round(rideSummary.duration)} // convert to mins
  onConfirm={() => {
    setShowConfirmRide(false);
  }}
/>

)}





    </div>
  );
};

export default UserHome;

