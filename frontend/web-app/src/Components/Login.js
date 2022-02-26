import React from "react";
import KahootContext from "../Context/Kahoot/kahootContext";
import { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Box,
  Stack,
  HStack,
  Button,
} from "@chakra-ui/react";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const kahootContext = useContext(KahootContext); 
  const navigate = useNavigate(); 

  const { Login, authed } = kahootContext; 

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "blue",
  };

  const isEmpty = (str) => {
    return (!str || str.length === 0);
  }

  const handleLogin = async () => {

    if(!isEmpty(userName) && !isEmpty(password)) {

      await Login(userName, password)

      console.log('handlelogin if statement'); 

      navigate('/Dashboard')
    }

  };

  return (
    <Center height="100vh">
      <Stack>
        <Box
          height="380px"
          width="350px"
          boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
          borderRadius="0.6rem"
        >
          <Container maxW="md" centerContent mt="25px" p="10px">
            <Heading size="md" as="h5">
              Login
            </Heading>
            <Center>
              <FormControl isRequired mt="20px">
                <Stack spacing={2}>
                  <FormLabel htmlFor="username">User Name</FormLabel>
                  <Input
                    placeholder="username"
                    size="md"
                    variant="filled"
                    width="auto"
                    value={userName}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  ></Input>

                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    placeholder="Password"
                    type="password"
                    size="md"
                    variant="filled"
                    width="auto"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Input>
                </Stack>
                <Button 
                mt="20px" 
                colorScheme="teal" 
                size="sm" 
                width="100%"
                onClick={handleLogin}
                >
                  Login
                </Button>
              </FormControl>
            </Center>
          </Container>
        </Box>
        <HStack pl="55px">
          <Center>
            <p>Don't have an account yet?</p>
            <Link style={linkStyle} to="/">
              SignUp
            </Link>
          </Center>
        </HStack>
      </Stack>
    </Center>
  );
};

export default Login;


