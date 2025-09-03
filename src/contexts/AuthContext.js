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
            
            // Create email template matching Hasbara Tracker design
            const emailTemplate = {
                subject: 'Login to Hasbara Tracker - Secure Access',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Login to Hasbara Tracker</title>
                    </head>
                    <body style="font-family: Helvetica, Arial, sans-serif; line-height: 1.4; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f0f0;">
                        <!-- Header matching site design -->
                        <div style="background-color: #d6d6d6; padding: 30px 20px; text-align: center; border-radius: 3px; margin-bottom: 20px;">
                            <h1 style="margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 24px; color: #333; font-weight: normal;">
                                Hasbara Tracker
                            </h1>
                            <p style="margin: 10px 0 0 0; font-size: 14px; color: #595959;">
                                Secure Login Access
                            </p>
                        </div>
                        
                        <!-- Main content -->
                        <div style="background: white; padding: 40px 30px; border-radius: 3px; border: 1px solid #cbcbcb;">
                            <h2 style="color: #333; margin-top: 0; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal;">
                                Login Request
                            </h2>
                            
                            <p style="margin-bottom: 20px; font-size: 14px; line-height: 1.5;">
                                Hello,
                            </p>
                            
                            <p style="margin-bottom: 30px; font-size: 14px; line-height: 1.5;">
                                You requested access to the Hasbara Tracker Claim Editor. Click the button below to sign in securely:
                            </p>
                            
                            <!-- Button matching site's btn-green style -->
                            <div style="text-align: center; margin: 35px 0;">
                                <a href="${magicLink}" 
                                   style="display: inline-block; 
                                          background-color: #bffb9b; 
                                          color: #333; 
                                          padding: 12px 20px; 
                                          text-decoration: none; 
                                          border-radius: 3px; 
                                          font-family: Helvetica, Arial, sans-serif; 
                                          font-size: 14px; 
                                          font-weight: normal;
                                          border: 1px solid #5e5e5e;
                                          transition: all 0.2s ease;">
                                    Access Hasbara Tracker
                                </a>
                            </div>
                            
                            <!-- Warning box -->
                            <div style="background: #78ff96; border: 1px solid #5e5e5e; border-radius: 3px; padding: 15px; margin: 25px 0; text-align: center;">
                                <p style="margin: 0; color: #333; font-size: 13px; font-weight: normal;">
                                    ⚠️ <strong>Important:</strong> This link expires in 15 minutes for security.
                                </p>
                            </div>
                            
                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #cbcbcb;">
                                <p style="font-size: 13px; color: #595959; margin-bottom: 15px;">
                                    If the button doesn't work, copy this link:
                                </p>
                                <p style="font-size: 12px; color: #595959; word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 3px; font-family: monospace;">
                                    ${magicLink}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="text-align: center; margin-top: 30px; padding: 20px; color: #595959; font-size: 12px;">
                            <p style="margin: 0 0 10px 0;">
                                If you didn't request this login link, you can safely ignore this email.
                            </p>
                            <p style="margin: 0;">
                                Hasbara Tracker Secure Authentication System
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