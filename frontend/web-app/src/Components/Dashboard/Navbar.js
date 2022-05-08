import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGame from "../../hooks/useGame";

import { Flex, Box, Heading, Button, Alert, AlertIcon} from "@chakra-ui/react";

const Navbar = () => {

  const navigate = useNavigate(); 
  const { auth, setAuth } = useAuth(); 
  const { game, setGame } = useGame(); 
  const [alert, setAlert] = useState(false);

  /**
   * 
   */
  const handlSubmit = async () => {

    try {
     
      const response = await fetch('http://127.0.0.1:8000/auth/token/logout/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${auth.token}`
        },
      
      }); 

      const result = await response;  

      setAuth(false); 
      localStorage.clear(); 
      navigate('/login'); 

    } catch (e) {

      console.log('error: ', e); 

    }
  }; 

  const addQuiz = () => {
    navigate('/createQuiz');
  }; 

  const completedQuizzes = () => {
    navigate('/CompletedQuizzes');
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
        setAlert(false);
        setGame(false); 
  }

  return (
    <Box>
      {game && (
      
       <Alert status='info'>
        < Flex align="center" justify="space-between">
       <AlertIcon />
       There is a game currently active. 

       <Box ml = '50rem'>
        <Button mr = '10px' onClick={resumeQuiz}>Resume Quiz</Button>
        <Button onClick={endQuiz}>End Quiz</Button>    
         
       </Box>
       
       
      </Flex>
     </Alert>
     
    )}
    <Flex align="center" justify="space-between" p="14">
  
    
      <Box p="2">
        <Heading as = 'h4' size = 'md'>Kahoot Clone</Heading>
      </Box>
      <Box>
        <Heading as="h2" size="xl" color="#333333" fontWeight="semi-bold" fontFamily='Verdana'>
          User's Dashboard
        </Heading>
      </Box>

      <Box>
        <Button
          p="2"
          border="1px"
          borderColor="black.200"
          borderRadius="md"
          onClick = {handlSubmit}
          mr = '10px'
        >
          Logout
        </Button>
        <Button
          p="2"
          border="1px"
          borderColor="black.200"
          borderRadius="md"
          onClick = {addQuiz}
          mr = '10px'
        >
          Add Quiz
        </Button>
        <Button
          p="2"
          border="1px"
          borderColor="black.200"
          borderRadius="md"
          onClick = {completedQuizzes}
        >
          Completed Quizzes
        </Button>
      </Box>
    </Flex>
    </Box>
  );
};
export default Navbar;