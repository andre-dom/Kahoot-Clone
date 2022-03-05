import React from "react";
import useAuth from "../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
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

const SignUp = () => {
  
  // getting auth state from the global AuthContext 
  const { setAuth } = useAuth(); 

  const userRef = useRef(); 
  const errorRef = useRef(); 
  const navigate = useNavigate(); 

  // Username State
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false); 

  //Password State
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false); 
  const [pwdFocus, setPwdFocus] = useState(false); 

  //Error message state
  const [errorMessage, setErrorMessage] = useState(''); 
  const [error, setError] = useState(false); 


  // will test the user input once the user starts typing
  useEffect(() => {

    setValidName(USER_REGEX.test(user)); 

  }, [user]); 

  // will test the user password input once the user starts typing
  useEffect(() => {

    setValidPwd(PWD_REGEX.test(pwd));

  }, [pwd]); 


  // this hook will run only once when the page is loaded
  useEffect(() => {

    userRef.current.focus(); 

  },[]);

  // will clear error message when the user starts typing in the 
  // fields listed in the dependency array
  useEffect(() => {

    setErrorMessage(''); 
    setError(false); 

  }, [user, pwd])

  const isEmpty = (str) => {
    return (!str || str.length === 0);
  }

  /**
   * Makes a request to the backend API to login and returns a token 
   */
  const login = async (data) => {
    
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
       
        setErrorMessage(`Status ${response.status}. Please Try Again`);

      } else if(response.status === 401) {

        setErrorMessage(`Status ${response.status}. Please Try Again`);

      }

      errorRef.current.focus();

      return; 

    } else {

      const result = await response.json(); 

      const token = result?.auth_token; 

      return token; 

    }
  }

  /**
   * Makes a request to the backend API to create a user account
   */
  const handleSubmit = async (e) => {
   
    e.preventDefault(); 

    const test = USER_REGEX.test(user); 
    const test2 = PWD_REGEX.test(pwd); 

    if(!test || !test2) {
      
      setError(true); 
      
      setErrorMessage('Invalid Entry'); 
      
      return; 

    } else if(isEmpty(user) || isEmpty(pwd)) {
      
      setError(true); 
      
      setErrorMessage('Input is empty!'); 

      return; 
    }

    const data = {
      "username": user,
      "password": pwd
    }

    const response = await fetch('http://127.0.0.1:8000/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });

    if(!response.ok) {

      setError(true); 

      if(response.status === 400) { //? What should we print out for each status
        setErrorMessage(`Status ${response.status}. Please Try Again`);

      } else if(response.status === 401) {

        setErrorMessage(`Status ${response.status}. Please Try Again`);

      }

      errorRef.current.focus();

      return; 
      
    } else {

      const result = await response.json();
      
      const token = await login(data); 

      if(isEmpty(token)) {
        
        setError(true); 
        
        setErrorMessage('Failed to login'); 
        
        return;
      }
      
      setAuth({user, pwd, token}); 
      setUser(''); 
      setPwd(''); 
  
      navigate('/dashboard'); 

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
              Sign Up
            </Heading>
            <Center>
              <FormControl isRequired mt="20px" onSubmit = {handleSubmit}>
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
                    size="md"
                    variant="filled"
                    width="auto"
                   >
                  </Input>

                {userFocus && user && !validName && (
                  <FormHelperText>
                    4 to 24 characters.<br />
                    Must begin with a capital letter.<br />
                    Letters, numbers, @.#$%_ are allowed
                  </FormHelperText>
                 )}   
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    placeholder="Password"
                    required
                    type="password"
                    size="md"
                    variant="filled"
                    width="auto"
                    value={pwd}
                    onChange={(e) => { setPwd(e.target.value)}}
                    onFocus = {() => setPwdFocus(true)}
                    onBlur = {() => setPwdFocus(false)}
                  ></Input>
                  {pwdFocus && pwd && !validPwd && (
                    <FormHelperText>
                      8 to 24 characters. <br/>
                      Must begin with a capital letter. <br/>
                      Letters, numbers, and @.#$%_ are allowed
                    </FormHelperText>
                  )}
                </Stack>
                <Button
                  mt="20px"
                  colorScheme="teal"
                  size="sm"
                  width="100%"
                  type="submit"
                  onClick = {handleSubmit}
                  disabled = {!validName || !validPwd ? true : false}
                >
                  Sign Up
                </Button>
              </FormControl>
            </Center>
          </Container>
        </Box>
        <HStack pl="55px">
          <Center>
            <p>Already have an account?</p>
            <Link style={{margin: '1rem', textDecoration: 'none', color: 'blue'}} to="/login">
              Login
            </Link>
          </Center>
        </HStack>
      </Stack>
    </Center>
  );
};

export default SignUp;
