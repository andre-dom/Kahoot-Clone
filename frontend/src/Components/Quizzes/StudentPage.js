import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  SimpleGrid,
  Center,
  Text,
  Heading,
} from "@chakra-ui/react";

import { ip, port } from "../../ports";

import { useParams, useLocation } from "react-router-dom";

const StudentPage = () => {
  let { slug } = useParams();

  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(true);

  const getScore = async () => {
    const response = await fetch(ip + port + `/player/${slug}/game/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setShow(false);
    }
    const result = await response.json();
    const { score } = result;
    console.log("destructed score: ", score);
    setScore(score);
    console.log(result);
  };

  useEffect(() => {
    getScore();
  }, []);

  useEffect(() => {
    console.log("useeffect called");

    const sse = new EventSource(ip + port + `/events/?channel=${slug}`, {
      withCredentials: false,
    });

    const getRealTime = (data) => {
      const { message } = data;
      const { score } = data;

      if (data.text) {
        console.log("data.text: " + data.text);
        setShow(false);
      }

      setScore(score);
      console.log("using sse: ", score);

      setMessage(message);

      console.log(data);

      console.log("message: " + message);
    };

    sse.onmessage = (e) => getRealTime(JSON.parse(e.data));

    sse.addEventListener("stream-open", function (e) {
      console.log("e.data: " + e.data);
    });
    sse.addEventListener("keep-alive", function (e) {
      console.log(e.data);
    });

    sse.onerror = () => {
      console.log("an error occured with sse");

      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  console.log("message: " + message);
  const postAnswer = async (answer) => {
    const answerObj = {
      answer: answer,
    };

    const response = await fetch(ip + port + `/player/${slug}/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerObj),
    });

    if (!response.ok) {
      console.log("response is not okay");
      console.log(response);
    } else if (response.status === 400) {
      console.log("status 400 error");
    } else if (response.status == 401) {
      console.log("status 401 error");
    }
  };

  return (
    <Box>
      {show ? (
        <Box>
          <Center>
            <Heading as="h2" size="xl">
              score: {score}
            </Heading>
          </Center>
          <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
            <Box mt={10}>
              <Center>
                <Button
                  bg="tomato"
                  height="20vh"
                  width="600px"
                  onClick={() => postAnswer(1)}
                >
                  One
                </Button>
              </Center>
            </Box>
            <Box mt={10}>
              <Center>
                <Button
                  bg="tomato"
                  height="20vh"
                  width="600px"
                  onClick={() => postAnswer(2)}
                >
                  Two
                </Button>
              </Center>
            </Box>
            <Box>
              <Center>
                <Button
                  bg="tomato"
                  height="20vh"
                  width="600px"
                  onClick={() => postAnswer(3)}
                >
                  Three
                </Button>
              </Center>
            </Box>
            <Box>
              <Center>
                <Button
                  bg="tomato"
                  height="20vh"
                  width="600px"
                  onClick={() => postAnswer(4)}
                >
                  Four
                </Button>
              </Center>
            </Box>
          </SimpleGrid>
        </Box>
      ) : (
        <Center height="100vh">
          <Heading as="h2" size="xl">
            The game has finished!
          </Heading>
        </Center>
      )}
    </Box>
  );
};

export default StudentPage;
