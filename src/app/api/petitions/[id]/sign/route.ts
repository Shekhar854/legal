import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const petitionId = parseInt(id, 10);
    const body = await request.json();
    const { fullName, email, city, state } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: 'Full name and email are required to support a petition.' }, { status: 400 });
    }

    const petition = db.prepare('SELECT id, status FROM petitions WHERE id = ?').get(petitionId) as { id: number; status: string } | undefined;
    if (!petition || petition.status !== 'Approved') {
      return NextResponse.json({ error: 'This petition is currently not open for signatures.' }, { status: 400 });
    }

    // Check duplicate
    const existing = db.prepare('SELECT id FROM petition_supporters WHERE petition_id = ? AND email = ?').get(petitionId, email.toLowerCase().trim());
    if (existing) {
      return NextResponse.json({ error: 'You have already signed this petition.' }, { status: 409 });
    }

    // Insert supporter and increment
    const runTransaction = db.transaction(() => {
      db.prepare(`
        INSERT INTO petition_supporters (petition_id, full_name, email, city, state, verified)
        VALUES (?, ?, ?, ?, ?, 1)
      `).run(petitionId, fullName.trim(), email.toLowerCase().trim(), city?.trim() || null, state?.trim() || null);

      db.prepare(`
        UPDATE petitions
        SET current_signatures = current_signatures + 1
        WHERE id = ?
      `).run(petitionId);
    });

    runTransaction();

    const updated = db.prepare('SELECT current_signatures FROM petitions WHERE id = ?').get(petitionId) as { current_signatures: number };

    return NextResponse.json({
      success: true,
      currentSignatures: updated.current_signatures,
      message: 'Thank you! Your verified signature has been added to this petition.',
    });
  } catch (error) {
    console.error('Sign petition error:', error);
    return NextResponse.json({ error: 'Failed to record signature' }, { status: 500 });
  }
}
