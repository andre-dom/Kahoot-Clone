import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";

import { ip, port } from "../../ports";

import useAuth from "../../hooks/useAuth";

const CompletedGameView = ({ isOpen, onClose, quizSlug }) => {
  const { auth } = useAuth();

  const [quizData, setQuizData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `${ip}${port}/game/completed/${quizSlug}/`,
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
          console.log("Failed to fetch completed game data");
        }
      } catch (error) {
        console.log("Error fetching completed game data:", error);
      }

      setLoading(false);
    };

    if (quizSlug) {
      fetchQuizData();
    }
  }, [quizSlug]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">
          {quizData ? quizData.name : "Loading..."}
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
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
                    {quizData.leaderboard.map((entry, index) => (
                      <Tr key={index}>
                        <Td>{entry.email}</Td>

                        <Td>{entry.score}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </>
            )
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CompletedGameView;
