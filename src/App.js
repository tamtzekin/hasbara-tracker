import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage';
import About from './components/About';
import Tracker from './components/Tracker';
import VideoPlayer from './components/VideoPlayer';
import ScrollToTop from './components/utils/ScrollToTop';
import VolunteerForm from './components/VolunteerForm';
import SubmitClaimForm from './components/SubmitClaimForm';
import ContactForm from './components/ContactForm';
import NewsletterSignUpForm from './components/NewsletterSignUpForm';

const App = () => {
    return (
    <>
            <Router>
                <VideoPlayer />
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/claims" element={<Homepage />} />
                    <Route path="/submit-claim" element={<SubmitClaimForm />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/tracker" element={<Tracker />} />
                    <Route path="/volunteer" element={<VolunteerForm />} />
                    <Route path="/contact" element={<ContactForm />} />
                    <Route path="/newsletter" element={<NewsletterSignUpForm />} />

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
