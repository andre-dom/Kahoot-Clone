import React, { useReducer, useContext } from 'react'; 
import KahootContext from './kahootContext';
import KahootReducer from './kahootReducer'; 


import {
  LOGIN,
  SIGN_OUT,
  SET_TOKEN
} from '../types'; 

const KahootState = props => {

  const initialState = {
    token: '' 
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

    const response = await fetch('http://127.0.0.1:8000/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });

    const result = await response.json();     
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

    const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }); 

    const result = await response.json(); 

    console.log(result); 

    // dispatch({
    //   type: SET_TOKEN,
    //   payload: result.
    // })
  }; 

  const Logout = async () => {

    const response = await fetch('http://127.0.0.1:8000/auth/token/logout/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${state.token}`
      }
    }); 

    const result = await response.json(); 

    console.log(result); 
  }

 
  

  const values = {
    token: state.token,
    SignUp
  }; 

  return (
    <KahootContext.Provider value = {values}>
      {props.children}
    </KahootContext.Provider>
  ); 
}; 

export default KahootState; 