import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {Login} from "./pages/Login/Login";
import {Home} from "./pages/Home/Home";
import {Code} from "./pages/Code/Code";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/code" element={<Code/>}/>
            <Route path="*" element={<Login/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
