import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;

  if (!ref) {
    return NextResponse.json({ error: 'Reference number is required' }, { status: 400 });
  }

  const row = db.prepare(`
    SELECT ref_number, category, subject, status, created_at, updated_at, admin_notes
    FROM complaints
    WHERE UPPER(ref_number) = UPPER(?)
  `).get(ref.trim()) as {
    ref_number: string;
    category: string;
    subject: string;
    status: string;
    created_at: string;
    updated_at: string;
    admin_notes: string | null;
  } | undefined;

  if (!row) {
    return NextResponse.json({ error: 'No submission found with this reference number.' }, { status: 404 });
  }

  // Return public tracking info without exposing PII (phone, email, full address)
  return NextResponse.json({
    complaint: {
      refNumber: row.ref_number,
      category: row.category,
      subject: row.subject,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      publicNote: row.admin_notes || 'Your submission is undergoing initial legal review.',
    },
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { ref } = await params;
  const body = await request.json();
  const { status, adminNotes } = body;

  if (!status) {
    return NextResponse.json({ error: 'Status is required' }, { status: 400 });
  }

  db.prepare(`
    UPDATE complaints
    SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE UPPER(ref_number) = UPPER(?)
  `).run(status, adminNotes || '', ref.trim());

  // Record audit log
  db.prepare(`
    INSERT INTO audit_logs (user_id, user_email, action, entity_type, entity_id, details)
    VALUES (?, ?, 'UPDATE_COMPLAINT_STATUS', 'COMPLAINT', ?, ?)
  `).run(user.id, user.email, ref, `Changed status to: ${status}`);

  return NextResponse.json({ success: true, message: 'Complaint status updated successfully.' });
}
