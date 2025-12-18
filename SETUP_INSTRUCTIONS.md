# Setup Instructions for Children Profiles Feature

## Prerequisites

Before you can use the new Children Profiles feature, you must complete the database setup.

## Step 1: Run Database Migrations

### Important: This step is REQUIRED before the feature will work!

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Log in to your account
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query" button

3. **Run Migration Scripts**
   - Open the file `DATABASE_MIGRATION.md` in this project
   - Copy the SQL from **Section 1: Create children table**
   - Paste it into the SQL Editor
   - Click "Run" button
   - Wait for success message

4. **Repeat for Each Section**
   - Section 2: Create child_measurements table
   - Section 3: Update food_entries table
   - Section 4: Create function to update updated_at timestamp

5. **Verify Installation**
   - Copy the verification SQL from the bottom of `DATABASE_MIGRATION.md`
   - Run it in the SQL Editor
   - You should see the new tables listed

## Step 2: Start the Development Server

```bash
# Navigate to project directory
cd /Users/odet/websites/AFIRD-new

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:3000

## Step 3: Test the Feature

### 3.1 Create a Child Profile

1. Log in to the application
2. Click "Children" in the navigation menu
3. Click "Add Child" button
4. Fill in the form:
   - Name: e.g., "Emma"
   - Date of Birth: e.g., "2018-05-15"
   - Sex: Select "Female"
   - Initial Height: e.g., "120.5" cm
   - Initial Weight: e.g., "22.5" kg
5. Click "Add Child"
6. Verify the child appears in the list with the latest measurement

### 3.2 Add Additional Measurements

1. From the profile page, find the child you just created
2. Click "Add Measurement" button
3. Enter new measurements:
   - Height: e.g., "121.0" cm
   - Weight: e.g., "23.0" kg
   - Measurement Date: Select today's date
   - Notes: e.g., "Monthly checkup"
4. Click "Add Measurement"
5. Verify the latest measurement is updated on the child's card

### 3.3 View Measurement History

1. Click "View History" button on a child's card
2. Verify you see all measurements sorted by date
3. Check that growth changes are displayed (e.g., "+0.5 cm")
4. Verify BMI is calculated correctly

### 3.4 Associate Food Entry with Child

1. Navigate to the Camera page (home)
2. Take a photo of food or select from gallery
3. Wait for the analysis to complete
4. On the results page, you should see a "Select Child" dropdown
5. Select the child you created
6. Click "Save Entry"
7. Verify the entry is saved successfully

### 3.5 Record Food for Yourself (Parent)

1. Take another food photo
2. On the results page, leave the dropdown as "For myself (parent)"
3. Click "Save Entry"
4. Verify the entry is saved

### 3.6 Test Child Deletion

1. Go back to the Children profile page
2. Click "Delete" on a child (or create a test child first)
3. Confirm the deletion
4. Verify the child is removed from the list

## Step 4: Verify Everything Works

### Checklist

- [ ] Database migrations completed successfully
- [ ] Can create a child profile
- [ ] Can add initial measurements
- [ ] Can add additional measurements
- [ ] Can view measurement history
- [ ] Growth changes are calculated correctly
- [ ] BMI is calculated correctly
- [ ] Can associate food entries with children
- [ ] Can save food entries for parent (no child)
- [ ] Can delete a child profile
- [ ] Navigation shows "Children" menu item
- [ ] No console errors during testing

## Troubleshooting

### Issue: "Table 'children' does not exist"

**Solution:** You haven't run the database migrations yet. Follow Step 1 above.

### Issue: "Permission denied for table children"

**Solution:** The RLS policies weren't created. Re-run the SQL from Section 1 in `DATABASE_MIGRATION.md`.

### Issue: Child selector doesn't appear on results page

**Solution:** 
1. Check browser console for errors
2. Make sure you have at least one child profile created
3. Try refreshing the results page

### Issue: Measurements not saving

**Solution:**
1. Verify height and weight are positive numbers
2. Verify measurement date is not in the future
3. Check browser console for error messages

### Issue: Can't access /profile page

**Solution:**
1. Make sure you're logged in
2. Check that the page file exists at `src/app/profile/page.tsx`
3. Restart the development server

## Production Deployment

### Before Deploying to Production:

1. **Test thoroughly** using the checklist above
2. **Backup your database** before running migrations in production
3. **Run migrations** on production database (same SQL as development)
4. **Verify RLS policies** are working correctly
5. **Test with real user accounts** (not just admin)

### Deployment Steps:

```bash
# Build the application
npm run build

# Test the production build locally
npm start

# Deploy to your hosting platform (Netlify, Vercel, etc.)
# Make sure environment variables are set correctly
```

## Environment Variables

Ensure these are set in your environment:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## Next Steps

After successful setup and testing:

1. **Regular Backups:** Set up automated database backups
2. **Monitoring:** Monitor API usage and error rates
3. **User Feedback:** Collect feedback on the new feature
4. **Future Enhancements:** See `CHILDREN_PROFILES_FEATURE.md` for ideas

## Support

If you encounter any issues:

1. Check the browser console for error messages
2. Check Supabase logs in the dashboard
3. Review the `CHILDREN_PROFILES_FEATURE.md` documentation
4. Verify all database migrations were run successfully

## Summary of Changes

### New Files (9)
- `src/types/child.ts` - TypeScript types
- `src/services/childService.ts` - Service functions
- `src/app/api/children/route.ts` - API endpoints
- `src/app/api/children/[id]/route.ts` - API endpoints
- `src/app/api/children/[id]/measurements/route.ts` - API endpoints
- `src/app/profile/page.tsx` - Profile management UI
- `src/app/profile/[id]/measurements/page.tsx` - Measurement history UI
- `DATABASE_MIGRATION.md` - SQL migrations
- `CHILDREN_PROFILES_FEATURE.md` - Feature documentation

### Modified Files (6)
- `src/services/foodEntryService.ts` - Added child_id support
- `src/hooks/useFoodEntries.ts` - Added childId parameter
- `src/screens/ResultsScreen.tsx` - Added child selector
- `src/components/Navigation.tsx` - Added "Children" nav link
- `src/app/api/food-entries/route.ts` - Added child_id handling

### Database Changes
- New table: `children`
- New table: `child_measurements`
- Modified table: `food_entries` (added `child_id` column)
- New RLS policies for all tables
- New trigger function for `updated_at`

---

**Ready to get started?** Begin with Step 1: Run Database Migrations!

