import React from "react";
import useAuth from "../../hooks/useAuth";
import { Box, Button, Text, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ name, slug, handleDelete }) => { 

  //TODO: Need to write the view quiz page! 

  const { auth } = useAuth(); 
  const navigate = useNavigate(); 

  /**
   * Uses a slug to identify the quiz the user wants to delete 
   * @returns 
   */
   const deleteQuiz = async () => {

    //? maybe check if the slug is empty and throw an error. 

    const response = await fetch(`http://127.0.0.1:8000/quizzes/${slug}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
    }); 

    handleDelete(slug); 

  };


  const getQuiz = async () => {

    const response = await fetch(`http://127.0.0.1:8000/quizzes/${slug}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
    }); 
    
    const result = await response.json(); 

    // console.log(result); 
    // console.log(result.name); 
    // console.log(result.questions[0].question_body); 
    // console.log(result.questions); 

    return result; 
    
  }; 
  
  const viewQuiz = async () => {

    const quiz = await getQuiz(); 
    
    navigate(`/viewQuiz/${name}`, {state: {name, slug, quiz}}); 
  }; 

  return (
    <Box boxShadow="md" rounded="md" bg="white" height="200px" width = "330px">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80%"
        borderTopRadius="md"
        bgColor="blue.200"
      >
        <Text>{name}</Text>
      </Box>{" "}
      <Box
        height="20%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <HStack align='center'>
        
          <Button 
          colorScheme="teal" 
          variant="link" 
          fontWeight="16px"
          onClick = {viewQuiz}
          >
            View
          </Button>
          <Button 
          colorScheme="teal" 
          variant="link" 
          fontWeight="16px"
          >
            Start
          </Button>
          <Button 
          colorScheme="teal" 
          variant="link" 
          fontWeight="16px"
          onClick = {deleteQuiz}
          >
            Delete
          </Button>

        </HStack>
      </Box>
    </Box>
  );
};
export default QuizCard;
