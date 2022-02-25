import React from "react";
import QuizCard from "./QuizCard";

import { Flex, Box, Heading, SimpleGrid } from "@chakra-ui/react";

const Main = () => {
  return (
    <Box>
      <Box m="14">
        <Heading
          as="h5"
          size="md"
          p="2"
          color="gray.500"
          fontWeight="semi-bold"
          borderBottom="1px"
          borderColor="grey.200"
        >
          My Quizzes
        </Heading>

        <SimpleGrid
          columns={4}
          spacing="4"
          m="3"
          textAlign="center"
          rounded="lg"
          color="gray.500"
        >
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default Main;
