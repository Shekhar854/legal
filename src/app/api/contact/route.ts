import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message, preferredLanguage, consent } = body;

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: 'Please acknowledge the disclaimer terms before submitting.' }, { status: 400 });
    }

    db.prepare(`
      INSERT INTO contact_inquiries (full_name, email, phone, subject, message, preferred_language)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      fullName.trim(),
      email.trim(),
      phone ? phone.trim() : null,
      subject.trim(),
      message.trim(),
      preferredLanguage || 'en'
    );

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. Our chambers will review it and get in touch if appropriate.',
    });
  } catch (error) {
    console.error('Contact inquiry error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = db.prepare('SELECT * FROM contact_inquiries ORDER BY created_at DESC').all();
  return NextResponse.json({ inquiries });
}
