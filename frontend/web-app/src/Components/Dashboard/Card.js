import React, { useState, useEffect } from 'react'; 
import { 
  Box,
  Container,
  Checkbox,
  Input,
  VStack,
  HStack,
  Divider,
  Textarea,
  Button
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'

const Card = ({questionSet, handleDelete}) => {
    
    const {
      question_body,
      answers
    } = questionSet;
    

//! You are going to remove the inputs 
  return(
    <Container w = 'auto'>
      <Box 
      bg = '#F3F7F7'
      borderRadius='0.5rem'
      p = '10px'
      m = '10px'
      w = '100%s'
      >
      <HStack p = '5px' spacing = '20rem' m = '10px'>
        <p>1</p>
        <Box p = '5px'>
          <DeleteIcon onClick={()=> {handleDelete(question_body)}}></DeleteIcon>
        </Box>
      </HStack>
      <Divider orientation='horizontal'/>
        <VStack mt = '15px' p = '10px' spacing= '25px'>
          <Box>
            <HStack>
              <p>{question_body}</p>
            </HStack>
          </Box>
         
          <Box>
            <HStack>
              <p>{answers[0].answer_body}</p>
            </HStack>
          </Box>
         
          <Box>
            <HStack>
              <p>{answers[1].answer_body}</p>
            </HStack>
          </Box>
         
          <Box>
            <HStack>
              <p>{answers[2].answer_body}</p>
            </HStack>
          </Box>
         
          <Box>
            <HStack>
              <p>{answers[3].answer_body}</p>
            </HStack>
          </Box>
         
        </VStack>
      </Box>
      {/* <Button size = 'sm'>Add Another Question</Button> */}

    </Container>
  ); 

}; 

export default Card; 