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
                // Try sessionStorage first (browser session persistence)
                let token = sessionStorage.getItem('hasbaratracker_token');
                let sessionData = null;
                
                if (token) {
                    sessionData = sessionStorage.getItem(`session_${token}`);
                } else {
                    // Fallback to localStorage for existing sessions
                    token = localStorage.getItem('hasbaratracker_token');
                    if (token) {
                        sessionData = localStorage.getItem(`session_${token}`);
                        // Migrate to sessionStorage for browser session persistence
                        sessionStorage.setItem('hasbaratracker_token', token);
                        if (sessionData) {
                            sessionStorage.setItem(`session_${token}`, sessionData);
                        }
                        // Remove from localStorage after migration
                        localStorage.removeItem('hasbaratracker_token');
                        localStorage.removeItem(`session_${token}`);
                    }
                }

                if (token && sessionData) {
                    const session = JSON.parse(sessionData);
                    
                    // Check if session is still valid (no expiration for browser session)
                    const userData = {
                        id: session.userId,
                        email: session.email,
                        role: session.role,
                        permissions: session.permissions,
                        assignedClaims: session.assignedClaims
                    };
                    
                    setUser(userData);
                    console.log('✅ Session restored from browser storage');
                } else {
                    // Clean up any invalid tokens
                    sessionStorage.removeItem('hasbaratracker_token');
                    localStorage.removeItem('hasbaratracker_token');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                // Clean up on error
                sessionStorage.removeItem('hasbaratracker_token');
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
            console.log('🔗 Requesting magic link for:', email);
            console.log('📧 Email being checked:', email.toLowerCase());
            
            // Generate a unique magic link token (matching GitHub working version)
            const magicToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 20)}`;
            const magicLink = `${window.location.origin}/login?token=${magicToken}`;
            
            // Store the magic link token in localStorage for 15 minutes
            const expirationTime = Date.now() + (15 * 60 * 1000); // 15 minutes
            localStorage.setItem(`magic_token_${magicToken}`, JSON.stringify({
                email: email.toLowerCase(),
                expiresAt: expirationTime,
                used: false
            }));
            
            console.log('🔗 Generated magic link:', magicLink);
            
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
                    <body style="font-family: Helvetica, Arial, sans-serif; line-height: 1.4; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #d6d6d6;">
                        <!-- Header with Hasbara Tracker logo -->
                        <div style="background-color: #d6d6d6; padding: 30px 20px; text-align: center; border-radius: 3px; margin-bottom: 20px;">
                            <img src="https://files.hasbaratracker.com/ht-logo-with-slogan.svg" 
                                 alt="Hasbara Tracker - Debunking Israeli propaganda" 
                                 style="max-width: 300px; width: 100%; height: auto;" />
                        </div>
                        
                        <!-- Main content -->
                        <div style="background: #d6d6d6; padding: 40px 30px; border-radius: 3px; border: 1px solid #cbcbcb;">
                            <h2 style="color: #333; margin-top: 0; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal;">
                                Login Request
                            </h2>
                            
                            <p style="margin-bottom: 20px; font-size: 14px; line-height: 1.5;">
                                Hello,
                            </p>
                            
                            <p style="margin-bottom: 30px; font-size: 14px; line-height: 1.5;">
                                You requested access to the Hasbara Tracker Claim Editor. Click the button below to sign in securely:
                            </p>
                            
                            <!-- Button matching site's btn-green style exactly -->
                            <div style="text-align: center; margin: 35px 0;">
                                <a href="${magicLink}" 
                                   style="display: inline-flex; 
                                          justify-content: center;
                                          align-items: center;
                                          background-color: #bffb9b; 
                                          color: #333; 
                                          padding: 2.5% 3.5% 2.5% 3.5%;
                                          height: 0.5rem;
                                          text-decoration: none; 
                                          border-radius: 3px; 
                                          font-family: Helvetica, Arial, sans-serif; 
                                          font-size: 0.93em; 
                                          font-weight: normal;
                                          border: solid 0.5px #5e5e5e;
                                          min-width: 200px;">
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
                            <p style="margin: 0;">
                                If you didn't request this login link, you can safely ignore this email.
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
            
            // Determine if we're in development or production
            const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
            const forceEmailInDev = process.env.REACT_APP_FORCE_EMAIL_DEV === 'true';
            const isAdmin = await checkIfAdmin(email);
            
            console.log('🌍 Environment check:', {
                isDevelopment,
                forceEmailInDev,
                hostname: window.location.hostname,
                nodeEnv: process.env.NODE_ENV,
                isAdminEmail: isAdmin
            });
            
            // In development, validate locally but optionally send email for testing
            if (isDevelopment && !forceEmailInDev) {
                console.log('🌍 Development mode: Validating permissions locally');
                
                if (!isAdmin) {
                    // Check if user is assigned to claims by calling local API
                    try {
                        console.log('🔍 Development mode: Checking local assignments for:', email);
                        const assignResponse = await fetch(`http://localhost:3001/api/user-assignments/${email}`);
                        if (assignResponse.ok) {
                            const assignData = await assignResponse.json();
                            if (!assignData.assignments?.assignedClaims?.length) {
                                console.log('❌ Development mode: User not assigned to any claims');
                                throw new Error('User not assigned to any claims in development mode');
                            }
                            console.log('✅ Development mode: User has assignments, proceeding');
                        } else {
                            console.log('❌ Development mode: Could not check assignments');
                            throw new Error('Could not verify user assignments in development mode');
                        }
                    } catch (devError) {
                        console.error('❌ Development mode error checking assignments:', devError);
                        throw new Error(`Development mode: ${devError.message}`);
                    }
                }
                
                // Default development behavior - just log the magic link
                console.log('📧 Development mode: Skipping actual email send, magic link available in browser');
                console.log('🔗 Development Magic Link:', magicLink);
                console.log('💡 Development tip: Copy the magic link from console and visit it directly');
                console.log('🚀 To test email sending in dev, set REACT_APP_FORCE_EMAIL_DEV=true');
                
                return {
                    success: true,
                    message: 'Magic link created successfully (development mode - check console for link)',
                    messageId: 'dev-mode-local',
                    magicLink: magicLink // Include the link for development
                };
            }
            
            // Handle development mode with forced email testing
            if (isDevelopment && forceEmailInDev) {
                console.log('🌍 Development mode with FORCE EMAIL: Validating permissions locally then sending email');
                
                if (!isAdmin) {
                    // Check if user is assigned to claims by calling local API
                    try {
                        console.log('🔍 Development mode: Checking local assignments for:', email);
                        const assignResponse = await fetch(`http://localhost:3001/api/user-assignments/${email}`);
                        if (assignResponse.ok) {
                            const assignData = await assignResponse.json();
                            if (!assignData.assignments?.assignedClaims?.length) {
                                console.log('❌ Development mode: User not assigned to any claims');
                                throw new Error('User not assigned to any claims in development mode');
                            }
                            console.log('✅ Development mode: User has assignments, proceeding to send email');
                        } else {
                            console.log('❌ Development mode: Could not check assignments');
                            throw new Error('Could not verify user assignments in development mode');
                        }
                    } catch (devError) {
                        console.error('❌ Development mode error checking assignments:', devError);
                        throw new Error(`Development mode: ${devError.message}`);
                    }
                }
                
                console.log('📧 Development mode: Proceeding to send email via Cloudflare Worker...');
                // Fall through to normal email sending logic
            }
            
            // For production or non-admin users, use Cloudflare Worker
            const workerUrl = process.env.REACT_APP_WORKER_URL || 'https://email-worker.izumi-ky.workers.dev';
            
            // Try different API key sources - the working one might be stored differently
            const apiKey = process.env.REACT_APP_CLOUDFLARE_API_KEY || 
                          process.env.CLOUDFLARE_API_KEY || 
                          'test-key-123'; // Fallback for testing
            
            console.log('🌐 Sending request to worker:', workerUrl);
            console.log('🔑 Using API key (first 10 chars):', apiKey.substring(0, 10) + '...');
            
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

            console.log('📨 Worker response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Worker error:', response.status, errorText);
                
                if (isDevelopment) {
                    console.error('❌ Development mode: Worker cannot access localhost:3001');
                    console.error('💡 For development testing of regular users, deploy server to a public URL or use admin emails');
                } else {
                    console.error('❌ Production mode: Check if user is assigned to claims');
                }
                
                console.error('❌ Check if:', {
                    environment: isDevelopment ? 'development (localhost)' : 'production',
                    serverAccess: isDevelopment ? 'Worker cannot reach localhost' : 'Check if server is reachable',
                    emailInCSV: `${email} is in volunteers.csv`,
                    emailAssigned: `${email} has been assigned to claims`
                });
                throw new Error(`Worker error ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            
            return result;
        } catch (error) {
            throw error;
        }
    };

    // Verify magic link token
    const verifyMagicLink = async (token) => {
        try {
            console.log('🔍 Verifying magic link token:', token);
            
            // Check if token exists in localStorage
            const tokenKey = `magic_token_${token}`;
            const tokenDataString = localStorage.getItem(tokenKey);
            
            if (!tokenDataString) {
                throw new Error('Invalid or expired magic link token');
            }
            
            const tokenData = JSON.parse(tokenDataString);
            
            // Check if token has expired
            if (Date.now() > tokenData.expiresAt) {
                localStorage.removeItem(tokenKey);
                throw new Error('Magic link has expired');
            }
            
            // Check if token has already been used
            if (tokenData.used) {
                localStorage.removeItem(tokenKey);
                throw new Error('Magic link has already been used');
            }
            
            // Mark token as used
            tokenData.used = true;
            localStorage.setItem(tokenKey, JSON.stringify(tokenData));
            
            // Determine user role and permissions
            let userData;
            const isAdmin = await checkIfAdmin(tokenData.email);
            
            if (isAdmin) {
                // Create admin session
                userData = {
                    id: `admin_${Date.now()}`,
                    email: tokenData.email,
                    role: 'admin',
                    permissions: ['admin', 'claim_editor'],
                    assignedClaims: []
                };
            } else {
                // Create regular user session and fetch assignments
                userData = {
                    id: `user_${Date.now()}`,
                    email: tokenData.email,
                    role: 'user',
                    permissions: ['claim_editor'],
                    assignedClaims: []
                };
                
                // Fetch user's claim assignments
                try {
                    // Try multiple API sources for user assignments
                    const apiUrls = [
                        'https://user-backend.izumi-ky.workers.dev', // Your user-backend worker
                        process.env.REACT_APP_API_URL,               // Environment variable
                        'http://localhost:3001'                     // Local development fallback
                    ].filter(Boolean); // Remove undefined values

                    console.log('🔍 Fetching user assignments from APIs:', apiUrls);

                    for (const apiUrl of apiUrls) {
                        try {
                            console.log(`🔍 Trying to fetch assignments from: ${apiUrl}`);
                            const assignResponse = await fetch(`${apiUrl}/api/user-assignments/${encodeURIComponent(tokenData.email)}`);
                            
                            console.log(`📨 Assignment API response from ${apiUrl}: ${assignResponse.status}`);
                            
                            if (assignResponse.ok) {
                                const assignData = await assignResponse.json();
                                console.log(`📋 CLAIM-EDITOR: Assignment data received from ${apiUrl}:`, JSON.stringify(assignData, null, 2));
                                userData.assignedClaims = assignData.assignments?.assignedClaims || [];
                                console.log(`✅ CLAIM-EDITOR: User ${tokenData.email} has ${userData.assignedClaims.length} assigned claims from ${apiUrl}:`);
                                console.log(`✅ CLAIM-EDITOR: Claims list:`, userData.assignedClaims);
                                console.log(`✅ CLAIM-EDITOR: Using API endpoint: ${apiUrl}`);
                                break; // Success - stop trying other APIs
                            } else {
                                const errorText = await assignResponse.text();
                                console.log(`❌ CLAIM-EDITOR: API ${apiUrl} returned ${assignResponse.status}: ${errorText}`);
                            }
                        } catch (apiError) {
                            console.log(`❌ Error with API ${apiUrl}:`, apiError.message);
                            continue; // Try next API
                        }
                    }
                } catch (error) {
                    console.warn('Could not fetch user assignments from any API:', error.message);
                }
            }
            
            const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            // Store session in sessionStorage for browser session persistence
            sessionStorage.setItem('hasbaratracker_token', sessionToken);
            sessionStorage.setItem(`session_${sessionToken}`, JSON.stringify({
                userId: userData.id,
                email: userData.email,
                role: userData.role,
                permissions: userData.permissions,
                assignedClaims: userData.assignedClaims,
                createdAt: Date.now()
                // No expiration - session lasts until browser is closed/restarted
            }));
            
            setUser(userData);
            
            // Clean up the magic token
            localStorage.removeItem(tokenKey);
            
            console.log('✅ Magic link authentication successful for:', userData.email);
            return userData;
            
        } catch (error) {
            console.error('🔍 Magic link verification failed:', error);
            throw error;
        }
    };

    // Logout
    const logout = () => {
        const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
        
        // Clear session data from both storage types
        if (token) {
            sessionStorage.removeItem(`session_${token}`);
            localStorage.removeItem(`session_${token}`);
        }
        sessionStorage.removeItem('hasbaratracker_token');
        localStorage.removeItem('hasbaratracker_token');
        
        // Clear any remaining magic link tokens (cleanup)
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('magic_token_')) {
                localStorage.removeItem(key);
            }
        });
        
        setUser(null);
        console.log('🔐 User logged out - session cleared');
    };

    // Check if user has permission
    const hasPermission = (permission) => {
        if (!user) return false;
        return user.permissions.includes(permission) || user.role === 'admin';
    };

    // Check if user can access specific claim
    const canAccessClaim = (claimTitle) => {
        if (!user) {
            console.log(`🔍 AUTH-CONTEXT: canAccessClaim("${claimTitle}") - no user`);
            return false;
        }
        if (user.role === 'admin') {
            console.log(`🔍 AUTH-CONTEXT: canAccessClaim("${claimTitle}") - admin access`);
            return true;
        }
        
        // Normalize strings by replacing curly quotes with straight quotes for comparison
        const normalizeQuotes = (str) => {
            return str.replace(/'/g, "'").replace(/'/g, "'"); // Replace left/right curly quotes with straight quotes
        };
        
        const normalizedClaimTitle = normalizeQuotes(claimTitle);
        const normalizedAssignedClaims = user.assignedClaims?.map(claim => normalizeQuotes(claim)) || [];
        
        const hasAccess = normalizedAssignedClaims.includes(normalizedClaimTitle);
        
        console.log(`🔍 AUTH-CONTEXT: "${claimTitle}" -> ${hasAccess ? '✅ GRANTED' : '❌ DENIED'}`);
        
        return hasAccess;
    };

    // Refresh user assignments (call after assignments are changed via Volunteer Manager)
    const refreshUserAssignments = async () => {
        try {
            if (!user || user.role === 'admin') {
                console.log('🔄 Skip assignment refresh for admin or no user');
                return;
            }

            console.log('🔄 Refreshing assignments for user:', user.email);

            // Try multiple API sources for user assignments
            const apiUrls = [
                'https://user-backend.izumi-ky.workers.dev', // Your user-backend worker
                process.env.REACT_APP_API_URL,               // Environment variable
                'http://localhost:3001'                     // Local development fallback
            ].filter(Boolean); // Remove undefined values

            console.log('🔄 Fetching updated assignments from APIs:', apiUrls);

            let updatedAssignments = [];
            for (const apiUrl of apiUrls) {
                try {
                    console.log(`🔄 Refreshing assignments from: ${apiUrl}`);
                    const assignResponse = await fetch(`${apiUrl}/api/user-assignments/${encodeURIComponent(user.email)}`);
                    
                    console.log(`📨 Refresh response from ${apiUrl}: ${assignResponse.status}`);
                    
                    if (assignResponse.ok) {
                        const assignData = await assignResponse.json();
                        console.log(`📋 REFRESH: Assignment data received from ${apiUrl}:`, JSON.stringify(assignData, null, 2));
                        updatedAssignments = assignData.assignments?.assignedClaims || [];
                        console.log(`✅ REFRESH: User ${user.email} now has ${updatedAssignments.length} assigned claims from ${apiUrl}:`);
                        console.log(`✅ REFRESH: Updated claims list:`, updatedAssignments);
                        break; // Success - stop trying other APIs
                    } else {
                        const errorText = await assignResponse.text();
                        console.log(`❌ REFRESH: API ${apiUrl} returned ${assignResponse.status}: ${errorText}`);
                    }
                } catch (apiError) {
                    console.log(`❌ Error refreshing from API ${apiUrl}:`, apiError.message);
                    continue; // Try next API
                }
            }

            // Update the user object with new assignments
            const updatedUser = {
                ...user,
                assignedClaims: updatedAssignments
            };

            // Update both memory and session storage
            setUser(updatedUser);

            const token = sessionStorage.getItem('hasbaratracker_token');
            if (token) {
                const sessionKey = `session_${token}`;
                const sessionDataString = sessionStorage.getItem(sessionKey);
                if (sessionDataString) {
                    const sessionData = JSON.parse(sessionDataString);
                    sessionData.assignedClaims = updatedAssignments;
                    sessionStorage.setItem(sessionKey, JSON.stringify(sessionData));
                    console.log('✅ REFRESH: Updated session storage with new assignments');
                }
            }

            console.log(`✅ REFRESH: Successfully updated user assignments (${updatedAssignments.length} claims)`);
            return updatedAssignments;

        } catch (error) {
            console.error('❌ Error refreshing user assignments:', error);
            throw error;
        }
    };

    // Check if email is admin (uses environment variables for security)
    const checkIfAdmin = async (email) => {
        // Get admin emails from environment variables with fallback for development
        let adminEmailsEnv = process.env.REACT_APP_ADMIN_EMAILS;
        
        // Development fallback - include common admin emails
        if (!adminEmailsEnv) {
            console.warn('⚠️ REACT_APP_ADMIN_EMAILS not set, using development fallback');
            adminEmailsEnv = 'admin@hasbaratracker.com,swan4444444@protonmail.com';
        }
        
        const adminEmails = adminEmailsEnv.split(',').map(e => e.trim().toLowerCase());
        
        console.log('🔍 Admin check for:', email.toLowerCase());
        console.log('🔍 Admin emails configured:', adminEmails);
        console.log('🔍 Environment:', process.env.NODE_ENV);
        
        const isAdmin = adminEmails.includes(email.toLowerCase());
        console.log('🔍 Is admin result:', isAdmin);
        
        return isAdmin;
    };

    const value = {
        user,
        loading,
        sendMagicLink,
        verifyMagicLink,
        logout,
        hasPermission,
        canAccessClaim,
        refreshUserAssignments,
        isAdmin: () => user?.role === 'admin',
        isLoggedIn: () => !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};