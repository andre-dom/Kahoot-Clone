import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Container,
  VStack,
  HStack,
  Divider,
  Text,
  SimpleGrid,
  Button

} from '@chakra-ui/react'


const CompletedCard = ({ name, slug }) => {

  const navigate = useNavigate();

  const viewQuiz = () => {
    navigate(`/CompletedQuizzes/${slug}`); 
  }

  return(
    <Box boxShadow="md" rounded="md" bg="white" height="180px" width = "300px" m = '0'>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80%"
        borderTopRadius="md"
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
          

        </HStack>
      </Box>
    </Box>
  ); 

}; 

export default CompletedCard; 
