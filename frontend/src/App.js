import React from "react";
import "./App.css";
import {Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import Missing from "./Components/Missing";
import Login from "./Components/PublicPages/Login";
import SignUp from "./Components/PublicPages/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import RequireAuth from "./Context/RequireAuth";
import CreateQuiz from "./Components/Quizzes/CreateQuiz";
import AddQuestions from './Components/Quizzes/AddQuestions'; 
import ViewQuiz from "./Components/Quizzes/ViewQuiz";
import { GameProvider } from "./Context/GameProvider";
import Home from "./Game/Home";
import Question from "./Game/Question";
import LeaderBoard from "./Game/LeaderBoard";
import StudentPage from "./Components/Quizzes/StudentPage";
import CompletedQuizzes from "./Components/Quizzes/CompletedQuizzes";
import CompletedView from "./Components/Quizzes/CompletedView";
import DisplayName from "./Game/DisplayName";
import AddQuiz from "./Components/Quizzes/AddQuiz"

const App = () => {
  return (
    <div style = {{backgroundColor : '#F5F5F5', minHeight: '100vh'/* minus the height of the footer */}}>
    <Routes>
      <Route element = {<Layout/>}>
        {/* public routes */}
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element = {
          <Navigate replace to='/login' />
        }/>
        {/*         <Route path="/" element={<Navigate replace to="/home" />} /> */}
        <Route path='/login' element = {<Login/>}/>
        <Route path ='/game/:slug' element = {<DisplayName/>}/>
        <Route path ='/game/:slug/multipleChoice' element = {<StudentPage/>}/>

        {/* protected routes */}
        <Route element = {<RequireAuth/>}>
            <Route path="/dashboard" element = {
              // <KahootProvider> 
              <GameProvider>
                <Dashboard/> 
              </GameProvider>
              // </KahootProvider>
              }/>

            <Route path='/home' element ={<Home />} />
            <Route path='/questions' element = {<Question/>} />
            <Route path='/leaderBoard' element = {<LeaderBoard/>} />
            <Route path='/createQuiz' element ={<AddQuiz/>}/>
            <Route path='/AddQuestions' element ={<AddQuestions/>}/>
            <Route path ='/viewQuiz/:name' element = {<ViewQuiz/>}/>
            <Route path ='/CompletedQuizzes' element = {<CompletedQuizzes/>}/>
            <Route path = '/CompletedQuizzes/:slug' element = {<CompletedView/>}/>

        </Route>        

        {/* catch all (404 page) */}
        <Route path= "*" element = {<Missing/>}/>
      </Route>
    </Routes>


    </div>
  
  );
};

export default App;
