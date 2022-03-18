import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import useAuth from '../../hooks/useAuth'; 


import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Box,
  Button,
  Select,
  VStack
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const AddQuestions =()=>{

   const { auth } = useAuth(); 

    const navigate = useNavigate(); 
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard'; 

    const quizName = location.state.quizName;
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [correctAnswer,setCorrectAnswer] = useState('');
    const [questions, setQuestions] = useState([]);
    
    const handleFinish = async (e) => {
        e.preventDefault(); 
        setQuestions([...questions, {
            question_body: question,
            answers: [

                {
                    answer_body:answer1,

                },
                {
                    answer_body:answer2,

                },
                {
                    answer_body:answer3,

                },
                {
                    answer_body:answer4,

                },

            ],
            correct_answer:correctAnswer
            }
        ]);
        
        const quizBundle = {
            name : quizName,
            questions:questions
            
        };
          
        console.log(questions);    
        console.log('quiz Bundle ' + JSON.stringify(quizBundle));

        const response = await fetch('http://127.0.0.1:8000/quizzes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            },
            body: JSON.stringify(quizBundle)
            }); 

            if(!response.ok) {

                console.log('response is not ok');              

                if(response.status === 400) { 
                    console.log("400 error");

                } else if(response.status === 401) {

                    console.log("401 error");

                }   
        } 
        const result = await response.json(); 
        console.log('result ' +  result.message);    

        navigate(from, { replace: true });

    }

    

    const handleAdd = ()=>{
        
        //questions.push(data);
        setQuestions([...questions, {
            question_body: question,
            answers: [

                {
                    answer_body:answer1,

                },
                {
                    answer_body:answer2,

                },
                {
                    answer_body:answer3,

                },
                {
                    answer_body:answer4,

                },

            ],
            correct_answer:correctAnswer
            }
        ]);
        //console.log(questions);
        setQuestion('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
        setCorrectAnswer('');
    }

    const handleDelete = (question) => {

        const newQuestionSet = questions.filter((i) => i.question_body !== question);
        setQuestions(newQuestionSet);
    }
 

    /**
   * Recieves a quiz and auth token to make a post request to 
   * the API 
   */
//   const postData = async () => {
   
//     const response = await fetch('http://127.0.0.1:8000/quizzes/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `token ${auth.token}`
//       },
//       body: JSON.stringify(myData)
//     }); 

//     if(!response.ok) {

//       console.log('there was an error.');

//       return; 
//     }

//     const result = await response.json(); 
//   }

    return (
        <div>
        <Center height="100vh">
            <Box
            height="640px"
            width="600px"
            boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
            borderRadius="0.6rem"
            p='4'
            >
            <FormControl isRequired>
                <FormLabel htmlFor='question'>Question:</FormLabel>
                <Input id='question' placeholder='Add the question'
                value={question} onChange= {(e)=>setQuestion(e.target.value)}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='answer-1'>Answer 1:</FormLabel>
                <Input id='answer-1' placeholder='answer-1' 
                value={answer1} onChange= {(e)=>setAnswer1(e.target.value)}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='answer-2'>Answer 2:</FormLabel>
                <Input id='answer-2' placeholder='answer-2' 
                value={answer2} onChange= {(e)=>setAnswer2(e.target.value)}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='answer-3'>Answer 3:</FormLabel>
                <Input id='answer-3' placeholder='answer-3' 
                value={answer3} onChange= {(e)=>setAnswer3(e.target.value)}
                />
            </FormControl>
            <FormControl isRequired mb='2'>
                <FormLabel htmlFor='answer-3'>Answer 4:</FormLabel>
                <Input id='answer-4' placeholder='answer-4' 
                value={answer4} onChange= {(e)=>setAnswer4(e.target.value)}
                />
            </FormControl>
            <Select isRequired placeholder='Select correct answer'
            value={correctAnswer} onChange= {(e)=>setCorrectAnswer(e.target.value)}
            >
                <option value='1'>Answer 1</option>
                <option value='2'>Answer 2</option>
                <option value='3'>Answer 3</option>
                <option value='4'>Answer 4</option>
            </Select>
            <Button
                mt={4}
                colorScheme='teal'
                type='submit'
                onClick={handleAdd}
            >
            Add
            </Button>
          
            <Button
                mt={4}
                mx={4}
                colorScheme='teal'
                type='submit'
                onClick={handleFinish}
            >
            Finish
            </Button>
         
        </Box>
    </Center>

    <Center>
        <VStack>
        {
            
        questions.map((questionSet,index) => (
            <div>
              
             <Card key = {index} questionSet = {questionSet} handleDelete={handleDelete}></Card>
            
            {/* <DeleteIcon onClick={()=> {handleDelete(questionSet.question)}}></DeleteIcon> */}
            </div>
            ))
        }
        </VStack>


    </Center>


  </div>
    )
};
export default AddQuestions;