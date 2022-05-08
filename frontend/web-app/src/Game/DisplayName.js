import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Box,
  Button,
} from '@chakra-ui/react'

const DisplayName = () => {

   /**
     * Checks if the given string is empty
     * @param {*} str 
     * @returns true if the given string is empty and false if 
     * its not
     */
    const isEmpty = (str) => {

      return (!str || str.length === 0);
  }

  const { slug } = useParams(); 

  const [username, setUsername] = useState('');
  const [emptyUserName, setEmptyUserName] = useState(true); 

  const navigate = useNavigate(); 


  const handleClick = async () => {

    await setName(); 

    navigate(`/game/${slug}/multipleChoice`)

  }

  const setName = async () => {

    const data = {
      "name": username
    }

    const response = await fetch(`http://127.0.0.1:8000/player/${slug}/setname/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if(!response.ok){

      console.log(response);
    
    }

    //const result = await response.json(); 

   // console.log(result); 

  }; 

  useEffect(() => {

    if(!isEmpty(username)) {
            
      setEmptyUserName(false); 

  } else {

      setEmptyUserName(true); 
  }


  }, [username])

  return(
        <div>
            <Center height="100vh">
                <Box
                height="200px"
                width="400px"
                bg = '#85DCBA'
                boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                borderRadius="0.6rem"
                p='4'
                >
                <FormControl isRequired>
                    <FormLabel htmlFor='quiz-name'>Enter the name you want to display:</FormLabel>
                    <Input 
                    id='quiz-name' autoComplete = 'off' 
                    placeholder='Display name' 
                    _placeholder={{ opacity: 1, color: 'gray.500' }}
              
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                </FormControl>
                    <Button
                    onClick={handleClick}
                    mt={4}
                    colorScheme='teal'
                    disabled = {emptyUserName ? true : false}               
                    >
                    Start Game
                    </Button>        
                </Box>
            </Center>
        </div>

  )
}

export default DisplayName;