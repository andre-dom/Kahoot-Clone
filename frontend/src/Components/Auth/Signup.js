import React from "react";

import useAuth from "../../hooks/useAuth";

import { useState, useRef, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { backend_url } from "../../backend_url";

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
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const USER_REGEX = /^.{2,}$/;

const PWD_REGEX = /^.{8,}$/;

const SignUp = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("white", "gray.800");

  const color = useColorModeValue("black", "white");

  // getting auth state from the global AuthContext

  const { setAuth } = useAuth();

  const userRef = useRef();

  const errorRef = useRef();

  const navigate = useNavigate();

  // Username State

  const [user, setUser] = useState("");

  const [validName, setValidName] = useState(false);

  const [userFocus, setUserFocus] = useState(false);

  // Password State

  const [pwd, setPwd] = useState("");

  const [validPwd, setValidPwd] = useState(false);

  const [pwdFocus, setPwdFocus] = useState(false);

  // Error message state

  const [errorMessage, setErrorMessage] = useState("");

  const [error, setError] = useState(false);

  // Redirect to dashboard if already logged in

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser?.user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Validate username

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  // Validate password

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  // Focus on username input on component load

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Clear error message when user or password is modified

  useEffect(() => {
    setErrorMessage("");

    setError(false);
  }, [user, pwd]);

  const isEmpty = (str) => !str || str.length === 0;

  const login = async (data) => {
    const response = await fetch(backend_url + "/auth/token/login/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setError(true);

      if (response.status === 400 || response.status === 401) {
        setErrorMessage(`Status ${response.status}. Please Try Again`);
      }

      errorRef.current.focus();

      return;
    } else {
      const result = await response.json();

      const token = result?.auth_token;

      return token;
    }
  };

  const createAccount = async (data) => {
    const response = await fetch(backend_url + "/auth/users/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setError(true);

      if (response.status === 400 || response.status === 401) {
        setErrorMessage(`Status ${response.status}. Please Try Again`);
      }

      errorRef.current.focus();

      return;
    } else {
      const result = await response.json();

      const token = await login(data);

      if (isEmpty(token)) {
        setError(true);

        setErrorMessage("Failed to login");

        return;
      }

      setAuth({ user, pwd, token });

      setUser("");

      setPwd("");

      navigate("/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const test = USER_REGEX.test(user);

    const test2 = PWD_REGEX.test(pwd);

    if (!test || !test2) {
      setError(true);

      setErrorMessage("Invalid Entry");

      return;
    } else if (isEmpty(user) || isEmpty(pwd)) {
      setError(true);

      setErrorMessage("Input is empty!");

      return;
    }

    const data = {
      username: user,

      password: pwd,
    };

    await createAccount(data);
  };

  return (
    <Center height="100vh">
      <Box position="absolute" top="1rem" right="1rem">
        <Button onClick={toggleColorMode} colorScheme="teal">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>

      <Stack>
        <Box
          height="380px"
          width="350px"
          boxShadow="md"
          borderRadius="md"
          bg={bg}
          color={color}
        >
          <Container centerContent py={4}>
            {error && (
              <Alert status="error" ref={errorRef} borderRadius="md" mb={4}>
                <AlertIcon />

                <AlertTitle mr={2}>{errorMessage}</AlertTitle>
              </Alert>
            )}

            <Heading size="md" as="h5" mb={4}>
              Sign Up
            </Heading>

            <FormControl isRequired as="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <div>
                  <FormLabel htmlFor="username">User Name</FormLabel>

                  <Input
                    placeholder="Username"
                    ref={userRef}
                    autoComplete="off"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    size="md"
                    variant="filled"
                  />

                  {userFocus && user && !validName && (
                    <FormHelperText color="red.500">
                      Minimum 8 Characters
                    </FormHelperText>
                  )}
                </div>

                <div>
                  <FormLabel htmlFor="password">Password</FormLabel>

                  <Input
                    placeholder="Password"
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    size="md"
                    variant="filled"
                  />

                  {pwdFocus && pwd && !validPwd && (
                    <FormHelperText color="red.500">
                      Minimum 8 Characters
                    </FormHelperText>
                  )}
                </div>

                <Button
                  colorScheme="teal"
                  size="lg"
                  width="full"
                  type="submit"
                  onClick={handleSubmit}
                  isDisabled={!validName || !validPwd}
                >
                  Sign Up
                </Button>
              </Stack>
            </FormControl>
          </Container>
        </Box>

        <HStack justify="center" mt={4}>
          <Link to="/" style={{ color: "teal", textDecoration: "none" }}>
            Login
          </Link>
        </HStack>
      </Stack>
    </Center>
  );
};

export default SignUp;
