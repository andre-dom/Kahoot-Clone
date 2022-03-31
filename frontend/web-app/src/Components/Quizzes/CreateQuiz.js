import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Box,
  Button,
} from '@chakra-ui/react'

const CreateQuiz = () => {

    //TODO: needs to alert the user if quiz name is taken or not
   
    const [quizName, setQuizName] = useState('');
    const [emptyQuizName, setEmptyQuizName] = useState(true); 
    const navigate = useNavigate();
    
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
     * Disables button if quizName is empty
     * enables button if quizName is not empty. 
     */
    useEffect(() => {

        if(!isEmpty(quizName)) {
            
            setEmptyQuizName(false); 

        } else {

            setEmptyQuizName(true); 
        }

    }, [quizName]);

    
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
                    <Input id='quiz-name' autoComplete = 'off' placeholder='Add you quiz name' 
                    value={quizName}
                    onChange={(e)=> setQuizName(e.target.value)}
                    />
                </FormControl>
                    <Button
                    onClick={() => {navigate('/addQuestions', {state:{quizName}})}}
                    mt={4}
                    colorScheme='teal'
                    disabled = {emptyQuizName ? true : false}               
                    >
                    Next
                    </Button>        
                </Box>
            </Center>
        </div>
    )
}
export default CreateQuiz;