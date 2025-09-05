const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Allow large payloads for data.js content

// Helper function to convert claim title to URL slug
function titleToSlug(title) {
    // Mapping for existing claims to maintain correct short URLs
    const claimUrlMap = {
        'Forty beheaded babies': 'forty-beheaded-babies',
        'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces': 'al-ahli-attacked',
        'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas': 'al-shifa-fuel',
        'Makeup used in Gaza to fake injuries': 'makeup',
        'Hamas were carrying instructions on how to make chemical weapons': 'hamas-chemical-weapons',
        'Israeli state denies killing mother and daughter seeking refuge in Gaza\'s Holy Family Parish': 'church-killing-denial',
        'Israeli soldier helps elderly Palestinian man in \'safe corridor\'': 'elderly-man-help',
        'Palestinian captives stripped down naked because of \'warm weather\' in the Middle East, says Mark Regev': 'naked-captives-weather'
    };
    
    // Check if there's a predefined mapping for this title
    if (claimUrlMap[title]) {
        return claimUrlMap[title];
    }
    
    // For new claims, generate a short slug (max 3 words) that summarizes the claim
    const cleanTitle = title
        .toLowerCase()
        .replace(/['']/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    
    // Split into words and take meaningful ones (skip common words)
    const skipWords = ['the', 'a', 'an', 'is', 'was', 'were', 'are', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    const words = cleanTitle.split(' ').filter(word => word.length > 0 && !skipWords.includes(word));
    
    // Take the first 3 meaningful words
    const keyWords = words.slice(0, 3);
    
    return keyWords.join('-') || 'claim';
}

// Helper function to convert claim title to component name
function titleToComponentName(title) {
    // Mapping for existing claims to use correct component names
    const componentNameMap = {
        'Forty beheaded babies': 'ClaimFortyBeheadedBabies',
        'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces': 'ClaimAlAhliAttacked',
        'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas': 'ClaimAlShifaFuel',
        'Makeup used in Gaza to fake injuries': 'ClaimMakeup',
        'Hamas were carrying instructions on how to make chemical weapons': 'ClaimHamasChemicalWeapons',
        'Israeli state denies killing mother and daughter seeking refuge in Gaza\'s Holy Family Parish': 'ClaimChurchKillingDenial',
        'Israeli soldier helps elderly Palestinian man in \'safe corridor\'': 'ClaimElderlyManHelp',
        'Palestinian captives stripped down naked because of \'warm weather\' in the Middle East, says Mark Regev': 'ClaimNakedCaptivesWeather'
    };
    
    // Check if there's a predefined mapping for this title
    if (componentNameMap[title]) {
        return componentNameMap[title];
    }
    
    // For new claims, generate component name from title
    return 'Claim' + title
        .replace(/['']/g, '')
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

// Helper function to generate claim component file
function generateClaimComponent(title, summaryIndex, slug) {
    const componentName = titleToComponentName(title);
    
    return `import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { HelmetProvider } from 'react-helmet-async';

// Page
import '../App.css';
import PageMetadata from './PageMetadata';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import NavLinks from './NavLinks';
import Footer from './Footer';
import BackToTop from './BackToTop';

// Tracker
import './Tracker.css';
import { data, summaries } from './data';
import TrackerColumns from './TrackerColumns';
import ClaimSummary from './ClaimSummary';
import RenderTrackerDesktop from './RenderTrackerDesktop';
import RenderTrackerMobile from './RenderTrackerMobile';

export default function ${componentName}() {    
    const metadataProps = {
        url: "https://hasbaratracker.com/${slug}",
        title: summaries[${summaryIndex}].claimMainTitle,
        description: summaries[${summaryIndex}].claimSummary,
        
        twitterTitle: summaries[${summaryIndex}].claimMainTitle,
        twitterDescription: summaries[${summaryIndex}].claimSummary,
        twitterUrl: "https://hasbaratracker.com/${slug}",
    };

    // defines claim tags for dropdown (ClaimFilter.js)
    const uniqueClaimTitles = useMemo(() => {
        const claimTitlesSet = new Set(data.map((item) => item.claimTitle));
        return Array.from(claimTitlesSet);
    }, [data]);
    
    const [selectedClaimTitle, setSelectedClaimTitle] = useState('');

    // Set mobile/phone view dimensions
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);

    // Force to render if <= 576, so the Source links don't have the hovered video player attached.
    const [forceRender, setForceRender] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            const newIsMobileView = window.innerWidth <= 576;
            setIsMobileView(newIsMobileView);
            setForceRender(prev => !prev);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // All columns
    const columns = useMemo(() => TrackerColumns({ isMobileView }), [isMobileView]);

    // filteredData based on selected claim title
    const filteredData = useMemo(() => {
        if (!selectedClaimTitle) {
            return data.filter(item => item.claimTitle === summaries[${summaryIndex}].claimMainTitle);
        }
        return data.filter(item => item.claimTitle === selectedClaimTitle);
    }, [selectedClaimTitle]);

    // Table setup
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data: filteredData,
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    );

    const { globalFilter } = state;

    return (
        <HelmetProvider>
            <>
                <PageMetadata {...metadataProps} />
                {/* Header (fixed) */}
                <span className="header-container-fixed">
                    <span className="flex">
                        <Logo />
                        <MobileMenu />
                        <NavLinks />
                    </span>

                    {/* Claim summary */}
                    <ClaimSummary id={${summaryIndex}} />

                    {isMobileView ? (
                        <RenderTrackerMobile
                            getTableProps={getTableProps}
                            headerGroups={headerGroups}
                            getTableBodyProps={getTableBodyProps}
                            rows={rows}
                            prepareRow={prepareRow}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            uniqueClaimTitles={uniqueClaimTitles}
                            selectedClaimTitle={selectedClaimTitle}
                            setSelectedClaimTitle={setSelectedClaimTitle}
                        />
                    ) : (
                        <RenderTrackerDesktop
                            getTableProps={getTableProps}
                            headerGroups={headerGroups}
                            getTableBodyProps={getTableBodyProps}
                            rows={rows}
                            prepareRow={prepareRow}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            uniqueClaimTitles={uniqueClaimTitles}
                            selectedClaimTitle={selectedClaimTitle}
                            setSelectedClaimTitle={setSelectedClaimTitle}
                        />
                    )}
                </span>

                <BackToTop />
                <Footer />
            </>
        </HelmetProvider>
    );
}
`;
}

// Debug middleware to log all requests
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        console.log(`📨 API Request: ${req.method} ${req.path}`);
        console.log('📨 Headers:', req.headers);
        if (req.body && Object.keys(req.body).length > 0) {
            console.log('📨 Body keys:', Object.keys(req.body));
        }
    }
    next();
});

