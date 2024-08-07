import React, { useEffect, useState } from "react";

import {
  Box,
  Text,
  Button,
  Center,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

import { backend_url } from "../../backend_url";

import useAuth from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

const Question = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [question, setQuestion] = useState("");

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch(`${backend_url}/game`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `token ${auth.token}`,
      },
    }).then((response) => {
      if (!response.ok) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  useEffect(() => {
    currentQuestion();
  }, []);

  const currentQuestion = async () => {
    const response = await fetch(backend_url + "/game/", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `token ${auth.token}`,
      },
    });

    if (!response.ok) {
      console.log(response);

      return;
    }

    const result = await response.json();

    setQuestion(result.current_question.body);

    setAnswers(result.current_question.answers);
  };

  const nextQuestion = async () => {
    const response = await fetch(backend_url + "/game/advance/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `token ${auth.token}`,
      },
    });

    if (!response.ok) {
      console.log(response);
    }

    const result = await response.json();

    if (result.info) {
      const { data } = result;

      navigate(`/results/${result.info}`);
    } else {
      setQuestion(result.current_question.body);

      setAnswers(result.current_question.answers);
    }
  };

  const deleteQuiz = async () => {
    const response = await fetch(backend_url + "/game/delete/", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",

        Authorization: `token ${auth.token}`,
      },
    });

    if (!response.ok) {
      console.log("an error occurred");

      return;
    }

    navigate("/dashboard");
  };

  return (
    <Box w="100vw" h="100vh" p={5}>
      <Center h="100%">
        <VStack spacing={10} maxW="800px" w="100%">
          <Text fontSize="4xl" fontWeight="bold" textAlign="center">
            {question}
          </Text>

          <SimpleGrid columns={1} spacing={5} w="100%">
            {answers.map((answer, index) => (
              <Button key={index} w="100%" h="80px" fontSize="2xl">
                {index + 1}. {answer.body}
              </Button>
            ))}
          </SimpleGrid>

          <Button
            onClick={nextQuestion}
            w="100%"
            h="60px"
            fontSize="xl"
            colorScheme="blue"
          >
            Next Question
          </Button>

          <Button
            onClick={deleteQuiz}
            w="100%"
            h="60px"
            fontSize="xl"
            colorScheme="red"
          >
            End Quiz
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default Question;
