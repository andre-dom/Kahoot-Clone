import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

const Navbar = () => {

  const navigate = useNavigate(); 
  const { auth, setAuth } = useAuth(); 

  const handlSubmit = async () => {

    try {
     
      const response = await fetch('http://127.0.0.1:8000/auth/token/logout/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${auth.token}`
        },
      
      }); 

      const result = await response;  

      setAuth(false); 
      navigate('/Login'); 

    } catch (e) {

      console.log('error: ', e); 

    }
  }; 



  return (
    <Flex bgColor="blue.100" align="center" justify="space-between" p="14">
      <Box p="2">
        <Heading as = 'h4' size = 'md'>Kahoot Clone</Heading>
      </Box>
      <Box>
        <Heading as="h2" size="xl" color="gray.500" fontWeight="semi-bold">
          User's Dashboard
        </Heading>
      </Box>
      <Button
        p="2"
        border="1px"
        borderColor="black.200"
        borderRadius="md"
        onClick = {handlSubmit}
      >
        Logout
      </Button>
    </Flex>
  );
};
export default Navbar;