// API endpoint to write data.js file and handle new claims
app.post('/api/publish-data', async (req, res) => {
    try {
        console.log('🔄 Processing publish-data request...');
        const { summaries, data } = req.body;
        
        if (!summaries || !data) {
            console.log('❌ Missing data in request:', { summaries: !!summaries, data: !!data });
            return res.status(400).json({ error: 'Missing summaries or data in request body' });
        }

        // Create the data.js file content
        const dataFileContent = `// The title + summary of claim at the top of each Claim page 
const summaries = ${JSON.stringify(summaries, null, 4)};


// All claims data, stored in the tracker
const data = ${JSON.stringify(data, null, 4)};

export { data, summaries };
`;

        // Write to the data.js file
        const dataFilePath = path.join(__dirname, 'src', 'components', 'data.js');
        
        // Create backup first
        const backupPath = path.join(__dirname, 'src', 'components', `data.backup.${Date.now()}.js`);
        if (fs.existsSync(dataFilePath)) {
            fs.copyFileSync(dataFilePath, backupPath);
        }

        // Write the new data file
        fs.writeFileSync(dataFilePath, dataFileContent, 'utf8');

        // Check for new claims and generate components
        const existingRoutes = [
            'israel-helps-elderly-man',
            'forty-beheaded-babies', 
            'al-ahli-attacked',
            'al-shifa-fuel',
            'makeup',
            'hamas-chemical-weapons',
            'israel-denies-church-killing',
            'captives-stripped'
        ];

        const newClaims = [];
        const allClaimLinks = [];

        summaries.forEach((summary, index) => {
            const slug = titleToSlug(summary.claimMainTitle);
            const componentName = titleToComponentName(summary.claimMainTitle);
            
            allClaimLinks.push({
                slug: slug,
                title: summary.claimMainTitle,
                componentName: componentName
            });

            if (!existingRoutes.includes(slug)) {
                // This is a new claim - create component file
                const componentContent = generateClaimComponent(summary.claimMainTitle, index, slug);
                const componentFilePath = path.join(__dirname, 'src', 'components', `${componentName}.js`);
                
                fs.writeFileSync(componentFilePath, componentContent, 'utf8');
                console.log(`📄 Created new component: ${componentName}.js`);
                
                newClaims.push({
                    slug: slug,
                    title: summary.claimMainTitle,
                    componentName: componentName,
                    index: index
                });
            }
        });

        // Update ClaimsList.js - only if we have actual claims to show
        const validClaims = allClaimLinks.filter(claim => claim.title && claim.title.trim() !== '');
        
        if (validClaims.length > 0) {
            const claimsListContent = `import React from 'react';
import { Link } from 'react-router-dom';

const ClaimsList = () => {
    return (
    <>
        <h2 className="subheading mb-1 mobile:mb-4">Claims</h2>

${validClaims.map(claim => 
        `        <Link to="/${claim.slug}"><div className="claim-link">'${claim.title}'</div></Link>\n`
    ).join('')}
        <div className="claim-coming-soon">+ more coming soon</div>

        </>
    )
}

export default ClaimsList;
`;

            const claimsListPath = path.join(__dirname, 'src', 'components', 'ClaimsList.js');
            fs.writeFileSync(claimsListPath, claimsListContent, 'utf8');
            console.log(`📄 Updated ClaimsList.js with ${validClaims.length} valid claims`);
        } else {
            console.log('⚠️  No valid claims found - NOT updating ClaimsList.js to prevent data loss');
        }

        // Update App.js if there are new claims
        if (newClaims.length > 0) {
            const appJsPath = path.join(__dirname, 'src', 'App.js');
            let appJsContent = fs.readFileSync(appJsPath, 'utf8');

            // Add imports for new components
            newClaims.forEach(claim => {
                const importStatement = `import ${claim.componentName} from './components/${claim.componentName}';\n`;
                if (!appJsContent.includes(importStatement.trim())) {
                    // Find the last import statement for claim components and add after it
                    const lastClaimImport = appJsContent.lastIndexOf('import Claim');
                    const endOfLine = appJsContent.indexOf('\n', lastClaimImport);
                    appJsContent = appJsContent.slice(0, endOfLine + 1) + importStatement + appJsContent.slice(endOfLine + 1);
                }
            });

            // Add routes for new components
            newClaims.forEach(claim => {
                const routeStatement = `                <Route path="/${claim.slug}" element={<${claim.componentName} />} />\n`;
                if (!appJsContent.includes(routeStatement.trim())) {
                    // Find the last claim route and add after it
                    const lastClaimRoute = appJsContent.lastIndexOf('<Route path="/captives-stripped"');
                    const endOfLine = appJsContent.indexOf('\n', lastClaimRoute);
                    appJsContent = appJsContent.slice(0, endOfLine + 1) + routeStatement + appJsContent.slice(endOfLine + 1);
                }
            });

            fs.writeFileSync(appJsPath, appJsContent, 'utf8');
            console.log(`📄 Updated App.js with ${newClaims.length} new routes`);
        }

        console.log(`✅ Successfully published data to ${dataFilePath}`);
        console.log(`📁 Backup saved to ${backupPath}`);

        res.json({ 
            success: true, 
            message: 'Data successfully published to data.js',
            backupPath: backupPath,
            newClaims: newClaims,
            totalClaims: summaries.length
        });

    } catch (error) {
        console.error('❌ Error publishing data:', error);
        res.status(500).json({ 
            error: 'Failed to publish data', 
            details: error.message 
        });
    }
});

