import { createContext, useState } from 'react'; 
import useAuth from "../../hooks/useAuth";

const KahootContext = createContext({}); 

export const KahootProvider = ({ children }) => {

const { auth } = useAuth(); 

  //? Not sure if we need state :(
  const[quizzes, setQuizzes] = useState([]);
  const[slug, setSlug] = useState(''); 
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


  /**
   * Recieves a quiz and auth token to make a post request to 
   * the API 
   */
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

      console.log('there was an error.');

      return; 
    }

    const result = await response.json(); 
  }

  //! Moving this function to Main.js. 
  /**
   * Retrieves all the quizzes that were created
   * by the user. 
   */
  const getData = async () => {

      const response = await fetch('http://127.0.0.1:8000/quizzes/', {
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


  //! Moving this function to QuizCard.js
  
  /**
   * Uses a slug to identify the quiz the user wants to delete 
   * @returns 
   */
  const deleteData = async () => {

    //? maybe check if the slug is empty and throw an error. 

    const response = await fetch(`http://127.0.0.1:8000/quizzes/${slug}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
    }); 

    if(!response.ok) {

      console.log(response.text()); 

      console.log('there was an error.');
      return; 
    }
  }; 


  /**
   * Takes in a slug to identify which quiz to update. 
   * @returns 
   */
  const updateData = async () => {

    //? maybe check if the slug is empty and throw an error. 
    
    const response = await fetch(`http://127.0.0.1:8000/quizzes/${slug}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${auth.token}`
      },
      body: JSON.stringify(myData)
    }); 

    if(!response.ok) {

      console.log('there was an error.');
      return; 
    }

    const result = await response.json(); 
  }


  //* You can place the functions and state in this object once you are done writing them */
  const values = {
    postData,
    getData,
    deleteData,
    updateData,


  }; 

  return(

    <KahootContext.Provider value = {values}>
      {children}
    </KahootContext.Provider>

  ); 
}; 

export default KahootContext; 