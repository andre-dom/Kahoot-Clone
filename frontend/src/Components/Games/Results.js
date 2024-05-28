import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Box,
  IconButton,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

import { BarChart } from "@saas-ui/charts";

import { backend_url } from "../../backend_url";

import useAuth from "../../hooks/useAuth";

import Confetti from "react-confetti";

const CompletedGameView = () => {
  const { slug: quizSlug } = useParams();

  const { auth } = useAuth();

  const [quizData, setQuizData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [confetti, setConfetti] = useState(true);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,

    height: window.innerHeight,
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `${backend_url}/game/completed/${quizSlug}/`,

          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",

              Authorization: `token ${auth.token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();

          setQuizData(data);
        } else {
          console.error("Failed to fetch completed game data");
        }
      } catch (error) {
        console.error("Error fetching completed game data:", error);
      }

      setLoading(false);

      setTimeout(() => setConfetti(false), 5000); // Hide confetti after 5 seconds
    };

    if (quizSlug) {
      fetchQuizData();
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [quizSlug, auth.token]);

  return (
    <Box pos="relative" padding="20px">
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Home"
        pos="absolute"
        top="10px"
        right="10px"
        onClick={() => (window.location.href = "/")} // Example action
      />

      {confetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <h1 style={{ textAlign: "center" }}>
        {quizData ? quizData.name : "Loading..."}
      </h1>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        quizData && (
          <>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              Mean Score: {quizData.mean_score} | Median Score:{" "}
              {quizData.median_score}
            </div>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Email</Th>

                  <Th>Score</Th>
                </Tr>
              </Thead>

              <Tbody>
                {Object.entries(quizData.leaderboard).map(
                  ([email, score], index) => (
                    <Tr key={index}>
                      <Td>{email}</Td>

                      <Td>{score}</Td>
                    </Tr>
                  ),
                )}
              </Tbody>
            </Table>

            <h3>Leaderboard</h3>

            <BarChart
              data={quizData.data}
              categories={["value"]}
              height="300px"
            />
          </>
        )
      )}
    </Box>
  );
};

export default CompletedGameView;