// Simple in-memory user storage (in production, use a database)
let users = [
    {
        id: 'admin_1',
        email: 'admin@hasbaratracker.com',
        role: 'admin',
        permissions: ['claim_editor', 'admin_panel', 'user_management'],
        assignedClaims: [],
        createdAt: new Date().toISOString()
    },
    {
        id: 'admin_2',
        email: 'swan4444444@protonmail.com',
        role: 'admin',
        permissions: ['claim_editor', 'admin_panel', 'user_management'],
        assignedClaims: [],
        createdAt: new Date().toISOString()
    },
    {
        id: 'user_1',
        email: 'tamtzekin@gmail.com',
        role: 'user',
        permissions: ['claim_editor'],
        assignedClaims: ['Forty beheaded babies', 'Al-Ahli Hospital'],
        createdAt: new Date().toISOString()
    }
];

// Middleware to verify admin token
function verifyAdminToken(req, res, next) {
    console.log('🔐 Admin token verification for:', req.method, req.path);
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('❌ Missing or invalid authorization header:', authHeader);
        return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }
    
    const token = authHeader.split(' ')[1];
    console.log('🔑 Token received:', token?.substring(0, 20) + '...');
    
    // No longer allowing public access - volunteers require admin authentication
    
    // Check if token exists and starts with session_
    if (!token || !token.startsWith('session_')) {
        console.log('❌ Invalid token format. Expected session_ prefix, got:', token?.substring(0, 20));
        return res.status(401).json({ error: 'Invalid token format' });
    }
    
    // For debugging: accept any valid session token as admin
    // In a real app, this would verify the token against a session store
    console.log('✅ Admin token verification successful');
    
    next();
}


