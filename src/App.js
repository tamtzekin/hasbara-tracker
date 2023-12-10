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

    const videoLink = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'; // Replace with the actual path to your video

    return (
    <>
            <Router>
    
                <NavBar />
                <span class="header-container">
                <h1>Hasbara Tracker</h1>
                <span id="dots">. . . . . . . . . . . . . . . </span>
                </span>
                
                {/* <Homepage /> */}
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
