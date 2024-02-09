import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage';
import VolunteerForm from './components/VolunteerForm';
import Claims from './components/Claims';
import Tracker from './components/Tracker';
import SubmitClaimForm from './components/SubmitClaimForm';
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
                    <Route path="/submit-claim" element={<SubmitClaimForm />} />
                    <Route path="/volunteer" element={<VolunteerForm />} />

                {/* Route redirects to claim searches */}
                    <Route
                        path="/forty-beheaded-babies"
                        element={<Navigate to="/tracker?filter=forty%20beheaded%20babies" replace />}
                    />


                    <Route
                        path="/al-ahli-attacked"
                        element={<Navigate to="/tracker?filter=al-ahli%20hospital%20attacked" replace />}
                    />
                    
                    <Route 
                        path="al-shifa-fuel"
                        element={<Navigate to="/tracker?filter=fuel" replace />}
                    />

                </Routes>
            </Router>
    </>
  );  
}

export default App;
