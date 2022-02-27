import React from "react";

import { Box, Button, Text, Center } from "@chakra-ui/react";

const QuizCard = () => {
  return (
    <Box boxShadow="md" rounded="md" bg="white" height="200px" width = "330px">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80%"
        borderTopRadius="md"
        bgColor="blue.200"
      >
        <Text>Quiz #</Text>
      </Box>{" "}
      <Box
        height="20%"
        display="flex"
        alignItems="center"
        justifyContent="left"
      >
        <Button colorScheme="teal" variant="link" fontWeight="16px">
          Edit
        </Button>
        <Button colorScheme="teal" variant="link" fontWeight="16px">
          Start
        </Button>
      </Box>
    </Box>
  );
};
export default QuizCard;
