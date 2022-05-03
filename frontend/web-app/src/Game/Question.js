import React, { useEffect, useState  } from 'react';
import {
    Box,
    Text,
    Button
    
} from '@chakra-ui/react';

import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const Question = () =>{

    const { auth } = useAuth();

    const navigate = useNavigate();

    const[question, setQuestion] = useState('');
    const[answers, setAnswers] = useState([]);

    useEffect(() => {

        currentQuestion();
    
    },[]);



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

        setQuestion(result.current_question.question_body);
        setAnswers(result.current_question.answers);
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
        const result = await response.json();
        
        if(result.info) {
            const {data} = result;
            navigate('/leaderBoard', {state:{data}});

        } else {

            setQuestion(result.current_question.question_body);
            setAnswers(result.current_question.answers);            
        }
   }

    const deleteQuiz = async () => {
        const response = await  fetch (`http://127.0.0.1:8000/game/delete/`,{
            method:  'DELETE',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `token ${auth.token}`
            }
        })
        if(!response.ok){
            console.log('an error occurred');
            return;
        }

        navigate('/dashboard');
    }

    

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
                    <Button onClick =  {deleteQuiz}>End Quiz</Button>
                </Box>
            }
        </Box>

    )
}

export default Question;