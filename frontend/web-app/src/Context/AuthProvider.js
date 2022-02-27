import { createContext, useState } from 'react'; 

const AuthContext = createContext({}); 

export const AuthProvider = ({ children }) => {


  // * Note that auth is an object
  const [auth, setAuth] = useState({}); 
 
  const values = {
    auth, 
    setAuth, 
  }

  return( 
    <AuthContext.Provider value = {values}>
      {children}
    </AuthContext.Provider>
  ); 
}; 

export default AuthContext; 


/**
 * We're returning the AuthContext Provider with the state being auth.
 * the children represent the nested components 
 * because authProvider will be wrapping around our components. 
*/