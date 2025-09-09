import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { data, summaries } from './data';
import Header from './Header';
import Footer from './Footer';

// Status definitions with colors
const STATUS_TYPES = {
    UNASSIGNED: { label: 'Unassigned', color: '#b9b9b9' },
    IN_PROGRESS: { label: 'In Progress', color: '#b7fbf3' },
    NEEDS_REVIEW: { label: 'Needs Review', color: '#fac798' },
    READY_TO_PUBLISH: { label: 'Ready to Publish', color: '#bffb9b' },
    PUBLISHED: { label: 'Published', color: '#78ff96' }
};

// Initialize draft data the same way as Claims Editor
let draftData = [...data];
let draftSummaries = [...summaries];

// Try to load previously saved draft
try {
    const savedDraft = localStorage.getItem('hasbaratracker_draft_save');
    if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        const savedDraftData = parsed.draftData || [...data];
        const savedDraftSummaries = parsed.draftSummaries || [...summaries];
        
        // Merge new claims from data.js that aren't in the saved draft
        const savedClaimTitles = new Set(savedDraftSummaries.map(s => s.claimMainTitle));
        const newSummaries = summaries.filter(s => !savedClaimTitles.has(s.claimMainTitle));
        
        const savedDataTitles = new Set(savedDraftData.map(d => d.claimTitle));
        const newDataEntries = data.filter(d => !savedDataTitles.has(d.claimTitle));
        
        draftData = [...savedDraftData, ...newDataEntries];
        draftSummaries = [...savedDraftSummaries, ...newSummaries];
        
        console.log('🔍 STATUS-PAGE: Merged new claims from data.js with saved draft');
        console.log(`🔄 STATUS-PAGE: Added ${newSummaries.length} new summaries and ${newDataEntries.length} new data entries`);
    }
} catch (error) {
    console.error('Error loading draft data:', error);
    draftData = [...data];
    draftSummaries = [...summaries];
}

// Helper function to get claim status
const getClaimStatus = (claimTitle) => {
    // Get status from localStorage, default to UNASSIGNED
    const statusKey = `claim_status_${claimTitle}`;
    const storedStatus = localStorage.getItem(statusKey);
    return storedStatus || 'UNASSIGNED';
};

const StatusPage = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [statusFilter, setStatusFilter] = useState('ALL');
    
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/login');
            return;
        }
        setLoading(false);
        
        // Listen for storage changes (when Claims Editor updates status)
        const handleStorageChange = (e) => {
            if (e.key && e.key.startsWith('claim_status_')) {
                setRefreshTrigger(prev => prev + 1);
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [isAdmin, navigate]);

    // Get unique claims the same way as Claims Editor
    const claims = useMemo(() => {
        console.log('🔍 STATUS-PAGE: Building claims list from draftData...');
        console.log('🔍 STATUS-PAGE: Total evidence rows in draftData:', draftData.length);
        
        // Extract unique claim titles from draft data
        const uniqueClaims = [...new Set(draftData.map(item => item.claimTitle).filter(Boolean))];
        console.log('🔍 STATUS-PAGE: Found unique claims:', uniqueClaims);
        
        const claimsData = uniqueClaims.map(claimTitle => ({
            id: `claim_${claimTitle.replace(/[^a-zA-Z0-9]/g, '_')}`,
            title: claimTitle,
            status: getClaimStatus(claimTitle)
        }));
        
        console.log('🔍 STATUS-PAGE: Final claims list:', claimsData);
        return claimsData.sort((a, b) => a.title.localeCompare(b.title));
    }, [refreshTrigger]);

    // Filter claims based on selected status
    const filteredClaims = useMemo(() => {
        if (statusFilter === 'ALL') {
            return claims;
        }
        return claims.filter(claim => claim.status === statusFilter);
    }, [claims, statusFilter]);

    const updateClaimStatus = (claimTitle, newStatus) => {
        // Update in localStorage
        const statusKey = `claim_status_${claimTitle}`;
        localStorage.setItem(statusKey, newStatus);
        
        // Trigger refresh of claims list
        setRefreshTrigger(prev => prev + 1);
        
        setMessage(`Status updated: ${claimTitle} → ${STATUS_TYPES[newStatus].label}`);
        setMessageType('success');
        setTimeout(() => setMessage(''), 3000);
    };

    const StatusBadge = ({ status }) => {
        const statusInfo = STATUS_TYPES[status] || STATUS_TYPES.UNASSIGNED;
        return (
            <span 
                className="px-3 py-1 rounded-full text-sm font-medium text-gray-800"
                style={{ backgroundColor: statusInfo.color }}
            >
                {statusInfo.label}
            </span>
        );
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="tracker-container">
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Loading claims status...</span>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="tracker-container">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Status Tracker</h1>
                            <p className="text-gray-600 mt-1">Monitor the progress of all claims</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            {claims.length} total claims
                        </div>
                    </div>

                    {/* Status Filters */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Status</h3>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setStatusFilter('ALL')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    statusFilter === 'ALL'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                All Claims
                            </button>
                            {Object.entries(STATUS_TYPES).map(([key, status]) => (
                                <button
                                    key={key}
                                    onClick={() => setStatusFilter(key)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium text-gray-800 transition-colors ${
                                        statusFilter === key
                                            ? 'ring-2 ring-blue-600 ring-offset-2'
                                            : 'hover:scale-105'
                                    }`}
                                    style={{ backgroundColor: status.color }}
                                >
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Claims Table */}
                    {filteredClaims.length > 0 ? (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                                <div className="text-sm text-gray-600">
                                    Showing {filteredClaims.length} of {claims.length} claims
                                    {statusFilter !== 'ALL' && ` (${STATUS_TYPES[statusFilter]?.label || statusFilter})`}
                                </div>
                            </div>
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                                            Claim Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                                            Current Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredClaims.map((claim) => (
                                        <tr key={claim.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 w-1/2">
                                                <button
                                                    onClick={() => navigate(`/claim-editor?claim=${encodeURIComponent(claim.title)}`)}
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 break-words text-left w-full hover:underline"
                                                >
                                                    {claim.title}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap w-1/2">
                                                <StatusBadge status={claim.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-lg mb-2">
                                {statusFilter === 'ALL' ? 'No claims found' : `No claims with status "${STATUS_TYPES[statusFilter]?.label || statusFilter}"`}
                            </div>
                            <div className="text-sm">
                                {statusFilter === 'ALL' 
                                    ? 'Import data in the Claims Editor to see claims here'
                                    : 'Try selecting a different status filter'
                                }
                            </div>
                        </div>
                    )}

                    {/* Message Display */}
                    {message && (
                        <div className={`mt-6 p-4 rounded-md ${
                            messageType === 'success' 
                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                : messageType === 'error'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default StatusPage;