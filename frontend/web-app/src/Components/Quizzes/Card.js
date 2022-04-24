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
    <Box minW= '450px' maxW= '500px' mt = '50px' >
      <Box 
      bg = '#E8A87C'
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

        <SimpleGrid column={2} minChildWidth='420px' spacing = {4}>
          <Box>
            <Text textAlign='left' float='left'>Question:</Text>
            <Text textAlign='right'  isTruncated>{question_body}</Text>
          </Box>
          <Divider orientation='horizontal' borderWidth= '.2px'/>
          <Box>
            <Text textAlign='left' float='left'>Answer 1:</Text>
            <Text textAlign='right'  isTruncated>{answers[0].answer_body}</Text>
          </Box>
          <Divider orientation='horizontal' borderWidth= '.2px'/>
          <Box>
            <Text textAlign='left' float='left'>Answer 2:</Text>
            <Text textAlign='right'  isTruncated>{answers[1].answer_body}</Text>
          </Box>
          <Divider orientation='horizontal' borderWidth= '.2px'/>
          <Box>
            <Text textAlign='left' float='left'>Answer 2:</Text>
            <Text textAlign='right' isTruncated>{answers[2].answer_body}</Text>
          </Box>
          <Divider orientation='horizontal' borderWidth= '.2px'/>
          <Box>
            <Text textAlign='left' float='left'>Answer 3:</Text>
            <Text textAlign='right'  isTruncated>{answers[3].answer_body}</Text>
          </Box>
          
        </SimpleGrid>

      </Box>

    </Box>
  ); 

}; 

export default Card; 
