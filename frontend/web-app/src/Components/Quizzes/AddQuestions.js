import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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


const AddQuestions = () => {

   const { auth } = useAuth(); 

    const navigate = useNavigate(); 
    const location = useLocation();
    //console.log('location: ', location);

    const from = location.state?.from?.pathname || '/dashboard'; 

    const quizName = location.state.quizName;

    //Question state
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState([]);

    //Answers state
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [correctAnswer,setCorrectAnswer] = useState('');

    //Error Checking
    const [emptyQuestion, setEmptyQuestion] = useState(true); 
    const [emptyAnswer1, setEmptyAnswer1] = useState(true); 
    const [emptyAnswer2, setEmptyAnswer2] = useState(true); 
    const [emptyAnswer3, setEmptyAnswer3] = useState(true); 
    const [emptyAnswer4, setEmptyAnswer4] = useState(true); 
    const [emptySelect, setEmptySelect] = useState(true); 

    //stuff
    useEffect(() => {

        if(!isEmpty(question) && !isEmpty(answer1) && !isEmpty(answer2)
            && !isEmpty(answer3) && !isEmpty(answer4) && !isEmpty(correctAnswer)) {
            
            setEmptyQuestion(false); 
            setEmptyAnswer1(false);
            setEmptyAnswer2(false);
            setEmptyAnswer3(false);
            setEmptyAnswer4(false);
            setEmptySelect(false); 
            
        } else {

            setEmptyQuestion(true); 
            setEmptyAnswer1(true);
            setEmptyAnswer2(true);
            setEmptyAnswer3(true);
            setEmptyAnswer4(true);
            setEmptySelect(true); 
        }


    }, [question, answer1, answer2, answer3, answer4, correctAnswer])
    
     /**
     * Checks if the given string is empty
     * @param {*} str 
     * @returns true if the given string is empty and false if 
     * its not
     */
    const isEmpty = (str) => {

        return (!str || str.length === 0);
    }
    

    /**
     * Makes a POST request to the API sending over the quizBundle 
     * which is a collection of the quiz name, questions, and each of
     * the questions corresponding answers. 
     * @param {*} quizBundle 
     * @returns to automatically end the function. 
     */
    const postQuiz = async (quizBundle) => {
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

                return; 

            } else {

                const result = await response.json(); 
        
                //navigate(from, { replace: true });
                navigate('/dashboard');

            }
             
    }
    
    /**
     * Appends a new question and its answers to the questions array 
     * it calls the postQuiz function that makes the request 
     * @param {*} e 
     */
    const handleFinish = async (e) => {
        e.preventDefault(); 
        //console.log('questions length: ', questions.length);

        //added if else statement to check for the first question
        if(questions.length == 0){
            const singleQuestion = {
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
                };
            setQuestions(singleQuestion);
        }else{
            // console.log('question: ', question);
            // setQuestions([...questions, {
            //     question_body: question,
            //     answers: [
            //         {
            //             answer_body:answer1,

            //         },
            //         {
            //             answer_body:answer2,

            //         },
            //         {
            //             answer_body:answer3,

            //         },
            //         {
            //             answer_body:answer4,

            //         },

            //     ],
            //     correct_answer:correctAnswer
            //     }
            // ]);
            const singleQuestion = {
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
                };
                questions.push(singleQuestion);
                console.log(questions);
            
       }
        
        
        const quizBundle = {
            name : quizName,
            questions:questions
            
        };
        //console.log("inside handleFinish", quizBundle);

        postQuiz(quizBundle); 
    }

    

    /**
     * Adds a new question/answers to the questions array 
     * and clears out the question and answer state. 
     */
    const handleAdd = () => {
        
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

        setQuestion('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
        setCorrectAnswer('');
    }

    /**
     * Iterates through the array in search of the question that has
     * been passed in. Once it finds it then it will create a new array
     * and over-write the old array. 
     * @param {*} question 
     */
    const handleDelete = (question) => {

        const newQuestionSet = questions.filter((i) => i.question_body !== question);
        setQuestions(newQuestionSet);
    }
 
    return (
        <div  height="100vh">
            <Center >
                <Box
                mt="100px"
                height="640px"
                width="600px"
                bg = '#85DCBA'
                boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                borderRadius="0.6rem"
                p='4'
                >
                    <FormControl isRequired>
                        <FormLabel htmlFor='question'>Question:</FormLabel>
                        <Input 
                        id='question' 
                        placeholder='Add the question'
                         _placeholder={{ opacity: 1, color: 'gray.500' }}
                        value={question} autoComplete = 'off' onChange= {(e) => setQuestion(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor='answer-1'>Answer 1:</FormLabel>
                        <Input id='answer-1' 
                        placeholder='answer-1' 
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        value={answer1} autoComplete = 'off' onChange= {(e) => setAnswer1(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor='answer-2'>Answer 2:</FormLabel>
                        <Input id='answer-2' 
                        placeholder='answer-2' 
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        value={answer2} autoComplete = 'off' onChange= {(e) => setAnswer2(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor='answer-3'>Answer 3:</FormLabel>
                        <Input id='answer-3' 
                        placeholder='answer-3' 
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        value={answer3} autoComplete = 'off' onChange= {(e) => setAnswer3(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired mb='2'>
                        <FormLabel htmlFor='answer-3'>Answer 4:</FormLabel>
                        <Input id='answer-4' 
                        placeholder='answer-4'
                        _placeholder={{ opacity: 1, color: 'gray.500' }} 
                        value={answer4} autoComplete = 'off' onChange= {(e) => setAnswer4(e.target.value)}
                        />
                    </FormControl>
                    <Select 
                    isRequired 
                    placeholder='Select correct answer'
                    value={correctAnswer} 
                    onChange= { (e) => setCorrectAnswer(e.target.value)}
                    
                    >
                        <option value='0'>Answer 1</option>
                        <option value='1'>Answer 2</option>
                        <option value='2'>Answer 3</option>
                        <option value='3'>Answer 4</option>
                    </Select>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        onClick={handleAdd}
                        disabled = {emptyQuestion || emptyAnswer1 
                            || emptyAnswer2 || emptyAnswer3 || emptyAnswer4 || emptySelect ? true : false}               
                    >
                    Add
                    </Button>
                
                    <Button
                        mt={4}
                        mx={4}
                        colorScheme='teal'
                        type='submit'
                        onClick={handleFinish}
                        disabled = {emptyQuestion || emptyAnswer1 
                            || emptyAnswer2 || emptyAnswer3 || emptyAnswer4 || emptySelect ? true : false}               
                    >
                    Finish
                    </Button>
                </Box>

            </Center>

         

            <Center >
                
                    <VStack>
                        {                   
                        questions.map((questionSet,index) => (
                           
                            <Card key = {index} index = {index} questionSet = {questionSet} handleDelete={handleDelete}></Card>
                           
                            ))
                        }
                    </VStack>
            
            </Center>
        </div>
    )
};
export default AddQuestions;