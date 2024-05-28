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
  Text,
  Box,
} from "@chakra-ui/react";

import { backend_url } from "../../backend_url";

import CsvDownloadButton from "../CsvDownloadButton";

import useAuth from "../../hooks/useAuth";

import CompletedGameView from "./CompletedGameView";

import { formatDistanceToNow } from "date-fns";

const CompletedQuizzes = ({ isOpen, onClose }) => {
  const { auth } = useAuth();

  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedQuizSlug, setSelectedQuizSlug] = useState(null);

  const [isQuizViewOpen, setIsQuizViewOpen] = useState(false);

  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const response = await fetch(`${backend_url}/game/completed/`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",

            Authorization: `token ${auth.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          setCompletedQuizzes(data);
        } else {
          console.log("Failed to fetch completed games");
        }
      } catch (error) {
        console.log("Error fetching completed games:", error);
      }

      setLoading(false);
    };

    fetchCompletedQuizzes();
  }, [auth.token]);

  const timeAgo = (datetimeStr) => {
    return formatDistanceToNow(new Date(datetimeStr), { addSuffix: true });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent maxHeight="80vh" overflow="hidden">
        <ModalHeader>Completed Quizzes</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          {loading ? (
            <Spinner size="xl" />
          ) : completedQuizzes.length === 0 ? (
            <Text>No completed quizzes found.</Text>
          ) : (
            <Box overflowY="auto" maxHeight="60vh">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Quiz Name</Th>

                    <Th>Completed</Th>

                    <Th>Action</Th>

                    <Th>Export</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {completedQuizzes.map((quiz) => (
                    <Tr key={quiz.slug}>
                      <Td>{quiz.name}</Td>

                      <Td>{timeAgo(quiz.completed_at)}</Td>

                      <Td>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            setSelectedQuizSlug(quiz.slug);

                            setIsQuizViewOpen(true);
                          }}
                        >
                          View
                        </Button>
                      </Td>

                      <Td>
                        <CsvDownloadButton game={quiz.slug} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>

      <CompletedGameView
        isOpen={isQuizViewOpen}
        onClose={() => setIsQuizViewOpen(false)}
        quizSlug={selectedQuizSlug}
      />
    </Modal>
  );
};

export default CompletedQuizzes;
