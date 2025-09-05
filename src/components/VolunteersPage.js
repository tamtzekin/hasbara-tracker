import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { testVolunteers } from '../data/volunteersData';

import '../App.css';

const VolunteersPage = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);
    const [availableClaims, setAvailableClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [nameFilter, setNameFilter] = useState('all');
    const [tagFilter, setTagFilter] = useState('all');
    const [backgroundFilter, setBackgroundFilter] = useState('all');
    const [levelFilter, setLevelFilter] = useState('all');
    const [availabilityFilter, setAvailabilityFilter] = useState('all');
    const [skillsFilter, setSkillsFilter] = useState('all');
    const [languageFilter, setLanguageFilter] = useState('all');
    const [hoursFilter, setHoursFilter] = useState('all');
    const [claimFilter, setClaimFilter] = useState('all');

    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/login');
            return;
        }
        fetchVolunteers();
        fetchAvailableClaims();
    }, [isAdmin, navigate]);

    // Apply filters whenever volunteers or filter criteria change
    useEffect(() => {
        applyFilters();
    }, [volunteers, searchTerm, nameFilter, tagFilter, backgroundFilter, levelFilter, availabilityFilter, skillsFilter, languageFilter, hoursFilter, claimFilter]);

    const fetchVolunteers = async () => {
        try {
            console.log('🔍 Fetching volunteers from API...');
            // For now, make volunteers accessible to everyone - use a dummy token
            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
            
            if (!token) {
                setMessage('Authentication required. Please log in again.');
                setMessageType('error');
                return;
            }
            
            const response = await fetch('http://localhost:3001/api/volunteers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('📡 Response status:', response.status);
            
            if (response.ok) {
                const volunteersData = await response.json();
                console.log('📋 Raw volunteers data:', volunteersData);
                console.log('📋 Volunteers data length:', volunteersData.length);
                console.log('📋 First volunteer:', volunteersData[0]);
                setVolunteers(volunteersData);
                console.log(`📋 Set volunteers state with ${volunteersData.length} volunteers`);
            } else {
                const error = await response.json();
                console.log('❌ API Error:', error);
                setMessage(error.error || 'Failed to load volunteers');
                setMessageType('error');
            }
        } catch (error) {
            console.error('💥 Fetch Error:', error);
            setMessage('Error loading volunteers: ' + error.message);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableClaims = async () => {
        try {
            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
            
            const response = await fetch('http://localhost:3001/api/volunteers/available-claims', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const claims = await response.json();
                setAvailableClaims(claims);
            }
        } catch (error) {
            console.error('Error loading available claims:', error);
        }
    };

    const applyFilters = () => {
        let filtered = [...volunteers];

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(volunteer =>
                volunteer.name.toLowerCase().includes(searchLower) ||
                volunteer.email.toLowerCase().includes(searchLower) ||
                volunteer.backgroundSkills.toLowerCase().includes(searchLower) ||
                volunteer.tag.toLowerCase().includes(searchLower)
            );
        }

        // Name filter
        if (nameFilter !== 'all') {
            filtered = filtered.filter(volunteer =>
                volunteer.name === nameFilter
            );
        }

        // Tag filter
        if (tagFilter !== 'all') {
            filtered = filtered.filter(volunteer =>
                volunteer.tag.toLowerCase().includes(tagFilter.toLowerCase())
            );
        }

        // Background filter
        if (backgroundFilter !== 'all') {
            filtered = filtered.filter(volunteer =>
                volunteer.backgroundSkills.toLowerCase().includes(backgroundFilter.toLowerCase())
            );
        }

        // Level filter
        if (levelFilter !== 'all') {
            filtered = filtered.filter(volunteer =>
                volunteer.level.toLowerCase() === levelFilter.toLowerCase()
            );
        }

        // Availability filter
        if (availabilityFilter !== 'all') {
            filtered = filtered.filter(volunteer =>
                volunteer.availability.toLowerCase() === availabilityFilter.toLowerCase()
            );
        }

        // Skills filter
        if (skillsFilter !== 'all') {
            filtered = filtered.filter(volunteer =>
                volunteer.coreSkills.toLowerCase() === skillsFilter.toLowerCase()
            );
        }

        // Language filter
        if (languageFilter !== 'all') {
            filtered = filtered.filter(volunteer =>
                volunteer.language.toLowerCase() === languageFilter.toLowerCase()
            );
        }

        // Hours committed filter
        if (hoursFilter !== 'all') {
            filtered = filtered.filter(volunteer =>
                volunteer.hoursCommitted.toLowerCase() === hoursFilter.toLowerCase()
            );
        }

        // Claim assignment filter
        if (claimFilter !== 'all') {
            if (claimFilter === 'unassigned') {
                filtered = filtered.filter(volunteer => !volunteer.assignedClaim);
            } else {
                filtered = filtered.filter(volunteer => volunteer.assignedClaim === claimFilter);
            }
        }

        setFilteredVolunteers(filtered);
    };

    const handleAssignClaim = async (volunteerId, claimTitle) => {
        try {
            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
            
            const response = await fetch(`http://localhost:3001/api/volunteers/${volunteerId}/assign`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ claimTitle: claimTitle || null })
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(`Volunteer ${claimTitle ? 'assigned to' : 'unassigned from'} claim successfully. ${result.loginMessage || ''}`);
                setMessageType('success');
                fetchVolunteers(); // Refresh the list
            } else {
                const error = await response.json();
                setMessage(error.error || 'Failed to assign volunteer');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error assigning volunteer:', error);
            setMessage('Error assigning volunteer: ' + error.message);
            setMessageType('error');
        }
    };

    const handleDeleteVolunteer = async (volunteerId, volunteerEmail) => {
        if (!window.confirm(`Are you sure you want to delete volunteer ${volunteerEmail}? This action cannot be undone.`)) {
            return;
        }

        try {
            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
            
            const response = await fetch(`http://localhost:3001/api/volunteers/${volunteerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMessage(`Volunteer ${volunteerEmail} deleted successfully`);
                setMessageType('success');
                fetchVolunteers(); // Refresh the list
            } else {
                const error = await response.json();
                setMessage(error.error || 'Failed to delete volunteer');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error deleting volunteer:', error);
            setMessage('Error deleting volunteer');
            setMessageType('error');
        }
    };

    // Get unique values for filter dropdowns from actual CSV data
    const uniqueNames = [...new Set(volunteers.map(v => v.name).filter(Boolean))].sort();
    const uniqueTags = [...new Set(volunteers.map(v => v.tag).filter(Boolean))].sort();
    
    // Extract key skills/backgrounds from the long background text for filtering
    const extractKeySkills = (backgroundText) => {
        if (!backgroundText) return [];
        const commonSkills = ['software', 'development', 'engineering', 'journalism', 'legal', 'marketing', 'design', 'research', 'analysis', 'writing', 'communication', 'education', 'healthcare', 'finance', 'business', 'management', 'sales', 'consulting', 'data', 'programming', 'coding', 'web', 'graphic', 'social media', 'content', 'copywriting', 'translation', 'language', 'arabic', 'hebrew', 'tech', 'computer', 'database', 'architecture', 'geology', 'geography', 'gis', 'conservation'];
        const text = backgroundText.toLowerCase();
        return commonSkills.filter(skill => text.includes(skill));
    };
    
    const allBackgroundSkills = volunteers.flatMap(v => extractKeySkills(v.backgroundSkills));
    const uniqueBackgroundSkills = [...new Set(allBackgroundSkills)].sort();
    
    const uniqueLevels = [...new Set(volunteers.map(v => v.level).filter(Boolean))].sort();
    const uniqueAvailability = [...new Set(volunteers.map(v => v.availability).filter(Boolean))].sort();
    const uniqueSkills = [...new Set(volunteers.map(v => v.coreSkills).filter(Boolean))].sort();
    const uniqueLanguages = [...new Set(volunteers.map(v => v.language).filter(Boolean))].sort();
    const uniqueHoursCommitted = [...new Set(volunteers.map(v => v.hoursCommitted).filter(Boolean))].sort();
    
    // Helper function to format filter option text
    const formatFilterOption = (text) => {
        if (!text) return text;
        // Split by common separators and capitalize each word
        return text.split(/[\s\-_,]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="content-container">
                    <div className="text-center py-20">
                        <div className="text-xl mb-4">Loading volunteers...</div>
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
                <h2 className="subheading">Volunteers Database</h2>
                
                {/* Filters Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4">Filters</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Search</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search name, email, skills..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <select
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Names</option>
                                {uniqueNames.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Tag/Category</label>
                            <select
                                value={tagFilter}
                                onChange={(e) => setTagFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Tags</option>
                                {uniqueTags.map(tag => (
                                    <option key={tag} value={tag}>
                                        {formatFilterOption(tag)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Background Skills</label>
                            <select
                                value={backgroundFilter}
                                onChange={(e) => setBackgroundFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Background Skills</option>
                                {uniqueBackgroundSkills.map(skill => (
                                    <option key={skill} value={skill}>
                                        {formatFilterOption(skill)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Experience Level</label>
                            <select
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Levels</option>
                                {uniqueLevels.map(level => (
                                    <option key={level} value={level}>{formatFilterOption(level)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Availability</label>
                            <select
                                value={availabilityFilter}
                                onChange={(e) => setAvailabilityFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Availability</option>
                                {uniqueAvailability.map(availability => (
                                    <option key={availability} value={availability}>{formatFilterOption(availability)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Core Skills</label>
                            <select
                                value={skillsFilter}
                                onChange={(e) => setSkillsFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Skills</option>
                                {uniqueSkills.map(skill => (
                                    <option key={skill} value={skill}>{formatFilterOption(skill)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Primary Language</label>
                            <select
                                value={languageFilter}
                                onChange={(e) => setLanguageFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Languages</option>
                                {uniqueLanguages.map(language => (
                                    <option key={language} value={language}>{formatFilterOption(language)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Hours Committed</label>
                            <select
                                value={hoursFilter}
                                onChange={(e) => setHoursFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Hours</option>
                                {uniqueHoursCommitted.map(hours => (
                                    <option key={hours} value={hours}>{formatFilterOption(hours)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Assigned Claim</label>
                            <select
                                value={claimFilter}
                                onChange={(e) => setClaimFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Claims</option>
                                <option value="unassigned" className="font-semibold text-red-600">🚫 UNASSIGNED ONLY</option>
                                {availableClaims.map(claim => (
                                    <option key={claim} value={claim}>{claim}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        Showing {filteredVolunteers.length} of {volunteers.length} volunteers
                    </div>
                </div>

                {/* Volunteers Table */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tag</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Level</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Hours</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Availability</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Skills</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Languages</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Assigned Claim</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredVolunteers.map((volunteer) => (
                                    <tr key={volunteer.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">{volunteer.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{volunteer.email}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{volunteer.tag}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{volunteer.level}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            <div>{volunteer.hoursCommitted}</div>
                                            {volunteer.otherHours && (
                                                <div className="text-xs text-blue-600">+{volunteer.otherHours}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{volunteer.availability}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{volunteer.coreSkills}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            <div>{volunteer.language}</div>
                                            {volunteer.arabicHebrew && (
                                                <div className="text-xs text-blue-600">{volunteer.arabicHebrew}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <select
                                                value={volunteer.assignedClaim || ''}
                                                onChange={(e) => handleAssignClaim(volunteer.id, e.target.value)}
                                                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Unassigned</option>
                                                {availableClaims.map(claim => (
                                                    <option key={claim} value={claim}>{claim}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <button
                                                onClick={() => handleDeleteVolunteer(volunteer.id, volunteer.email)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                                title={`Delete ${volunteer.name}`}
                                            >
                                                ✗
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredVolunteers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No volunteers found matching your criteria
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

export default VolunteersPage;