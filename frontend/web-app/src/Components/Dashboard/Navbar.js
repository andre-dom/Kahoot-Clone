import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGame from "../../hooks/useGame";
import { ip, port } from '../../ports';
import { Flex, Box, Heading, Button, Alert, AlertIcon} from "@chakra-ui/react";

const Navbar = () => {

  const navigate = useNavigate(); 
  const { auth, setAuth } = useAuth(); 
  const { game, setGame } = useGame(); 
  const [alert, setAlert] = useState(false);

  /**
   * Will be called when the user wants to logout and sends
   * a POST request to the backend that the user wants to logout 
   * local storage will also be cleared 
   */
  const handleLogout = async () => {

    try {
     
      const response = await fetch(ip + port + '/auth/token/logout/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${auth.token}`
        },
      
      }); 

      const result = await response;  

      setAuth(false); 
      localStorage.clear(); 
      navigate('/'); 

    } catch (e) {

      console.log('error: ', e); 

    }
  }; 

  /**
  * Redirect the user to the create quiz page
  */
  const addQuiz = () => {
    navigate('/createQuiz');
  }; 

  /**
   * Redirect the user to the completed quizzes page
   */
  const completedQuizzes = () => {
    navigate('/CompletedQuizzes');
  }

  /**
   * Redirect the user to the questions page
   */
  const resumeQuiz = () => {
    navigate('/questions');
  }

  /**
   * Sends a DELETE request to the backend to delete the quiz
   * @returns 
   */
  const endQuiz = async () =>{
    const response = await  fetch (ip + port + '/game/delete/',{
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
          onClick = {handleLogout}
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