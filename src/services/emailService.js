// Email service for sending secure authentication emails
// Uses Cloudflare Workers with Resend for maximum security

const EMAIL_CONFIG = {
    workerUrl: process.env.REACT_APP_WORKER_URL || 'https://email-worker.izumi-ky.workers.dev',
    apiKey: process.env.REACT_APP_CLOUDFLARE_API_KEY || '',
};

// Email templates
const EMAIL_TEMPLATES = {
    magicLink: (email, magicLink, expirationMinutes = 15) => ({
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
                            ⚠️ <strong>Important:</strong> This link will expire in ${expirationMinutes} minutes for security reasons.
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

⚠️ Important: This link will expire in ${expirationMinutes} minutes for security reasons.

If you didn't request this login link, you can safely ignore this email.

Stay secure - never share this link with anyone else.

---
Hasbara Tracker Authentication System
        `
    })
};

// Cloudflare Workers email service
const cloudflareEmailService = {
    sendEmail: async (to, subject, html, text) => {
        try {
            const response = await fetch(EMAIL_CONFIG.workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${EMAIL_CONFIG.apiKey}`
                },
                body: JSON.stringify({
                    to,
                    subject,
                    html,
                    text,
                    from: 'auth@hasbaratracker.com'
                })
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Failed to send email via Cloudflare: ${error.message}`);
        }
    }
};

// Email service implementation

// Main email service
export const emailService = {
    sendMagicLink: async (email, magicLink) => {
        const template = EMAIL_TEMPLATES.magicLink(email, magicLink);
        
        // Only allow Cloudflare service for security
        const service = cloudflareEmailService;
        
        try {
            const result = await service.sendEmail(
                email,
                template.subject,
                template.html,
                template.text
            );
            
            return {
                success: true,
                provider: 'cloudflare',
                messageId: result.messageId || result.id,
                message: 'Magic link sent successfully'
            };
            
        } catch (error) {
            throw error;
        }
    },
    
    // Get current configuration
    getConfig: () => ({
        service: 'cloudflare',
        configured: !!EMAIL_CONFIG.workerUrl && !!EMAIL_CONFIG.apiKey
    })
};

export default emailService;