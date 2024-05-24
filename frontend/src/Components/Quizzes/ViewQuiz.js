import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

import {
  Box,
  Container,
  VStack,
  HStack,
  Divider,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import { ip, port } from "../../ports";

const ViewQuiz = () => {
  const location = useLocation();

  const [questions, setQuestions] = useState([]);

  const [name, setName] = useState("");

  const { auth } = useAuth();

  const colorBg = location.state.colorBg;

  /**
   * Checks if the given string is empty
   * @param {*} str
   * @returns true if the given string is empty and false if
   * its not
   */
  const isEmpty = (str) => {
    return !str || str.length === 0;
  };

  /**
   * Gets a single quiz from the backend
   * @param {*} slug
   */
  const getQuiz = async (slug) => {
    const response = await fetch(ip + port + `/quizzes/${slug}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${auth.token}`,
      },
    });

    const result = await response.json();

    setQuestions(result.questions);
  };

  /**
   * Calls gets quiz and populates array
   */
  useEffect(() => {
    let slug = "";
    let name = "";

    try {
      slug = location.state.slug;
      name = location.state.name;
    } catch {
      console.log("error");
    } finally {
      if (isEmpty(name) || isEmpty(slug)) {
        console.log("an error with slug or name has occured");
        return;
      }
    }

    setName(name);

    getQuiz(slug);
  }, []);

  return (
    <Container maxW="80rem" centerContent>
      <Box>
        <Text fontSize="lg" align="center">
          {name}
        </Text>
      </Box>
      <Box>
        {questions.map((question) => (
          <Box
            bgColor={colorBg}
            borderRadius="0.5rem"
            p="10px"
            m="10px"
            minWidth="500px"
            maxWidth="520px"
          >
            <SimpleGrid column={2} minChildWidth="420px" spacing={4}>
              <Box>
                <Text textAlign="left" float="left">
                  Question:
                </Text>
                <Text textAlign="right" isTruncated>
                  {question.question_body}
                </Text>
              </Box>
              <Divider orientation="horizontal" borderWidth=".2px" />
              <Box>
                <Text textAlign="left" float="left">
                  Answer 1:
                </Text>
                <Text textAlign="right" isTruncated>
                  {question.answers[0].answer_body}
                </Text>
              </Box>
              <Divider orientation="horizontal" borderWidth=".2px" />
              <Box>
                <Text textAlign="left" float="left">
                  Answer 2:
                </Text>
                <Text textAlign="right" isTruncated>
                  {question.answers[1].answer_body}
                </Text>
              </Box>
              <Divider orientation="horizontal" borderWidth=".2px" />
              <Box>
                <Text textAlign="left" float="left">
                  Answer 3:
                </Text>
                <Text textAlign="right" isTruncated>
                  {question.answers[2].answer_body}
                </Text>
              </Box>
              <Divider orientation="horizontal" borderWidth=".2px" />
              <Box>
                <Text textAlign="left" float="left">
                  Answer 4:
                </Text>
                <Text textAlign="right" isTruncated>
                  {question.answers[3].answer_body}
                </Text>
              </Box>
              <Divider orientation="horizontal" borderWidth=".2px" />

              <Box>
                <Text textAlign="left" float="left">
                  Correct Answer:
                </Text>
                <Text textAlign="right" float="right">
                  {question.answers[question.correct_answer].answer_body}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ViewQuiz;
