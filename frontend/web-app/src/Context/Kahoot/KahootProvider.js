import { createContext, useState } from 'react'; 

const KahootContext = createContext({}); 

export const KahootProvider = ({ children }) => {

  //* You can write you functions that call to the API here! Remember that you are going to need state */






  //* You can place the functions and state in this object once you are done writing them */
  const values = {


  }; 

  return(

    <KahootContext.Provider value = {values}>
      {children}
    </KahootContext.Provider>

  ); 
}; 

export default KahootContext; 