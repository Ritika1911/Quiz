import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Create from './components/Create';
import TakeQuiz from './components/TakeQuiz';
import Display from './components/Display';
import Questions from './components/Questions';
import Quiz from './components/Quiz';
import Signin from './components/Signin';
import { useState } from 'react';
import SignInSide from './components/SignInSide';
import Report from './components/Report';
import Edit from './components/Edit';
import EditDisplay from './components/EditDisplay';

function App() {
  const [isuserSignedIn, setSignin]=useState(true);

    return (
      <Router>
      <div>
        <Routes>
          <Route path="/home" exact element={<Home/>} ></Route>
          <Route path="/create" exact element={<Create/>} ></Route>
          <Route path="/display" exact element={<Display/>} ></Route>
          <Route path="/question" exact element={<Questions/>} ></Route>
          <Route path="/quiz" exact element={<Quiz/>} ></Route>
          <Route path="/" exact element={<SignInSide/>} ></Route>
          <Route path="/report" exact element={<Report/>} ></Route>
          <Route path="/edit" exact element={<Edit/>} ></Route>
          <Route path="/editdisplay" exact element={<EditDisplay/>} ></Route>
        </Routes>
      </div>
    </Router>
  );
  
  
}

export default App;
