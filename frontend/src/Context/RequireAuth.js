import React from 'react'; 
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation, Outlet } from 'react-router-dom';


const RequireAuth = ({ children }) => {

  const { auth } = useAuth(); 
  const location = useLocation(); 
  
  return(
    auth?.user 
      ? <Outlet/>
      : <Navigate to = '/' state={{ from: location }} replace />
  )

}; 


export default RequireAuth; 

/**
 * Notes:
 * the auth?.user is to check if the element (user) exist inside the auth object! 
 * The 'state = {{ from: location }} replace' is meant replace the '/login' with 
 * the location they came from
 * 
 */

// return(authed === true ? children : <Navigate to ='/login' replace state = {{ path: location.pathname}} />);