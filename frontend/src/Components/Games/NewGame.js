import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const NewGame = ({ isOpen, onClose, onSubmit }) => {
  const [emails, setEmails] = useState([""]);

  const [errors, setErrors] = useState([]);

  const toast = useToast();

  const validateEmail = (email) => {
    if (!email) return "Email is required";

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return "Invalid email format";

    return "";
  };

  const addEmailField = () => {
    setEmails([...emails, ""]);

    setErrors([...errors, ""]);
  };

  const removeEmailField = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);

    const newErrors = errors.filter((_, i) => i !== index);

    setEmails(newEmails.length ? newEmails : [""]);

    setErrors(newErrors.length ? newErrors : [""]);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = emails.map((email, i) => (i === index ? value : email));

    const newErrors = errors.map((error, i) =>
      i === index ? validateEmail(value) : error,
    );

    setEmails(newEmails);

    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const newErrors = emails.map(validateEmail);

    setErrors(newErrors);

    if (newErrors.some((error) => error)) {
      toast({
        title: "Form Error",

        description: "Please correct the highlighted email fields.",

        status: "error",

        duration: 5000,

        isClosable: true,
      });

      return;
    }

    onSubmit(emails);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Enter Emails</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4}>
            {emails.map((email, index) => (
              <FormControl key={index} isRequired>
                <FormLabel>Email {index + 1}</FormLabel>

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  borderColor={errors[index] ? "red.500" : "gray.200"}
                />

                {errors[index] && <Text color="red.500">{errors[index]}</Text>}

                {emails.length > 1 && (
                  <IconButton
                    aria-label="Remove email"
                    icon={<DeleteIcon />}
                    onClick={() => removeEmailField(index)}
                    mt={2}
                  />
                )}
              </FormControl>
            ))}

            <Button leftIcon={<AddIcon />} onClick={addEmailField}>
              Add Email
            </Button>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>

          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewGame;
