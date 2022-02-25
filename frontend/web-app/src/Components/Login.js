import React from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "blue",
  };

  console.log("email: ", email);
  console.log("password: ", password);

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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                <Button mt="20px" colorScheme="teal" size="sm" width="100%">
                  Login
                </Button>
              </FormControl>
            </Center>
          </Container>
        </Box>
        <HStack>
          <p pr="5px">Don't have an account yet?</p>
          <Link style={linkStyle} to="/">
            SignUp
          </Link>
        </HStack>
      </Stack>
    </Center>
  );
};

export default Login;
