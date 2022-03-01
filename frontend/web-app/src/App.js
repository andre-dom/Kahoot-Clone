import React from "react";
import "./App.css";
import {Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Missing from "./Components/Missing";
import Login from "./Components/PublicPages/Login";
import SignUp from "./Components/PublicPages/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import RequireAuth from "./Context/RequireAuth";
import { KahootProvider } from "./Context/Kahoot/KahootProvider";

const App = () => {
  return (

    <Routes>
      <Route path ='/' element = {<Layout/>}>

        {/* public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* protected routes */}
        <Route element = {<RequireAuth/>}>
            <Route path="/dashboard" element = {
              <KahootProvider> 
                <Dashboard/> 
              </KahootProvider>
              }/>
        </Route>        

        {/* catch all (404 page) */}
        <Route path= "*" element = {<Missing/>}/>
      </Route>
    </Routes>
  
  );
};

export default App;
