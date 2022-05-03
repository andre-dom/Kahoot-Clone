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


const Login = () => {

  const { setAuth } = useAuth(); 

  const navigate = useNavigate(); 
  const location = useLocation(); 

  const from = location.state?.from?.pathname || '/dashboard'; 

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
  const [error, setError] = useState(false); 

  /**
  * If the user is already logged in then
  * redirect them to dashboard. 
  */
  useEffect(() => {

    const localUser = JSON.parse(localStorage.getItem('user')); 

    if(localUser.user) {
      navigate('/dashboard');
      console.log('going to dashboard...'); 
    } 

  }, []);

  /**
   * this hook will run only once when the page is loaded
   */
  useEffect(() => {

    userRef.current.focus(); 

  },[]);

  /**
   *  will clear error message when the user starts typing in the 
   *  fields listed in the dependency array
   */
  useEffect(() => {

    setErrorMessage(''); 
    setError(false); 

  }, [user, pwd]);


  /**
   * Checks if the given string is empty
   * @param {*} str 
   * @returns true if the given string is empty and false if 
   * its not
   */
  const isEmpty = (str) => {
    return (!str || str.length === 0);
  }
  
  /**
   * Makes a request to the backend API to login in user
   * Note: this request returns back a token 
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if(isEmpty(user) || isEmpty(pwd)) {
      setError(true); 
      setErrorMessage('Inputs are empty!'); 
      return; 
    }

    const data = {
      "username": user,
      "password": pwd
    }

    loginUser(data); 
    
  }; 

  /**
   * This function makes a POST request to the API passing in the data object
   * and redirects the user to the dashboard or the page that the user 
   * came from. 
   * @param {*} data 
   * @returns 
   */
  const loginUser = async (data) => {

    const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }); 

    if(!response.ok) {

      setError(true); 

      if(response.status === 400) { //? What should we print out for each status
        setErrorMessage("Wrong username or password");

      } else if(response.status === 401) {

        setErrorMessage("Wrong username or password");

      }

      errorRef.current.focus();

      return; 

    } else {

      const result = await response.json(); 

      const token = result?.auth_token; 

      setAuth({user, pwd, token}); 
      setUser(''); 
      setPwd(''); 

      navigate(from, { replace: true });

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
          <Container maxW="md" centerContent mt="24px" p="10px">
          {error && (
            <Alert 
            status='error'
            ref = {errorRef}
            borderRadius='0.6rem'
            mt='-19px'
            mb='5px'
            >
            <AlertIcon />
            <AlertTitle mr={2}>{errorMessage}</AlertTitle>
            </Alert>
            )}
            <Heading size="md" as="h5">
              Login
            </Heading>
            <Center>
              <FormControl isRequired mt="10px">
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
                  >  
                  </Input>

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


