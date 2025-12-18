import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { 
  getChildById, 
  updateChild, 
  deleteChild 
} from '@/services/childService';

// GET: Retrieve a single child
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

    const child = await getChildById(params.id);

    if (!child) {
      return NextResponse.json(
        { error: 'Child not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ child });
  } catch (error: any) {
    console.error('Error fetching child:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch child' },
      { status: 500 }
    );
  }
}

// PATCH: Update a child
export async function PATCH(
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

    const body = await request.json();
    const { name, dateOfBirth, sex } = body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = new Date(dateOfBirth);
    if (sex !== undefined) {
      if (!['male', 'female', 'other'].includes(sex)) {
        return NextResponse.json(
          { error: 'Sex must be male, female, or other' },
          { status: 400 }
        );
      }
      updateData.sex = sex;
    }

    const child = await updateChild(params.id, updateData);

    return NextResponse.json({ child });
  } catch (error: any) {
    console.error('Error updating child:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update child' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a child
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

    await deleteChild(params.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting child:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete child' },
      { status: 500 }
    );
  }
}

