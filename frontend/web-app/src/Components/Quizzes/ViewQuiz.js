import React, { useState, useEffect} from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

import { 
  Box,
  Container,
  VStack,
  HStack,
  Divider,
  Text,
  SimpleGrid

} from '@chakra-ui/react'

const ViewQuiz = () => {

  const location = useLocation(); 

  const [question, setQuestion] = useState([]); 

  const [slug, setSlug] = useState(); 

  const { auth } = useAuth(); 

  const colorBg = location.state.colorBg;

  /**
   * Gets a single quiz from the backend
   * @param {*} slug 
   */
  const getQuiz = async (slug) => {

    const response = await fetch(`http://127.0.0.1:8000/quizzes/${slug}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
    }); 
    
    const result = await response.json(); 

    setQuestion(result.questions); 
    
  }; 

  /**
  * Calls gets quiz and populates array
  */
  useEffect(() => {

    const slug = location.state.slug;
    const name = location.state.name;
   
      
    setSlug(name); 

    getQuiz(slug); 

  }, [])

  return(
    <Container maxW='80rem' centerContent>
     <Box>
        {question.map((question) => (
          <Box 
          bgColor={colorBg}
          borderRadius='0.5rem'
          p = '10px'
          m = '10px'
          minWidth='500px'
          maxWidth='520px'
          >
    
            <SimpleGrid column={2} minChildWidth='420px' spacing = {4}>
              {/* <Box>
                <Text fontSize='lg' align='center'>{name}</Text>
              </Box> */}
              <Box>
                <Text textAlign='left' float='left'>Question:</Text>
                <Text textAlign='right' isTruncated>{question.question_body}</Text>
              </Box>
              <Divider orientation='horizontal' borderWidth= '.2px'/>
              <Box>
                <Text textAlign='left' float='left'>Answer 1:</Text>
                <Text textAlign='right' isTruncated>{question.answers[0].answer_body}</Text>
              </Box>
              <Divider orientation='horizontal' borderWidth= '.2px'/>
              <Box>
                <Text textAlign='left' float='left'>Answer 2:</Text>
                <Text textAlign='right' isTruncated>{question.answers[1].answer_body}</Text>
              </Box>
              <Divider orientation='horizontal' borderWidth= '.2px'/>
              <Box>
                <Text textAlign='left' float='left'>Answer 3:</Text>
                <Text textAlign='right' isTruncated>{question.answers[2].answer_body}</Text>
              </Box>
              <Divider orientation='horizontal' borderWidth= '.2px'/>
              <Box>
                <Text textAlign='left' float='left'>Answer 4:</Text>
                <Text textAlign='right' isTruncated>{question.answers[3].answer_body}</Text>
              </Box>
              <Divider orientation='horizontal' borderWidth= '.2px'/>

              <Box>
                <Text textAlign='left' float='left'>Correct Answer:</Text>
                <Text textAlign='right' float = 'right'>{question.answers[question.correct_answer].answer_body}</Text>
              </Box>
              
            </SimpleGrid>
    
          </Box>
          ))
          }        
     </Box>
    </Container>
  ); 
}; 

export default ViewQuiz; 
