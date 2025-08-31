// context/UserContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setuser] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: '',
    },
  });

  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
