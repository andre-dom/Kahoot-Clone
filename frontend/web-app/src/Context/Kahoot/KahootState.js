import React, { useReducer, useState, useContext } from 'react'; 
import KahootContext from './kahootContext';
import KahootReducer from './kahootReducer'; 


import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_TOKEN
} from '../types'; 

const KahootState = props => {

  const initialState = {
    token: '', 
    authed: false
  }

  const [state, dispatch] = useReducer(KahootReducer, initialState); 

  /**
   * Recieves a username and passwords and makes a POST
   * request to the API 
   * @param {*} userName 
   * @param {*} password 
   */
   const SignUp = async (userName, password) => {

    const data = {
      "username": userName,
      "password": password
    }

    try {

      const response = await fetch('http://127.0.0.1:8000/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });

      const result = await response.json(); 

      //console.log('SignUp function: ', result);
      
      dispatch({
        type: SIGNUP,
        payload: true
      }); 

     // console.log('dispatch was called. Here is authed: ', state.authed); 


    } catch (e) {

      console.log(e); 

      // return false; 
    }

    // return true // if everything went well

  };

  /**
   * 
   * @param {*} userName 
   * @param {*} password 
   */
  const Login = async (userName, password) => {

    const data = {
      "username": userName,
      "password": password
    };    

    try {

      const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }); 

      const result = await response.json(); 

      console.log('result: ', result.auth_token); 

      dispatch({
        type: SET_TOKEN,
        payload: result.auth_token
      }); 
  
      dispatch({
        type: LOGIN,
        payload: true
      });

      console.log('login(): dispatch was called. Here is authed: ', state.authed);

    } catch (e) {

      console.log(e); 

      return false; 

    }

    return true // if everything went well

  }; 

  const Logout = async () => {

    

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/token/logout/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${state.token}`
        }
      }); 

      const result = await response.json(); 

      console.log("logout ", result); 

    
      dispatch({
        type: LOGOUT,
        payload: false
      })

      console.log('logout(): dispatch was called. Here is authed: ', state.authed);

    } catch (e) {

      console.log(e); 

    }
  
    
  }

  const values = {
    authed: state.authed, 
    token: state.token,
    SignUp,
    Login,
    Logout
  }; 

  return (
    <KahootContext.Provider value = {values}>
      {props.children}
    </KahootContext.Provider>
  ); 
}; 

export default KahootState; 