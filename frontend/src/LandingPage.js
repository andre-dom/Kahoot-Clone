import React, { useEffect } from "react";

import { useNavigate, Link, useLocation } from "react-router-dom";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Stack,
  Box,
  Heading,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";

import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import Login from "./Components/Auth/Login";

import SignUp from "./Components/Auth/Signup";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser?.user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const {
    isOpen: isLoginOpen,

    onOpen: onLoginOpen,

    onClose: onLoginClose,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,

    onOpen: onSignUpOpen,

    onClose: onSignUpClose,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack
      height="100vh"
      align="center"
      justify="center"
      spacing={8}
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
    >
      <Box position="absolute" top={4} right={4}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Box>

      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Kahoot-Clone
        </Heading>

        <Button colorScheme="blue" onClick={onLoginOpen} mr={4}>
          Login
        </Button>

        <Button colorScheme="teal" onClick={onSignUpOpen}>
          Sign Up
        </Button>
      </Box>

      <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Login</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Login />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={onSignUpClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <SignUp />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default LandingPage;
