import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('hasbaratracker_token');
                if (token) {
                    const response = await fetch('/api/auth/verify', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        localStorage.removeItem('hasbaratracker_token');
                    }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('hasbaratracker_token');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Send magic link
    const sendMagicLink = async (email) => {
        try {
            const response = await fetch('/api/auth/magic-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send magic link');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    };

    // Verify magic link token
    const verifyMagicLink = async (token) => {
        try {
            const response = await fetch('/api/auth/verify-magic-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Invalid magic link');
            }

            const { user: userData, token: authToken } = await response.json();
            localStorage.setItem('hasbaratracker_token', authToken);
            setUser(userData);
            
            return userData;
        } catch (error) {
            throw error;
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('hasbaratracker_token');
        setUser(null);
    };

    // Check if user has permission
    const hasPermission = (permission) => {
        if (!user) return false;
        return user.permissions.includes(permission) || user.role === 'admin';
    };

    // Check if user can access specific claim
    const canAccessClaim = (claimTitle) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        return user.assignedClaims?.includes(claimTitle) || false;
    };

    const value = {
        user,
        loading,
        sendMagicLink,
        verifyMagicLink,
        logout,
        hasPermission,
        canAccessClaim,
        isAdmin: () => user?.role === 'admin',
        isLoggedIn: () => !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};