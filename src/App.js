import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage';
import VolunteerForm from './components/VolunteerForm';
import Claims from './components/Claims';
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
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<Homepage />} />
                    <Route path="/claims" element={<Claims />} />
                    <Route path="/tracker" element={<Tracker />} />
                    <Route path="/volunteer" element={<VolunteerForm />} />
                </Routes>
            </Router>
    </>
  );  
}

export default App;
