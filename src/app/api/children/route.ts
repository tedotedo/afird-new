import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { 
  createChild, 
  getChildren, 
  getChildrenWithLatestMeasurements 
} from '@/services/childService';

// GET: Retrieve all children for the current user
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

    const searchParams = request.nextUrl.searchParams;
    const includeMeasurements = searchParams.get('includeMeasurements') === 'true';

    const children = includeMeasurements 
      ? await getChildrenWithLatestMeasurements()
      : await getChildren();

    return NextResponse.json({ children });
  } catch (error: any) {
    console.error('Error fetching children:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch children' },
      { status: 500 }
    );
  }
}

// POST: Create a new child
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

    const body = await request.json();
    const { name, dateOfBirth, sex, initialHeight, initialWeight, parentalConsent } = body;

    if (!name || !dateOfBirth || !sex) {
      return NextResponse.json(
        { error: 'Name, date of birth, and sex are required' },
        { status: 400 }
      );
    }

    if (!parentalConsent) {
      return NextResponse.json(
        { error: 'Parental consent is required for creating a child profile' },
        { status: 400 }
      );
    }

    if (!['male', 'female', 'other'].includes(sex)) {
      return NextResponse.json(
        { error: 'Sex must be male, female, or other' },
        { status: 400 }
      );
    }

    // Get IP address for consent audit trail
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    const child = await createChild({
      name,
      dateOfBirth: new Date(dateOfBirth),
      sex,
      initialHeight: initialHeight ? parseFloat(initialHeight) : undefined,
      initialWeight: initialWeight ? parseFloat(initialWeight) : undefined,
      parentalConsentGiven: true,
      parentalConsentIp: ip,
    });

    return NextResponse.json({ child }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating child:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create child' },
      { status: 500 }
    );
  }
}

