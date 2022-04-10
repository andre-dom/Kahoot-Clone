import React, { useEffect, useState  } from 'react';
import {
    Box,
    Text,
    Button
    
} from '@chakra-ui/react';

import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const Question = () =>{

    const { auth } = useAuth();

    const navigate = useNavigate();

    const[question, setQuestion] = useState('');
    const[answers, setAnswers] = useState([]);
    const[disable, setDisable] = useState(false); 
    const[appear, setAppear] = useState(false); 

    useEffect(async () => {

        currentQuestion();
        getLeaderBoard();  
        gameCompletedRetrieve(); 
        gameCompletedRetrieve2(); 
        

        // console.log(question);
        // console.log(answers);
    
    },[]);

    const getLeaderBoard = async () => {
        const response = await fetch('http://127.0.0.1:8000/game/standings/',{
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

        console.log('game/standings/' + result + "\n"); 
    }

    const currentQuestion = async () =>{
        const response = await fetch('http://127.0.0.1:8000/game/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            },
        })

        if(!response.ok){
            console.log(response);
            return; 
        }
        const result = await response.json();
        console.log('current question is: ' + result.current_question.question_body);

        setQuestion(result.current_question.question_body);
        setAnswers(result.current_question.answers);

        console.log(question);
        console.log(answers);
    }

     const nextQuestion = async () => {
       const response = await fetch('http://127.0.0.1:8000/game/advance/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            },
        })
        if(!response.ok){
            console.log(response);
        }
        const result =await response.json();
        console.log(result);
        console.log(result.info); 

        if(result.info) {
            navigate('/leaderBoard');
        } else {

            setQuestion(result.current_question.question_body);
            setAnswers(result.current_question.answers);

            standings(); 
            
        }
   }

    const standings = async () => {

        const response = await fetch('http://127.0.0.1:8000/game/standings/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            }

        })
        
        if(!response.ok){
            console.log(response);
        }
        const result = await response.json();

        console.log('/game/standings/ ' + result + '\n'); 


    }; 

    const gameCompletedRetrieve = async () => {

        const response = await fetch(`http://127.0.0.1:8000/game/completed/react/export/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            }

        })
        
        if(!response.ok){
            console.log(response);
        }
        const result = await response.json();

        console.log('/game/completed/react/export/: ', result, '\n'); 

    }; 

    const gameCompletedRetrieve2 = async () => {
        const response = await fetch(`http://127.0.0.1:8000/game/completed/react/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            }

        })
        
        if(!response.ok){
            console.log(response);
        }
        const result = await response.json();

        console.log('/game/completed/react/: ' + result + '\n');

    };


    

    return(
        <Box>
            <Text fontSize="5xl">{question}</Text>
            {answers.length > 0 &&

                <Box>
                    <Text fontSize="5xl">{answers[0].answer_body}</Text>
                    <Text fontSize="5xl">{answers[1].answer_body}</Text>
                    <Text fontSize="5xl">{answers[2].answer_body}</Text>
                    <Text fontSize="5xl">{answers[3].answer_body}</Text>
                    <Button onClick = {nextQuestion}> Next Question</Button>

                </Box>
                        


            }

            
        </Box>

    )
}

export default Question;