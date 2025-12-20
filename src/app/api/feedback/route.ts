import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// POST - Submit feedback
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const body = await request.json();
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

    return NextResponse.json(
      { message: 'Feedback submitted successfully' },
      { status: 201 }
    );
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
    const adminEmails = ['aszkenasy@gmail.com', 'odetayinde@gmail.com'];
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

