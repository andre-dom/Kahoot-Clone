import { createContext, useState } from 'react'; 
import useAuth from "../../hooks/useAuth";

const KahootContext = createContext({}); 

export const KahootProvider = ({ children }) => {

  //* You can write you functions that call to the API here! Remember that you are going to need state */

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


  //* You can place the functions and state in this object once you are done writing them */
  const values = {
    postData,
    getData,
    deleteData,
    updateData


  }; 

  return(

    <KahootContext.Provider value = {values}>
      {children}
    </KahootContext.Provider>

  ); 
}; 

export default KahootContext; 