// import React, { createContext, useState, useEffect } from 'react';

// export const CaptainDataContext = createContext();

// const CaptainContext = ({ children }) => {
//   const [captain, setCaptain] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const updateCaptain = (data) => setCaptain(data);

//   useEffect(() => {

//     const userType = localStorage.getItem('userType');
//     if (!userType || userType.toLowerCase() !== 'captain') return;

//     const fetchCaptainProfile = async () => {
//       const token = localStorage.getItem('token');
//       console.log("token in the captain " , token);
//       if (!token) return; 


//       setLoading(true);
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BASE_URL}/rider/profile`, {
//           credentials: "include", 
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         console.log("fetching captain profile" , res);

//         if (!res.ok) throw new Error('Failed to fetch profile');

//         const data = await res.json();
//         setCaptain(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaptainProfile();
//   }, []);

//   return (
//     <CaptainDataContext.Provider
//       value={{ captain, loading, error, setCaptain, updateCaptain }}
//     >
//       {children}
//     </CaptainDataContext.Provider>
//   );
// };

// export default CaptainContext;





// CaptainContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    
    console.log("token of captain :- ------ --- -- -- -- -----" , token)
    
    const fetchCaptain = async () => {
      try {


        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rider/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCaptain(res.data.captain);
        console.log("✅ Captain loaded:", res.data.captain);
      } catch (error) {
        console.log("❌ Error loading captain:", error.message);
        console.log("❌ Error loading captain:", error.response?.data);
        setCaptain(null);
      } finally {
        setLoading(false);
        
      }
    };

    fetchCaptain();
  }, []);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, loading }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
