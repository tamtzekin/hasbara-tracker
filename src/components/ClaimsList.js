import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ClaimsList = () => {
    const { isAdmin } = useAuth();
    const [assignmentMode, setAssignmentMode] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [assignmentStatus, setAssignmentStatus] = useState('');

    const claims = [
        { title: 'Forty beheaded babies', path: '/forty-beheaded-babies' },
        { title: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces', path: '/al-ahli-attacked' },
        { title: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas', path: '/al-shifa-fuel' },
        { title: 'Makeup used in Gaza to fake injuries', path: '/makeup' },
        { title: 'Hamas were carrying instructions on how to make chemical weapons', path: '/hamas-chemical-weapons' },
        { title: 'Israeli state denies killing mother and daughter seeking refuge in Gaza\'s Holy Family Parish', path: '/israeli-state-denies' },
        { title: 'Israeli soldier helps elderly Palestinian man in \'safe corridor\'', path: '/israeli-soldier-helps' },
        { title: 'Palestinian captives stripped down naked because of \'warm weather\' in the Middle East, says Mark Regev', path: '/palestinian-captives-stripped' }
    ];

    const handleAssignUser = async (claimTitle) => {
        if (!userEmail.trim()) {
            setAssignmentStatus('Please enter a user email');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/assign-user-to-claim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail.trim(),
                    claimTitle
                })
            });

            const result = await response.json();
            
            if (result.success) {
                setAssignmentStatus(`✅ Successfully assigned ${userEmail} to "${claimTitle}"`);
                setUserEmail('');
                setSelectedClaim('');
            } else {
                setAssignmentStatus(`❌ Failed to assign user: ${result.error}`);
            }
        } catch (error) {
            setAssignmentStatus(`❌ Error: ${error.message}`);
        }
    };

    return (
    <>
        <h2 className="subheading mb-1 mobile:mb-4">Claims</h2>

        {isAdmin() && (
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <button
                    onClick={() => setAssignmentMode(!assignmentMode)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {assignmentMode ? 'Exit Assignment Mode' : 'Assign Users to Claims'}
                </button>

                {assignmentMode && (
                    <div className="mt-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                User Email:
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="user@example.com"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </label>
                        </div>
                        {assignmentStatus && (
                            <div className="mb-4 p-2 bg-yellow-100 rounded text-sm">
                                {assignmentStatus}
                            </div>
                        )}
                    </div>
                )}
            </div>
        )}

        {claims.map((claim, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
                <Link to={claim.path} className="flex-1">
                    <div className="claim-link">'{claim.title}'</div>
                </Link>
                
                {isAdmin() && assignmentMode && (
                    <button
                        onClick={() => handleAssignUser(claim.title)}
                        className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
                        disabled={!userEmail.trim()}
                    >
                        Assign
                    </button>
                )}
            </div>
        ))}

        <div className="claim-coming-soon">+ more coming soon</div>

        </>
    )
}

export default ClaimsList;
