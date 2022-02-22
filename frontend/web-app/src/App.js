import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import KahootState from "./Context/Kahoot/KahootState";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

const App = () => {
  return (

  <BrowserRouter> 
    <KahootState>
      <div>
        <Routes>
          <Route path='/' element = {<SignUp/>}/>
          <Route path='/Login' element = {<Login/>}/>
        </Routes>
      </div>
    </KahootState>
  </BrowserRouter> 
  );
};

export default App;
