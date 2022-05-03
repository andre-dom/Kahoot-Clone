import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Box, Heading, SimpleGrid, Center  } from "@chakra-ui/react";
import CompletedCard from "./CompletedCard";



const CompletedQuizzes = () => {
  const {auth} = useAuth();
  const [quizzes, setQuizzes] = useState([]);

  const getCompleted = async () => {

    const response = await fetch('http://127.0.0.1:8000/game/completed/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            },
        })
    if(!response.ok){
        console.log(response);
    }
    const result = await response.json();
    console.log(result);

    setQuizzes(result); 

  }

  const getCompletedSlug = async (slug) => {

    const response = await fetch(`http://127.0.0.1:8000/game/completed/${slug}/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${auth.token}`
      },
    })

    if(!response.ok){
      console.log(response);
    }
    const result = await response.json();
    console.log(result);

  }

  const getQuizName = async (slug) => {
      const response = await fetch(`http://127.0.0.1:8000/quizzes/${slug}/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${auth.token}`
      },
    })

    if(!response.ok){
      console.log(response);
    }
    const result = await response.json();
    console.log(result);
  }

  useEffect(async () => {
    const slug = await getCompleted(); 

    //await getCompletedSlug(slug); 

    //await getQuizName(slug);

  }, [])

  return(
    <Box> 
      {/* <Center> */}
      <Box>
        <Heading
          // m='50px'
          as="h5"
          size="md"
          p="2"
          color="#333333"
          fontWeight="semi-bold"
          borderBottom="1px"
          borderColor="grey.200"
          fontFamily='Verdana'
        >
          Completed Quizzes
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
          
          {
            quizzes.map((quiz, index) => (
              <CompletedCard key={quiz.slug} name={quiz.name} slug = {quiz.slug}/>
                
            
            ))
          }
        
          
              {/* {quizzes.map((quiz, index) => 
                (
                  //? Not sure if the slug can be a valid key. Keep an eye for this when deleting the quiz from dashboard. 

          
                <QuizCard key = {quiz.slug} name = {quiz.name} slug = {quiz.slug} handleDelete = {handleDelete} colorBg = {colors[index % 5]}></QuizCard>

              ))} */}

            
          </SimpleGrid>
        </Center>
        </Box>
          

          
        
      </Box>
      {/* </Center> */}
    </Box>

  );
}

export default CompletedQuizzes;