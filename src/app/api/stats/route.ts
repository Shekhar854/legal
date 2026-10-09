import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const publishedArticles = (db.prepare("SELECT COUNT(*) as count FROM articles WHERE status = 'published'").get() as any).count;
  const draftArticles = (db.prepare("SELECT COUNT(*) as count FROM articles WHERE status != 'published'").get() as any).count;
  const totalResources = (db.prepare("SELECT COUNT(*) as count FROM resources").get() as any).count;
  
  const newComplaints = (db.prepare("SELECT COUNT(*) as count FROM complaints WHERE status = 'Submitted'").get() as any).count;
  const underReviewComplaints = (db.prepare("SELECT COUNT(*) as count FROM complaints WHERE status = 'Under Review'").get() as any).count;
  const resolvedComplaints = (db.prepare("SELECT COUNT(*) as count FROM complaints WHERE status = 'Resolved'").get() as any).count;
  const totalComplaints = (db.prepare("SELECT COUNT(*) as count FROM complaints").get() as any).count;

  const awaitingPetitions = (db.prepare("SELECT COUNT(*) as count FROM petitions WHERE status = 'Submitted for Review'").get() as any).count;
  const publishedPetitions = (db.prepare("SELECT COUNT(*) as count FROM petitions WHERE status = 'Approved'").get() as any).count;
  const totalSignatures = (db.prepare("SELECT SUM(current_signatures) as count FROM petitions").get() as any).count || 0;

  const totalInquiries = (db.prepare("SELECT COUNT(*) as count FROM contact_inquiries").get() as any).count;

  const recentLogs = db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 6").all();

  return NextResponse.json({
    metrics: {
      publishedArticles,
      draftArticles,
      totalResources,
      newComplaints,
      underReviewComplaints,
      resolvedComplaints,
      totalComplaints,
      awaitingPetitions,
      publishedPetitions,
      totalSignatures,
      totalInquiries,
    },
    recentLogs,
  });
}
