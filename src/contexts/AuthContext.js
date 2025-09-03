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
            // Generate secure token
            const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 20)}`;
            const magicLink = `${window.location.origin}/login?token=${token}`;
            
            // Store token (in production, this would be in secure storage)
            localStorage.setItem(`magic_token_${token}`, JSON.stringify({
                email: email.toLowerCase(),
                expiresAt: Date.now() + (15 * 60 * 1000), // 15 minutes
                used: false
            }));
            
            const workerUrl = process.env.REACT_APP_WORKER_URL || 'https://email-worker.izumi-ky.workers.dev';
            const apiKey = process.env.REACT_APP_CLOUDFLARE_API_KEY;
            
            // Create proper email template
            const emailTemplate = {
                subject: '🔐 Your secure login link - Hasbara Tracker',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Login to Hasbara Tracker</title>
                    </head>
                    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #2563eb; margin-bottom: 10px;">🔐 Secure Login</h1>
                            <p style="color: #6b7280; font-size: 16px;">Hasbara Tracker - Claim Editor Access</p>
                        </div>
                        
                        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 30px; margin-bottom: 30px;">
                            <h2 style="color: #1f2937; margin-top: 0;">Login Request</h2>
                            <p style="margin-bottom: 20px;">Hello,</p>
                            <p style="margin-bottom: 20px;">You requested access to the Hasbara Tracker Claim Editor. Click the secure link below to sign in:</p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${magicLink}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                    🔓 Sign In Securely
                                </a>
                            </div>
                            
                            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px;">
                                    ⚠️ <strong>Important:</strong> This link will expire in 15 minutes for security reasons.
                                </p>
                            </div>
                            
                            <p style="font-size: 14px; color: #6b7280;">
                                If the button doesn't work, copy and paste this link into your browser:<br>
                                <a href="${magicLink}" style="color: #2563eb; word-break: break-all;">${magicLink}</a>
                            </p>
                        </div>
                        
                        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 14px; color: #6b7280; text-align: center;">
                            <p>If you didn't request this login link, you can safely ignore this email.</p>
                            <p>This email was sent from Hasbara Tracker's secure authentication system.</p>
                            <p style="margin-top: 20px;">
                                <strong>Stay secure:</strong> Never share this link with anyone else.
                            </p>
                        </div>
                    </body>
                    </html>
                `,
                text: `
🔐 Hasbara Tracker - Secure Login

Hello,

You requested access to the Hasbara Tracker Claim Editor. 

Click this link to sign in securely:
${magicLink}

⚠️ Important: This link will expire in 15 minutes for security reasons.

If you didn't request this login link, you can safely ignore this email.

Stay secure - never share this link with anyone else.

---
Hasbara Tracker Authentication System
                `
            };
            
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ 
                    to: email,
                    subject: emailTemplate.subject,
                    html: emailTemplate.html,
                    text: emailTemplate.text,
                    from: 'auth@hasbaratracker.com'
                }),
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
            // Check token in localStorage
            const tokenData = localStorage.getItem(`magic_token_${token}`);
            
            if (!tokenData) {
                throw new Error('Invalid or expired magic link');
            }
            
            const { email, expiresAt, used } = JSON.parse(tokenData);
            
            if (used || Date.now() > expiresAt) {
                throw new Error('Invalid or expired magic link');
            }
            
            // Mark token as used
            localStorage.setItem(`magic_token_${token}`, JSON.stringify({
                email,
                expiresAt,
                used: true
            }));
            
            // Create session token
            const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            // Create user data
            const userData = {
                id: 'admin_1',
                email: email,
                role: 'admin',
                permissions: ['claim_editor', 'admin_panel', 'user_management'],
                assignedClaims: []
            };
            
            // Store session
            localStorage.setItem('hasbaratracker_token', sessionToken);
            localStorage.setItem(`session_${sessionToken}`, JSON.stringify({
                userId: userData.id,
                email: userData.email,
                role: userData.role,
                permissions: userData.permissions,
                assignedClaims: userData.assignedClaims,
                createdAt: Date.now(),
                expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
            }));
            
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