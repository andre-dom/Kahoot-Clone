import React, { useState, useEffect, useRef } from "react";

import { useNavigate, Link, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import { backend_url } from "../../backend_url";

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
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const userRef = useRef();

  const errorRef = useRef();

  const [user, setUser] = useState("");

  const [pwd, setPwd] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser?.user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");

    setError(false);
  }, [user, pwd]);

  const isEmpty = (str) => !str || str.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty(user) || isEmpty(pwd)) {
      setError(true);

      setErrorMessage("Inputs are empty!");

      return;
    }

    const data = {
      username: user,

      password: pwd,
    };

    loginUser(data);
  };

  const loginUser = async (data) => {
    const response = await fetch(`${backend_url}/auth/token/login/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setError(true);

      setErrorMessage("Wrong username or password");

      errorRef.current.focus();
    } else {
      const result = await response.json();

      const token = result?.auth_token;

      setAuth({ user, pwd, token });

      setUser("");

      setPwd("");

      navigate(from, { replace: true });
    }
  };

  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("white", "gray.800");

  const color = useColorModeValue("black", "white");

  return (
    <Center height="100vh" bg={bg} color={color}>
      <Box position="absolute" top="1rem" right="1rem">
        <Button onClick={toggleColorMode} colorScheme="teal">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>

      <Stack spacing={6} alignItems="center">
        <Box bg={bg} boxShadow="md" borderRadius="md" p={6} width="350px">
          <Container centerContent>
            {error && (
              <Alert status="error" ref={errorRef} borderRadius="md" mb={4}>
                <AlertIcon />

                <AlertTitle mr={2}>{errorMessage}</AlertTitle>
              </Alert>
            )}

            <Heading size="md" as="h5" mb={4}>
              Login
            </Heading>

            <form onSubmit={handleSubmit}>
              <FormControl isRequired mb={4}>
                <Stack spacing={4}>
                  <Box>
                    <FormLabel htmlFor="username">User Name</FormLabel>

                    <Input
                      id="username"
                      placeholder="Username"
                      ref={userRef}
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      size="md"
                      variant="filled"
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="password">Password</FormLabel>

                    <Input
                      id="password"
                      placeholder="Password"
                      type="password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      size="md"
                      variant="filled"
                    />
                  </Box>
                </Stack>
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                disabled={!user || !pwd}
              >
                Login
              </Button>
            </form>
          </Container>
        </Box>

        <HStack>
          <Link
            to="/signup"
            style={{ color: colorMode === "light" ? "blue" : "teal" }}
          >
            Sign Up
          </Link>
        </HStack>
      </Stack>
    </Center>
  );
};

export default Login;
