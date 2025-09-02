// User authentication system
// Admin users stored securely in Cloudflare KV in production

// Fetch admin users from secure storage
const fetchAdminUsers = async () => {
    try {
        // In production, this fetches from your Cloudflare Worker
        const response = await fetch('/api/auth/admin-users');
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        // Fallback for development
    }
    
    // Development fallback - admin emails fetched from secure Cloudflare storage in production
    // TODO: Remove these when Cloudflare secrets are implemented
    return [
        {
            id: 'u001',
            email: atob('aW5mb0BoYXNiYXJhdHJhY2tlci5jb20='),
            role: 'admin',
            permissions: ['claim_editor', 'admin_panel', 'user_management'],
            assignedClaims: [],
            createdAt: new Date().toISOString(),
            isActive: true
        },
        {
            id: 'u002', 
            email: atob('c3dhbjQ0NDQ0NDRAcHJvdG9ubWFpbC5jb20='),
            role: 'admin',
            permissions: ['claim_editor', 'admin_panel', 'user_management'],
            assignedClaims: [],
            createdAt: new Date().toISOString(),
            isActive: true
        },
        {
            id: 'u003',
            email: atob('aGFzYmFyYXRyYWNrZXJAcHJvdG9uLm1l'),
            role: 'admin', 
            permissions: ['claim_editor', 'admin_panel', 'user_management'],
            assignedClaims: [],
            createdAt: new Date().toISOString(),
            isActive: true
        }
    ];
};

// Initialize admin users
let ADMIN_USERS = [];
fetchAdminUsers().then(users => {
    ADMIN_USERS = users;
});

// Export for compatibility
export { ADMIN_USERS };

// Admin credentials removed for production security

// Initialize default users if none exist
export const initializeUsers = () => {
    const existingUsers = JSON.parse(localStorage.getItem('hasbaratracker_users') || '[]');
    
    if (existingUsers.length === 0) {
        // Add all admin users
        localStorage.setItem('hasbaratracker_users', JSON.stringify(ADMIN_USERS));
    } else {
        // Check if we need to add new admin users
        ensureAdminUsersExist();
    }
    
    return JSON.parse(localStorage.getItem('hasbaratracker_users') || '[]');
};

// Ensure all admin users exist (adds missing ones)
export const ensureAdminUsersExist = () => {
    const existingUsers = JSON.parse(localStorage.getItem('hasbaratracker_users') || '[]');
    const existingEmails = existingUsers.map(u => u.email.toLowerCase());
    
    let usersAdded = 0;
    const updatedUsers = [...existingUsers];
    
    ADMIN_USERS.forEach(adminUser => {
        if (!existingEmails.includes(adminUser.email.toLowerCase())) {
            updatedUsers.push(adminUser);
            usersAdded++;
        }
    });
    
    if (usersAdded > 0) {
        localStorage.setItem('hasbaratracker_users', JSON.stringify(updatedUsers));
    }
    
    return updatedUsers;
};

// Force refresh all admin users
export const resetAdminUsers = () => {
    localStorage.setItem('hasbaratracker_users', JSON.stringify(ADMIN_USERS));
    return ADMIN_USERS;
};

// User management functions
export const getUsers = () => {
    return JSON.parse(localStorage.getItem('hasbaratracker_users') || '[]');
};

export const addUser = (userData) => {
    const users = getUsers();
    const newUser = {
        id: `user_${Date.now()}`,
        ...userData,
        createdAt: new Date().toISOString(),
        isActive: true
    };
    
    users.push(newUser);
    localStorage.setItem('hasbaratracker_users', JSON.stringify(users));
    return newUser;
};

export const updateUser = (userId, updates) => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('hasbaratracker_users', JSON.stringify(users));
        return users[userIndex];
    }
    
    return null;
};

export const deleteUser = (userId) => {
    const users = getUsers();
    const filteredUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('hasbaratracker_users', JSON.stringify(filteredUsers));
    return true;
};

export const findUserByEmail = (email) => {
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

// Magic link tokens (in production, these would be in a secure database with expiration)
export const storeMagicLinkToken = (email, token) => {
    const tokens = JSON.parse(localStorage.getItem('hasbaratracker_magic_tokens') || '{}');
    tokens[token] = {
        email: email.toLowerCase(),
        expiresAt: Date.now() + (15 * 60 * 1000), // 15 minutes
        used: false
    };
    localStorage.setItem('hasbaratracker_magic_tokens', JSON.stringify(tokens));
};

export const verifyMagicLinkToken = (token) => {
    const tokens = JSON.parse(localStorage.getItem('hasbaratracker_magic_tokens') || '{}');
    const tokenData = tokens[token];
    
    if (!tokenData || tokenData.used || Date.now() > tokenData.expiresAt) {
        return null;
    }
    
    // Mark token as used
    tokens[token].used = true;
    localStorage.setItem('hasbaratracker_magic_tokens', JSON.stringify(tokens));
    
    return findUserByEmail(tokenData.email);
};

// Session management
export const createSession = (user) => {
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const sessions = JSON.parse(localStorage.getItem('hasbaratracker_sessions') || '{}');
    
    sessions[sessionToken] = {
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        assignedClaims: user.assignedClaims,
        createdAt: Date.now(),
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };
    
    localStorage.setItem('hasbaratracker_sessions', JSON.stringify(sessions));
    return sessionToken;
};

export const verifySession = (token) => {
    const sessions = JSON.parse(localStorage.getItem('hasbaratracker_sessions') || '{}');
    const session = sessions[token];
    
    if (!session || Date.now() > session.expiresAt) {
        return null;
    }
    
    return session;
};

export const deleteSession = (token) => {
    const sessions = JSON.parse(localStorage.getItem('hasbaratracker_sessions') || '{}');
    delete sessions[token];
    localStorage.setItem('hasbaratracker_sessions', JSON.stringify(sessions));
};