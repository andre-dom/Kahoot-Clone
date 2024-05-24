import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import Missing from "./Components/Missing";
import Login from "./Components/PublicPages/Login";
import SignUp from "./Components/PublicPages/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import RequireAuth from "./Context/RequireAuth";
import ViewQuiz from "./Components/Quizzes/ViewQuiz";
import { GameProvider } from "./Context/GameProvider";
import Home from "./Game/Home";
import Question from "./Game/Question";
import LeaderBoard from "./Game/LeaderBoard";
import StudentPage from "./Components/Quizzes/StudentPage";
import CompletedQuizzes from "./Components/Quizzes/CompletedQuizzes";
import CompletedView from "./Components/Quizzes/CompletedView";
import DisplayName from "./Game/DisplayName";
import AddQuiz from "./Components/Quizzes/AddQuiz";
const App = () => {
  // Define light and dark mode background
  const bgColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Box bg={bgColor} minHeight="100vh">
      <Routes>
        <Route element={<Layout />}>
          {/* public routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game/:slug" element={<DisplayName />} />
          <Route path="/game/:slug/multipleChoice" element={<StudentPage />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route
              path="/dashboard"
              element={
                <GameProvider>
                  <Dashboard />
                </GameProvider>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/questions" element={<Question />} />
            <Route path="/leaderBoard" element={<LeaderBoard />} />
            <Route path="/createQuiz" element={<AddQuiz />} />
            <Route path="/viewQuiz/:name" element={<ViewQuiz />} />
            <Route path="/CompletedQuizzes" element={<CompletedQuizzes />} />
            <Route path="/CompletedQuizzes/:slug" element={<CompletedView />} />
          </Route>
          {/* catch all (404 page) */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Box>
  );
};
export default App;
