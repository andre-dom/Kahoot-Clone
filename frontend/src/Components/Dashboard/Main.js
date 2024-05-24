import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Heading,
  SimpleGrid,
  Center,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import QuizCard from "./QuizCard";

import useAuth from "../../hooks/useAuth";

import { ip, port } from "../../ports";

// Define color schemes outside of the component render method

const lightColors = ["#E27D60", "#85DCBA", "#E8A87C", "#C38D9E", "#41B3A3"];

const darkColors = ["#1D3557", "#457B9D", "#A8DADC", "#F1FAEE", "#E63946"];

const Main = () => {
  const [quizzes, setQuizzes] = useState([]);

  const [deleteQuiz, setDeleteQuiz] = useState(null);

  const { auth } = useAuth();

  const cancelRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(`${ip}${port}/quizzes/`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `token ${auth.token}`,
      },
    });

    if (!response.ok) {
      console.error("There was an error.");

      return;
    }

    const result = await response.json();

    setQuizzes(result);
  };

  const handleDelete = (slug, name) => {
    setDeleteQuiz({ slug, name });
  };

  const confirmDelete = async () => {
    if (deleteQuiz) {
      const response = await fetch(`${ip}${port}/quizzes/${deleteQuiz.slug}/`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",

          Authorization: `token ${auth.token}`,
        },
      });

      if (response.ok) {
        setQuizzes(quizzes.filter((quiz) => quiz.slug !== deleteQuiz.slug));

        setDeleteQuiz(null);
      } else {
        console.error("Failed to delete the quiz");

        setDeleteQuiz(null);
      }
    }
  };

  // Theme specific values

  const headingColor = useColorModeValue("black", "white");

  const cardColors = useColorModeValue(lightColors, darkColors);

  return (
    <Box>
      <Heading as="h1" size="lg" textAlign="center" my="8" color={headingColor}>
        My Quizzes
      </Heading>

      <Center>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" rounded="lg" m="4">
          {quizzes.map((quiz, index) => (
            <QuizCard
              key={quiz.slug}
              name={quiz.name}
              slug={quiz.slug}
              handleDelete={() => handleDelete(quiz.slug, quiz.name)}
              colorBg={cardColors[index % cardColors.length]}
            />
          ))}
        </SimpleGrid>
      </Center>

      <AlertDialog
        isOpen={deleteQuiz !== null}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteQuiz(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Quiz
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the quiz "{deleteQuiz?.name}"? You
              can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDeleteQuiz(null)}>
                Cancel
              </Button>

              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Main;
