import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import KahootState from "./Context/Kahoot/KahootState";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import RequireAuth from "./Context/RequireAuth";

const App = () => {
  return (
    <BrowserRouter>
      <KahootState>
        <div>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/DashBoard" 
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
            />
          </Routes>
        </div>
      </KahootState>
    </BrowserRouter>
   
  );
};

export default App;
