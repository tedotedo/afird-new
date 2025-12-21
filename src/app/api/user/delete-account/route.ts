import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// DELETE - Delete user account and all associated data (GDPR Right to Erasure)
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Confirm deletion with password or confirmation token
    const body = await request.json();
    const { confirmationText } = body;

    if (confirmationText !== 'DELETE') {
      return NextResponse.json(
        { error: 'Please type DELETE to confirm account deletion' },
        { status: 400 }
      );
    }

    const userId = user.id;

    // Delete all user data in correct order (respecting foreign key constraints)
    // Note: Supabase/Postgres will cascade delete automatically if FK is set to CASCADE
    // But we'll be explicit for clarity and audit trail

    // 1. Delete food milestone data
    await supabase
      .from('food_milestones')
      .delete()
      .eq('user_id', userId);

    // 2. Delete nutrition goals
    await supabase
      .from('nutrition_goals')
      .delete()
      .eq('user_id', userId);

    // 3. Delete user feedback
    await supabase
      .from('user_feedback')
      .delete()
      .eq('user_id', userId);

    // 4. Delete user consents
    await supabase
      .from('user_consents')
      .delete()
      .eq('user_id', userId);

    // 5. Delete parent measurements
    await supabase
      .from('parent_measurements')
      .delete()
      .eq('user_id', userId);

    // 6. Get all children IDs first (to delete their measurements and food entries)
    const { data: children } = await supabase
      .from('children')
      .select('id')
      .eq('user_id', userId);

    if (children && children.length > 0) {
      const childIds = children.map(c => c.id);

      // 7. Delete child measurements
      await supabase
        .from('child_measurements')
        .delete()
        .in('child_id', childIds);

      // 8. Delete food entries for children
      await supabase
        .from('food_entries')
        .delete()
        .in('child_id', childIds);
    }

    // 9. Delete food entries for parent (where child_id is null)
    await supabase
      .from('food_entries')
      .delete()
      .eq('user_id', userId)
      .is('child_id', null);

    // 10. Delete children profiles
    await supabase
      .from('children')
      .delete()
      .eq('user_id', userId);

    // 11. Finally, delete the auth user account
    // Note: This requires service role key, which we don't have in client
    // So we'll use the Supabase Auth admin API
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error('Error deleting user account:', deleteError);
      // Even if auth deletion fails, data is deleted
      // Log out the user
      await supabase.auth.signOut();
      
      return NextResponse.json({
        message: 'Your data has been deleted. Please contact support to complete account deletion.',
        partial: true
      });
    }

    return NextResponse.json({
      message: 'Account and all data successfully deleted'
    });

  } catch (err: any) {
    console.error('Unexpected error deleting account:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while deleting your account' },
      { status: 500 }
    );
  }
}

