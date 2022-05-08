import React, { useState,  useEffect } from 'react';
import { 
    Input,
    Box,
    Button,
    Alert, 
    AlertIcon, 
    AlertTitle,
    Text
 } from '@chakra-ui/react';
 import useAuth from '../hooks/useAuth';
 import { useNavigate, useLocation } from "react-router-dom";

 const address = ['@gmail.com', '@yahoo.com', '@qq.com', '@163.com', '@outlook.com', '@sjsu.edu']; 

const Home = () => {

    const [email, setEmail]  = useState('');
    const [emails, setEmails] = useState([]);
    const { auth } = useAuth();
    const navigate = useNavigate(); 
    const [error,  setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
    const location = useLocation(); 
    const [slug, setSlug] = useState('');
    //const [alert, setAlert] = useState(false);
    

    /**
     * Once the user begins typing
     * remove the error
     */
    useEffect(() => {
      setError(false); 
    
    },[email])

    useEffect(() => {
      if(isEmpty(localStorage.getItem('slug'))){
        alert('Slug is empty...')
        return;
      }
      
      setSlug(localStorage.getItem('slug'));
      
    },[])

    useEffect(() => {
      getGame();
    }, [])


    /**
   * Checks if the given string is empty
   * @param {*} str 
   * @returns true if the given string is empty and false if 
   * its not
   */
    const isEmpty = (str) => {
      return (!str || str.length === 0);
    }

    /**
     * Checks if the input has a valid address and format
     * @param {*} email 
     * @returns 
     */
    const validEmail = (email) => {

      for(let i = 0; i < address.length; i++) {

        if(email.includes(address[i])) {

          if(email.length === address[i].length) {

            return false;
          }  
          return true; 
        }

      }

      return false; 
    }
    

    /**
     * Checks if the input is valid
     * and calls helper functions to start game
     * TODO FIX LOGIC
     */
    const handleClick = async (e) => {
      
      e.preventDefault();
      
      if(isEmpty(email)){ // if email input is empty
        console.log('email is empty.'); 
        if(emails.length > 0){

          await startGame()

        }

        console.log('array length is also empty.'); 

        setError(true); 
        setErrorMessage('email is empty');  
        return;
     }
      if(!validEmail(email)){ // not valid email 
         setError(true); 
         setErrorMessage('Not valid email');  

         return;
      }
 
      if(emails.includes(email)){  // if array already contains email
        setError(true); 
        setErrorMessage('Email already exists');  

        return;
     }

     addPlayer(email);

     console.log('starting game...'); 

     await startGame()
    
      
    }
  
    /**
      * Calls the backend api to start game
      * @param {*} data 
      */
    const startGame = async () => {
          
      // const slug = location.state.slug; 

      const data = {
          'quiz' : slug,
          'players': emails
      }

      console.log(data); 

      const response = await fetch('http://127.0.0.1:8000/game/new/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${auth.token}`
          },
          body:JSON.stringify(data)
      })

      if(!response.ok){
          setError(true);
          // setErrorMessage('there was an error'); 
          // setStatus('error')
          console.log('there was an error')
          console.log('error: ' + JSON.stringify(response))

      } else {
        
        navigate('/questions')
        const result = await response.json();

      }  

    }; 

   /**
    * Create an object and add it to the array
    * @returns 
    * TODO FIX LOGIC
    */
   const addPlayer =  ()  => {

    if(isEmpty(email)) { // if email input is empty 
      setError(true);
      // setStatus('error'); 
      setErrorMessage('Email input is empty'); 

      return; 

    } 

    if(!validEmail(email)) { // if email is invalid 

      setError(true); 
      // setStatus('error'); 
      setErrorMessage('not valid email'); 

      return; 
    
    } 

    const objEmail = {
        
      "email": email
        
    }

    emails.push(objEmail);

    setEmail(''); 
       
   }

   const getGame = async() => {
    const response = await fetch('http://127.0.0.1:8000/game/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${auth.token}`
      },
    })

    console.log(response.status )

    if(!response.ok){
      console.log('error in getGame' + response);
      
    } else {

      const result = await response.json();
      
      if(result) {
        //setAlert(true); 
        // setError(true);
        // setErrorMessage('There is a game currently active.')
        // setStatus('info')
        navigate('/Dashboard')
      } 

    }
   }

   const resumeQuiz = () => {
    navigate('/questions');
  }

  const endQuiz = async () =>{
    const response = await  fetch (`http://127.0.0.1:8000/game/delete/`,{
            method:  'DELETE',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `token ${auth.token}`
            }
        })
        if(!response.ok){
            console.log('an error occurred');
            return;
        }
        setError(false);
  }




    return(
        <Box>

          <Box>
              {
                error && (
                  <Alert 
                    borderRadius='0.6rem'
                    mt='-19px'
                    mb='5px'
                  >
                      <AlertIcon />
                      <AlertTitle mr={2}>{errorMessage}</AlertTitle>
                         
                  </Alert>
                )
              }
              <Input placeholder='Email' value={email} onChange = {(e) => setEmail(e.target.value)}/>
              {/* <Button onClick = {handleClick}>Add</Button> */}
              <Button onClick  =  {addPlayer}>Add Player</Button>
              <Button onClick = {handleClick}> Start Game</Button>
          </Box>

        
          {emails.map(email => (
            <Text>{email.email}</Text>

          ))
          }

        </Box>

    )
}
export default Home;