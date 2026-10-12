import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      contactMethod,
      state,
      district,
      category,
      subject,
      description,
      incidentDate,
      consent,
    } = body;

    if (!fullName || !state || !district || !category || !subject || !description) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Name, State, District, Category, Subject, Description).' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'You must agree to the privacy and disclaimer terms.' },
        { status: 400 }
      );
    }

    // Generate unique reference number: LA-2026-XXXXX
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const refNumber = `LA-2026-${randomDigits}`;

    db.prepare(`
      INSERT INTO complaints (
        ref_number, full_name, email, phone, contact_method,
        state, district, category, subject, description,
        incident_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted')
    `).run(
      refNumber,
      fullName.trim(),
      email ? email.trim() : null,
      phone ? phone.trim() : null,
      contactMethod || 'email',
      state.trim(),
      district.trim(),
      category.trim(),
      subject.trim(),
      description.trim(),
      incidentDate || null
    );

    return NextResponse.json({
      success: true,
      refNumber,
      message: 'Your complaint/grievance has been recorded securely.',
    });
  } catch (error) {
    console.error('Complaint submission error:', error);
    return NextResponse.json({ error: 'Failed to record complaint. Please try again.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  // If citizen, only return their own complaints
  if (user.role === 'citizen') {
    const cleanPhone = user.phone ? user.phone.slice(-10) : '';
    const complaints = db.prepare(`
      SELECT * FROM complaints 
      WHERE (phone LIKE ? OR email = ?)
      ORDER BY created_at DESC
    `).all(`%${cleanPhone}%`, user.email);
    return NextResponse.json({ complaints });
  }

  // Admin users can view all complaints
  let query = 'SELECT * FROM complaints';
  const params: string[] = [];

  if (status && status !== 'all') {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC';

  const complaints = db.prepare(query).all(...params);
  return NextResponse.json({ complaints });
}
