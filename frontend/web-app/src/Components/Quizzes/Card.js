import React from 'react'; 
import { 
  Box,
  Container,
  VStack,
  HStack,
  Divider,
  Text,
  SimpleGrid

} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'

const Card = ({ index, questionSet, handleDelete}) => {

  //? Theres some default sytling with <DeleteIcon>. I'm not sure -50px is a good solution 
    
  const {
    question_body,
    answers
  } = questionSet;
    

  return(
    <Container minW= '450px' maxW= '500px' mt = '20px'>
      <Box 
      bg = '#F3F7F7'
      borderRadius='0.5rem'
      p = '10px'
      m = '10px'
      minWidth='500px'
      maxWidth='520px'
      >
      <Box>
        <Container>
          <Text textAlign= 'left'>{++index}</Text>
          <Text textAlign= 'right'>
            <DeleteIcon boxSize = '1.1em' mt = '-50px' cursor='pointer' onClick={ () => {handleDelete(question_body)}}></DeleteIcon>
          </Text>
        </Container>
      </Box>
      <Divider orientation='horizontal' borderWidth= '.2px'/>

        <SimpleGrid column={2} minChildWidth='420px' spacing = {10}>
          <Box>
            <Text textAlign='left' float='left'>Question:</Text>
            <Text textAlign='right' float = 'right'>{question_body}</Text>
          </Box>
          <Divider orientation='horizontal' borderWidth= '.2px'/>
          <Box>
            <Text textAlign='left' float='left'>Answer 1:</Text>
            <Text textAlign='right' float = 'right'>{answers[0].answer_body}</Text>
          </Box>
          <Divider orientation='horizontal' borderWidth= '.2px'/>
          <Box>
            <Text textAlign='left' float='left'>Answer 2:</Text>
            <Text textAlign='right' float = 'right'>{answers[1].answer_body}</Text>
          </Box>
          <Divider orientation='horizontal' borderWidth= '.2px'/>
          <Box>
            <Text textAlign='left' float='left'>Answer 2:</Text>
            <Text textAlign='right' float = 'right'>{answers[2].answer_body}</Text>
          </Box>
          <Divider orientation='horizontal' borderWidth= '.2px'/>
          <Box>
            <Text textAlign='left' float='left'>Answer 3:</Text>
            <Text textAlign='right' float = 'right'>{answers[3].answer_body}</Text>
          </Box>
          
        </SimpleGrid>

      </Box>

    </Container>
  ); 

}; 

export default Card; 
