import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage';
// import NavBar from './components/NavBar';
import ClaimsDirectory from './components/ClaimsDirectory';
import VolunteerForm from './components/VolunteerForm';
import Tracker from './components/Tracker';
import VideoPlayer from './components/VideoPlayer';
import ScrollToTop from './components/utils/ScrollToTop';

const App = () => {
    return (
    <>
            <Router>
                <VideoPlayer />
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Tracker />} />
                    <Route path="/about" element={<Homepage />} />
                    <Route path="/claims" element={<ClaimsDirectory />} />
                    <Route path="/volunteer" element={<VolunteerForm />} />
                    <Route path="/tracker" element={<Tracker />} />
                </Routes>
            </Router>
    </>
  );  
}

export default App;
