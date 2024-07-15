import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import './App.css';

import Homepage from './components/Homepage';
import About from './components/About';
import Tracker from './components/Tracker';
import VideoPlayer from './components/VideoPlayer';
import ScrollToTop from './components/utils/ScrollToTop';
import VolunteerForm from './components/VolunteerForm';
import SubmitClaimForm from './components/SubmitClaimForm';
import ContactForm from './components/ContactForm';
import MailSignUpForm from './components/MailSignUpForm';

import ClaimFortyBeheadedBabies from './components/ClaimFortyBeheadedBabies';
import ClaimAlAhliAttacked from './components/ClaimAlAhliAttacked';
import ClaimAlShifaFuel from './components/ClaimAlShifaFuel';
import ClaimMakeup from './components/ClaimMakeup';
import ClaimHamasChemicalWeapons from './components/ClaimHamasChemicalWeapons';
import ClaimIsraelDeniesChurchKilling from './components/ClaimIsraelDeniesChurchKilling';
import ClaimIsraelHelpsElderlyMan from './components/ClaimIsraelHelpsElderlyMan';
import ClaimCaptivesStripped from './components/ClaimCaptivesStripped';


const App = () => {
    return (
    <>
    <HelmetProvider>
        <Router>
            <VideoPlayer />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/submit-claim" element={<SubmitClaimForm />} />
                <Route path="/about" element={<About />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/volunteer" element={<VolunteerForm />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/sign-up" element={<MailSignUpForm />} />

                {/* Individual claim pages */}
                <Route path="/israel-helps-elderly-man" element={<ClaimIsraelHelpsElderlyMan />} />
                <Route path="/forty-beheaded-babies" element={<ClaimFortyBeheadedBabies />} />
                <Route path="/al-ahli-attacked" element={<ClaimAlAhliAttacked />} />
                <Route path="/al-shifa-fuel" element={<ClaimAlShifaFuel />} />
                <Route path="/makeup" element={<ClaimMakeup />} />
                <Route path="/hamas-chemical-weapons" element={<ClaimHamasChemicalWeapons />} />
                <Route path="/israel-denies-church-killing" element={<ClaimIsraelDeniesChurchKilling />} />
                <Route path="/captives-stripped" element={<ClaimCaptivesStripped />} />

                
                {/* Route redirects to claim searches */}
                {/* <Route
                    path="/forty-beheaded-babies"
                    element={<Navigate to="/forty-beheaded-babies" replace />}
                />

                <Route
                    path="/al-ahli-attacked"
                    element={<Navigate to="/al-ahli-attacked" replace />}
                />
                
                <Route
                    path="/makeup"
                    element={<Navigate to="/makeup" replace />}
                /> */}

                {/* Routes that use search queries */}
                {/* <Route
                    path="/forty-beheaded-babies"
                    element={<Navigate to="/tracker?claim=Forty%20beheaded%20babies" replace />}
                />


                <Route
                    path="/al-ahli-attacked"
                    element={<Navigate to="/tracker?claim=Al-Ahli%20Hospital%20was%20attacked%20by%20Palestinian%20rockets,%20not%20Israeli%20forces" replace />}
                />
                
                <Route 
                    path="/al-shifa-fuel"
                    element={<Navigate to="/tracker?claim=Israeli%20state%20offered%20fuel%20to%20Al-Shifa%20Hospital" replace />}
                /> */}
            </Routes>
        </Router>
    </HelmetProvider>
    </>
  );  
}

export default App;
