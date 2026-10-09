import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const status = searchParams.get('status') || 'published';

  const user = await getCurrentUser();

  let query = 'SELECT * FROM articles WHERE 1=1';
  const params: string[] = [];

  if (!user) {
    query += " AND status = 'published'";
  } else if (status !== 'all') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (title LIKE ? OR summary LIKE ? OR content LIKE ?)';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  query += ' ORDER BY published_at DESC';

  const articles = db.prepare(query).all(...params);
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, title_hi, summary, summary_hi, content, content_hi, category, tags, status } = body;

    if (!title || !summary || !content || !category) {
      return NextResponse.json({ error: 'Title, summary, content, and category are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const words = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

    const result = db.prepare(`
      INSERT INTO articles (slug, title, title_hi, summary, summary_hi, content, content_hi, category, author, status, read_time, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug,
      title.trim(),
      title_hi?.trim() || null,
      summary.trim(),
      summary_hi?.trim() || null,
      content.trim(),
      content_hi?.trim() || null,
      category.trim(),
      user.name,
      status || 'published',
      readTime,
      tags?.trim() || ''
    );

    db.prepare(`
      INSERT INTO audit_logs (user_id, user_email, action, entity_type, entity_id, details)
      VALUES (?, ?, 'CREATE_ARTICLE', 'ARTICLE', ?, ?)
    `).run(user.id, user.email, String(result.lastInsertRowid), `Created article: ${title}`);

    return NextResponse.json({ success: true, slug, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
