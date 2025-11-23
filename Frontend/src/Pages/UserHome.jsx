import React, { useState, useEffect, useContext } from 'react';
import { ChevronUp, ChevronDown, Navigation, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import LocationPanel from '../Components/LocationPanel';
import RideUI from '../Components/RideUI';
import ConfirmRide from '../Components/ConfirmRide';
import SearchingDriver from '../Components/SearchingDriver';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { SocketContext } from '../context/SocketContext';
import { UserContext } from '../context/UserContext';

const UserHome = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showRideUI, setShowRideUI] = useState(false);
  const [fareInfo, setFareInfo] = useState(null);
  // const [showConfirmRide, setShowConfirmRide] = useState(false);
  const [rideSummary, setRideSummary] = useState(null);
  const [showSearchingDriver, setShowSearchingDriver] = useState(false);
  const [showDriverPopup, setShowDriverPopup] = useState(false);
  const [driverInfo, setDriverInfo] = useState(null);
  const [searchTimer, setSearchTimer] = useState(null);

  const { socket, emitTo } = useContext(SocketContext);
  const { user } = useContext(UserContext);

  // 🟢 Register user socket
  useEffect(() => {
    if (!socket || !user?._id) return;

    const handleConnect = () => {
      emitTo("register-user", { userId: user._id, userType: "user" });
      console.log("[socket] user registered:", user._id);
    };

    socket.on("connect", handleConnect);
    socket.on("reconnect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("reconnect", handleConnect);
    };
  }, [socket, user, emitTo]);

  // 🟢 Listen for ride-confirmed event from backend
  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("ride-confirmed", (data) => {
  //     console.log("✅ Ride confirmed by captain:", data);

  //     const id = data.captain;
  //     console.log("captain id ----------- > " , id)
  //     // find captain
      

  //     // Stop searching immediately
  //     if (searchTimer) clearTimeout(searchTimer);
  //     setShowSearchingDriver(false);

  //     setRideSummary((prev) => ({
  //       ...prev,
  //       status: data.status,
  //       captain: data.captain,
  //       otp: data.otp,
  //     }));

  //     // Show driver info popup
  //     setDriverInfo({
  //       name: data.captain?.fullname || "Unknown Captain",
  //       vehicle: data.captain?.vehicleDetails || "Not Available",
  //       phone: data.captain?.phone || "N/A",
  //       otp: data.otp,
  //     });
  //     setShowDriverPopup(true);
  //   });

  //   return () => socket.off("ride-confirmed");
  // }, [socket, searchTimer]);

useEffect(() => {
  if (!socket) return;

  const handleRideConfirmed = (data) => {
    console.log("✅ Ride confirmed by captain:", data);

    // Stop searching immediately
    if (searchTimer) clearTimeout(searchTimer);
    setShowSearchingDriver(false);

    setRideSummary((prev) => ({
      ...prev,
      status: data.status,
      captain: data.captain,
      otp: data.otp,
    }));

    const captainName = data.captain
      ? `${data.captain.fullname?.firstname ?? ""} ${data.captain.fullname?.lastname ?? ""}`.trim()
      : "Unknown Captain";
    const vehicleDetails = data.captain?.vehicle
      ? `${data.captain.vehicle.color} ${data.captain.vehicle.vehicleType} (${data.captain.vehicle.plate})`
      : "Not Available";

    setDriverInfo({
      name: captainName || "Unknown Captain",
      vehicle: vehicleDetails,
      phone: data.captain?.email || "N/A",
      otp: data.otp,
    });

    setShowDriverPopup(true);
  };

  socket.on("ride-confirmed", handleRideConfirmed);
  return () => socket.off("ride-confirmed", handleRideConfirmed);
}, [socket, searchTimer]);


  // Input handlers
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
    if (activeInput === 'pickup') setPickup(value);
    else if (activeInput === 'destination') setDestination(value);
    setSuggestions([]);
  };

  // Fetch location suggestions
  const fetchSuggestions = async (input) => {
    try {
      if (input.length < 3) return setSuggestions([]);
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(input)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuggestions(res.data.suggestions || []);
    } catch (error) {
      console.error('❌ Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    if (activeInput === 'pickup' && pickup.length >= 3) fetchSuggestions(pickup);
    if (activeInput === 'destination' && destination.length >= 3) fetchSuggestions(destination);
  }, [pickup, destination]);

  // Map setup
  const [currentPosition, setCurrentPosition] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(err),
        // { enableHighAccuracy: true }
      );
    }
  }, []);

  if (!isLoaded || !currentPosition) {
    return <div className="flex items-center text-black justify-center h-screen">Fetching location...</div>;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Logo */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white bg-black/60 px-4 py-2 rounded-xl shadow-lg">Zyber</h1>
      </div>

      {/* Google Map */}
      <GoogleMap center={currentPosition} zoom={15} mapContainerClassName="absolute inset-0 w-full h-full">
        <Marker position={currentPosition} />
      </GoogleMap>

      {/* Main Bottom Sheet */}
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
              <button onClick={() => setIsExpanded(true)} className="bg-white p-1 rounded-full shadow-md">
                <ChevronUp className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          )}

          {isExpanded && (
            <button onClick={handleClose} className="absolute top-5 right-5 text-gray-500">
              <ChevronDown className="w-8 h-8" />
            </button>
          )}

          {/* Input Fields */}
          <div className="space-y-4 pb-3">
            <div className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer" onClick={() => handleInputClick('pickup')}>
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

            <div className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer" onClick={() => handleInputClick('destination')}>
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

          {pickup && destination && isExpanded && (
            <button
              className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md"
              onClick={async () => {
                try {
                  const token = localStorage.getItem('token');
                  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                    params: { pickup, destination },
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  setFareInfo(res.data);
                  setShowRideUI(true);
                } catch (err) {
                  console.error('❌ Error fetching fare:', err);
                }
              }}
            >
              Confirm Pickup & Destination
            </button>
          )}

          {isExpanded && (
            <LocationPanel inputType={activeInput} onSelect={handleSuggestionClick} suggestions={suggestions} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Ride Options */}
      {showRideUI && (
        <RideUI
          isVisible={showRideUI}
          onClose={() => setShowRideUI(false)}
          fareInfo={fareInfo}
         
         
          onSelectRide={async (selected) => {
            try {
              const token = localStorage.getItem('token');
              const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                { pickup, destination, vehicleType: selected.type.toLowerCase() },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              const ride = res.data.ride;
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

              // ✅ Directly show SearchingDriver panel
              setShowSearchingDriver(true);

              // Start 30s timeout to cancel if no driver found
              const timer = setTimeout(() => {
                setShowSearchingDriver(false);
                alert("No captains available. Please try again.");
              }, 30000);
              setSearchTimer(timer);
            } catch (error) {
              console.error('❌ Failed to create ride:', error);
            }
          }}



        />
      )}

      {/* Confirm Ride Popup */}
      {/* {showConfirmRide && rideSummary && (
        <ConfirmRide
          isVisible={showConfirmRide}
          pickup={rideSummary.pickup}
          destination={rideSummary.destination}
          selectedRide={{
            name: rideSummary.vehicleType,
            icon: rideSummary.icon,
            price: rideSummary.fare,
          }}
          distance={rideSummary.distance}
          duration={Math.round(rideSummary.duration)}
          onConfirm={() => {
            setShowConfirmRide(false);
            setShowSearchingDriver(true);

            // Start 30s search timer
            const timer = setTimeout(() => {
              setShowSearchingDriver(false);
              alert("No captains available. Please try again.");
            }, 30000);
            setSearchTimer(timer);
          }}
        />
      )} */}

      {/* Searching Driver Screen */}
      <SearchingDriver
        isVisible={showSearchingDriver}
        pickup={rideSummary?.pickup}
        destination={rideSummary?.destination}
        onClose={() => setShowSearchingDriver(false)}
      />

      {/* 🚗 Driver Info Popup After Ride Acceptance */}
      <AnimatePresence>
        {showDriverPopup && driverInfo && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-2xl px-6 py-6"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-500 font-semibold">
                  Ride confirmed
                </p>
                <h2 className="text-xl font-semibold text-gray-900 mt-1">{driverInfo.name}</h2>
              </div>
              <button
                onClick={() => setShowDriverPopup(false)}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="font-medium">Vehicle: <span className="font-semibold text-gray-900">{driverInfo.vehicle}</span></p>
              <p>Phone: <span className="font-semibold text-gray-900">{driverInfo.phone}</span></p>
            </div>

            <div className="bg-emerald-100 text-emerald-700 font-bold py-3 mt-5 rounded-xl text-center text-lg tracking-[0.4em]">
              {driverInfo.otp || "****"}
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Share this OTP with your captain to start the ride.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserHome;
