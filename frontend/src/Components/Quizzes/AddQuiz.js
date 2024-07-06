import React, { useState } from "react";

import {
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Select,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

import { backend_url } from "../../backend_url";

import { DeleteIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AddQuiz = ({ onClose, refreshQuizzes }) => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [quizName, setQuizName] = useState("");

  const [questions, setQuestions] = useState([
    {
      body: "",
      answers: Array(4).fill({ body: "", index: 0 }),
      correct_answer: 1,
    },
  ]);

  const [errors, setErrors] = useState({});

  const handleQuizNameChange = (e) => setQuizName(e.target.value);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index][field] = value;

    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[qIndex].answers[aIndex] = {
      body: value,
      index: aIndex,
    };

    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[qIndex].correct_answer = parseInt(value);

    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 50) {
      setQuestions([
        ...questions,
        {
          body: "",
          answers: Array(4).fill({ body: "", index: 0 }),
          correct_answer: 1,
        },
      ]);
    }
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);

    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!quizName) {
      newErrors.quizName = "Quiz name is required";
    }

    questions.forEach((q, qIndex) => {
      if (!q.body) {
        newErrors[`body_${qIndex}`] = "Question body is required";
      }

      q.answers.forEach((a, aIndex) => {
        if (!a.body) {
          newErrors[`body_${qIndex}_${aIndex}`] =
            `Answer ${aIndex + 1} is required`;
        }
      });
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);

      return;
    }

    const quiz = { name: quizName, questions };

    try {
      const response = await fetch(`${backend_url}/quizzes/`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${auth.token}`,
        },

        body: JSON.stringify(quiz),
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      onClose();

      refreshQuizzes();
    } catch (error) {
      alert("Error submitting quiz: " + error.message);
    }
  };

  return (
    <Box position="relative" p={5}>
      <Heading mb={5}>Create a Quiz</Heading>

      <VStack spacing={5} align="flex-start">
        <FormControl
          id="quiz-name"
          isRequired
          isInvalid={Boolean(errors.quizName)}
        >
          <FormLabel>Quiz Name</FormLabel>

          <Input
            value={quizName}
            onChange={handleQuizNameChange}
            placeholder="Enter quiz name"
            borderColor={errors.quizName ? "red.500" : "inherit"}
          />
        </FormControl>

        {questions.map((question, qIndex) => (
          <Box
            key={qIndex}
            borderWidth="1px"
            borderRadius="lg"
            p={5}
            width="100%"
            position="relative"
          >
            <FormControl
              id={`question-body-${qIndex}`}
              isRequired
              isInvalid={Boolean(errors[`body_${qIndex}`])}
            >
              <FormLabel>Question {qIndex + 1}</FormLabel>

              <Textarea
                value={question.body}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "body", e.target.value)
                }
                placeholder="Enter question body"
                borderColor={
                  errors[`body_${qIndex}`] ? "red.500" : "inherit"
                }
              />
            </FormControl>

            {question.answers.map((answer, aIndex) => (
              <FormControl
                key={aIndex}
                id={`answer-${qIndex}-${aIndex}`}
                isRequired
                isInvalid={Boolean(errors[`body_${qIndex}_${aIndex}`])}
                mt={3}
              >
                <FormLabel>Answer {aIndex + 1}</FormLabel>

                <Input
                  value={answer.body}
                  onChange={(e) =>
                    handleAnswerChange(qIndex, aIndex, e.target.value)
                  }
                  placeholder={`Enter answer ${aIndex + 1}`}
                  borderColor={
                    errors[`body_${qIndex}_${aIndex}`]
                      ? "red.500"
                      : "inherit"
                  }
                />
              </FormControl>
            ))}

            <FormControl id={`correct-answer-${qIndex}`} isRequired mt={3}>
              <FormLabel>Correct Answer</FormLabel>

              <Select
                value={question.correct_answer}
                onChange={(e) =>
                  handleCorrectAnswerChange(qIndex, e.target.value)
                }
              >
                <option value={1}>Answer 1</option>

                <option value={2}>Answer 2</option>

                <option value={3}>Answer 3</option>

                <option value={4}>Answer 4</option>
              </Select>
            </FormControl>

            {questions.length > 1 && (
              <Tooltip label="Delete Question" aria-label="Delete Question">
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  position="absolute"
                  top="10px"
                  right="10px"
                  onClick={() => deleteQuestion(qIndex)}
                />
              </Tooltip>
            )}
          </Box>
        ))}

        <Button onClick={addQuestion} isDisabled={questions.length >= 50}>
          Add Question
        </Button>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </VStack>
    </Box>
  );
};

export default AddQuiz;
