import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type FeedbackBody = {
  feedback_type?: string;
  rating?: number | null;
  message?: string;
  page_url?: string | null;
};

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY || '';
  const to = process.env.RESEND_FEEDBACK_TO || process.env.RESEND_TO || '';
  const from = process.env.RESEND_FEEDBACK_FROM || process.env.RESEND_FROM || 'onboarding@resend.dev';
  return { apiKey, to, from };
}

async function sendFeedbackEmail(params: {
  feedbackType: string;
  rating: number | null;
  message: string;
  pageUrl: string | null;
  userEmail: string | null;
  userId: string | null;
  userAgent: string | null;
}) {
  const { apiKey, to, from } = getResendConfig();

  // If not configured, silently skip email sending.
  if (!apiKey || !to) {
    return { skipped: true as const };
  }

  const subjectParts = ['ARFID Feedback'];
  if (params.feedbackType) subjectParts.push(`[${params.feedbackType}]`);
  if (params.rating) subjectParts.push(`(${params.rating}/5)`);
  const subject = subjectParts.join(' ');

  const text = [
    `Type: ${params.feedbackType || 'other'}`,
    `Rating: ${params.rating ?? 'N/A'}`,
    `User: ${params.userEmail ?? 'anonymous'}${params.userId ? ` (${params.userId})` : ''}`,
    `Page: ${params.pageUrl ?? 'N/A'}`,
    `User-Agent: ${params.userAgent ?? 'N/A'}`,
    '',
    params.message,
  ].join('\n');

  const html = `
    <h2>New Feedback</h2>
    <ul>
      <li><strong>Type:</strong> ${escapeHtml(params.feedbackType || 'other')}</li>
      <li><strong>Rating:</strong> ${params.rating ?? 'N/A'}</li>
      <li><strong>User:</strong> ${escapeHtml(params.userEmail ?? 'anonymous')}${params.userId ? ` (${escapeHtml(params.userId)})` : ''}</li>
      <li><strong>Page:</strong> ${params.pageUrl ? `<a href="${escapeHtml(params.pageUrl)}">${escapeHtml(params.pageUrl)}</a>` : 'N/A'}</li>
      <li><strong>User-Agent:</strong> ${escapeHtml(params.userAgent ?? 'N/A')}</li>
    </ul>
    <pre style="white-space:pre-wrap;word-break:break-word">${escapeHtml(params.message)}</pre>
  `.trim();

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend send failed (${res.status}): ${errorText}`);
  }

  return { skipped: false as const };
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// POST - Submit feedback
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const body = (await request.json()) as FeedbackBody;
    const { feedback_type, rating, message, page_url } = body;

    // Validate message
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Feedback message is required' },
        { status: 400 }
      );
    }

    // Validate feedback_type
    const validTypes = ['bug', 'feature', 'improvement', 'praise', 'other'];
    if (feedback_type && !validTypes.includes(feedback_type)) {
      return NextResponse.json(
        { error: 'Invalid feedback type' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating !== null && rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Insert feedback (no .select() to avoid permission issues with anonymous users)
    const { error } = await supabase
      .from('user_feedback')
      .insert({
        user_id: user?.id || null,
        user_email: user?.email || null,
        feedback_type: feedback_type || 'other',
        rating: rating || null,
        message: message.trim(),
        page_url: page_url || null,
        user_agent: request.headers.get('user-agent'),
      });

    if (error) {
      console.error('Error saving feedback:', error);
      return NextResponse.json(
        { error: 'Failed to save feedback', details: error.message, code: error.code },
        { status: 500 }
      );
    }

    // If Resend is configured, also email the feedback.
    try {
      await sendFeedbackEmail({
        feedbackType: feedback_type || 'other',
        rating: rating ?? null,
        message: message.trim(),
        pageUrl: page_url || null,
        userEmail: user?.email || null,
        userId: user?.id || null,
        userAgent: request.headers.get('user-agent'),
      });
    } catch (emailErr: any) {
      console.error('Failed sending feedback email via Resend:', emailErr);
      // If Resend is configured, surface the failure so it's not silently "lost".
      const { apiKey, to } = getResendConfig();
      if (apiKey && to) {
        return NextResponse.json(
          { error: 'Feedback saved, but failed to email via Resend', details: emailErr?.message || String(emailErr) },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 201 });
  } catch (err: any) {
    console.error('Unexpected error submitting feedback:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// GET - Fetch feedback (admin only)
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const adminEmails = ['aszkenasy@gmail.com'];
    if (!adminEmails.includes(user.email || '')) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const feedbackType = searchParams.get('type');

    let query = supabase
      .from('user_feedback')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (feedbackType) {
      query = query.eq('feedback_type', feedbackType);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching feedback:', error);
      return NextResponse.json(
        { error: 'Failed to fetch feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      feedback: data || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (err: any) {
    console.error('Unexpected error fetching feedback:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

