import React, { useState, useEffect, useContext } from 'react';
import { Switch } from '@headlessui/react';
import { motion} from 'framer-motion';
import { AlertTriangle} from 'lucide-react';

import CaptainInfoCard, { CaptainStats } from '../Components/CaptainInfoCard';
import RidePopUp from '../Components/RidePopUP';
import ConfirmRidePopUP from '../Components/ConfirmRidePopUP';
import CaptainRiding from './CaptainRiding';


const CaptainHome = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const [selectedRide, setSelectedRide] = useState(null);
  const [showConfirmRide , setShowConfirmRide] = useState(false)

  const [ongoingRide, setOngoingRide] = useState(false);


  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => setShowPopup(true), 1000); // 1s delay
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false); // hide pop-up if offline
    }
  }, [isOnline]);


  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">

      {/* Top header with status */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
        <h1 className="text-lg font-bold">{isOnline ? 'Online' : 'Offline'}</h1>
        <Switch
          checked={isOnline}
          onChange={setIsOnline}
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

      {/* Map Placeholder (GIF or Static) */}
      <div className="relative w-full h-[70%]">

        {/* Persistent Notification Area (no height change) */}
      <div className="h-10 w-full fixed z-10">
        <motion.div
          animate={{ opacity: isOnline ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className={`absolute inset-0 flex items-center gap-2 px-4 text-sm bg-orange-400 text-white rounded-b-md ${
            isOnline ? 'pointer-events-none' : ''
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
          <span>You are offline! Go online to start accepting jobs.</span>
        </motion.div>
      </div>

        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/010/801/644/small_2x/aerial-clean-top-view-of-the-city-map-with-street-and-river-007-vector.jpg"
          alt="Map Placeholder"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-yellow-400 p-4 rounded-full shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 20s6-5.686 6-10A6 6 0 004 10c0 4.314 6 10 6 10zM8 10a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Captain Info + Stats */}
      <motion.div
        className="absolute bottom-0 w-full h-[30%] bg-white rounded-t-3xl shadow-xl px-6 py-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Prime_Minister_Of_Bharat_Shri_Narendra_Modi_with_Rishabh_Pant.jpg"
              className="w-17 h-17  rounded-full"
              alt="Captain"
            />
            <div>
              <p className="font-semibold text-lg">Rishab Pant</p>
              <p className="text-sm text-gray-500">GOD level</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">$31,49,482.50</p>
            <p className="text-sm text-gray-400">Earned</p>
          </div>
        </div>

        <div className="grid grid-cols-3 text-center bg-yellow-400 rounded-xl text-black py-3 font-semibold text-sm">
          <div className='flex flex-col items-center'>
            <Timer></Timer>
            <p className="text-xl">10.2</p>
            <p className="text-xs font-medium">Hrs Online</p>
          </div>
          <div className='flex flex-col items-center'>
            <Route/>
            <p className="text-xl">30 KM</p>
            <p className="text-xs font-medium">Total Distance</p>
          </div>
          <div className='flex flex-col items-center'>
            <Briefcase/>
            <p className="text-xl">20</p>
            <p className="text-xs font-medium">Total Jobs</p>
          </div>
        </div> */}

      <CaptainInfoCard/>

      <CaptainStats/>
      </motion.div>

          {/* Rider pop up */}
      {showPopup && (
        <div className="absolute top-[70%] left-0 right-0 z-50">
          <RidePopUp
          onAccept={(ride) => {
            console.log("Accepted ride:", ride);
            setShowPopup(false);           // ✅ hide the popup
            setSelectedRide(ride);         // ✅ store ride details
            setShowConfirmRide(true);      // ✅ show confirm ride screen
          }}
        />
        </div>
      )}


      {showConfirmRide && (
        <ConfirmRidePopUP
          isVisible={showConfirmRide}
          ride={selectedRide}
          onClose={() => setShowConfirmRide(false)}
          onGoToPickup={() => {
            setShowConfirmRide(false);
            setOngoingRide(true); // ✅ show this next
          }}
        />
      )}

      {ongoingRide && (
        <CaptainRiding
          isVisible={ongoingRide}
          onComplete={() => {
            setOngoingRide(false);
          }}
        />
      )}



    </div>
  );
};

export default CaptainHome;
