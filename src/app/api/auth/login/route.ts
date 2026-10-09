import { NextResponse } from 'next/server';
import db, { verifyPassword } from '@/lib/db';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = db.prepare(`
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = ?
    `).get(email.toLowerCase().trim()) as { id: number; name: string; email: string; password_hash: string; role: string } | undefined;

    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    await createSession(user.id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (user_id, user_email, action, entity_type, entity_id, details)
      VALUES (?, ?, 'LOGIN', 'USER', ?, 'Successful admin login')
    `).run(user.id, user.email, String(user.id));

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
