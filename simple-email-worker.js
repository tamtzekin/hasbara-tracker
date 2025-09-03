// Simple Cloudflare Worker to handle email sending without admin verification
export default {
    async fetch(request, env, ctx) {
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };
        
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }
        
        // Only handle POST requests to root path
        if (request.method !== 'POST' || new URL(request.url).pathname !== '/') {
            return new Response('Not Found', { 
                status: 404, 
                headers: corsHeaders 
            });
        }
        
        try {
            // Verify API key
            const authHeader = request.headers.get('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
            
            const apiKey = authHeader.replace('Bearer ', '');
            if (apiKey !== env.CLOUDFLARE_API_KEY) {
                return new Response(JSON.stringify({ error: 'Invalid API key' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
            
            // Get email data
            const { to, subject, html, text, from } = await request.json();
            
            // Simple email validation - just check if it's your email
            if (to !== 'swan4444444@protonmail.com') {
                return new Response(JSON.stringify({ 
                    error: 'Email not found or not approved for access' 
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
            
            // Send email via Resend
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: from || 'auth@hasbaratracker.com',
                    to: [to],
                    subject,
                    html,
                    text
                }),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(`Resend API error: ${result.message || 'Unknown error'}`);
            }
            
            return new Response(JSON.stringify({
                success: true,
                messageId: result.id,
                message: 'Email sent successfully'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
            
        } catch (error) {
            console.error('Worker error:', error);
            return new Response(JSON.stringify({
                error: 'Failed to send email',
                message: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }
    }
};