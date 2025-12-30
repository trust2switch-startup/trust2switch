// Contact Form API route
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendAdminNotificationEmail, sendUserConfirmationEmail } from '@/lib/email';

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(1, 'Message is required').max(5000, 'Message is too long'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { 
          success: false, 
          message: firstError.message || 'Invalid form data' 
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service is not configured. Please contact the administrator.' 
        },
        { status: 500 }
      );
    }

    // Log for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Sending emails with:', {
        hasApiKey: !!process.env.RESEND_API_KEY,
        fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        userEmail: formData.email,
      });
    }

    // Send admin notification email
    const adminEmailResult = await sendAdminNotificationEmail(formData);
    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification email:', adminEmailResult.error);
      // Continue anyway - we'll still try to send confirmation email
    }

    // Send user confirmation email
    const userEmailResult = await sendUserConfirmationEmail(
      formData.email,
      formData.name
    );
    if (!userEmailResult.success) {
      console.error('Failed to send user confirmation email:', userEmailResult.error);
      // If admin email succeeded but user email failed, still return success
      // as the main purpose (notifying admin) was achieved
    }

    // If both emails failed, return error with more details
    if (!adminEmailResult.success && !userEmailResult.success) {
      const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Failed to send emails. Admin: ${adminEmailResult.error || 'Unknown error'}, User: ${userEmailResult.error || 'Unknown error'}` 
        : 'Failed to send emails. Please try again later.';
      
      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
    }, { status: 200 });

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request data' 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

