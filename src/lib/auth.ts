import { cookies } from 'next/headers';
import db from '@/lib/db';
import crypto from 'crypto';

export interface UserSession {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function createSession(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  db.prepare(`
    INSERT INTO sessions (token, user_id, expires_at)
    VALUES (?, ?, ?)
  `).run(token, userId, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set('la_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });

  return token;
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('la_session')?.value;
    if (!token) return null;

    const row = db.prepare(`
      SELECT u.id, u.name, u.email, u.role, s.expires_at
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ?
    `).get(token) as { id: number; name: string; email: string; role: string; expires_at: string } | undefined;

    if (!row) return null;
    if (new Date(row.expires_at) < new Date()) {
      db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
      return null;
    }

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('la_session')?.value;
    if (token) {
      db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    }
    cookieStore.delete('la_session');
  } catch (err) {
    console.error('Logout error:', err);
  }
}
