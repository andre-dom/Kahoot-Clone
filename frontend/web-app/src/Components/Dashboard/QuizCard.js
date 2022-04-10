import React from "react";
import useAuth from "../../hooks/useAuth";
import { Box, Button, Text, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ name, slug, handleDelete, colorBg }) => { 


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
  
  const viewQuiz = () => {

    const url = name.replace(/\s+/g, '').toLowerCase(); 

    navigate(`/viewQuiz/${url}`, {state: {name, slug, colorBg}}); 
  }; 

  const startGame  =  () => {
    navigate(`/home`, {state: {slug}})
  }

  return (
    <Box boxShadow="md" rounded="md" bg="white" height="180px" width = "300px" m = '0'>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80%"
        borderTopRadius="md"
        bgColor={colorBg}
      >
        <Text fontSize= 'xl' color='#333333'>{name}</Text>
      </Box>{" "}
      <Box
        height="20%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <HStack align='center'>
        
          <Button 
          color="#669DB3FF" 
          fontFamily='Verdana'
          variant="link" 
          fontWeight="16px"
          onClick = {viewQuiz}
          >
            View
          </Button>
          <Button 
          color="#669DB3FF" 
          fontFamily='Verdana'
          variant="link" 
          fontWeight="16px"
          onClick = {startGame}
          >
            Start
          </Button>
          <Button 
          color="#669DB3FF" 
          fontFamily='Verdana'
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
