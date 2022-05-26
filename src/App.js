import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Documentation from "./components/Documentation";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/alert/AlertState";
import CodeforcesState from "./context/codeforces/CodeforcesState";
import ThemeState from "./context/theme/ThemeState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Display from "./components/Display";
import Stalk from "./components/Stalk";
import Mode from "./components/Mode";

const App = () => {
  return (
    <>
      <ThemeState>
        <AlertState>
          <CodeforcesState>
            <NoteState>
              <Router>
                <Navbar />
                <Alert />
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/display" element={<Display />} />
                  <Route exact path="/documentation" element={<Documentation />} />
                  <Route exact path="/stalk" element={<Stalk />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                </Routes>
              </Router>
              <Mode/>
            </NoteState>
          </CodeforcesState>
        </AlertState>
      </ThemeState>
    </>
  );
};

export default App;
