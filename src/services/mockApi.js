// Mock API service - simulates backend endpoints
// In production, this would be replaced with real API calls

import {
    initializeUsers,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    findUserByEmail,
    storeMagicLinkToken,
    verifyMagicLinkToken,
    createSession,
    verifySession,
    deleteSession,
    resetAdminUsers,
    ensureAdminUsersExist,
    ADMIN_USERS
} from '../data/users';


// Initialize users on app start
initializeUsers();

// Production mode - debug functions disabled for security

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));


// Auth API endpoints
export const authAPI = {
    // Send magic link
    sendMagicLink: async (email) => {
        await delay();
        
        const user = findUserByEmail(email);
        if (!user) {
            throw new Error('This user does not have access to the tracker. Please contact info@hasbaratracker.com.');
        }
        
        if (!user.isActive) {
            throw new Error('Your account has been deactivated');
        }
        
        // Generate secure token
        const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 20)}`;
        const magicLink = `${window.location.origin}/login?token=${token}`;
        
        // Store token
        storeMagicLinkToken(email, token);
        
        // Note: Email sending is handled by the server API
        return { 
            success: true, 
            message: 'Magic link sent to your email'
        };
    },
    
    // Verify magic link
    verifyMagicLink: async (token) => {
        await delay(200);
        
        const user = verifyMagicLinkToken(token);
        if (!user) {
            throw new Error('Invalid or expired magic link');
        }
        
        const sessionToken = createSession(user);
        
        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                permissions: user.permissions,
                assignedClaims: user.assignedClaims
            },
            token: sessionToken
        };
    },
    
    // Verify session
    verifySession: async (token) => {
        await delay(100);
        
        const session = verifySession(token);
        if (!session) {
            throw new Error('Invalid or expired session');
        }
        
        return {
            id: session.userId,
            email: session.email,
            role: session.role,
            permissions: session.permissions,
            assignedClaims: session.assignedClaims
        };
    },
    
    // Logout
    logout: async (token) => {
        await delay(100);
        deleteSession(token);
        return { success: true };
    }
};

// Admin API endpoints
export const adminAPI = {
    // Get all users
    getUsers: async (authToken) => {
        await delay();
        
        const session = verifySession(authToken);
        if (!session || session.role !== 'admin') {
            throw new Error('Admin access required');
        }
        
        return getUsers().map(user => ({
            id: user.id,
            email: user.email,
            role: user.role,
            permissions: user.permissions,
            assignedClaims: user.assignedClaims,
            createdAt: user.createdAt,
            isActive: user.isActive
        }));
    },
    
    // Add new user
    addUser: async (authToken, userData) => {
        await delay();
        
        const session = verifySession(authToken);
        if (!session || session.role !== 'admin') {
            throw new Error('Admin access required');
        }
        
        // Check if user already exists
        if (findUserByEmail(userData.email)) {
            throw new Error('User with this email already exists');
        }
        
        // Add user permissions based on role
        const permissions = userData.role === 'admin' 
            ? ['claim_editor', 'admin_panel', 'user_management']
            : ['claim_editor'];
            
        const newUser = addUser({
            email: userData.email.toLowerCase(),
            role: userData.role,
            permissions,
            assignedClaims: userData.assignedClaims || []
        });
        
        return {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            permissions: newUser.permissions,
            assignedClaims: newUser.assignedClaims,
            createdAt: newUser.createdAt,
            isActive: newUser.isActive
        };
    },
    
    // Update user claims
    updateUserClaims: async (authToken, userId, assignedClaims) => {
        await delay();
        
        const session = verifySession(authToken);
        if (!session || session.role !== 'admin') {
            throw new Error('Admin access required');
        }
        
        const updatedUser = updateUser(userId, { assignedClaims });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
            permissions: updatedUser.permissions,
            assignedClaims: updatedUser.assignedClaims
        };
    },
    
    // Delete user
    deleteUser: async (authToken, userId) => {
        await delay();
        
        const session = verifySession(authToken);
        if (!session || session.role !== 'admin') {
            throw new Error('Admin access required');
        }
        
        // Don't allow deleting yourself
        if (session.userId === userId) {
            throw new Error('Cannot delete your own account');
        }
        
        const success = deleteUser(userId);
        if (!success) {
            throw new Error('User not found');
        }
        
        return { success: true };
    }
};

// Mock API server - intercept fetch requests
const originalFetch = window.fetch;

// DISABLED: Mock API interception - using real server instead
// window.fetch = function(url, options = {}) {
//     // Only intercept our API calls
//     if (typeof url === 'string' && url.startsWith('/api/')) {
//         return handleMockAPI(url, options);
//     }
//     
//     // Pass through all other requests
//     return originalFetch.apply(this, arguments);
// };

// Handle mock API requests
async function handleMockAPI(url, options) {
    try {
        const method = options.method || 'GET';
        const headers = options.headers || {};
        const body = options.body ? JSON.parse(options.body) : null;
        const authToken = headers['Authorization']?.replace('Bearer ', '');
        
        // Route API calls
        if (url === '/api/auth/magic-link' && method === 'POST') {
            const result = await authAPI.sendMagicLink(body.email);
            return createMockResponse(200, result);
            
        } else if (url === '/api/auth/verify-magic-link' && method === 'POST') {
            const result = await authAPI.verifyMagicLink(body.token);
            return createMockResponse(200, result);
            
        } else if (url === '/api/auth/verify' && method === 'GET') {
            const result = await authAPI.verifySession(authToken);
            return createMockResponse(200, result);
            
        } else if (url === '/api/admin/users' && method === 'GET') {
            const result = await adminAPI.getUsers(authToken);
            return createMockResponse(200, result);
            
        } else if (url === '/api/admin/users' && method === 'POST') {
            const result = await adminAPI.addUser(authToken, body);
            return createMockResponse(201, result);
            
        } else if (url.match(/^\/api\/admin\/users\/[^/]+\/claims$/) && method === 'PUT') {
            const userId = url.split('/')[4];
            const result = await adminAPI.updateUserClaims(authToken, userId, body.assignedClaims);
            return createMockResponse(200, result);
            
        } else if (url.match(/^\/api\/admin\/users\/[^/]+$/) && method === 'DELETE') {
            const userId = url.split('/')[4];
            const result = await adminAPI.deleteUser(authToken, userId);
            return createMockResponse(200, result);
            
        } else if (url === '/api/auth/admin-users' && method === 'GET') {
            // Try to fetch from Cloudflare worker first, fallback to local
            try {
                const workerUrl = process.env.REACT_APP_WORKER_URL || 'https://email-worker.izumi-ky.workers.dev';
                const apiKey = process.env.REACT_APP_CLOUDFLARE_API_KEY;
                
                if (workerUrl && apiKey) {
                    const response = await fetch(`${workerUrl}/api/auth/admin-users`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        const adminUsers = await response.json();
                        if (adminUsers && adminUsers.length > 0) {
                            return createMockResponse(200, adminUsers);
                        }
                    }
                }
            } catch (error) {
                console.warn('Failed to fetch admin users from Cloudflare worker, using fallback:', error.message);
            }
            
            // Fallback to current ADMIN_USERS from users.js
            return createMockResponse(200, ADMIN_USERS);
        }
        
        // Unknown endpoint
        return createMockResponse(404, { message: 'Endpoint not found' });
        
    } catch (error) {
        return createMockResponse(400, { message: error.message });
    }
}

// Create mock response
function createMockResponse(status, data) {
    return Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data))
    });
}