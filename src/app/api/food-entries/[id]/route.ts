import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { getFoodEntryById, deleteFoodEntry } from '@/services/foodEntryService';
import { deleteFoodImage } from '@/services/storageService';

// GET: Get single entry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const entry = await getFoodEntryById(params.id);

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ entry });
  } catch (error: any) {
    console.error('Error fetching food entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch food entry' },
      { status: 500 }
    );
  }
}

// DELETE: Delete entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get entry first to get storage path
    const entry = await getFoodEntryById(params.id);

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    // Get server client for storage operations
    const serverSupabase = await createClient();

    // Delete image from storage
    try {
      await deleteFoodImage(serverSupabase, entry.image_storage_path);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Continue with entry deletion even if image deletion fails
    }

    // Delete entry from database
    await deleteFoodEntry(params.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting food entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete food entry' },
      { status: 500 }
    );
  }
}

