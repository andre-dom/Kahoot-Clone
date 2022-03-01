
//** Remember to change what you're importing 
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_TOKEN,
  SET_AUTH
} from '../types'; 

// ? Up to you what you want to call the commands in types.js 

export default (state, action) => {

  switch(action.type) {


  }

}


  //! These are examples. Do not use anymore. 
  //   case SET_AUTH: 
  //     return {
  //       ...state,
  //       authed: action.payload
  //     }

  //   case LOGIN:
  //     return {
  //       ...state,
  //       authed: action.payload
  //     }  
  //   case SET_TOKEN:
  //     return {
  //       ...state, 
  //       token: action.payload
  //     }
  // }