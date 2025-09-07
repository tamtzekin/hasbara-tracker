// Email Worker with Service Bindings

export default {
  async fetch(request, env, ctx) {
    // Handle preflight OPTIONS requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const { to, subject, html, text, from } = await request.json();
      console.log(`🔍 Magic link request for: ${to}`);

      // Check if user is admin first
      const isAdmin = await checkAdminApproval(to, env);
      console.log(`👑 Admin check for ${to}: ${isAdmin}`);

      if (isAdmin) {
        console.log(`📧 Sending admin magic link to: ${to}`);
        const emailResult = await sendEmail({
          to, subject, html, text,
          from: from || 'auth@hasbaratracker.com'
        }, env);

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Magic link sent successfully (admin)',
          messageId: emailResult.messageId 
        }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Check if user is approved using Service Binding
      const isApprovedUser = await checkUserApprovalViaBinding(to, env);
      console.log(`👤 User approval check for ${to}: ${isApprovedUser}`);

      if (!isApprovedUser) {
        console.log(`❌ User ${to} not approved for access`);
        return new Response(
          JSON.stringify({ error: 'This user does not have access to the tracker. Please contact info@hasbaratracker.com.' }),
          { 
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }

      // Send email to approved user
      console.log(`📧 Sending user magic link to: ${to}`);
      const emailResult = await sendEmail({
        to, subject, html, text,
        from: from || 'auth@hasbaratracker.com'
      }, env);

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Magic link sent successfully (user)',
        messageId: emailResult.messageId 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

    } catch (error) {
      console.error('❌ Email worker error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email', 
          details: error.message 
        }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
  }
};

// Check admin approval from environment variables
async function checkAdminApproval(email, env) {
  try {
    const adminEmails = env.ADMIN_EMAILS || 'admin@hasbaratracker.com,swan4444444@protonmail.com';
    const emailList = adminEmails.split(',').map(e => e.trim().toLowerCase());
    const isAdmin = emailList.includes(email.toLowerCase());
    console.log(`🔧 Admin emails configured: [${emailList.join(', ')}]`);
    console.log(`👑 Admin check result for ${email}: ${isAdmin}`);
    return isAdmin;
  } catch (error) {
    console.error('❌ Error checking admin approval:', error);
    return false;
  }
}

// Check if user is approved using Service Binding
async function checkUserApprovalViaBinding(email, env) {
  try {
    console.log(`🔗 Using Service Binding to check user: ${email}`);
    
    // Check if Service Binding is available
    if (!env.USER_BACKEND) {
      console.error('❌ USER_BACKEND Service Binding not found');
      console.log('💡 Make sure to configure Service Binding in dashboard: Variable name "USER_BACKEND" → Service "user-backend"');
      return false;
    }

    console.log('✅ Service Binding found, calling user-backend worker...');

    // Call the user-backend worker via Service Binding
    const request = new Request('https://dummy-url/api/approved-users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'email-worker-service-binding'
      }
    });

    // Use the Service Binding to call user-backend worker
    const response = await env.USER_BACKEND.fetch(request);
    
    console.log(`📨 Service Binding response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Service Binding call failed: ${response.status}`);
      console.error(`❌ Error response: ${errorText}`);
      return false;
    }

    const data = await response.json();
    console.log(`📧 Service Binding returned:`, JSON.stringify(data));
    
    const approvedEmails = data.emails || [];
    const isApproved = approvedEmails.includes(email.toLowerCase());
    
    console.log(`📧 Approved emails from binding: [${approvedEmails.join(', ')}]`);
    console.log(`✅ User ${email} approved via Service Binding: ${isApproved}`);
    
    return isApproved;

  } catch (error) {
    console.error('❌ Service Binding error:', error.message);
    console.error('❌ Stack trace:', error.stack);
    return false;
  }
}

// Send email using Resend
async function sendEmail(emailData, env) {
  console.log('📧 Sending email via Resend to:', emailData.to);
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: emailData.from,
      to: [emailData.to],
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text
    }),
  });
  
  const result = await response.json();
  console.log('📧 Resend API response status:', response.status);
  
  if (!response.ok) {
    console.error('❌ Resend API error:', result);
    throw new Error(`Resend API error: ${result.message || 'Unknown error'}`);
  }
  
  console.log('✅ Email sent successfully via Resend');
  return {
    success: true,
    messageId: result.id
  };
}