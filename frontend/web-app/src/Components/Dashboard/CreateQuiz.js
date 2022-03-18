import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Box,
  Button
} from '@chakra-ui/react'

const CreateQuiz =()=>{
    const [quizName, setQuizName] = useState('');
    const navigate = useNavigate();
    return (
        <div>
        <Center height="100vh">
            <Box
            height="200px"
            width="400px"
            boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
            borderRadius="0.6rem"
            p='4'
            >
            <FormControl isRequired>
                <FormLabel htmlFor='quiz-name'>Quiz Name:</FormLabel>
                <Input id='quiz-name' placeholder='Add you quiz name' 
                value={quizName}
                onChange={(e)=> setQuizName(e.target.value)}
                />
            </FormControl>
            
            
                <Button
                onClick={() => navigate('/AddQuestions', {state:{quizName}})}
                mt={4}
                colorScheme='teal'               
            >
            Next
          </Button>        
            </Box>
    </Center>
        </div>
    )
}
export default CreateQuiz;