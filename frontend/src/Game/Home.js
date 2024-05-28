import React, { useState, useEffect } from "react";
import {
  Input,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  Text,
  Center,
  FormControl,
  FormLabel,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

import { backend_url } from "../backend_url";

const address = [
  "@gmail.com",
  "@yahoo.com",
  "@qq.com",
  "@163.com",
  "@outlook.com",
  "@sjsu.edu",
];

const Home = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Once the user begins typing
   * remove the error
   */
  useEffect(() => {
    setError(false);
  }, [email]);

  useEffect(() => {
    if (isEmpty(localStorage.getItem("slug"))) {
      alert("Slug is empty...");
      return;
    }

    setSlug(localStorage.getItem("slug"));
  }, []);

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
   * Checks if the input has a valid address and format
   * @param {*} email
   * @returns
   */
  const validEmail = (email) => {
    for (let i = 0; i < address.length; i++) {
      if (email.includes(address[i])) {
        if (email.length === address[i].length) {
          return false;
        }
        return true;
      }
    }

    return false;
  };

  /**
   * Checks if the input is valid
   * and calls helper functions to start game
   * TODO FIX LOGIC
   */
  const handleClick = async (e) => {
    e.preventDefault();

    if (isEmpty(email)) {
      // if email input is empty
      console.log("email is empty.");
      if (emails.length > 0) {
        await startGame();
      }

      console.log("array length is also empty.");

      setError(true);
      setErrorMessage("email is empty");
      return;
    }
    if (!validEmail(email)) {
      // not valid email
      setError(true);
      setErrorMessage("Not valid email");

      return;
    }

    if (emails.includes(email)) {
      // if array already contains email
      setError(true);
      setErrorMessage("Email already exists");

      return;
    }

    addPlayer(email);

    console.log("starting game...");

    await startGame();
  };

  /**
   * Calls the backend api to start game
   * @param {*} data
   */
  const startGame = async () => {
    if (emails.length === 0) {
      console.log("emails array is empty");

      return;
    }

    const data = {
      quiz: slug,
      players: emails,
    };

    console.log("data before fetch: ", data);

    setIsLoading(true);

    const response = await fetch(backend_url + "/game/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${auth.token}`,
      },
      body: JSON.stringify(data),
    });

    console.log("response: ", response);

    if (!response.ok) {
      setError(true);
      // setErrorMessage('there was an error');
      // setStatus('error')
      console.log("there was an error");
      console.log("error: " + JSON.stringify(response));
      return;
    }

    setIsLoading(false);
    navigate("/questions");
    const result = await response.json();

    console.log("after nav");
  };

  /**
   * Create an object and add it to the array
   * @returns
   * TODO FIX LOGIC
   */
  const addPlayer = () => {
    if (isEmpty(email)) {
      // if email input is empty
      setError(true);
      // setStatus('error');
      setErrorMessage("Email input is empty");

      return;
    }

    if (!validEmail(email)) {
      // if email is invalid

      setError(true);
      // setStatus('error');
      setErrorMessage("not valid email");

      return;
    }

    const result = emails.filter((emailObj) => emailObj.email === email);

    if (result.length > 0) {
      setError(true);
      setErrorMessage("Email already exists");
      return;
    }

    const objEmail = {
      email: email,
    };
    emails.push(objEmail);

    console.log("emails: ", emails);

    setEmail("");
  };

  return (
    <div>
      {error && (
        <Alert borderRadius="0.6rem" mt="-19px" mb="5px">
          <AlertIcon />
          <AlertTitle mr={2}>{errorMessage}</AlertTitle>
        </Alert>
      )}

      <Center height="100vh">
        {isLoading ? (
          <Spinner color="red.500" />
        ) : (
          <VStack>
            <Box
              height="200px"
              width="400px"
              bg="#85DCBA"
              boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
              borderRadius="0.6rem"
              p="4"
            >
              <FormControl isRequired>
                <FormLabel htmlFor="Email">
                  Enter player's email here:
                </FormLabel>
                <Input
                  id="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button m={4} onClick={addPlayer}>
                Add Player
              </Button>
              <Button onClick={handleClick}> Start Game</Button>
            </Box>
            <Box>
              {emails.map((email) => (
                <Text>{email.email}</Text>
              ))}
            </Box>
          </VStack>
        )}
      </Center>
    </div>
  );
};
export default Home;
