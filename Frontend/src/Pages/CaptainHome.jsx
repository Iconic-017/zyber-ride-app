import React, { useState, useEffect, useContext } from 'react';
import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import CaptainInfoCard, { CaptainStats } from '../Components/CaptainInfoCard';
import RidePopUp from '../Components/RidePopUP';
import CaptainRiding from './CaptainRiding';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';

const CaptainHome = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [ridePopup, setRidePopup] = useState(null);
  const [ongoingRide, setOngoingRide] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);

  const { captain, loading } = useContext(CaptainDataContext);
  const { socket, emitTo } = useContext(SocketContext);

  // 1️⃣ Register captain on socket
  useEffect(() => {
    if (!loading && captain?._id) {
      emitTo('register-user', { userId: captain._id, userType: 'captain' });
      console.log('[socket] captain registered:', captain._id);
    }
  }, [captain, loading, emitTo]);

  // // 2️⃣ Update location every 10s
  // useEffect(() => {
  //   if (!captain?._id) return;
  //   const updateLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (pos) =>
  //           emitTo('update-location-captain', {
  //             userId: captain._id,
  //             lat: pos.coords.latitude,
  //             lng: pos.coords.longitude,
  //           }),
  //         (err) => console.error(err),
  //         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  //       );
  //     }
  //   };
  //   updateLocation();
  //   const interval = setInterval(updateLocation, 10000);
  //   return () => clearInterval(interval);
  // }, [captain, emitTo]);

//   useEffect(() => {
//   if (!captain?._id) return;

//   let watchId;

//   if (navigator.geolocation) {
//     watchId = navigator.geolocation.watchPosition(
//       (pos) => {
//         emitTo('update-location-captain', {
//           userId: captain._id,
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//       },
//       (err) => console.error('Location error:', err),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   }

//   return () => {
//     if (watchId) navigator.geolocation.clearWatch(watchId);
//   };
// }, [captain, emitTo]);

useEffect(() => {
  if (!captain?._id) return;

  let watchId;
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        console.log("📍 Updated live location:", pos.coords);
        emitTo('update-location-captain', {
          userId: captain._id,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error("❌ Location error:", err),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    console.error("❌ Geolocation not supported by browser");
  }

  return () => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
  };
}, [captain, emitTo]);



  // 3️⃣ Listen for rides when captain is online
  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (ride) => {
      if (isOnline) {
        console.log('🚗 New ride received:', ride);
        setRidePopup(ride);
      } else {
        console.log('🛑 Ride ignored because captain is offline.');
      }
    };

    socket.on('new-ride', handleNewRide);
    return () => socket.off('new-ride', handleNewRide);
  }, [socket, isOnline]);

  // 4️⃣ Handle online/offline toggle
  const handleToggle = async (checked) => {
    setIsOnline(checked);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/rider/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: checked ? 'active' : 'inactive' }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`🟢 Captain is now ${data.status}`);
      } else {
        console.error('Error:', data.message);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // 5️⃣ Accept ride → confirm + notify user
  const handleAcceptRide = async (ride) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id, captainId: captain._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Store ride with OTP
      const confirmedRide = res.data?.ride;
      if (!confirmedRide?.otp) {
        alert('Unable to fetch ride OTP. Please retry.');
        return;
      }

      const mergedRide = {
        ...ride,
        ...confirmedRide,
      };

      setCurrentRide(mergedRide);
      setRidePopup(mergedRide);
      setOtpVerified(false);

      // Notify user
      emitTo('ride-accepted', {
        userId: ride.userId,
        captainDetails: {
          name: captain.fullName,
          vehicleNumber: captain.vehicleNumber,
          phone: captain.phone,
        },
        otp: confirmedRide.otp,
      });
    } catch (error) {
      console.error('❌ Error confirming ride:', error);
    }
  };

  // 6️⃣ Ignore ride
  const handleIgnoreRide = () => {
    console.log('❌ Ride ignored');
      setRidePopup(null);
      setCurrentRide(null);
      setOtpVerified(false);
  };

  // 7️⃣ OTP verification
  const handleOtpSubmit = async (rideId, otp) => {
    try {
      // compare locally first
      if (otp !== currentRide?.otp) {
        alert('Incorrect OTP. Please try again.');
        return;
      }

      setOtpVerified(true);
      setOngoingRide(true);
      setRidePopup(null);
    } catch (err) {
      console.error('❌ Error verifying OTP:', err);
      alert('Failed to verify OTP. Try again.');
    }
  };

  // Render ride page after OTP verified
  if (ongoingRide && currentRide) {
    return <CaptainRiding ride={currentRide} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {loading && <p className="text-center mt-10">Loading captain data...</p>}
      {!loading && !captain && <p className="text-center mt-10">No captain info found</p>}
      {!loading && captain && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
            <h1 className="text-lg font-bold">{isOnline ? 'Online' : 'Offline'}</h1>
            <Switch
              checked={isOnline}
              onChange={handleToggle}
              className={`${
                isOnline ? 'bg-green-500' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  isOnline ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>

          {/* Map */}
          <div className="relative w-full h-[70%]">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/010/801/644/small_2x/aerial-clean-top-view-of-the-city-map-with-street-and-river-007-vector.jpg"
              alt="Map"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Captain Info */}
          <motion.div
            className="absolute bottom-0 w-full h-[30%] bg-white rounded-t-3xl shadow-xl px-6 py-6"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <CaptainInfoCard />
            <CaptainStats />
          </motion.div>

          {/* Ride Popup */}
          {ridePopup && !ongoingRide && (
            <RidePopUp
              ride={ridePopup}
              onAccept={handleAcceptRide}
              onIgnore={handleIgnoreRide}
              onOtpSubmit={handleOtpSubmit}
              otpVerified={otpVerified}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CaptainHome;
