// src/Components/DriverFound.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Star } from "lucide-react";

const DriverFound = ({ isVisible, onClose, driver, otp }) => {
  if (!driver) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 h-[90%] shadow-xl"
        >
          {/* Header */}
          <h2 className="text-center text-xl font-bold mb-4">Driver Found!</h2>

          {/* Driver Info */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={driver.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Driver"
              className="w-24 h-24 rounded-full mb-3 border-4 border-green-500"
            />
            <h3 className="text-lg font-semibold">{driver.name}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} /> <span className="text-gray-700">{driver.rating || "4.8"}</span>
            </div>
            <p className="text-gray-600 mt-1">{driver.vehicleModel} • {driver.vehicleNumber}</p>
          </div>

          {/* OTP Display */}
          <div className="bg-gray-100 text-center py-4 rounded-xl mb-6">
            <p className="text-sm text-gray-600">Share this OTP with your captain</p>
            <p className="text-3xl font-bold tracking-widest text-green-600">{otp}</p>
          </div>

          {/* Contact Driver */}
          <button
            onClick={() => window.open(`tel:${driver.phone}`, "_self")}
            className="w-full bg-black text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Phone size={18} /> Call Driver
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DriverFound;
