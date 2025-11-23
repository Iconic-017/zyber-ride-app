// // src/Components/CaptainInfoCard.jsx
// import React, { useContext } from 'react';
// import { Timer, Route, Briefcase } from 'lucide-react';
// import { CaptainDataContext } from '../context/CaptainContext';

// const CaptainInfoCard = () => {
//   const { captain } = useContext(CaptainDataContext);

//   // Optional: log for debugging
//   console.log("captain in captaininfo card : ", captain);

//   // Show loading/fallback if data is not yet available
//   if (!captain) return <div className="text-center py-4 text-gray-500">Loading captain info...</div>;

//   return (
//     <div className="flex justify-between items-center mb-4">
//       <div className="flex items-center gap-4">
//         <img
//           src={captain.profilePic || 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Prime_Minister_Of_Bharat_Shri_Narendra_Modi_with_Rishabh_Pant.jpg'}
//           className="w-17 h-17 rounded-full"
//           alt="Captain"
//         />
//         <div>
//         <p className="font-semibold text-lg capitalize">
//           {captain.fullname?.firstname} {captain.fullname?.lastname}
//         </p>
//         <p className="text-xs text-gray-400 capitalize">
//           {captain.vehicle?.vehicleType} - {captain.vehicle?.plate}
//         </p>
//         {/* <p className="text-xl font-bold">{captain.earnings ? `₹${captain.earnings}` : '₹0.00'}</p> */}


//         </div>
//       </div>
//       <div className="text-right">
//         <p className="text-xl font-bold">{captain.earnings ? `₹${captain.earnings}` : '₹0.00'}</p>
//         <p className="text-sm text-gray-400">Earned</p>
//       </div>
//     </div>
//   );
// };

// export const CaptainStats = () => {
//   const { captain } = useContext(CaptainDataContext);

//   // Show 0 as fallback for stats not yet in backend
//   return (
//     <div className="grid grid-cols-3 text-center bg-yellow-400 rounded-xl text-black py-3 font-semibold text-sm">
//       <div className="flex flex-col items-center">
//         <Timer />
//         <p className="text-xl">{captain?.onlineHours ?? 0}</p>
//         <p className="text-xs font-medium">Hrs Online</p>
//       </div>
//       <div className="flex flex-col items-center">
//         <Route />
//         <p className="text-xl">{captain?.distance ?? 0} KM</p>
//         <p className="text-xs font-medium">Total Distance</p>
//       </div>
//       <div className="flex flex-col items-center">
//         <Briefcase />
//         <p className="text-xl">{captain?.jobs ?? 0}</p>
//         <p className="text-xs font-medium">Total Jobs</p>
//       </div>
//     </div>
//   );
// };

// export default CaptainInfoCard;

























// Components/CaptainInfoCard.jsx
import React, { useContext } from 'react';
import { Timer, Route, Briefcase } from 'lucide-react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainInfoCard = () => {
  const { captain, loading } = useContext(CaptainDataContext);

  if (loading) return <div className="text-center py-4 text-gray-500">Loading captain info...</div>;
  if (!captain) return <div className="text-center py-4 text-gray-500">No captain info available</div>;

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <img
          src={captain.profilePic || 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Prime_Minister_Of_Bharat_Shri_Narendra_Modi_with_Rishabh_Pant.jpg'}
          className="w-17 h-17 rounded-full"
          alt="Captain"
        />
        <div>
          <p className="font-semibold text-lg capitalize">
            {captain.fullname?.firstname} {captain.fullname?.lastname}
          </p>
          <p className="text-sm text-gray-500">
            {captain.level || 'Pro Captain'}
          </p>
          <p className="text-xs text-gray-400 capitalize">
            {captain.vehicle?.vehicleType} - {captain.vehicle?.plate}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold">{captain.earnings ? `₹${captain.earnings}` : '₹0.00'}</p>
        <p className="text-sm text-gray-400">Earned</p>
      </div>
    </div>
  );
};

export const CaptainStats = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div className="grid grid-cols-3 text-center bg-yellow-400 rounded-xl text-black py-3 font-semibold text-sm">
      <div className="flex flex-col items-center">
        <Timer />
        <p className="text-xl">{captain?.onlineHours ?? 0}</p>
        <p className="text-xs font-medium">Hrs Online</p>
      </div>
      <div className="flex flex-col items-center">
        <Route />
        <p className="text-xl">{captain?.distance ?? 0} KM</p>
        <p className="text-xs font-medium">Total Distance</p>
      </div>
      <div className="flex flex-col items-center">
        <Briefcase />
        <p className="text-xl">{captain?.jobs ?? 0}</p>
        <p className="text-xs font-medium">Total Jobs</p>
      </div>
    </div>
  );
};

export default CaptainInfoCard;
