import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Homepage from './components/Homepage';
import About from './components/About';
// import NavBar from './components/NavBar';
import ClaimsDirectory from './components/ClaimsDirectory';
import VolunteerForm from './components/VolunteerForm';
import ClaimA from './components/ClaimA';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
    return (
    <>
            <Router>
                <VideoPlayer />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/claims" element={<ClaimsDirectory />} />
                    <Route path="/volunteer" element={<VolunteerForm />} />
                    <Route path="/claim-a" element={<ClaimA />} />
                </Routes>
            </Router>
            
    </>
  );  
}

export default App;
