import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const CONSENT_TYPES = ['cookies', 'medical_disclaimer', 'gdpr'] as const;
type ConsentType = typeof CONSENT_TYPES[number];

// POST: Save user consent
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { consentType, accepted = true } = await request.json();

    if (!consentType || !CONSENT_TYPES.includes(consentType)) {
      return NextResponse.json(
        { error: 'Invalid consent type. Must be one of: cookies, medical_disclaimer, gdpr' },
        { status: 400 }
      );
    }

    // Get IP address and user agent for audit trail
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Check if consent already exists
    const { data: existingConsent } = await supabase
      .from('user_consents')
      .select('*')
      .eq('user_id', user.id)
      .eq('consent_type', consentType)
      .single();

    let result;

    if (existingConsent) {
      // Update existing consent
      const { data, error } = await supabase
        .from('user_consents')
        .update({
          accepted,
          accepted_at: new Date().toISOString(),
          ip_address,
          user_agent,
        })
        .eq('id', existingConsent.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Insert new consent
      const { data, error } = await supabase
        .from('user_consents')
        .insert({
          user_id: user.id,
          consent_type: consentType,
          accepted,
          accepted_at: new Date().toISOString(),
          ip_address,
          user_agent,
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ consent: result }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving consent:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save consent' },
      { status: 500 }
    );
  }
}

// GET: Retrieve user consents
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: consents, error } = await supabase
      .from('user_consents')
      .select('*')
      .eq('user_id', user.id)
      .order('accepted_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ consents }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching consents:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch consents' },
      { status: 500 }
    );
  }
}

