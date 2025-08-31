import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log(token)
    if (!token) {
      navigate('/rider-login');
      return;
    }

    const checkProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rider/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/rider-login');
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/rider-login');
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [navigate]);

  if (loading) {
    return null; // Or a loading spinner if you want
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
















// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { CaptainDataContext } from '../context/CaptainContext'; // ✅ Import context

// const CaptainProtectedWrapper = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const { updateCaptain } = useContext(CaptainDataContext); // ✅ Use context

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/rider-login');
//       return;
//     }

//     const checkProfile = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/rider/profile`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200 && response.data.rider) {
//           updateCaptain(response.data.rider); // ✅ Set the context here
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//           navigate('/rider-login');
//         }
//       } catch (error) {
//         setIsAuthenticated(false);
//         navigate('/rider-login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkProfile();
//   }, [navigate, updateCaptain]);

//   if (loading || !isAuthenticated) return null;

//   return <>{children}</>;
// };

// export default CaptainProtectedWrapper;
