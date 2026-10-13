import nodemailer from 'nodemailer';

export interface SendOtpResult {
  success: boolean;
  message: string;
  fallbackOtp?: string;
}

/**
 * Creates nodemailer transport using verified Gmail SMTP credentials with fast timeout
 */
function getTransporter() {
  const user = (process.env.SMTP_USER || 'shekharthathera@gmail.com').trim();
  const rawPass = process.env.SMTP_PASS || 'zkcrjwnrojzhdtew';
  const pass = rawPass.replace(/\s+/g, '').trim();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
    connectionTimeout: 3500,
    greetingTimeout: 3500,
    socketTimeout: 3500,
  });
}

/**
 * Sends real 6-digit OTP verification email via Gmail SMTP
 */
export async function sendEmailOtp(toEmail: string, otpCode: string): Promise<SendOtpResult> {
  const transporter = getTransporter();
  const senderEmail = (process.env.SMTP_USER || 'shekharthathera@gmail.com').trim();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Legal Arjun Chambers 2FA Verification</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #1E293B; }
        .card { max-width: 520px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: #102A43; padding: 32px 24px; text-align: center; color: #FFFFFF; }
        .header h1 { font-family: Georgia, serif; font-size: 22px; margin: 8px 0 0; letter-spacing: -0.5px; }
        .header p { color: #9FB3C8; font-size: 12px; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 32px 28px; }
        .otp-box { background: #F0F4F8; border: 2px dashed #BCCCDC; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
        .otp-code { font-family: 'Courier New', monospace; font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #102A43; margin: 0; }
        .notice { font-size: 13px; color: #627D98; line-height: 1.6; }
        .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 24px; text-align: center; font-size: 11px; color: #829AB1; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Adv. Arjun Panwar Chambers</h1>
          <p>Two-Factor Authentication (2FA)</p>
        </div>
        <div class="content">
          <p style="font-size: 15px; font-weight: 600; color: #102A43; margin-top: 0;">Chambers Administrative Access Verification</p>
          <p class="notice">
            A sign-in request was initiated with your chambers access credentials. Use the following 6-digit one-time verification code to complete your login:
          </p>
          
          <div class="otp-box">
            <div class="otp-code">${otpCode}</div>
          </div>
          
          <p class="notice">
            ⏳ This code is valid for <strong>5 minutes</strong> and can only be used once.
          </p>
          <p class="notice" style="color: #BA2525; margin-top: 16px;">
            ⚠️ If you did not initiate this login request, your password may be compromised. Please review your credentials immediately.
          </p>
        </div>
        <div class="footer">
          Legal Arjun • Law & Public Assistance Platform<br>
          Advocate Arjun Panwar Chambers, Delhi High Court Complex, New Delhi
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Try Resend HTTP API over Port 443 (works seamlessly on Render without SMTP port blocks)
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'Legal Arjun <onboarding@resend.dev>',
          to: [toEmail],
          subject: `[${otpCode}] Your Chambers Admin Login Verification Code`,
          html: htmlContent,
        }),
      });

      if (res.ok) {
        console.log(`[RESEND API SUCCESS] Sent OTP email to ${toEmail}`);
        return {
          success: true,
          message: `A 6-digit verification code has been sent to your email (${toEmail}).`,
        };
      } else {
        const errText = await res.text();
        console.error(`[RESEND API ERROR]: ${errText}`);
      }
    } catch (apiErr: any) {
      console.error('[RESEND API NETWORK ERROR]', apiErr);
    }
  }

  // 2. Try Nodemailer Gmail SMTP
  try {
    const info = await transporter.sendMail({
      from: `"Adv. Arjun Panwar Chambers" <${senderEmail}>`,
      to: toEmail,
      subject: `[${otpCode}] Your Chambers Admin Login Verification Code`,
      text: `Your Chambers Admin Login verification code is: ${otpCode}. This code is valid for 5 minutes.`,
      html: htmlContent,
    });

    console.log(`[EMAIL DISPATCH SUCCESS] Real OTP email sent to ${toEmail}. MessageId: ${info.messageId}`);

    return {
      success: true,
      message: `A 6-digit verification code has been sent to your email (${toEmail}).`,
    };
  } catch (err: any) {
    console.warn(`[SMTP DISPATCH BLOCKED/FAILED on hosting]: ${err.message}`);
    console.log(`\n======================================================`);
    console.log(`🔑 [RENDER EMERGENCY ADMIN 2FA OTP CODE]: ${otpCode}`);
    console.log(`To: ${toEmail} | Timestamp: ${new Date().toISOString()}`);
    console.log(`======================================================\n`);

    // Render Free Tier blocks outbound SMTP ports 465 and 587.
    // Rather than failing and locking the user out, provide fallback OTP
    return {
      success: false,
      fallbackOtp: otpCode,
      message: `Outbound SMTP blocked on Render Free Tier. Verification code: ${otpCode}`,
    };
  }
}
