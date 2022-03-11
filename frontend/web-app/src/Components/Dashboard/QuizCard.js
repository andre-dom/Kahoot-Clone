import React from "react";
import useAuth from "../../hooks/useAuth";
import { Box, Button, Text, Center } from "@chakra-ui/react";

const QuizCard = ({ name, slug, handleDelete }) => { 

  const { auth } = useAuth(); 

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

    if(!response.ok) {

      console.log(response.text()); 

      console.log('there was an error.');
      return; 
    }

    handleDelete(slug); 


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
        justifyContent="left"
      >
        <Button 
        colorScheme="teal" 
        variant="link" 
        fontWeight="16px"
        >
          Edit
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
      </Box>
    </Box>
  );
};
export default QuizCard;
