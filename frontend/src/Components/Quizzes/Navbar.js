import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import useGame from "../../hooks/useGame";

import { backend_url } from "../../backend_url";

import {
  Flex,
  Box,
  Heading,
  Button,
  Alert,
  AlertIcon,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";

import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import CompletedGames from "../Games/CompletedGames";

const Navbar = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const { game, setGame } = useGame();

  const [alert, setAlert] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("gray.100", "gray.900");

  const color = useColorModeValue("gray.800", "white");

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleLogout = async () => {
    try {
      const response = await fetch(backend_url + "/auth/token/logout/", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `token ${auth.token}`,
        },
      });

      if (response.ok) {
        setAuth(false);

        localStorage.clear();

        navigate("/");
      } else {
        console.log("Logout failed");
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const completedGames = () => {
    setIsModalOpen(true); // Show the modal when the button is clicked
  };

  const resumeQuiz = () => {
    navigate("/questions");
  };

  const endQuiz = async () => {
    const response = await fetch(backend_url + "/game/delete/", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",

        Authorization: `token ${auth.token}`,
      },
    });

    if (response.ok) {
      setAlert(false);

      setGame(false);
    } else {
      console.log("An error occurred");
    }
  };

  return (
    <Box bg={bg} color={color} px={4} py={2}>
      {game && (
        <Alert status="info" mb={4}>
          <Flex align="center" justify="space-between">
            <AlertIcon />
            There is a game currently active.
            <Box ml="auto">
              <Button mr={2} onClick={resumeQuiz}>
                Resume Quiz
              </Button>

              <Button onClick={endQuiz}>End Quiz</Button>
            </Box>
          </Flex>
        </Alert>
      )}
      <Flex align="center" justify="space-between" color-scheme="blue">
        <Box>
          <Heading as="h4" size="md">
            Kahoot Clone
          </Heading>
        </Box>

        <Box>
          <Heading>My Quizzes</Heading>
        </Box>

        <Flex align="center">
          <Button mr={2} onClick={handleLogout}>
            Logout
          </Button>

          <Button mr={2} onClick={completedGames}>
            Game History
          </Button>

          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Flex>
      </Flex>
      <CompletedGames
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />{" "}
      {/* Modal controlled through state */}
    </Box>
  );
};

export default Navbar;
