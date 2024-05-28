import React, { useState, useEffect, useRef, } from "react";

import { useNavigate, Link, useLocation } from "react-router-dom";

import {
  Box,
  SimpleGrid,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  VStack,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import QuizCard from "./QuizCard";

import Navbar from "./Navbar";

import useAuth from "../../hooks/useAuth";

import { ip, port } from "../../ports";

import AddQuiz from "./AddQuiz";

import NewGame from "../Games/NewGame";

const lightColors = ["#E27D60", "#85DCBA", "#E8A87C", "#C38D9E", "#41B3A3"];

const darkColors = ["#1D3557", "#457B9D", "#A8DADC", "#F1FAEE", "#E63946"];

const Dashboard = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);

  const [deleteQuiz, setDeleteQuiz] = useState(null);

  const { auth } = useAuth();

  const cancelRef = useRef();

  const toast = useToast();

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [isAddQuizModalOpen, setIsAddQuizModalOpen] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [viewQuizData, setViewQuizData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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

  const refreshQuizzes = () => {
    getData();
  };

  const fetchQuizDetails = async (slug) => {
    setIsLoading(true);

    const response = await fetch(`${ip}${port}/quizzes/${slug}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `token ${auth.token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch quiz details.");

      setIsLoading(false);

      return;
    }

    const result = await response.json();

    setViewQuizData(result);

    setIsLoading(false);
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

  const handleEmailModalSubmit = async (emails) => {

    const body = JSON.stringify({
  
      quiz: selectedQuiz,
  
      players: emails.map((email) => ({ email })),
  
    });
  
  
  
    const response = await fetch(`${ip}${port}/game/new/`, {
  
      method: "POST",
  
      headers: {
  
        "Content-Type": "application/json",
  
        Authorization: `token ${auth.token}`,
  
      },
  
      body: body,
  
    });
  
  
  
    if (response.ok) {
  
      setIsEmailModalOpen(false);
  
      setSelectedQuiz(null);
  
      navigate("/questions");
  
    } else {
  
      toast({
  
        title: "Submission Error",
  
        description: "Failed to start the game.",
  
        status: "error",
  
        duration: 5000,
  
        isClosable: true,
  
      });
  
    }
  
  };

  const openEmailModal = (quizName) => {
    setSelectedQuiz(quizName);

    setIsEmailModalOpen(true);
  };

  const openViewModal = (slug) => {
    fetchQuizDetails(slug);

    setIsViewModalOpen(true);
  };

  const headingColor = useColorModeValue("black", "white");

  const cardColors = useColorModeValue(lightColors, darkColors);

  return (
    <>
      <Navbar />

      <Box>
        <Center>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" rounded="lg" m="4">
            <Box
              d="flex"
              alignItems="center"
              justifyContent="center"
              border="1px"
              borderColor="gray.300"
              borderRadius="md"
              height="200px"
              width="300px"
              m={4}
              bgColor={useColorModeValue("white", "gray.700")}
              cursor="pointer"
              onClick={() => setIsAddQuizModalOpen(true)}
            >
              <VStack align="center" justify="center" spacing={2}>
                <div style={{ width: "300px", height: "40px" }} />

                <AddIcon boxSize="12" />

                <Text>Add Quiz</Text>
              </VStack>
            </Box>

            {quizzes.map((quiz, index) => (
              <QuizCard
                key={quiz.slug}
                name={quiz.name}
                slug={quiz.slug}
                handleDelete={() => handleDelete(quiz.slug, quiz.name)}
                openEmailModal={() => openEmailModal(quiz.slug)}
                openViewModal={() => openViewModal(quiz.slug)}
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
                Are you sure you want to delete the quiz "{deleteQuiz?.name}"?
                You can't undo this action afterwards.
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

        <NewGame
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          onSubmit={handleEmailModalSubmit}
        />

        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
        >
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Quiz Details</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              {isLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <Box>
                  {viewQuizData &&
                    viewQuizData.questions

                      .slice(0, 50)

                      .map((question, index) => (
                        <Box key={index} mb="4">
                          <Text fontWeight="bold">Question {index + 1}:</Text>

                          <Text>{question.question_body}</Text>

                          <VStack align="start" mt="2">
                            {question.answers.map((answer) => (
                              <Text
                                key={answer.index}
                                pl="4"
                                fontStyle="italic"
                              >
                                {answer.index}. {answer.answer_body}
                              </Text>
                            ))}

                            <Text mt="2" fontWeight="bold">
                              Correct Answer: {question.correct_answer}
                            </Text>
                          </VStack>
                        </Box>
                      ))}
                </Box>
              )}
            </ModalBody>

            <ModalFooter>
              <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isAddQuizModalOpen}
          onClose={() => setIsAddQuizModalOpen(false)}
        >
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Add New Quiz</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <AddQuiz
                onClose={() => setIsAddQuizModalOpen(false)}
                refreshQuizzes={refreshQuizzes}
              />
            </ModalBody>

            <ModalFooter>
              <Button onClick={() => setIsAddQuizModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Dashboard;
