import React, { useState, useEffect } from "react";

import {
  Button,
  Box,
  SimpleGrid,
  Center,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { backend_url } from "../../backend_url";

import { useParams } from "react-router-dom";

const StudentPage = () => {
  let { slug } = useParams();

  const [message, setMessage] = useState("");

  const [score, setScore] = useState(0);

  const [show, setShow] = useState(true);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const { toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("gray.100", "gray.800");

  const buttonBg = useColorModeValue("blue.400", "blue.600");

  const buttonColor = useColorModeValue("white", "gray.200");

  useEffect(() => {
    const getScore = async () => {
      try {
        const response = await fetch(`${backend_url}/player/${slug}/game/`, {
          method: "GET",

          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          setShow(false);

          return;
        }

        const { score } = await response.json();

        setScore(score);
      } catch (err) {
        console.error(err);
      }
    };

    getScore();
  }, [slug]);

  useEffect(() => {
    const sse = new EventSource(`${backend_url}/events/?channel=${slug}`, {
      withCredentials: false,
    });

    sse.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.text) setShow(false);

      setScore(data.score);

      setMessage(data.message);

      setSelectedAnswer(null); // Reset selected answer on new SSE message
    };

    sse.addEventListener("stream-open", (e) =>
      console.log("Stream opened: " + e.data),
    );

    sse.addEventListener("keep-alive", (e) =>
      console.log("Keep-alive: " + e.data),
    );

    sse.onerror = () => {
      console.error("An error occurred with SSE");

      sse.close();
    };

    return () => sse.close();
  }, [slug]);

  const postAnswer = async (answer) => {
    setSelectedAnswer(answer); // Set the pressed button as selected

    try {
      const response = await fetch(`${backend_url}/player/${slug}/submit/`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ answer }),
      });

      if (!response.ok) {
        console.error("Failed to submit answer:", response.status);
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  return (
    <Box bg={bgColor} minHeight="100vh" p={10} borderRadius="md">
      <Center mb={4}>
        <Button onClick={toggleColorMode}>
          Toggle {useColorModeValue("Dark", "Light")} Mode
        </Button>
      </Center>

      {show ? (
        <Box>
          <Center>
            <Heading as="h2" size="xl" mb={10}>
              Score: {score}
            </Heading>
          </Center>

          <SimpleGrid columns={[1, 2]} spacing={10}>
            {[1, 2, 3, 4].map((num) => (
              <Button
                key={num}
                bg={selectedAnswer === num ? "tomato" : buttonBg}
                color={buttonColor}
                height="20vh"
                width="100%"
                onClick={() => postAnswer(num)}
              >
                {num}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      ) : (
        <Center height="full">
          <Heading as="h2" size="xl">
            The game has finished!
          </Heading>
        </Center>
      )}
    </Box>
  );
};

export default StudentPage;
