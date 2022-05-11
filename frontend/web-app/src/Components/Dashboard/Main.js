import React, { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import useAuth from "../../hooks/useAuth";

import {
  ip,
  port
} from '../../ports';


import { Box, Heading, SimpleGrid, Center, Container, Wrap } from "@chakra-ui/react";

const colors = ['#E27D60', '#85DCBA', '#E8A87C', '#C38D9E' , '#41B3A3']

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

    const response = await fetch(ip + port + '/quizzes/', {
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
      {/* <Center> */}
      <Box>
        <Heading
          m='50px'
          as="h5"
          size="md"
          p="2"
          color="#333333"
          fontWeight="semi-bold"
          borderBottom="1px"
          borderColor="grey.200"
          fontFamily='Verdana'
        >
          My Quizzes
        </Heading>
  
        <Box>
        <Center>

          <SimpleGrid
            columns = {[1, 1,2,3, 4]}
            spacing = '40px'
            rounded="lg"
            color="gray.500"
            m = '20px'
          >

        
          
              {quizzes.map((quiz, index) => 
                (
                  //? Not sure if the slug can be a valid key. Keep an eye for this when deleting the quiz from dashboard. 

          
                <QuizCard key = {quiz.slug} name = {quiz.name} slug = {quiz.slug} handleDelete = {handleDelete} colorBg = {colors[index % 5]}></QuizCard>

              ))}

            
          </SimpleGrid>
        </Center>
        </Box>
          

          
        
      </Box>
      {/* </Center> */}
    </Box>
  );
};
export default Main;
