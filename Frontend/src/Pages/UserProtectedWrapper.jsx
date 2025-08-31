import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/user-login');
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Prevent rendering children while redirecting
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;










// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const UserProtectedWrapper = ({ children }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   if (!token) return null; // Prevent rendering children while redirecting

//   return <>{children}</>;
// };

// export default UserProtectedWrapper;
