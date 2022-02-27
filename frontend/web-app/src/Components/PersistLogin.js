import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react'; 
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {

  /**
  * NOTE: this page is not finished. Will use local storage to
  * store token in the future 
  */

  const[isLoading, setIsLoading] = useState(true); 
  const { auth } = useAuth(); 

  useEffect(() => {

    

  }, [])
 
}