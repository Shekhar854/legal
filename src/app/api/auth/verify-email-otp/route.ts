import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { tempToken, otp } = await request.json();

    if (!tempToken || !otp) {
      return NextResponse.json(
        { error: 'Session token and 6-digit OTP code are required' },
        { status: 400 }
      );
    }

    const cleanOtp = String(otp).trim();
    if (cleanOtp.length !== 6) {
      return NextResponse.json(
        { error: 'Please enter a valid 6-digit verification code' },
        { status: 400 }
      );
    }

    // Find the OTP record by tempToken
    const record = db.prepare(`
      SELECT id, email, otp_code, user_id, expires_at, attempts, verified
      FROM email_otps
      WHERE temp_token = ? AND verified = 0
    `).get(tempToken) as {
      id: number;
      email: string;
      otp_code: string;
      user_id: number;
      expires_at: string;
      attempts: number;
      verified: number;
    } | undefined;

    if (!record) {
      return NextResponse.json(
        { error: 'Verification session expired or invalid. Please sign in again.' },
        { status: 400 }
      );
    }

    // Check brute-force attempts
    if (record.attempts >= 5) {
      db.prepare('UPDATE email_otps SET verified = 2 WHERE id = ?').run(record.id);
      return NextResponse.json(
        { error: 'Too many incorrect attempts. Please sign in again to receive a new code.' },
        { status: 400 }
      );
    }

    // Check expiration
    if (new Date(record.expires_at) < new Date()) {
      db.prepare('UPDATE email_otps SET verified = 2 WHERE id = ?').run(record.id);
      return NextResponse.json(
        { error: 'The verification code has expired (valid 5 minutes). Please sign in again.' },
        { status: 400 }
      );
    }

    // Verify OTP code
    if (record.otp_code !== cleanOtp) {
      db.prepare('UPDATE email_otps SET attempts = attempts + 1 WHERE id = ?').run(record.id);
      const remaining = 5 - (record.attempts + 1);
      return NextResponse.json(
        { error: `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` },
        { status: 400 }
      );
    }

    // Mark as verified
    db.prepare('UPDATE email_otps SET verified = 1 WHERE id = ?').run(record.id);

    // Retrieve user and create session
    const user = db.prepare(`
      SELECT id, name, email, role
      FROM users
      WHERE id = ?
    `).get(record.user_id) as { id: number; name: string; email: string; role: string } | undefined;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await createSession(user.id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (user_id, user_email, action, entity_type, entity_id, details)
      VALUES (?, ?, 'LOGIN_2FA_SUCCESS', 'USER', ?, 'Successful admin login via Email 2FA OTP')
    `).run(user.id, record.email, String(user.id));

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user,
      redirectUrl: '/admin',
    });
  } catch (error: any) {
    console.error('Verify Email OTP error:', error);
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 });
  }
}
