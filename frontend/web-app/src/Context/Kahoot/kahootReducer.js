import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_TOKEN
} from '../types'; 

export default (state, action) => {

  switch(action.type) {

    case LOGIN: 
      return {
        ...state,
        authed: action.payload
      }

    case SIGNUP: 
      return {
        ...state,
        authed: action.payload
      }

    case SET_TOKEN:
      return {
        ...state, 
        token: action.payload
      }

    case LOGOUT: 
      return {
        ...state,
        authed: action.payload
      }
  }
}