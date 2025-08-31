import React,{useState} from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

import FinishRide from '../Components/FinishRide';

const CaptainRiding = () => {

  const [showFinishPanel, setShowFinishPanel] = useState(false);

  return (
    <>

<motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed inset-0 z-50 bg-white"
    >
      {/* Map Background */}
      <div className="absolute inset-0">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/010/801/644/small_2x/aerial-clean-top-view-of-the-city-map-with-street-and-river-007-vector.jpg"
          alt="Map"
          className="w-full h-full object-cover"
        />
        {/* Arrival ETA Label */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 px-4 py-2 rounded-lg shadow text-white text-center">
          Arrival<br />
          <span className="text-xl font-bold">7 min</span>
        </div>
      </div>

      {/* Bottom Panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-yellow-400 rounded-t-2xl p-5 h-[18%] flex flex-col justify-between"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        {/* Handle */}
        <div className="flex justify-center">
          <ChevronUp className="w-6 h-6 text-gray-600" />
        </div>

        {/* Ride Info */}
        <div className="flex justify-between items-center text-black font-semibold text-lg px-2">
          <p>4 KM away</p>
          <button
            onClick={() => setShowFinishPanel(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition"
          >
            Complete Ride
          </button>
        </div>
      </motion.div>
    </motion.div>

    <FinishRide isVisible={showFinishPanel} />


    </>

    



  );
};

export default CaptainRiding;







