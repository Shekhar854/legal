import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let query = 'SELECT * FROM resources WHERE 1=1';
  const params: string[] = [];

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (title LIKE ? OR summary LIKE ? OR category LIKE ?)';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  query += ' ORDER BY created_at DESC';

  const resources = db.prepare(query).all(...params);
  return NextResponse.json({ resources });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, title_hi, summary, summary_hi, category, link_url, source_org } = body;

    if (!title || !summary || !category || !source_org) {
      return NextResponse.json({ error: 'Title, summary, category, and source organisation are required' }, { status: 400 });
    }

    const result = db.prepare(`
      INSERT INTO resources (title, title_hi, summary, summary_hi, category, link_url, source_org)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      title.trim(),
      title_hi?.trim() || null,
      summary.trim(),
      summary_hi?.trim() || null,
      category.trim(),
      link_url?.trim() || null,
      source_org.trim()
    );

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Create resource error:', error);
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}
