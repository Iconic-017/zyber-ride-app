  // // context/UserContext.jsx
  // import React, { createContext, useState } from 'react';

  // export const UserContext = createContext();

  // const UserProvider = ({ children }) => {
  //   const [user, setuser] = useState({
  //     email: '',
  //     fullname: {
  //       firstname: '',
  //       lastname: '',
  //     },
  //   });

  //   return (
  //     <UserContext.Provider value={{ user, setuser }}>
  //       {children}
  //     </UserContext.Provider>
  //   );
  // };

  // export default UserProvider;






import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setuser] = useState(() => {
    // try to load user from localStorage on first render
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // keep localStorage in sync with user state
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
