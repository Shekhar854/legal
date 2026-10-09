import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const petitionId = parseInt(id, 10);

  if (isNaN(petitionId)) {
    return NextResponse.json({ error: 'Invalid petition ID' }, { status: 400 });
  }

  const petition = db.prepare('SELECT * FROM petitions WHERE id = ?').get(petitionId) as any;
  if (!petition) {
    return NextResponse.json({ error: 'Petition not found' }, { status: 404 });
  }

  return NextResponse.json({ petition });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const petitionId = parseInt(id, 10);
  const body = await request.json();
  const { status } = body;

  if (!status) {
    return NextResponse.json({ error: 'Status is required' }, { status: 400 });
  }

  db.prepare('UPDATE petitions SET status = ? WHERE id = ?').run(status, petitionId);

  // Audit log
  db.prepare(`
    INSERT INTO audit_logs (user_id, user_email, action, entity_type, entity_id, details)
    VALUES (?, ?, 'MODERATE_PETITION', 'PETITION', ?, ?)
  `).run(user.id, user.email, String(petitionId), `Changed status to: ${status}`);

  return NextResponse.json({ success: true, message: `Petition status changed to ${status}` });
}
