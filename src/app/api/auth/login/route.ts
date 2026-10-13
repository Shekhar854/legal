import { NextResponse } from 'next/server';
import db, { verifyPassword } from '@/lib/db';
import { sendEmailOtp } from '@/lib/email';
import crypto from 'crypto';

function maskEmail(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  const [user, domain] = parts;
  if (user.length <= 2) {
    return `${user[0]}*@${domain}`;
  }
  return `${user.slice(0, 2)}***${user.slice(-1)}@${domain}`;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const trimmedInput = email.trim();

    // Look up user by email or ID
    let user = db.prepare(`
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE LOWER(email) = LOWER(?)
    `).get(trimmedInput) as { id: number; name: string; email: string; password_hash: string; role: string } | undefined;

    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ error: 'Invalid ID or password' }, { status: 401 });
    }

    // Determine the destination email address
    let destinationEmail = user.email;
    if (destinationEmail.toLowerCase() === 'arjun@legal' || !destinationEmail.includes('.')) {
      destinationEmail = process.env.ADMIN_EMAIL || 'shekharthathera@gmail.com';
    } else if (destinationEmail.toLowerCase() === 'thatherashekhar@gmail.com') {
      destinationEmail = 'shekharthathera@gmail.com';
    }

    // Generate 6-digit OTP code & temporary verification token
    const otpCode = crypto.randomInt(100000, 1000000).toString();
    const tempToken = crypto.randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

    // Invalidate prior unused OTPs for this user
    db.prepare(`
      UPDATE email_otps
      SET verified = 2
      WHERE user_id = ? AND verified = 0
    `).run(user.id);

    // Save in email_otps table
    db.prepare(`
      INSERT INTO email_otps (email, otp_code, temp_token, user_id, expires_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(destinationEmail, otpCode, tempToken, user.id, expiresAt);

    // Dispatch real email via Gmail SMTP or HTTPS API
    const emailResult = await sendEmailOtp(destinationEmail, otpCode);

    return NextResponse.json({
      requiresOtp: true,
      tempToken,
      destinationEmail: maskEmail(destinationEmail),
      message: emailResult.message,
      fallbackOtp: emailResult.fallbackOtp || undefined,
    });
  } catch (error: any) {
    console.error('Login Step 1 error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch verification email. Please try again.' },
      { status: 500 }
    );
  }
}
