import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RidePopUp = ({ ride, onAccept, onIgnore, onOtpSubmit, otpVerified }) => {
  const [accepted, setAccepted] = useState(false);
  const [otp, setOtp] = useState('');

  if (!ride) return null;

  const handleAccept = () => {
    setAccepted(true);
    onAccept(ride);
  };

  const handleOtpVerify = () => {
    if (otp.trim().length !== 4) return alert('Enter a valid 4-digit OTP');
    onOtpSubmit(ride._id, otp);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-2xl p-4 space-y-3 z-50"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              {ride.user?.fullname?.firstname || 'New Ride'}
            </h2>
            <p className="text-sm text-gray-400">{ride.user?.email}</p>
          </div>
          <p className="font-bold text-green-600">{ride.fare ? `₹${ride.fare}` : '—'}</p>
        </div>

        {/* Ride Info */}
        <div className="text-sm">
          <p className="text-gray-400 text-xs font-medium">PICKUP</p>
          <p className="font-semibold">{ride.pickup}</p>

          {otpVerified ? (
            <>
              <p className="text-gray-400 text-xs font-medium mt-2">DROP</p>
              <p className="font-semibold">{ride.destination}</p>
            </>
          ) : (
            accepted && (
              <div className="mt-3">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border px-3 py-2 rounded-lg outline-none"
                />
                <button
                  onClick={handleOtpVerify}
                  className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg font-semibold"
                >
                  Verify OTP
                </button>
              </div>
            )
          )}
        </div>

        {/* Buttons */}
        {!accepted && (
          <div className="flex justify-between pt-2">
            <button
              onClick={onIgnore}
              className="text-gray-500 bg-gray-200 px-6 py-2 rounded-lg font-medium"
            >
              Ignore
            </button>
            <button
              onClick={handleAccept}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Accept
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default RidePopUp;
