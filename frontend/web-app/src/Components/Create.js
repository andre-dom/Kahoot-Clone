import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Create = () => {


  const { auth } = useAuth(); 
  const[quizzes, setQuizzes] = useState([]);
  const[name, setName] = useState("");
  const[question, setQuestion] = useState("");
  const[answer1, setAnswer1] = useState("");
  const[answer2, setAnswer2] = useState("");
  const[answer3, setAnswer3] = useState("");
  const[answer4, setAnswer4] = useState("");
  const[correctAnswer, setCorrectAnswer] = useState("");

  const myData = 
    {
      name: `${name}`,
      questions: [
        {
          question_body: `${question}`,
          answers: [
            {
                answer_body: `${answer1}`
                            },
            {
                answer_body: `${answer2}`
                
            },
            {
                answer_body: `${answer3} `             
            },
            {
                answer_body: `${answer4}`            
            }           
          ],
          correct_answer: `${correctAnswer}`
        }

      ]
    
    }

  const postData = async () => {
   
    const response = await fetch('http://127.0.0.1:8000/quizzes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
      body: JSON.stringify(myData)
    }); 
    if(!response.ok) {

      console.log(response.text()); 

      console.log('there was an error.');
      return; 
    }

    const result = await response.json(); 

    console.log(result); 
  }

  const getData = async () => {

      const response = await fetch('http://127.0.0.1:8000/quizzes/', {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
      //body: JSON.stringify(myData)
    }); 

    if(!response.ok) {

      console.log(response.text()); 

      console.log('there was an error.');
      return; 
    }

    const result = await response.json(); 
    
    setQuizzes(result);
   
   
    



  }; 
  const deleteData = async () => {
const response = await fetch('http://127.0.0.1:8000/quizzes/hello/', {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
      //body: JSON.stringify(myData)
    }); 

    if(!response.ok) {

      console.log(response.text()); 

      console.log('there was an error.');
      return; 
    }


  }; 
   const updateData = async () => {
     console.warn('data', myData)
    const response = await fetch('http://127.0.0.1:8000/quizzes/hello/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
      body: JSON.stringify(myData)
    }); 
    if(!response.ok) {

      console.log(response.text()); 

      console.log('there was an error.');
      return; 
    }

    const result = await response.json(); 

    console.log(result); 
  }

  return (
    <div className="create">
      <h1> QUIZ</h1>
    <Input  size="md" placeholder='Name'  type="text" name="name" value={name} onChange = {(e)=>setName(e.target.value)}/>
      <Input  size="md" placeholder='Question'  type="text" name="question" value={question} onChange = {(e)=>setQuestion(e.target.value)}/>
        <Input variant='filled' htmlSize={20} width='auto' placeholder='answer 1' type="text" name="answer1" value={answer1} onChange = {(e)=>setAnswer1(e.target.value)}/>
        <Input variant='filled' htmlSize={20} width='auto' placeholder='answer 2' type="text" name="answer2" value={answer2} onChange = {(e)=>setAnswer2(e.target.value)}/>
        <Input variant='filled' htmlSize={20}width='auto' placeholder='answer 3' type="text" name="answer3" value={answer3} onChange = {(e)=>setAnswer3(e.target.value)}/>
        <Input variant='filled' htmlSize={20}width='auto' placeholder='answer 4' type="text" name="answer3" value={answer4} onChange = {(e)=>setAnswer4(e.target.value)}/>
         <Input variant='filled' htmlSize={20}width='auto' placeholder='correct answer' type="text" name="correctAnswer" value={correctAnswer} onChange = {(e)=>setCorrectAnswer(e.target.value)}/>
         <br></br>
      <Button onClick = {postData}>Post Quiz</Button>
      <Button onClick = {updateData}>Update Quiz</Button>
      <Button onClick = {deleteData}>Delete Data</Button>
      <Button onClick = {getData}>Get Data</Button>
      {
        quizzes.map((quiz, i) => 
          <ul key={i}>
            <li>Slug: {quiz.slug}</li>
            <li>Name: {quiz.name}</li>
            <li>Question: {quiz.questions[0].question_body}</li>
            <li>Answer 1: {quiz.questions[0].answers[0].answer_body}</li>
            <li>Answer 2: {quiz.questions[0].answers[1].answer_body}</li>
            <li>Answer 3: {quiz.questions[0].answers[2].answer_body}</li>
            <li>Answer 4: {quiz.questions[0].answers[3].answer_body}</li>
            <li>Correct Answer: {quiz.questions[0].correct_answer}</li>
            <br/>           
      </ul>)
      } 

      

      
    </div>
  );
};

export default Create;
