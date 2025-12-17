import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { saveFoodEntry, getFoodEntries } from '@/services/foodEntryService';
import { uploadFoodImage } from '@/services/storageService';

// POST: Create new food entry
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

    const formData = await request.formData();
    const imageFile = formData.get('image') as File | Blob | null;
    const nutritionalDataStr = formData.get('nutritionalData') as string | null;
    const mealType = formData.get('mealType') as string | null;
    const dateTime = formData.get('dateTime') as string | null;

    if (!imageFile || !nutritionalDataStr || !dateTime) {
      return NextResponse.json(
        { error: 'Image, nutritional data, and dateTime are required' },
        { status: 400 }
      );
    }

    // Check file size (50 MB limit for Supabase free tier)
    const maxSize = 50 * 1024 * 1024; // 50 MB in bytes
    if (imageFile.size > maxSize) {
      const fileSizeMB = (imageFile.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        { error: `Image is too large. Maximum file size is 50 MB. Your file is ${fileSizeMB} MB.` },
        { status: 400 }
      );
    }

    const nutritionalData = JSON.parse(nutritionalDataStr);

    // Generate entry ID for storage path
    const entryId = crypto.randomUUID();

    // Get server client for storage operations
    const serverSupabase = await createClient();

    // Upload image to storage
    const { url, path } = await uploadFoodImage(
      serverSupabase,
      imageFile,
      user.id,
      entryId
    );

    // Save entry to database
    const entry = await saveFoodEntry({
      imageUrl: url,
      imageStoragePath: path,
      mealType: mealType as any || undefined,
      dateTime: new Date(dateTime),
      nutritionalData,
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating food entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create food entry' },
      { status: 500 }
    );
  }
}

// GET: Retrieve food entries
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const mealType = searchParams.get('mealType') as any;
    const limit = searchParams.get('limit');

    const entries = await getFoodEntries({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      mealType,
      limit: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({ entries });
  } catch (error: any) {
    console.error('Error fetching food entries:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch food entries' },
      { status: 500 }
    );
  }
}

