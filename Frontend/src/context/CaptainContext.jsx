import React, { createContext, useContext, useState} from 'react';

export const CaptainDataContext = createContext();

// export const useCaptain = () => {
//   const context = useContext(CaptainContext)
//   if(!context){
//     throw new Error('usecaptain must be used within a captainprovider')
//   }
//   return context;
// }

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(null)


  const updateCaptain = (captainData) => {
    setCaptain(captainData);
    // localStorage.setItem('captain', JSON.stringify(captainData));
  };

  const value = {
    captain,
    setCaptain,
    loading,
    setLoading,
    error,
    setError,
    updateCaptain
  }
  

  // const logoutCaptain = () => {
  //   setCaptain(null);
  //   localStorage.removeItem('captain');
  // };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};


export default CaptainContext;