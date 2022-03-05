import { Button } from "@chakra-ui/react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Create = () => {


  const { auth } = useAuth(); 

  //const [quizzes, setQuizzes] = useState([]);
  const myData = 
    {
      name: "testing",
      questions: [
        {
          question_body: "question_body",
          answers: [
            {
                answer_body: "stuff"
                
            },
            {
                answer_body: "stuff1"
                
            },
            {
                answer_body: "stuff2"
                
            },
            {
                answer_body: "stuff3"
                
            }
            
            
          ],
          correct_answer: 1
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



  }; 

  return (
    <div className="create">
      <Button onClick = {postData}>Post Data</Button>
      <br></br>
      <br></br>
      <br></br>
      <Button onClick = {getData}>Get Data</Button>
      
    </div>
  );
};

export default Create;
