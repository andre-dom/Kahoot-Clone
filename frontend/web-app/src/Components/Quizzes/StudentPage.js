import React, { useState, useEffect } from 'react';
import {
    Button,
    Box,
    SimpleGrid,
    Center
} from '@chakra-ui/react'

import { useParams, useLocation } from "react-router-dom";

const StudentPage = () => {

    let { slug } = useParams();
    
    const postAnswer = async (answer) => { 

        const answerObj = {
            
            'answer': answer
            
        }

        const response = await fetch(`http://127.0.0.1:8000/player/${slug}/submit/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(answerObj)
        })

        if(!response.ok){
            console.log("response is not okay");
            console.log(response); 
        }else if(response.status === 400){
            console.log("status 400 error");
        }else if(response.status == 401){
            console.log("status 401 error");
        }

    }


    return (
       
        <Box>
            <SimpleGrid columns={2} spacingX='40px' spacingY='20px' >
                <Box >
                    <Center>
                        <Button bg='tomato' height='50vh'   width = '600px' onClick = {() => postAnswer(1)} >One</Button>
                    </Center>
                    </Box>
                <Box>
                    <Center>
                        <Button bg='tomato' height='50vh'  width = '600px' onClick = {() => postAnswer(2)} >Two</Button> 
                    </Center>
                </Box>
                <Box>
                    <Center>
                        <Button bg='tomato' height='50vh'  width = '600px' onClick = {() => postAnswer(3)} >Three</Button>
                    </Center>
                </Box>
                <Box >
                    <Center>
                        <Button bg='tomato' height='50vh' width = '600px' onClick = {() => postAnswer(4)} >Four</Button>
                    </Center>
                </Box>
            
            </SimpleGrid>
       
       </Box>
       
    )
}

export default StudentPage;