import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { data } from './data';

import '../App.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserRole, setNewUserRole] = useState('user');
    const [selectedClaims, setSelectedClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Get unique claim titles
    const availableClaims = [...new Set(data.map(item => item.claimTitle).filter(Boolean))].sort();

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/login');
            return;
        }
        fetchUsers();
    }, [isAdmin, navigate]);

    const fetchUsers = async () => {
        try {
            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
            console.log('🔑 AdminPanel token check:', {
                token: token ? token.substring(0, 20) + '...' : 'NULL',
                sessionStorage: !!sessionStorage.getItem('hasbaratracker_token'),
                localStorage: !!localStorage.getItem('hasbaratracker_token')
            });
            
            if (!token) {
                console.log('❌ No token found in AdminPanel, cannot make authenticated request');
                setMessage('Authentication required. Please log in again.');
                setMessageType('error');
                return;
            }
            
            console.log('🚀 About to fetch from: http://localhost:3001/api/admin/users');
            console.log('🔑 Using token:', token?.substring(0, 20) + '...');
            
            // First test if we can reach the server at all
            try {
                const testResponse = await fetch('http://localhost:3001/api/admin/users', {
                    method: 'OPTIONS'
                });
                console.log('🔍 CORS preflight test:', {
                    status: testResponse.status,
                    headers: Object.fromEntries(testResponse.headers.entries())
                });
            } catch (preflightError) {
                console.error('❌ CORS preflight failed:', preflightError);
            }
            
            const response = await fetch('http://localhost:3001/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('📡 Load Users response:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                url: response.url
            });

            if (response.ok) {
                const usersData = await response.json();
                console.log('✅ Load Users success response:', usersData);
                console.log('📊 Setting users state with', usersData.length, 'users');
                setUsers(usersData);
                
                // Clear any error messages on success
                if (usersData.length > 0) {
                    setMessage('');
                    setMessageType('');
                }
            } else {
                console.log('❌ Load Users error response status:', response.status);
                try {
                    const error = await response.json();
                    console.log('❌ Load Users error response body:', error);
                    setMessage(error.message || error.error || 'Failed to load users');
                    setMessageType('error');
                } catch (parseError) {
                    console.log('❌ Could not parse Load Users error response as JSON:', parseError);
                    const errorText = await response.text();
                    console.log('❌ Load Users error response text:', errorText);
                    setMessage(`Server error: ${response.status} ${response.statusText}`);
                    setMessageType('error');
                }
            }
        } catch (error) {
            console.error('❌ Load Users network/fetch error:', error);
            console.error('❌ Error name:', error.name);
            console.error('❌ Error message:', error.message);
            console.error('❌ Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
            setMessage(`Error loading users: ${error.message}`);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        
        if (!newUserEmail) {
            setMessage('Please enter an email address');
            setMessageType('error');
            return;
        }

        setActionLoading(true);
        
        try {
            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
            console.log('🔑 Add User token check:', {
                token: token ? token.substring(0, 20) + '...' : 'NULL',
                email: newUserEmail,
                role: newUserRole,
                claims: newUserRole === 'user' ? selectedClaims : []
            });
            
            const response = await fetch('http://localhost:3001/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: newUserEmail,
                    role: newUserRole,
                    assignedClaims: newUserRole === 'user' ? selectedClaims : []
                })
            });

            console.log('📡 Add User response:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                url: response.url,
                headers: Object.fromEntries(response.headers.entries())
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('✅ Add User success response:', userData);
                setMessage(`User ${newUserEmail} added successfully`);
                setMessageType('success');
                setNewUserEmail('');
                setNewUserRole('user');
                setSelectedClaims([]);
                fetchUsers();
            } else {
                console.log('❌ Add User error response status:', response.status);
                try {
                    const error = await response.json();
                    console.log('❌ Add User error response body:', error);
                    setMessage(error.message || error.error || 'Failed to add user');
                    setMessageType('error');
                } catch (parseError) {
                    console.log('❌ Could not parse error response as JSON:', parseError);
                    const errorText = await response.text();
                    console.log('❌ Add User error response text:', errorText);
                    setMessage(`Server error: ${response.status} ${response.statusText}`);
                    setMessageType('error');
                }
            }
        } catch (error) {
            setMessage('Error adding user');
            setMessageType('error');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteUser = async (userId, userEmail) => {
        if (!window.confirm(`Are you sure you want to delete user ${userEmail}? This action cannot be undone.`)) {
            return;
        }

        setActionLoading(true);
        
        try {
            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
            const response = await fetch(`http://localhost:3001/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMessage(`User ${userEmail} deleted successfully`);
                setMessageType('success');
                fetchUsers();
            } else {
                const error = await response.json();
                setMessage(error.message || 'Failed to delete user');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error deleting user');
            setMessageType('error');
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdateUserClaims = async (userId, newClaims) => {
        setActionLoading(true);
        
        try {
            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
            const response = await fetch(`http://localhost:3001/api/admin/users/${userId}/claims`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ assignedClaims: newClaims })
            });

            if (response.ok) {
                setMessage('User claims updated successfully');
                setMessageType('success');
                fetchUsers();
            } else {
                const error = await response.json();
                setMessage(error.message || 'Failed to update user claims');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error updating user claims');
            setMessageType('error');
        } finally {
            setActionLoading(false);
        }
    };

    const handleClaimToggle = (claim) => {
        setSelectedClaims(prev => 
            prev.includes(claim) 
                ? prev.filter(c => c !== claim)
                : [...prev, claim]
        );
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="content-container">
                    <div className="text-center py-20">
                        <div className="text-xl mb-4">Loading admin panel...</div>
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
                <h2 className="subheading">Admin Panel</h2>
                
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4">Add New User</h3>
                    
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="user@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <select
                                value={newUserRole}
                                onChange={(e) => {
                                    setNewUserRole(e.target.value);
                                    if (e.target.value === 'admin') {
                                        setSelectedClaims([]);
                                    }
                                }}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="user">Regular User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {newUserRole === 'user' && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Assigned Claims</label>
                                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-2">
                                    {availableClaims.map(claim => (
                                        <label key={claim} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedClaims.includes(claim)}
                                                onChange={() => handleClaimToggle(claim)}
                                                className="rounded border-gray-300"
                                            />
                                            <span className="text-sm">{claim}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Select claims this user can access. Leave empty for no access.
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={actionLoading}
                            className="btn-green py-2 px-4 rounded-md disabled:opacity-50"
                        >
                            {actionLoading ? 'Adding User...' : 'Add User'}
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Existing Users</h3>
                    
                    {users.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">No users found</div>
                    ) : (
                        <div className="space-y-4">
                            {users.map(userData => (
                                <div key={userData.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="font-medium">{userData.email}</div>
                                            <div className="text-sm text-gray-500">
                                                Role: <span className="capitalize">{userData.role}</span>
                                            </div>
                                            {userData.role === 'user' && (
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Claims: {userData.assignedClaims?.length > 0 
                                                        ? userData.assignedClaims.join(', ')
                                                        : 'No claims assigned'
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            {userData.role === 'user' && (
                                                <button
                                                    onClick={() => {
                                                        const newClaims = window.prompt(
                                                            'Enter comma-separated claim titles:',
                                                            userData.assignedClaims?.join(', ') || ''
                                                        );
                                                        if (newClaims !== null) {
                                                            const claimsArray = newClaims
                                                                .split(',')
                                                                .map(c => c.trim())
                                                                .filter(c => c);
                                                            handleUpdateUserClaims(userData.id, claimsArray);
                                                        }
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                    disabled={actionLoading}
                                                >
                                                    Edit Claims
                                                </button>
                                            )}
                                            {userData.email !== user?.email && (
                                                <button
                                                    onClick={() => handleDeleteUser(userData.id, userData.email)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                    disabled={actionLoading}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {message && (
                    <div className={`mt-6 p-4 rounded-md ${
                        messageType === 'success' 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {message}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AdminPanel;