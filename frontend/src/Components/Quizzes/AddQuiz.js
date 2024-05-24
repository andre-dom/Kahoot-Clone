import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Select
} from "@chakra-ui/react";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const App = () => {
  const { auth } = useAuth();
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([{ question_body: '', answers: Array(4).fill({ answer_body: '', index: 0 }), correct_answer: 1 }]);

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex] = { answer_body: value, index: aIndex };
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correct_answer = parseInt(value);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 50) {
      setQuestions([...questions, { question_body: '', answers: Array(4).fill({ answer_body: '', index: 0 }), correct_answer: 1 }]);
    }
  };

const handleSubmit = async () => {
  const quiz = { name: quizName, questions };
  try {
    const response = await fetch('http://localhost:8000/quizzes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
      body: JSON.stringify(quiz)
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    alert('Quiz submitted successfully');
  } catch (error) {
    alert('Error submitting quiz: ' + error.message);
  }
};


  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading mb={5}>Create a Quiz</Heading>
        <VStack spacing={5} align="flex-start">
          <FormControl id="quiz-name" isRequired>
            <FormLabel>Quiz Name</FormLabel>
            <Input value={quizName} onChange={handleQuizNameChange} placeholder="Enter quiz name" />
          </FormControl>

          {questions.map((question, qIndex) => (
            <Box key={qIndex} borderWidth="1px" borderRadius="lg" p={5} width="100%">
              <FormControl id={`question-body-${qIndex}`} isRequired>
                <FormLabel>Question {qIndex + 1}</FormLabel>
                <Textarea
                  value={question.question_body}
                  onChange={(e) => handleQuestionChange(qIndex, 'question_body', e.target.value)}
                  placeholder="Enter question body"
                />
              </FormControl>

              {question.answers.map((answer, aIndex) => (
                <FormControl key={aIndex} id={`answer-${qIndex}-${aIndex}`} isRequired mt={3}>
                  <FormLabel>Answer {aIndex + 1}</FormLabel>
                  <Input
                    value={answer.answer_body}
                    onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                    placeholder={`Enter answer ${aIndex + 1}`}
                  />
                </FormControl>
              ))}

              <FormControl id={`correct-answer-${qIndex}`} isRequired mt={3}>
                <FormLabel>Correct Answer</FormLabel>
                <Select value={question.correct_answer} onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}>
                  <option value={1}>Answer 1</option>
                  <option value={2}>Answer 2</option>
                  <option value={3}>Answer 3</option>
                  <option value={4}>Answer 4</option>
                </Select>
              </FormControl>
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
    </ChakraProvider>
  );
};

export default App;
