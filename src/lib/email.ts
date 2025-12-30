// Email service utility using Resend
import { Resend } from 'resend';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { contentRepository } from '@/lib/repositories';

// Initialize Resend client (only if API key is available)
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

// Get recipient email from contact info or use fallback
export async function getRecipientEmail(): Promise<string> {
  try {
    await ensureDatabaseConnection();
    const content = await contentRepository.findOne();
    
    if (content?.contact?.info?.email) {
      const email = content.contact.info.email;
      if (email && typeof email === 'string' && email.trim() !== '') {
        return email.trim();
      }
    }
  } catch (error) {
    console.error('Error fetching contact email:', error);
  }

  // Fallback to default email
  return 'support@trust2switch.com';
}

// Admin notification email template
export function getAdminEmailTemplate(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #84994F 0%, #6d7f42 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin-top: 0; color: #6b7280;">You have received a new message from your website contact form:</p>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #84994F;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #111827;">${escapeHtml(formData.name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #111827;">
                  <a href="mailto:${escapeHtml(formData.email)}" style="color: #84994F; text-decoration: none;">
                    ${escapeHtml(formData.email)}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Subject:</td>
                <td style="padding: 8px 0; color: #111827;">${escapeHtml(formData.subject)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; color: #111827; white-space: pre-wrap;">${escapeHtml(formData.message)}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
              This email was sent from the Trust2Switch contact form.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// User confirmation email template
export function getUserConfirmationEmailTemplate(userName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Us</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #84994F 0%, #6d7f42 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin-top: 0; color: #111827; font-size: 16px;">Hi ${escapeHtml(userName)},</p>
          
          <p style="color: #374151;">Thank you for reaching out to Trust2Switch! We have successfully received your message and our team will get back to you within 24 hours.</p>
          
          <p style="color: #374151;">We appreciate your interest in our services and look forward to assisting you with your career transition journey.</p>

          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #84994F;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              <strong>What's next?</strong><br>
              Our team will review your message and respond to you as soon as possible. In the meantime, feel free to explore our courses and resources.
            </p>
          </div>

          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://trust2switch.com'}" 
               style="display: inline-block; background: #84994F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Visit Our Website
            </a>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
              Best regards,<br>
              <strong>The Trust2Switch Team</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Send admin notification email
export async function sendAdminNotificationEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    if (!resend) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const recipientEmail = await getRecipientEmail();
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const result = await resend.emails.send({
      from: `Trust2Switch Contact Form <${fromEmail}>`,
      to: [recipientEmail],
      subject: `New Contact Form: ${formData.subject}`,
      html: getAdminEmailTemplate(formData),
      replyTo: formData.email,
    });

    if (result.error) {
      console.error('Resend API error (admin):', JSON.stringify(result.error, null, 2));
      const errorMessage = result.error.message || 
                          (typeof result.error === 'string' ? result.error : 'Failed to send email');
      return { success: false, error: errorMessage };
    }

    console.log('Admin notification email sent successfully:', result.data?.id);

    return { success: true };
  } catch (error: any) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
}

// Send user confirmation email
export async function sendUserConfirmationEmail(
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    if (!resend) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const result = await resend.emails.send({
      from: `Trust2Switch <${fromEmail}>`,
      to: [userEmail],
      subject: 'Thank You for Contacting Trust2Switch',
      html: getUserConfirmationEmailTemplate(userName),
    });

    if (result.error) {
      console.error('Resend API error (user):', JSON.stringify(result.error, null, 2));
      const errorMessage = result.error.message || 
                          (typeof result.error === 'string' ? result.error : 'Failed to send email');
      return { success: false, error: errorMessage };
    }

    console.log('User confirmation email sent successfully:', result.data?.id);

    return { success: true };
  } catch (error: any) {
    console.error('Error sending user confirmation email:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
}

