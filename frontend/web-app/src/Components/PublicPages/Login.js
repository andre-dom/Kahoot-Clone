import React from "react";
import useAuth from '../../hooks/useAuth'; 
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Center,
  Box,
  Stack,
  HStack,
  Button,
  Alert, 
  AlertIcon, 
  AlertTitle,
} from "@chakra-ui/react";

const USER_REGEX = /^[A-Z][a-z0-9@#$%_.]{4,23}/
const PWD_REGEX = /[A-Z][a-z0-9@#$%_.]{7,24}/

const Login = () => {
  /*
  * TODO: Need to fix css for the <Alert/> component. 
  */

  const { setAuth } = useAuth(); 

  const navigate = useNavigate(); 
  const location = useLocation(); 

  const from = location.state?.from?.pathname || '/'; 

  const userRef = useRef(); 
  const errorRef = useRef(); 

  // Username State
  const [user, setUser] = useState('');
  const [userFocus, setUserFocus] = useState(false); 

  //Password State
  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false); 

  //Error message state
  const [errorMessage, setErrorMessage] = useState(''); 
  const [error, setError] = useState(true); 

  // this hook will run only once when the page is loaded
  useEffect(() => {

    userRef.current.focus(); 

  },[]);

  // will clear error message when the user starts typing in the 
  // fields listed in the dependency array
  useEffect(() => {

    setErrorMessage(''); 

  }, [user, pwd]);
  
  /**
   * Makes a request to the backend API to login in user
   * Note: this request returns back a token 
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const test = USER_REGEX.test(user); 
    const test2 = PWD_REGEX.test(pwd); 

    if(!test || !test2) {
      setErrorMessage('Invalid Entry'); 
      return; 
    }

    const data = {
      "username": user,
      "password": pwd
    }
  
    try {
  
      const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }); 
  
      const result = await response.json(); 

      const token = result?.auth_token; 

      setAuth({user, pwd, token}); 
      setUser(''); 
      setPwd(''); 

      navigate(from, { replace: true });


  
    } catch (err) {
  
      //TODO: These error messages don't show up. Needs debugging
      //TODO: Need to check if matching error response with API
      if (!err?.response) {

        setErrorMessage('No Server Response');
      
      } else if (err.response?.status === 409) {
      
        setErrorMessage('Username Taken');
      
      } else {

        setErrorMessage('Registration Failed')
      
      }
      
      errorRef.current.focus(); // don't remove 
  
     
  
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
          {error && (
              <Alert 
              ref={errorRef}
              status = 'error'
              display= {error}
              >
              <AlertIcon/>
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>

            )}
            <Heading size="md" as="h5">
              Login
            </Heading>
            <Center>
              <FormControl isRequired mt="20px">
                <Stack spacing={2}>
                  <FormLabel htmlFor="username">User Name</FormLabel>
                  <Input
                    placeholder="username"
                    ref = {userRef}
                    autoComplete = 'off'
                    required
                    value={user}
                    onChange={(e) => {setUser(e.target.value)}}
                    onFocus = {() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  ></Input>

                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    placeholder="Password"
                    required
                    type="password"
                    size="md"
                    variant="filled"
                    width="auto"
                    value={pwd}
                    onChange={(e) => {setPwd(e.target.value)}}
                    onFocus = {() => setPwdFocus(true)}
                    onBlur = {() => setPwdFocus(false)}
                  ></Input>
                </Stack>
                <Button 
                mt="20px" 
                colorScheme="teal" 
                size="sm" 
                width="100%"
                onClick={handleSubmit}
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
            <Link style={{margin: '1rem', textDecoration: 'none', color: 'blue'}} to="/signup">
              Sign Up
            </Link>
          </Center>
        </HStack>
      </Stack>
    </Center>
  );
};

export default Login;


