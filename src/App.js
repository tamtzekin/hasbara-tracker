import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Homepage from './components/Homepage';
import About from './components/About';
import NavBar from './components/NavBar';
import FilterDisplay from './components/FilterDisplay';
import VolunteerForm from './components/VolunteerForm';
import ClaimA from './components/ClaimA';
import VideoPlayer from './components/VideoPlayer';

const App = () => {

    const videoLink = '../public/files/i24NEWS_10Oct.mp4'; // Replace with the actual path to your video

    return (
    <>
            <Router>
                <span class="header-container">
                <h1>Hasbara Tracker</h1>
                <span id="dots">. . . . . . . . . . . . . . . </span>
                </span>
                <NavBar />
                <VideoPlayer />
                <Routes>
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/claims" element={<FilterDisplay />} />
                    <Route path="/volunteer" element={<VolunteerForm />} />
                    <Route path="/claim-a" element={<ClaimA />} />

                </Routes>
            </Router>
            
    </>
  );  
}

export default App;
