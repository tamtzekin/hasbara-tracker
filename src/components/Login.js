import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Header from './Header';
import Footer from './Footer';

import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
    
    const { sendMagicLink, verifyMagicLink, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Check if user is already logged in
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/claim-editor');
        }
    }, [isLoggedIn, navigate]);

    // Handle magic link token from URL
    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            handleMagicLinkVerification(token);
        }
    }, [searchParams]);

    const handleMagicLinkVerification = async (token) => {
        setIsLoading(true);
        try {
            await verifyMagicLink(token);
            setMessage('Login successful! Redirecting...');
            setMessageType('success');
            
            setTimeout(() => {
                navigate('/claim-editor');
            }, 2000);
        } catch (error) {
            setMessage(error.message || 'Invalid or expired magic link');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setMessage('Please enter your email address');
            setMessageType('error');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            await sendMagicLink(email);
            setMessage(`Login link sent to ${email}. Please check your inbox and click the link to sign in.`);
            setMessageType('success');
            setEmail('');
        } catch (error) {
            setMessage(error.message || 'Failed to send magic link. Please try again.');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && searchParams.get('token')) {
        return (
            <>
                <Header />
                <div className="content-container">
                    <div className="text-center py-20">
                        <div className="text-xl mb-4">Verifying your magic link...</div>
                        <div className="loader"></div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="content-container">
                <div className="max-w-md mx-auto mt-20">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="subheading text-center mb-6">Login</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="your@email.com"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className={`w-full btn-green py-3 px-4 rounded-md font-medium transition-all ${
                                    isLoading || !email 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:bg-green-700'
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Sending Magic Link...
                                    </span>
                                ) : (
                                    'Send Magic Link'
                                )}
                            </button>
                        </form>

                        {message && (
                            <div className={`mt-6 p-4 rounded-md text-sm ${
                                messageType === 'success' 
                                    ? 'bg-green-50 text-green-700 border border-green-200' 
                                    : messageType === 'error'
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                                {message}
                            </div>
                        )}

                        <div className="mt-8 text-xs text-gray-500 text-center">
                            <p>🔒 Approved users will receive a login link to their email. Link expires in 15 minutes.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;