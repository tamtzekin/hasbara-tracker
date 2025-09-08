// User Backend Worker - Clean version for Service Bindings

// In-memory storage for volunteer assignments
const VOLUNTEER_ASSIGNMENTS = {
  "tamtzekin@gmail.com": {
    assignedClaims: [
      "Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces",
      "Israeli soldier helps elderly Palestinian man in 'safe corridor'"
    ], // Updated based on current Volunteer Manager assignments (2 claims as of latest sync)
    role: "user",
    permissions: ["claim_editor"]
  },
  // Add more users as needed
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Worker-Secret, User-Agent',
    };

    // Handle preflight OPTIONS requests
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    console.log(`📨 ${method} ${path} - Headers:`, Object.fromEntries(request.headers.entries()));

    try {
      // Route handling
      if (path === '/api/volunteers' && method === 'GET') {
        console.log('🎯 Matched /api/volunteers route');
        return handleGetVolunteers(request, env);
      }
      
      if (path === '/api/approved-users' && method === 'GET') {
        return handleApprovedUsers(request);
      }

      if (path.startsWith('/api/user-assignments/') && method === 'GET') {
        const email = decodeURIComponent(path.split('/api/user-assignments/')[1]);
        return handleUserAssignments(email, request);
      }

      if (path === '/api/sync-assignments' && method === 'POST') {
        return handleSyncAssignments(request, env);
      }

      if (path.startsWith('/api/volunteers/') && path.endsWith('/assign') && method === 'PUT') {
        const volunteerId = path.split('/api/volunteers/')[1].split('/assign')[0];
        return handleAssignVolunteer(request, volunteerId);
      }

      // Volunteers API endpoint moved to top for priority

      if (path === '/api/volunteers/available-claims' && method === 'GET') {
        return handleGetAvailableClaims(request);
      }

<<<<<<< Updated upstream:user-backend.js
=======
      if (path.startsWith('/api/volunteers/') && method === 'DELETE') {
        const volunteerId = path.split('/api/volunteers/')[1];
        return handleDeleteVolunteer(request, volunteerId, env);
      }

>>>>>>> Stashed changes:user-backend-worker-clean.js
      // Debug Google Sheets auth endpoint
      if (path === '/debug-sheets' && method === 'GET') {
        return handleDebugSheets(env);
      }

      // Health check endpoint
      if (path === '/health' || path === '/') {
        return new Response(JSON.stringify({ 
          status: 'ok', 
          message: 'User Backend API',
          timestamp: new Date().toISOString(),
          assignments: Object.keys(VOLUNTEER_ASSIGNMENTS)
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // 404 for unknown endpoints
      console.log(`❌ Unknown endpoint: ${method} ${path}`);
      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } catch (error) {
      console.error('❌ Worker error:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};

// Handle /api/approved-users
function handleApprovedUsers(request) {
  console.log('📧 Getting approved users list');
  console.log('📧 Request from:', request.headers.get('User-Agent') || 'unknown');
  
  // Return all emails that have assignments
  const approvedEmails = Object.keys(VOLUNTEER_ASSIGNMENTS).map(email => email.toLowerCase());
  
  console.log(`📧 Returning ${approvedEmails.length} approved emails: [${approvedEmails.join(', ')}]`);
  
  const response = {
    emails: approvedEmails,
    count: approvedEmails.length,
    timestamp: new Date().toISOString(),
    requestSource: request.headers.get('User-Agent') || 'unknown'
  };
  
  return new Response(JSON.stringify(response), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, User-Agent'
    }
  });
}

// Handle /api/user-assignments/:email
function handleUserAssignments(email, request) {
  console.log(`📧 CLOUDFLARE-WORKER: Getting assignments for: ${email}`);
  console.log('📧 CLOUDFLARE-WORKER: Request from:', request.headers.get('User-Agent') || 'unknown');
  console.log(`📋 CLOUDFLARE-WORKER: Available users in VOLUNTEER_ASSIGNMENTS:`, Object.keys(VOLUNTEER_ASSIGNMENTS));
  
  const assignments = VOLUNTEER_ASSIGNMENTS[email.toLowerCase()];
  
  if (!assignments) {
    console.log(`❌ CLOUDFLARE-WORKER: No assignments found for: ${email}`);
    console.log(`📋 CLOUDFLARE-WORKER: Available emails:`, Object.keys(VOLUNTEER_ASSIGNMENTS));
    return new Response(JSON.stringify({ 
      assignments: {
        email: email.toLowerCase(),
        assignedClaims: []
      },
      message: 'User not found or no assignments' 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  console.log(`✅ CLOUDFLARE-WORKER: User ${email} has ${assignments.assignedClaims.length} assignments:`);
  console.log(`📋 CLOUDFLARE-WORKER: Claims list:`, assignments.assignedClaims);
  
  return new Response(JSON.stringify({ 
    assignments,
    timestamp: new Date().toISOString(),
    requestSource: request.headers.get('User-Agent') || 'unknown'
  }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

// Handle assignment synchronization from Volunteer Manager
async function handleSyncAssignments(request, env) {
  // CORS headers for this function
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Worker-Secret, User-Agent',
  };
  
  try {
    console.log('🔄 CLOUDFLARE-WORKER: Received sync assignments request');
    
    const body = await request.json();
    const { email, assignedClaims, action, secretKey } = body;
    
    console.log(`🔄 CLOUDFLARE-WORKER: Sync request for ${email}, action: ${action}`);
    console.log(`📋 CLOUDFLARE-WORKER: New assignments:`, assignedClaims);
    
    // Verify secret key (you can set this as an environment variable)
    const expectedSecret = env.SYNC_SECRET || 'hasbara-sync-secret-2025';
    if (secretKey !== expectedSecret) {
      console.log('❌ CLOUDFLARE-WORKER: Invalid secret key for sync request');
      return new Response(JSON.stringify({ 
        error: 'Unauthorized sync request' 
      }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }
    
    if (!email) {
      console.log('❌ CLOUDFLARE-WORKER: No email provided in sync request');
      return new Response(JSON.stringify({ 
        error: 'Email is required' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }
    
    const emailKey = email.toLowerCase();
    
    // Update assignments in worker memory
    if (assignedClaims && assignedClaims.length > 0) {
      VOLUNTEER_ASSIGNMENTS[emailKey] = {
        assignedClaims: [...assignedClaims],
        role: "user",
        permissions: ["claim_editor"]
      };
      console.log(`✅ CLOUDFLARE-WORKER: Updated assignments for ${email}:`, VOLUNTEER_ASSIGNMENTS[emailKey].assignedClaims);
    } else {
      // Remove user if no assignments
      delete VOLUNTEER_ASSIGNMENTS[emailKey];
      console.log(`❌ CLOUDFLARE-WORKER: Removed assignments for ${email} (no claims)`);
    }
    
    console.log(`📊 CLOUDFLARE-WORKER: Total users with assignments: ${Object.keys(VOLUNTEER_ASSIGNMENTS).length}`);
    
    return new Response(JSON.stringify({
      success: true,
      message: `Assignments synced for ${email}`,
      assignedClaims: VOLUNTEER_ASSIGNMENTS[emailKey]?.assignedClaims || [],
      timestamp: new Date().toISOString()
    }), {
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
    
  } catch (error) {
    console.error('❌ CLOUDFLARE-WORKER: Sync error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to sync assignments',
      details: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }
}

// NEW: Handle get all volunteers from Google Sheets
async function handleGetVolunteers(request, env) {
  try {
    console.log('📋 Getting all volunteers from Google Sheets');
    
    const volunteers = await fetchVolunteersFromSheets(env);
    
    // Add assignment data to each volunteer
    const volunteersWithAssignments = volunteers.map(volunteer => ({
      ...volunteer,
      assignedClaims: VOLUNTEER_ASSIGNMENTS[volunteer.email?.toLowerCase()]?.assignedClaims || []
    }));
    
    return new Response(JSON.stringify(volunteersWithAssignments), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('❌ Error getting volunteers:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get volunteers',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// NEW: Handle get available claims
async function handleGetAvailableClaims(request) {
  try {
    console.log('📋 Getting available claims');
    
    // Return all possible claims that can be assigned
    const availableClaims = [
      "Forty beheaded babies",
      "Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces",
      "Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas",
      "Makeup used in Gaza to fake injuries",
      "Israeli state denies killing mother and daughter seeking refuge in Gaza's Holy Family Parish",
      "Hamas were carrying instructions on how to make chemical weapons",
      "Israeli soldier helps elderly Palestinian man in 'safe corridor'",
      "Palestinian captives stripped down naked because of 'warm weather' in the Middle East, says Mark Regev"
    ];
    
    return new Response(JSON.stringify(availableClaims), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('❌ Error getting available claims:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get available claims',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

=======
// Handle delete volunteer - removes from Google Sheets and in-memory assignments
async function handleDeleteVolunteer(request, volunteerId, env) {
  try {
    console.log(`🗑️ [DEBUG] Delete request received for volunteer ID: ${volunteerId}`);
    console.log(`🗑️ [DEBUG] Request method: ${request.method}`);
    console.log(`🗑️ [DEBUG] Request URL: ${request.url}`);
    
    // First, get all volunteers to find the one to delete
    console.log(`🗑️ [DEBUG] Fetching volunteers from sheets to find volunteer with ID: ${volunteerId}`);
    const volunteers = await fetchVolunteersFromSheets(env);
    console.log(`🗑️ [DEBUG] Total volunteers fetched: ${volunteers.length}`);
    console.log(`🗑️ [DEBUG] First few volunteer IDs:`, volunteers.slice(0, 3).map(v => ({ id: v.id, name: v.name })));
    
    const volunteerToDelete = volunteers.find(v => v.id === volunteerId);
    console.log(`🗑️ [DEBUG] Volunteer search result:`, volunteerToDelete ? 
      { found: true, id: volunteerToDelete.id, name: volunteerToDelete.name, email: volunteerToDelete.email } : 
      { found: false, searchedId: volunteerId });
    
    if (!volunteerToDelete) {
      console.log(`🗑️ [DEBUG] Volunteer not found - returning 404`);
      return new Response(JSON.stringify({ 
        error: 'Volunteer not found',
        volunteerId: volunteerId,
        debug: {
          availableVolunteerIds: volunteers.map(v => v.id),
          searchedFor: volunteerId
        }
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    console.log(`🗑️ [DEBUG] Found volunteer to delete: ${volunteerToDelete.name} (${volunteerToDelete.email})`);

    // Delete from Google Sheets by finding and removing the row
    console.log(`🗑️ [DEBUG] Starting Google Sheets deletion process...`);
    await deleteVolunteerFromSheets(volunteerToDelete, env);
    console.log(`🗑️ [DEBUG] Google Sheets deletion completed successfully`);
    
    // Remove from in-memory assignments if they exist
    const volunteerEmail = volunteerToDelete.email?.toLowerCase();
    console.log(`🗑️ [DEBUG] Checking in-memory assignments for email: ${volunteerEmail}`);
    if (volunteerEmail && VOLUNTEER_ASSIGNMENTS[volunteerEmail]) {
      delete VOLUNTEER_ASSIGNMENTS[volunteerEmail];
      console.log(`🗑️ [DEBUG] Removed volunteer ${volunteerEmail} from in-memory assignments`);
    } else {
      console.log(`🗑️ [DEBUG] No in-memory assignments found for ${volunteerEmail}`);
    }
    
    console.log(`🗑️ [DEBUG] Delete operation completed successfully - sending response`);
    return new Response(JSON.stringify({ 
      success: true, 
      message: `Volunteer ${volunteerToDelete.name} deleted successfully from database and assignments`,
      deletedVolunteer: {
        id: volunteerToDelete.id,
        name: volunteerToDelete.name,
        email: volunteerToDelete.email
      },
      debug: {
        deletionTimestamp: new Date().toISOString(),
        sheetsDeleted: true,
        memoryDeleted: true
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('❌ [DEBUG] Error deleting volunteer:', error);
    console.error('❌ [DEBUG] Error stack:', error.stack);
    return new Response(JSON.stringify({ 
      error: 'Failed to delete volunteer',
      details: error.message,
      debug: {
        errorType: error.constructor.name,
        errorMessage: error.message,
        volunteerId: volunteerId,
        timestamp: new Date().toISOString()
      }
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

>>>>>>> Stashed changes:user-backend-worker-clean.js
// Handle volunteer assignment
async function handleAssignVolunteer(request, volunteerId) {
  try {
    const body = await request.json();
    const { claimTitle } = body;
    
    console.log(`👤 Assignment request for volunteer ID: ${volunteerId}, claim: ${claimTitle}`);
    
    // TODO: This is a hardcoded mapping for testing - in production you'd look up by volunteer ID
    // You might want to maintain a VOLUNTEER_ID_TO_EMAIL mapping or query a database
    let email = 'tamtzekin@gmail.com'; // Default for testing
    
    // Example of how you might handle multiple volunteers:
    // const volunteerIdMapping = {
    //   'vol_1757129093187_f5v39pqbj': 'tamtzekin@gmail.com',
    //   'vol_other_id': 'other@email.com'
    // };
    // email = volunteerIdMapping[volunteerId] || 'tamtzekin@gmail.com';
    
    if (!VOLUNTEER_ASSIGNMENTS[email]) {
      VOLUNTEER_ASSIGNMENTS[email] = {
        assignedClaims: [],
        role: "user",
        permissions: ["claim_editor"]
      };
    }
    
    if (claimTitle && claimTitle !== 'none') {
      if (!VOLUNTEER_ASSIGNMENTS[email].assignedClaims.includes(claimTitle)) {
        VOLUNTEER_ASSIGNMENTS[email].assignedClaims.push(claimTitle);
      }
      console.log(`✅ Assigned ${email} to claim: ${claimTitle}`);
    } else {
      // Remove assignment
      VOLUNTEER_ASSIGNMENTS[email].assignedClaims = [];
      console.log(`❌ Removed all assignments for: ${email}`);
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: claimTitle && claimTitle !== 'none' ? `Volunteer assigned to: ${claimTitle}` : 'Assignments removed',
      assignments: VOLUNTEER_ASSIGNMENTS[email]
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('❌ Assignment error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process assignment',
      details: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Debug Google Sheets authentication
async function handleDebugSheets(env) {
  try {
    console.log('🔍 Debug: Checking Google Sheets authentication...');
    
    const hasEmail = !!env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const hasKey = !!env.GOOGLE_PRIVATE_KEY;
    const hasProject = !!env.GOOGLE_PROJECT_ID;
    
    const result = {
      environment_variables: {
        GOOGLE_SERVICE_ACCOUNT_EMAIL: hasEmail ? 'SET' : 'MISSING',
        GOOGLE_PRIVATE_KEY: hasKey ? 'SET' : 'MISSING', 
        GOOGLE_PROJECT_ID: hasProject ? 'SET' : 'MISSING'
      },
      service_account_email: hasEmail ? env.GOOGLE_SERVICE_ACCOUNT_EMAIL : 'NOT_SET',
      project_id: hasProject ? env.GOOGLE_PROJECT_ID : 'NOT_SET'
    };
    
    if (hasEmail && hasKey && hasProject) {
      try {
        const accessToken = await getGoogleAccessToken(env);
        result.auth_test = 'SUCCESS - Got access token';
        result.token_preview = accessToken ? accessToken.substring(0, 20) + '...' : 'No token';
      } catch (error) {
        result.auth_test = 'FAILED';
        result.auth_error = error.message;
      }
    } else {
      result.auth_test = 'SKIPPED - Missing environment variables';
    }
    
    return new Response(JSON.stringify(result, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      debug_error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Google Sheets API Integration
async function fetchVolunteersFromSheets(env) {
  try {
    // Get access token using service account credentials
    const accessToken = await getGoogleAccessToken(env);
    
    // Your Google Sheet ID from the URL
    const SHEET_ID = '1UT-5alGbbykgkvMgjR8lCFHq17p-lneQAXYKZysMOGg';
    const RANGE = 'Master!A:L'; // Get all data from Master sheet, columns A to L
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }
    
    const data = await response.json();
    const rows = data.values;
    
    if (!rows || rows.length === 0) {
      return [];
    }
    
    // First row is headers
    const headers = rows[0];
    const volunteers = [];
    
    // Process each row (skip header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const volunteer = {
        id: `vol_${i}`,
        name: row[0] || '',
        email: row[1] || '',
        location: row[2] || '',
        tag: row[3] || '',
        backgroundSkills: row[4] || '',
        hoursCommitted: row[5] || '',
        otherHours: row[6] || '',
        arabicHebrew: row[7] || '',
        language: row[8] || '',
        level: row[9] || '',
        coreSkills: row[10] || '',
        availability: row[11] || ''
      };
      volunteers.push(volunteer);
    }
    
    console.log(`✅ Fetched ${volunteers.length} volunteers from Google Sheets`);
    return volunteers;
    
  } catch (error) {
    console.error('❌ Error fetching from Google Sheets:', error);
    throw error;
  }
}

// Delete a volunteer from Google Sheets by finding and removing their row
async function deleteVolunteerFromSheets(volunteerToDelete, env) {
  try {
    console.log(`🗑️ [SHEETS-DEBUG] Starting deletion for volunteer: ${volunteerToDelete.name} (${volunteerToDelete.email})`);
    
    console.log(`🗑️ [SHEETS-DEBUG] Getting Google access token...`);
    const accessToken = await getGoogleAccessToken(env);
    console.log(`🗑️ [SHEETS-DEBUG] Access token obtained: ${accessToken ? 'Yes' : 'No'}`);
    
    const SHEET_ID = '1UT-5alGbbykgkvMgjR8lCFHq17p-lneQAXYKZysMOGg';
    console.log(`🗑️ [SHEETS-DEBUG] Using sheet ID: ${SHEET_ID}`);
    
    // First, get all data to find the row number
    const RANGE = 'Master!A:L';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}`;
    console.log(`🗑️ [SHEETS-DEBUG] Fetching data from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`🗑️ [SHEETS-DEBUG] Fetch response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🗑️ [SHEETS-DEBUG] Fetch error response:`, errorText);
      throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    const rows = data.values || [];
    console.log(`🗑️ [SHEETS-DEBUG] Total rows received: ${rows.length}`);
    console.log(`🗑️ [SHEETS-DEBUG] First few rows:`, rows.slice(0, 3).map((row, i) => `Row ${i}: ${row[0]} | ${row[1]}`));
    
    // Find the row to delete (skip header row, so start from index 1)
    let rowToDelete = -1;
    console.log(`🗑️ [SHEETS-DEBUG] Searching for volunteer: name="${volunteerToDelete.name}", email="${volunteerToDelete.email}"`);
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      console.log(`🗑️ [SHEETS-DEBUG] Checking row ${i + 1}: name="${row[0]}", email="${row[1]}"`);
      
      // Match by name and email to ensure we're deleting the right volunteer
      if (row[0] === volunteerToDelete.name && row[1] === volunteerToDelete.email) {
        rowToDelete = i + 1; // Google Sheets uses 1-based indexing
        console.log(`🗑️ [SHEETS-DEBUG] MATCH FOUND at row ${rowToDelete}!`);
        break;
      }
    }
    
    if (rowToDelete === -1) {
      console.error(`🗑️ [SHEETS-DEBUG] No matching row found. Available rows:`, 
        rows.slice(1, 6).map((row, i) => `Row ${i + 2}: "${row[0]}" | "${row[1]}"`));
      throw new Error(`Could not find volunteer ${volunteerToDelete.name} (${volunteerToDelete.email}) in spreadsheet`);
    }
    
    console.log(`🗑️ [SHEETS-DEBUG] Found volunteer at row ${rowToDelete}, preparing delete request...`);
    
    // Delete the row using batchUpdate API
    const deleteUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`;
    console.log(`🗑️ [SHEETS-DEBUG] Delete URL: ${deleteUrl}`);
    
    const deleteRequest = {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: 0, // Master sheet ID (usually 0 for first sheet)
            dimension: 'ROWS',
            startIndex: rowToDelete - 1, // 0-based for API
            endIndex: rowToDelete // 0-based, exclusive end
          }
        }
      }]
    };
    
    console.log(`🗑️ [SHEETS-DEBUG] Delete request payload:`, JSON.stringify(deleteRequest, null, 2));
    
    const deleteResponse = await fetch(deleteUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deleteRequest)
    });
    
    console.log(`🗑️ [SHEETS-DEBUG] Delete response status: ${deleteResponse.status} ${deleteResponse.statusText}`);
    
    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      console.error(`🗑️ [SHEETS-DEBUG] Delete error response:`, JSON.stringify(errorData, null, 2));
      throw new Error(`Failed to delete row from Google Sheets: ${JSON.stringify(errorData)}`);
    }
    
    const successData = await deleteResponse.json();
    console.log(`🗑️ [SHEETS-DEBUG] Delete success response:`, JSON.stringify(successData, null, 2));
    console.log(`✅ [SHEETS-DEBUG] Successfully deleted volunteer ${volunteerToDelete.name} from Google Sheets (row ${rowToDelete})`);
    
  } catch (error) {
    console.error('❌ [SHEETS-DEBUG] Error deleting from Google Sheets:', error);
    console.error('❌ [SHEETS-DEBUG] Error stack:', error.stack);
    throw error;
  }
}

async function getGoogleAccessToken(env) {
  try {
    // Service account credentials from environment variables
    const serviceAccount = {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Fix newlines
      project_id: env.GOOGLE_PROJECT_ID
    };
    
    if (!serviceAccount.client_email || !serviceAccount.private_key) {
      throw new Error('Missing Google service account credentials in environment variables');
    }
    
    // Create JWT
    const now = Math.floor(Date.now() / 1000);
    const jwt = await createJWT({
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    }, serviceAccount.private_key);
    
    // Exchange JWT for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt
      })
    });
    
    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      throw new Error(`Token exchange failed: ${error}`);
    }
    
    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
    
  } catch (error) {
    console.error('❌ Error getting Google access token:', error);
    throw error;
  }
}

async function createJWT(payload, privateKey) {
  // Simple JWT creation for Cloudflare Workers
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  
  const encodedHeader = btoa(JSON.stringify(header)).replace(/[+/]/g, (m) => ({ '+': '-', '/': '_' })[m]).replace(/=/g, '');
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/[+/]/g, (m) => ({ '+': '-', '/': '_' })[m]).replace(/=/g, '');
  
  const data = `${encodedHeader}.${encodedPayload}`;
  
  // Import private key
  const keyData = privateKey.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\s+/g, '');
  const keyBuffer = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyBuffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256'
    },
    false,
    ['sign']
  );
  
  // Sign the data
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(data)
  );
  
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/[+/]/g, (m) => ({ '+': '-', '/': '_' })[m])
    .replace(/=/g, '');
  
  return `${data}.${encodedSignature}`;
}