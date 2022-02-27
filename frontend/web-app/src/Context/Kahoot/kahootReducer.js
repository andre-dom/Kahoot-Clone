import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_TOKEN,
  SET_AUTH
} from '../types'; 

//!---------------------------------------------------------------------------------
//! DO NOT USE THIS FILE ANYMORE. Auth state moved to AuthProvider.js 
//! This page will hold api calls to quizzes (I think. The structure has to be figured out)
//!---------------------------------------------------------------------------------
export default (state, action) => {

  switch(action.type) {

    case SET_AUTH: 
      return {
        ...state,
        authed: action.payload
      }

    case LOGIN:
      return {
        ...state,
        authed: action.payload
      }  
    case SET_TOKEN:
      return {
        ...state, 
        token: action.payload
      }
  }
}