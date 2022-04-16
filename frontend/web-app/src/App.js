import React from "react";
import "./App.css";
import {Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Missing from "./Components/Missing";
import Login from "./Components/PublicPages/Login";
import SignUp from "./Components/PublicPages/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import RequireAuth from "./Context/RequireAuth";
import CreateQuiz from "./Components/Quizzes/CreateQuiz";
import AddQuestions from './Components/Quizzes/AddQuestions'; 
import ViewQuiz from "./Components/Quizzes/ViewQuiz";
import { KahootProvider } from "./Context/Kahoot/KahootProvider";
import Home from "./Components/Dashboard/Home";
import Question from "./Components/Dashboard/Question";
import LeaderBoard from "./Components/Dashboard/LeaderBoard";
import StudentPage from "./Components/Quizzes/StudentPage";

const App = () => {
  return (
    <div style = {{
      backgroundColor : '#7AC4B5',
      minHeight: '100vh'/* minus the height of the footer */
    }}
    >
    <Routes>
      <Route path ='/' element = {<Layout/>}>
        {/* public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path ='/game/:slug' element = {<StudentPage/>}/>

        {/* protected routes */}
        <Route element = {<RequireAuth/>}>
            <Route path="/dashboard" element = {
              <KahootProvider> 
                <Dashboard/> 
              </KahootProvider>
              }/>

            <Route path='/home' element ={<Home />} />
            <Route path='/questions' element = {<Question/>} />
            <Route path='/leaderBoard' element = {<LeaderBoard/>} />
            <Route path='/createQuiz' element ={<CreateQuiz/>}/>
            <Route path='/AddQuestions' element ={<AddQuestions/>}/>
            <Route path ='/viewQuiz/:name' element = {<ViewQuiz/>}/>
        </Route>        

        {/* catch all (404 page) */}
        <Route path= "*" element = {<Missing/>}/>
      </Route>
    </Routes>


    </div>
  
  );
};

export default App;