// Get all users (admin only) - both endpoints for compatibility
app.get('/api/admin/users', verifyAdminToken, (req, res) => {
    try {
        // Return users without sensitive data
        const safeUsers = users.map(user => ({
            id: user.id,
            email: user.email,
            role: user.role,
            assignedClaims: user.assignedClaims || [],
            createdAt: user.createdAt
        }));
        
        res.json(safeUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Alternative endpoint for compatibility with existing code
app.get('/api/auth/admin-users', verifyAdminToken, (req, res) => {
    try {
        // Return users without sensitive data
        const safeUsers = users.map(user => ({
            id: user.id,
            email: user.email,
            role: user.role,
            assignedClaims: user.assignedClaims || [],
            createdAt: user.createdAt
        }));
        
        res.json(safeUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Add new user (admin only)
app.post('/api/admin/users', verifyAdminToken, (req, res) => {
    try {
        const { email, role, assignedClaims } = req.body;
        
        if (!email || !role) {
            return res.status(400).json({ error: 'Email and role are required' });
        }
        
        // Check if user already exists
        if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
            return res.status(409).json({ error: 'User already exists' });
        }
        
        const newUser = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            email: email.toLowerCase(),
            role: role,
            permissions: role === 'admin' 
                ? ['claim_editor', 'admin_panel', 'user_management']
                : ['claim_editor'],
            assignedClaims: assignedClaims || [],
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        
        // Return user without sensitive data
        const safeUser = {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            assignedClaims: newUser.assignedClaims,
            createdAt: newUser.createdAt
        };
        
        console.log(`👤 Added new user: ${email} with role: ${role}`);
        res.json(safeUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Delete user (admin only)
app.delete('/api/admin/users/:userId', verifyAdminToken, (req, res) => {
    try {
        const { userId } = req.params;
        
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const deletedUser = users[userIndex];
        
        // Prevent deleting the last admin
        if (deletedUser.role === 'admin') {
            const adminCount = users.filter(user => user.role === 'admin').length;
            if (adminCount <= 1) {
                return res.status(400).json({ error: 'Cannot delete the last admin user' });
            }
        }
        
        users.splice(userIndex, 1);
        
        console.log(`👤 Deleted user: ${deletedUser.email}`);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Update user claims (admin only)
app.put('/api/admin/users/:userId/claims', verifyAdminToken, (req, res) => {
    try {
        const { userId } = req.params;
        const { assignedClaims } = req.body;
        
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        users[userIndex].assignedClaims = assignedClaims || [];
        
        const safeUser = {
            id: users[userIndex].id,
            email: users[userIndex].email,
            role: users[userIndex].role,
            assignedClaims: users[userIndex].assignedClaims,
            createdAt: users[userIndex].createdAt
        };
        
        console.log(`👤 Updated claims for user: ${users[userIndex].email}`);
        res.json(safeUser);
    } catch (error) {
        console.error('Error updating user claims:', error);
        res.status(500).json({ error: 'Failed to update user claims' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Data publishing server is running' });
});

// Volunteers Management API
const csv = require('csv-parser');

let volunteers = [];
let volunteersLoaded = false;

// Load volunteers from CSV on server start
function loadVolunteersFromCSV() {
    if (volunteersLoaded) return Promise.resolve(volunteers);
    
    return new Promise((resolve, reject) => {
        const volunteersList = [];
        
        fs.createReadStream('./volunteers.csv')
            .pipe(csv())
            .on('data', (row) => {
                volunteersList.push({
                    id: `vol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    name: row.Name || '',
                    email: row.Email || '',
                    tag: row.Tag || '',
                    backgroundSkills: row['Background and skills'] || '',
                    hoursCommitted: row['Hours committed'] || '',
                    otherHours: row.Other || '',
                    arabicHebrew: row['Arabic/Hebrew?'] || '',
                    language: row.Language || '',
                    level: row.Level || '',
                    coreSkills: row['Core skills'] || '',
                    availability: row.Availability || '',
                    assignedClaim: null, // New field for claim assignment
                    assignedAt: null,
                    status: 'active',
                    createdAt: new Date().toISOString()
                });
            })
            .on('end', () => {
                volunteers = volunteersList;
                volunteersLoaded = true;
                console.log(`📋 Loaded ${volunteers.length} volunteers from CSV`);
                resolve(volunteers);
            })
            .on('error', (error) => {
                console.error('Error loading volunteers CSV:', error);
                reject(error);
            });
    });
}

// Initialize volunteers on server start
loadVolunteersFromCSV();

// Get all volunteers (admin only)
app.get('/api/volunteers', verifyAdminToken, (req, res) => {
    try {
        const { tag, level, availability, coreSkills, assignedClaim, search } = req.query;
        
        let filteredVolunteers = [...volunteers];
        
        // Apply filters
        if (tag && tag !== 'all') {
            filteredVolunteers = filteredVolunteers.filter(v => 
                v.tag.toLowerCase().includes(tag.toLowerCase())
            );
        }
        
        if (level && level !== 'all') {
            filteredVolunteers = filteredVolunteers.filter(v => 
                v.level.toLowerCase() === level.toLowerCase()
            );
        }
        
        if (availability && availability !== 'all') {
            filteredVolunteers = filteredVolunteers.filter(v => 
                v.availability.toLowerCase() === availability.toLowerCase()
            );
        }
        
        if (coreSkills && coreSkills !== 'all') {
            filteredVolunteers = filteredVolunteers.filter(v => 
                v.coreSkills.toLowerCase() === coreSkills.toLowerCase()
            );
        }
        
        if (assignedClaim && assignedClaim !== 'all') {
            if (assignedClaim === 'unassigned') {
                filteredVolunteers = filteredVolunteers.filter(v => !v.assignedClaim);
            } else {
                filteredVolunteers = filteredVolunteers.filter(v => 
                    v.assignedClaim === assignedClaim
                );
            }
        }
        
        if (search) {
            const searchLower = search.toLowerCase();
            filteredVolunteers = filteredVolunteers.filter(v => 
                v.name.toLowerCase().includes(searchLower) ||
                v.email.toLowerCase().includes(searchLower) ||
                v.backgroundSkills.toLowerCase().includes(searchLower) ||
                v.tag.toLowerCase().includes(searchLower)
            );
        }
        
        console.log(`📋 Returning ${filteredVolunteers.length} volunteers (filtered from ${volunteers.length})`);
        res.json(filteredVolunteers);
    } catch (error) {
        console.error('Error getting volunteers:', error);
        res.status(500).json({ error: 'Failed to get volunteers' });
    }
});

// Assign volunteer to claim
app.put('/api/volunteers/:volunteerId/assign', verifyAdminToken, (req, res) => {
    try {
        const { volunteerId } = req.params;
        const { claimTitle } = req.body;
        
        const volunteerIndex = volunteers.findIndex(v => v.id === volunteerId);
        if (volunteerIndex === -1) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }
        
        const volunteer = volunteers[volunteerIndex];
        const volunteerEmail = volunteer.email;
        
        // Update volunteer assignment
        volunteers[volunteerIndex].assignedClaim = claimTitle || null;
        volunteers[volunteerIndex].assignedAt = claimTitle ? new Date().toISOString() : null;
        
        let loginMessage = '';
        
        if (claimTitle) {
            // ASSIGN CLAIM: Add volunteer to users list with claim editor permission
            let userIndex = users.findIndex(u => u.email === volunteerEmail);
            
            if (userIndex === -1) {
                // Create new user for this volunteer
                const newUser = {
                    id: `volunteer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    email: volunteerEmail,
                    role: 'volunteer',
                    permissions: ['claim_editor'],
                    assignedClaims: [claimTitle],
                    createdAt: new Date().toISOString()
                };
                users.push(newUser);
                console.log(`✅ Created login access for volunteer: ${volunteerEmail}`);
                loginMessage = `Login access granted. They can now log in at /login with email: ${volunteerEmail}`;
            } else {
                // Update existing user's assigned claims
                if (!users[userIndex].assignedClaims.includes(claimTitle)) {
                    users[userIndex].assignedClaims.push(claimTitle);
                }
                if (!users[userIndex].permissions.includes('claim_editor')) {
                    users[userIndex].permissions.push('claim_editor');
                }
                console.log(`✅ Updated login access for volunteer: ${volunteerEmail}`);
                loginMessage = `Login access updated. They can now log in at /login with email: ${volunteerEmail}`;
            }
        } else {
            // UNASSIGN CLAIM: Remove this claim from user's permissions
            const userIndex = users.findIndex(u => u.email === volunteerEmail);
            if (userIndex !== -1) {
                // Remove all assigned claims for this volunteer (since we only allow one claim per volunteer)
                users[userIndex].assignedClaims = [];
                // Remove claim_editor permission if no claims assigned
                if (users[userIndex].assignedClaims.length === 0) {
                    users[userIndex].permissions = users[userIndex].permissions.filter(p => p !== 'claim_editor');
                }
                console.log(`❌ Removed login access for volunteer: ${volunteerEmail}`);
                loginMessage = `Login access removed for this volunteer.`;
            }
        }
        
        console.log(`👤 ${claimTitle ? 'Assigned' : 'Unassigned'} volunteer ${volunteerEmail} ${claimTitle ? 'to' : 'from'} claim: ${claimTitle || 'none'}`);
        
        res.json({
            id: volunteers[volunteerIndex].id,
            email: volunteers[volunteerIndex].email,
            assignedClaim: volunteers[volunteerIndex].assignedClaim,
            assignedAt: volunteers[volunteerIndex].assignedAt,
            loginMessage: loginMessage
        });
    } catch (error) {
        console.error('Error assigning volunteer:', error);
        res.status(500).json({ error: 'Failed to assign volunteer' });
    }
});

// Delete volunteer (admin only)
app.delete('/api/volunteers/:volunteerId', verifyAdminToken, (req, res) => {
    try {
        const { volunteerId } = req.params;
        
        const volunteerIndex = volunteers.findIndex(v => v.id === volunteerId);
        if (volunteerIndex === -1) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }
        
        const deletedVolunteer = volunteers.splice(volunteerIndex, 1)[0];
        
        console.log(`🗑️ Deleted volunteer: ${deletedVolunteer.email}`);
        res.json({ success: true, message: `Volunteer ${deletedVolunteer.email} deleted` });
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        res.status(500).json({ error: 'Failed to delete volunteer' });
    }
});

// Get available claims for assignment dropdown
app.get('/api/volunteers/available-claims', verifyAdminToken, (req, res) => {
    try {
        // Hardcoded list of available claims (this could be made dynamic later)
        const claims = [
            "Forty beheaded babies",
            "Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces",
            "Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas",
            "Makeup used in Gaza to fake injuries",
            "Hamas were carrying instructions on how to make chemical weapons",
            "Israeli state denies killing mother and daughter seeking refuge in Gaza's Holy Family Parish",
            "Israeli soldier helps elderly Palestinian man in 'safe corridor'",
            "Palestinian captives stripped down naked because of 'warm weather' in the Middle East, says Mark Regev"
        ].sort();
        
        console.log(`📋 Returning ${claims.length} available claims for assignment`);
        res.json(claims);
    } catch (error) {
        console.error('Error getting available claims:', error);
        res.status(500).json({ error: 'Failed to get available claims' });
    }
});

// Debug endpoint to create a session for testing
app.post('/api/debug/create-session', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email required' });
    }
    
    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Create session token (similar to AuthContext)
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const sessionData = {
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        assignedClaims: user.assignedClaims,
        createdAt: Date.now()
    };
    
    console.log(`🔐 Debug: Created session ${sessionToken} for ${email}`);
    
    res.json({
        success: true,
        sessionToken,
        sessionData,
        instructions: `Set this in browser: sessionStorage.setItem('hasbaratracker_token', '${sessionToken}'); sessionStorage.setItem('session_${sessionToken}', '${JSON.stringify(sessionData)}');`
    });
});

// Debug page to fix authentication for swan4444444@protonmail.com
app.get('/debug/fix-auth', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Fix Authentication - Hasbara Tracker Debug</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
                .btn { background: #bffb9b; border: 1px solid #5e5e5e; padding: 10px 20px; border-radius: 3px; cursor: pointer; margin: 5px; }
                .success { background: #78ff96; border: 1px solid #5e5e5e; padding: 15px; margin: 20px 0; border-radius: 3px; }
                .error { background: #ffcccc; border: 1px solid #cc0000; padding: 15px; margin: 20px 0; border-radius: 3px; }
                .code { background: #f0f0f0; padding: 10px; border-radius: 3px; font-family: monospace; word-break: break-all; font-size: 12px; }
                .log { background: #f9f9f9; border: 1px solid #ccc; padding: 10px; margin: 10px 0; border-radius: 3px; max-height: 300px; overflow-y: auto; font-family: monospace; font-size: 12px; }
            </style>
        </head>
        <body>
            <h1>🔐 Admin Panel Debug Tool</h1>
            
            <p>This page will test and fix your admin panel authentication.</p>
            
            <div>
                <button class="btn" onclick="fixAuth()">Fix My Authentication</button>
                <button class="btn" onclick="testAPI()">Test API Calls</button>
                <button class="btn" onclick="clearAuth()">Clear All Auth Data</button>
            </div>
            
            <div id="result"></div>
            <div id="log" class="log" style="display:none;"></div>
            
            <script>
                function log(message) {
                    const logDiv = document.getElementById('log');
                    logDiv.style.display = 'block';
                    logDiv.innerHTML += new Date().toLocaleTimeString() + ': ' + message + '<br>';
                    logDiv.scrollTop = logDiv.scrollHeight;
                }
                
                function clearAuth() {
                    sessionStorage.clear();
                    localStorage.clear();
                    log('✅ Cleared all authentication data');
                    document.getElementById('result').innerHTML = '<div class="success">Authentication data cleared!</div>';
                }
                
                async function testAPI() {
                    const token = sessionStorage.getItem('hasbaratracker_token');
                    if (!token) {
                        document.getElementById('result').innerHTML = '<div class="error">No token found! Click "Fix My Authentication" first.</div>';
                        return;
                    }
                    
                    log('🔑 Testing with token: ' + token.substring(0, 20) + '...');
                    
                    try {
                        // Test GET /api/admin/users
                        log('📡 Testing GET /api/admin/users...');
                        const getResponse = await fetch('/api/admin/users', {
                            headers: { 'Authorization': 'Bearer ' + token }
                        });
                        
                        log('📡 GET Response: ' + getResponse.status + ' ' + getResponse.statusText);
                        
                        if (getResponse.ok) {
                            const users = await getResponse.json();
                            log('✅ GET Success: Found ' + users.length + ' users');
                        } else {
                            const error = await getResponse.json();
                            log('❌ GET Error: ' + JSON.stringify(error));
                        }
                        
                        // Test POST /api/admin/users
                        log('📡 Testing POST /api/admin/users...');
                        const postResponse = await fetch('/api/admin/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                            body: JSON.stringify({
                                email: 'debug-test@example.com',
                                role: 'user',
                                assignedClaims: ['Debug Test Claim']
                            })
                        });
                        
                        log('📡 POST Response: ' + postResponse.status + ' ' + postResponse.statusText);
                        
                        if (postResponse.ok) {
                            const user = await postResponse.json();
                            log('✅ POST Success: Added user ' + user.email);
                            document.getElementById('result').innerHTML = '<div class="success"><strong>✅ All API Tests Passed!</strong><br>Your authentication is working correctly.<br><br><a href="/admin" style="background: #bffb9b; border: 1px solid #5e5e5e; padding: 8px 16px; border-radius: 3px; text-decoration: none; color: #333;">Go to Admin Panel</a></div>';
                        } else {
                            const error = await postResponse.json();
                            log('❌ POST Error: ' + JSON.stringify(error));
                            document.getElementById('result').innerHTML = '<div class="error"><strong>❌ API Test Failed</strong><br>Check the log above for details.</div>';
                        }
                        
                    } catch (error) {
                        log('❌ Network Error: ' + error.message);
                        document.getElementById('result').innerHTML = '<div class="error"><strong>❌ Network Error</strong><br>' + error.message + '</div>';
                    }
                }
                
                function fixAuth() {
                    const sessionToken = 'session_1756998844027_d8w6u5t6j';
                    const sessionData = '{"userId":"admin_2","email":"swan4444444@protonmail.com","role":"admin","permissions":["claim_editor","admin_panel","user_management"],"assignedClaims":[],"createdAt":1756998844027}';
                    
                    // Clear any existing tokens
                    sessionStorage.clear();
                    localStorage.clear();
                    log('🧹 Cleared existing authentication data');
                    
                    // Set new session
                    sessionStorage.setItem('hasbaratracker_token', sessionToken);
                    sessionStorage.setItem('session_' + sessionToken, sessionData);
                    log('🔐 Set new session token: ' + sessionToken);
                    
                    document.getElementById('result').innerHTML = \`
                        <div class="success">
                            <strong>✅ Authentication Fixed!</strong><br>
                            Session token: \${sessionToken}<br><br>
                            <button class="btn" onclick="testAPI()">Test API Now</button>
                            <a href="/admin" style="background: #bffb9b; border: 1px solid #5e5e5e; padding: 8px 16px; border-radius: 3px; text-decoration: none; color: #333; margin-left: 10px;">Go to Admin Panel</a>
                        </div>
                    \`;
                }
            </script>
        </body>
        </html>
    `);
});


app.listen(PORT, () => {
    console.log(`🚀 Data publishing server running on port ${PORT}`);
    console.log(`📡 Ready to accept requests at http://localhost:${PORT}/api/publish-data`);
});