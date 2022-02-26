import React, { useContext } from "react";
import KahootContext from "../Context/Kahoot/kahootContext";
import { useNavigate } from "react-router-dom";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

const Navbar = () => {

  const kahootContext = useContext(KahootContext); 
  const navigate = useNavigate(); 

  const { Logout, token, authed } = kahootContext; 

  const isEmpty = (str) => {
    return (!str || str.length === 0);
  }

  const handleLogOut = async () => {

 
      
      await Logout(); 

      console.log('handleLogOut: authed', authed)
      navigate('/Login')



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
        onClick = {handleLogOut}
      >
        Logout
      </Button>
    </Flex>
  );
};
export default Navbar;
