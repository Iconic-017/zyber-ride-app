import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConfirmRidePopUP = ({ isVisible, onClose, ride }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  if (!ride) return null;

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isOtpValid = otp.every((digit) => digit !== '');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-white rounded-t-3xl shadow-xl px-6 py-5 overflow-y-auto"
        >
          {/* Rider info */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <img src={ride.photo} className="w-12 h-12 rounded-full" alt="Rider" />
              <div>
                <p className="font-semibold text-lg">{ride.name}</p>
                <div className="flex gap-2 mt-1">
                  {ride.tags.map((tag, idx) => (
                    <span key={idx} className="bg-yellow-300 text-xs px-2 py-0.5 rounded-full text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-right font-semibold text-lg text-black">
                ₹{Number(ride.amount.replace(/[^0-9.]/g, '')).toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">{ride.distance}</p>
            </div>
          </div>

          {/* Pickup & Drop */}
          <div className="text-sm mb-6">
            <div className="mb-3">
              <p className="text-gray-400 text-xs uppercase">Pick Up</p>
              <p className="font-medium">{ride.pickup}</p>
            </div>
            <div className="mb-3">
              <p className="text-gray-400 text-xs uppercase">Drop Off</p>
              <p className="font-medium">{ride.drop}</p>
            </div>
          </div>

          {/* Noted */}
          <div className="mb-6">
            <p className="text-gray-400 text-xs uppercase mb-1">Noted</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum erat.
              Cras vulputate auctor lectus at consequat.
            </p>
          </div>

          {/* Trip Fare */}
          <div className="mb-6">
            <p className="text-gray-400 text-xs uppercase mb-2">Trip Fare</p>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Apple Pay</span>
                <span>₹{(Number(ride.amount.replace(/[^0-9.]/g, '')) - 10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>₹10.00</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Paid Amount</span>
                <span>₹{Number(ride.amount.replace(/[^0-9.]/g, '')).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* OTP Section */}
          <div className="mb-6">
            <p className="text-gray-400 text-xs uppercase mb-2">Enter OTP to Confirm Ride</p>
            <div className="flex gap-4 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={otp[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  ref={(el) => (inputsRef.current[i] = el)}
                  className="w-12 h-12 border border-gray-300 rounded-xl text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mb-6 gap-6">
            <button className="flex-1 flex flex-col items-center text-green-600 bg-green-100 p-1 rounded-2xl">
              <Phone className="w-6 h-6 mb-1" />
              <span className="text-sm">Call</span>
            </button>
            <button className="flex-1 flex flex-col items-center text-blue-600 p-1 bg-blue-100 rounded-2xl">
              <MessageCircle className="w-6 h-6 mb-1" />
              <span className="text-sm">Message</span>
            </button>
            <button className="text-red-600 flex-1 flex flex-col items-center p-1 bg-red-100 rounded-2xl" onClick={onClose}>
              <Trash2 className="w-6 h-6 mb-1" />
              <span className="text-sm">Cancel</span>
            </button>
          </div>

          {/* Confirm Button */}
          <Link to="/rider-riding">
            <button
              className={`w-full bg-yellow-400 hover:bg-yellow-500 transition text-black font-bold text-lg py-3 rounded-xl ${
                !isOtpValid ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              GO TO PICK UP
            </button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmRidePopUP;
