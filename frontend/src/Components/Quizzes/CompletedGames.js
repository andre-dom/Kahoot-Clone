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
} from "@chakra-ui/react";

import { ip, port } from "../../ports";

import useAuth from "../../hooks/useAuth";

const CompletedQuizzes = ({ isOpen, onClose }) => {
  const { auth } = useAuth();
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const response = await fetch(`${ip}${port}/game/completed/`, {
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
  }, []); // Run this effect only once when the component mounts

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Completed Quizzes</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          {loading ? (
            <Spinner size="xl" />
          ) : completedQuizzes.length === 0 ? (
            <Text>No completed quizzes found.</Text>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Quiz Name</Th>

                  <Th>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {completedQuizzes.map((quiz) => (
                  <Tr key={quiz.slug}>
                    <Td>{quiz.name}</Td>

                    <Td>
                      <Button
                        colorScheme="blue"
                        as="a"
                        href={`http://localhost:8080/games/completed/${quiz.slug}`}
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CompletedQuizzes;
