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
 import useAuth from '../../hooks/useAuth';
 import { useNavigate, useLocation } from "react-router-dom";

 const address = ['@gmail.com', '@yahoo.com', '@qq.com', '@163.com', '@outlook.com', '@sjsu.edu']; 

const Home = () => {

    const [quizName, setQuizName] = useState('');
    const [email, setEmail]  = useState('');
    const [emails, setEmails] = useState([]);
    const { auth } = useAuth();
    const navigate = useNavigate(); 
    const [error,  setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
    const location = useLocation(); 

    /**
   * Checks if the given string is empty
   * @param {*} str 
   * @returns true if the given string is empty and false if 
   * its not
   */
  const isEmpty = (str) => {
    return (!str || str.length === 0);
  }

  const validEmail = (email) => {

    // console.log(email); 

    for(let i = 0; i < address.length; i++) {

      if(email.includes(address[i])) {
        if(email.length === address[i].length) {
          console.log(email); 
          return false;
        }  
        return true; 
      }

    }

    return false; 
  }
    

    /**
     * 
     */
    const handleClick = async (e) => {
      
      e.preventDefault();
      
      if(isEmpty(email)){ // if email input is empty
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

     console.log(emails)
     

     

      
      // if(email && !emails.includes(email) && validEmail(email)) {

      //   addPlayer(email)
        
      // } else if(isEmpty(email)) {

      //   setError(true); 
      //   setErrorMessage('At least one email');  

      //   return; 

      // } else if(emails.includes(email)) {

      //   setError(true); 
      //   setErrorMessage('Email already exists'); 

      //   return; 

      // } else {

      //   setError(true); 
      //   setErrorMessage('Email is not valid'); 

      //   return;l 
      // }

      // if(isEmpty(email)) {

      //   setError(true); 
      //   setErrorMessage('At least one email');  

      //   return; 

      // } else if(emails.length === 0) {


      // }

      
      
      // const slug = location.state.slug; 

      // const data = {
      //     'quiz' : slug,
      //     'players': emails
      // }
      // const response = await fetch('http://127.0.0.1:8000/game/new/', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `token ${auth.token}`
      //     },
      //     body:JSON.stringify(data)
      // })

      // if(!response.ok){
      //     setError(true);
      //     console.log(response);

      // } else {
        
      //   navigate('/questions')
      //   const result = await response.json();
      //   console.log(result);

      // }  
      
      
    }


    useEffect(() => {
      setError(false); 
    
    },[email])

    

   const del = async () => {
       const data = {
            'quiz' : 'year',
            'players': [
                {
                    'email':'123@gmail.com'
                }
            ]
        }

       const response = await fetch('http://127.0.0.1:8000/game/delete/', {
           method: 'DELETE',
           headers:{
               'Content-Type' : 'application/json',
               'Authorization' : `token ${auth.token}`
           },
           body: JSON.stringify(data)
       });
      
   }
   const nextQuestion = async () => {
       const response = await fetch('http://127.0.0.1:8000/game/advance/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            },
        })
        if(!response.ok){
            console.log(response);
        }
        const result =await response.json();
        console.log(result);
   }

   const currentQuestion = async () =>{
        const response = await fetch('http://127.0.0.1:8000/game/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            },
        })
        if(!response.ok){
            console.log(response);
        }
        const result =await response.json();
        console.log('current question is: ' + result.current_question.question_body);
   }

   const startGame = async (data) => {



   }; 

   const  addPlayer =  ()  => {

    if(isEmpty(email)) { // if email input is empty 
      setError(true);
      setErrorMessage('Email input is empty'); 

      return; 

    } 

    if(!validEmail(email)) { // if email is invalid 

      setError(true); 
      setErrorMessage('not valid email'); 

      return; 
    
    } 

    console.log(email);
    emails.push(email);
    console.log(emails); 
    setEmail(''); 
    
    
      
   }


    return(
        <Box>
          <Box>
              {
                error && (
                  <Alert 
                    status='error'
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
              <Button onClick = {del} >Delete</Button>
              <Button onClick  =  {addPlayer}>Add Player</Button>
              <Button onClick = {nextQuestion}> Advance</Button>
              <Button onClick = {currentQuestion}>current question</Button>
              <Button onClick = {handleClick}> Start Game</Button>
          </Box>

        
          {emails.map(email => (
            <Text>{email}</Text>

          ))
          }

        </Box>

    )
}
export default Home;