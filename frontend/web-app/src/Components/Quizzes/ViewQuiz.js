import React, { useState, useEffect} from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

import { 
  Box,
  Text,
  Container, 
  Flex
} from "@chakra-ui/react";

const ViewQuiz = () => {

  const location = useLocation(); 

  const slug = location.state.slug; 
  const test = location.state.quiz; 
  const [quiz, setQuiz] = useState({}); 


  const { name, questions } = test; 


  const { auth } = useAuth(); 

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
    console.log(result.questions); 


    
    setQuiz(result); 
    
  }; 

  return(
    <Container maxW='80rem' centerContent>
     <Box>
        <Text fontSize='lg' align='center'>{name}</Text>

        {questions.map(question => (

          <Box>
            <Text>Question: {question.question_body}</Text>
            <Text>Answer1: {question.answers[0].answer_body}</Text>
            <Text>Answer2: {question.answers[1].answer_body}</Text>
            <Text>Answer3: {question.answers[2].answer_body}</Text>
            <Text>Answer4: {question.answers[3].answer_body}</Text>
          </Box>

          ))
          }        
     </Box>
    </Container>
  ); 
}; 

export default ViewQuiz; 



