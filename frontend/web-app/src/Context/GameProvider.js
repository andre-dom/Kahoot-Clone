import { createContext, useState, useEffect } from 'react'; 
import useAuth from '../hooks/useAuth';

const GameContext = createContext({}); 

export const GameProvider = ({ children }) => {

  const [game, setGame] = useState(false); 
  const { auth, setAuth } = useAuth(); 

  /**
   * Checks to see if there is a game in progress
   */
  const getGame = async() => {
    console.log('we are here')
    const response = await fetch('http://127.0.0.1:8000/game/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${auth.token}`
      },
    })

    console.log(response.status)

    if(!response.ok){
      console.log('error' + response);
    } else {

      const result = await response.json();
      
      
      if(result) {
        setGame(true); 
      } else {
        setGame(false); 
      }

    }
   }

   useEffect(() => {

    getGame(); 
    

  }, [game]); 
 

  useEffect(() => {

    getGame(); 

  }, []); 
  
  const values = {
    game, 
    setGame
  }

  return( 
    <GameContext.Provider value = {values}>
      {children}
    </GameContext.Provider>
  ); 
}; 

export default GameContext; 


/**
 * We're returning the AuthContext Provider with the state being auth.
 * the children represent the nested components 
 * because authProvider will be wrapping around our components. 
*/