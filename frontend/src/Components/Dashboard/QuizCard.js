import React from "react";

import {
  Box,
  IconButton,
  Text,
  HStack,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";

import { ViewIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";

import useAuth from "../../hooks/useAuth";

const QuizCard = ({
  name,
  slug,
  handleDelete,
  openEmailModal,
  openViewModal,
}) => {
  const { auth } = useAuth();

  const generateBgColor = () => {
    const hash = name

      .split("")

      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const colors = ["#E27D60", "#85DCBA", "#E8A87C", "#C38D9E", "#41B3A3"];

    return colors[hash % colors.length];
  };

  const bgColor = generateBgColor();

  const cardBg = useColorModeValue("white", "gray.700");

  const textColor = useColorModeValue("black", "white");

  const buttonColor = "teal.500";

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
              onClick={() => openViewModal(slug)} // Call openViewModal with slug
            />
          </Tooltip>

          <Tooltip label="Start" aria-label="Start Tooltip">
            <IconButton
              aria-label="Start"
              icon={<CheckIcon />}
              color={buttonColor}
              fontWeight="bold"
              onClick={() => openEmailModal(name)}
            />
          </Tooltip>

          <Tooltip label="Delete" aria-label="Delete Tooltip">
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              color="red.500"
              fontWeight="bold"
              onClick={handleDelete}
            />
          </Tooltip>
        </HStack>
      </Box>
    </Box>
  );
};

export default QuizCard;
