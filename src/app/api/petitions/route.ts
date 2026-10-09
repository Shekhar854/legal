import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status');

  const user = await getCurrentUser();

  let query = 'SELECT * FROM petitions';
  const params: string[] = [];

  if (user && statusFilter && statusFilter !== 'all') {
    query += ' WHERE status = ?';
    params.push(statusFilter);
  } else if (!user) {
    // Public only sees Approved or Closed petitions
    query += " WHERE status IN ('Approved', 'Closed')";
  }

  query += ' ORDER BY created_at DESC';

  const petitions = db.prepare(query).all(...params);
  return NextResponse.json({ petitions });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      location,
      description,
      proposedAction,
      targetRecipient,
      creatorName,
      creatorEmail,
      declaration,
    } = body;

    if (!title || !category || !location || !description || !proposedAction || !targetRecipient || !creatorName || !creatorEmail) {
      return NextResponse.json(
        { error: 'All fields are required to submit a public petition.' },
        { status: 400 }
      );
    }

    if (!declaration) {
      return NextResponse.json(
        { error: 'You must agree to the petition submission declaration and moderation rules.' },
        { status: 400 }
      );
    }

    const result = db.prepare(`
      INSERT INTO petitions (
        title, category, location, description,
        proposed_action, target_recipient,
        creator_name, creator_email,
        status, target_signatures, current_signatures, closing_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Submitted for Review', 1000, 0, 'In 60 Days')
    `).run(
      title.trim(),
      category.trim(),
      location.trim(),
      description.trim(),
      proposedAction.trim(),
      targetRecipient.trim(),
      creatorName.trim(),
      creatorEmail.trim()
    );

    return NextResponse.json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Petition submitted successfully. It will be published after editorial and legal moderation.',
    });
  } catch (error) {
    console.error('Petition creation error:', error);
    return NextResponse.json({ error: 'Failed to submit petition' }, { status: 500 });
  }
}
