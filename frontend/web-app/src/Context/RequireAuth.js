import React, { useContext } from 'react'; 
import KahootContext from './Kahoot/kahootContext';
import { Navigate, useLocation } from 'react-router-dom';


const RequireAuth = ({ children }) => {

  const kahootContext = useContext(KahootContext); 
  const location = useLocation(); 
  
  const { authed } = kahootContext; 

  console.log('inside RequireAuth. Here is authed: ', authed); 

  return(authed === true ? children : <Navigate to ='/login' replace state = {{ path: location.pathname}} />);
}; 

export default RequireAuth; 