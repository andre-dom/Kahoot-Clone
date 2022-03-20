import React, { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import useAuth from "../../hooks/useAuth";


import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

const Main = () => {

  const [quizzes, setQuizzes] = useState([]); 

  const { auth } = useAuth(); 

  /**
  * Every time the page renders, it will make a request to the 
  * API to get the latest quizzes.    
  */
  useEffect(() => {

    getData(); 

  },[])

  /**
   * Retrieves all the quizzes that were created
   * by the user. 
   */
   const getData = async () => {

    const response = await fetch('http://127.0.0.1:8000/quizzes/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${auth.token}`
      },
    }); 

    if(!response.ok) {

      console.log('there was an error.');
      return; 
    }

    const result = await response.json(); 
    
    setQuizzes(result);

   }; 

   /**
    * This function will be passed down to the QuizCard component. 
    * QuizCard component will call this function which will update the
    * quizzes state and update the dom. 
    * @param slug from QuizCard component 
    */
   const handleDelete = (slug) => {
      const newQuizzes = quizzes.filter((quiz) => quiz.slug !== slug)

      setQuizzes(newQuizzes); 
   }

  return (
    <Box>
      <Box m="14">
        <Heading
          as="h5"
          size="md"
          p="2"
          color="gray.500"
          fontWeight="semi-bold"
          borderBottom="1px"
          borderColor="grey.200"
        >
          My Quizzes
        </Heading>

        <SimpleGrid
          columns={4}
          spacing="4"
          m="3"
          textAlign="center"
          rounded="lg"
          color="gray.500"
        >

          {quizzes.map(quiz => (
              //? Not sure if the slug can be a valid key. Keep an eye for this when deleting the quiz from dashboard. 
            <QuizCard key = {quiz.slug} name = {quiz.name} slug = {quiz.slug} handleDelete = {handleDelete}></QuizCard>

          ))
          }
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default Main;
