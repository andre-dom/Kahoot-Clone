import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import QuizListView from "./Components/Quizzes/QuizListView";
import RequireAuth from "./Context/RequireAuth";
import { GameProvider } from "./Context/GameProvider";
import Home from "./Game/Home";
import Question from "./Components/Games/Question";
import StudentPage from "./Components/Quizzes/StudentPage";
import DisplayName from "./Game/DisplayName";
import AddQuiz from "./Components/Quizzes/AddQuiz";
import LandingPage from "./LandingPage";
import Results from "./Components/Games/Results";

const App = () => {
  // Define light and dark mode background
  const bgColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Box bg={bgColor} minHeight="100vh">
      <Routes>
        <Route element={<Layout />}>
          {/* public routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<Navigate replace to="/landing" />} />
          <Route path="/game/:slug" element={<DisplayName />} />
          <Route path="/game/:slug/multipleChoice" element={<StudentPage />} />
          <Route path="/results/:slug" element={<Results />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route
              path="/dashboard"
              element={
                <GameProvider>
                  <QuizListView />
                </GameProvider>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/questions" element={<Question />} />
            <Route path="/createQuiz" element={<AddQuiz />} />
          </Route>
          {/* catch all (404 page) */}
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </Box>
  );
};
export default App;
