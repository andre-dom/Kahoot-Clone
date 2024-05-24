import React from "react";
import {
  Box,
  IconButton,
  Text,
  HStack,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGame from "../../hooks/useGame";
import { ip, port } from "../../ports";
import { ViewIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons"; // Placeholder icons
const QuizCard = ({ name, slug, handleDelete }) => {
  const { auth } = useAuth();
  const { game } = useGame();
  const navigate = useNavigate();
  // Generate dynamic background color
  const generateBgColor = () => {
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["#E27D60", "#85DCBA", "#E8A87C", "#C38D9E", "#41B3A3"];
    return colors[hash % colors.length];
  };
  const bgColor = generateBgColor();
  // Color mode specific values
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const buttonColor = "teal.500"; // light mode color for buttons
  const deleteQuiz = async () => {
    const response = await fetch(`${ip}${port}/quizzes/${slug}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${auth.token}`,
      },
    });
    if (response.ok) {
      handleDelete(slug);
    }
  };
  const viewQuiz = () => {
    const url = name.replace(/\s+/g, "").toLowerCase();
    navigate(`/viewQuiz/${url}`, { state: { name, slug } });
  };
  const startGame = () => {
    localStorage.setItem("slug", slug);
    navigate(`/home`);
  };
  return (
    <Box
      boxShadow="md"
      rounded="md"
      bg={cardBg}
      height="200px"
      width="300px"
      m="4"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="75%"
        borderTopRadius="md"
        bgColor={bgColor}
      >
        <Text fontSize="xl" color={textColor}>
          {name}
        </Text>
      </Box>
      <Box
        height="25%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <HStack spacing="4">
          <Tooltip label="View" aria-label="View Tooltip">
            <IconButton
              aria-label="View"
              icon={<ViewIcon />}
              color={buttonColor}
              fontWeight="bold"
              onClick={viewQuiz}
            />
          </Tooltip>
          <Tooltip label="Start" aria-label="Start Tooltip">
            <IconButton
              aria-label="Start"
              icon={<CheckIcon />}
              color={buttonColor}
              fontWeight="bold"
              onClick={startGame}
              disabled={game}
            />
          </Tooltip>
          <Tooltip label="Delete" aria-label="Delete Tooltip">
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              color="red.500"
              fontWeight="bold"
              onClick={deleteQuiz}
            />
          </Tooltip>
        </HStack>
      </Box>
    </Box>
  );
};
export default QuizCard;
