# Children Profiles Feature

This document explains the new Children Profiles feature that allows users to register their children and track their food intake and growth measurements.

## Overview

The Children Profiles feature enables parents to:
- Register multiple children with their basic information (name, date of birth, sex)
- Track height and weight measurements over time
- Associate food entries with specific children
- Monitor growth trends through measurement history

## Database Setup

### IMPORTANT: Run Database Migrations First

Before using this feature, you **MUST** run the SQL migrations in your Supabase database. Follow these steps:

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to the **SQL Editor** (left sidebar)
4. Open the file `DATABASE_MIGRATION.md` in this project
5. Copy and paste each SQL section into the SQL Editor and run them in order:
   - Section 1: Create children table
   - Section 2: Create child_measurements table
   - Section 3: Update food_entries table
   - Section 4: Create update trigger function

### Database Schema

#### `children` table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to auth.users)
- `name` (TEXT)
- `date_of_birth` (DATE)
- `sex` (TEXT: 'male', 'female', or 'other')
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

#### `child_measurements` table
- `id` (UUID, primary key)
- `child_id` (UUID, foreign key to children)
- `height_cm` (DECIMAL)
- `weight_kg` (DECIMAL)
- `measurement_date` (DATE)
- `notes` (TEXT, optional)
- `created_at` (TIMESTAMPTZ)

#### `food_entries` table (updated)
- Added `child_id` (UUID, nullable, foreign key to children)
- Existing entries without a child_id are considered parent's entries

## Features

### 1. Children Profile Management (`/profile`)

**Location:** Navigate to "Children" in the main navigation menu

**Features:**
- View all registered children
- Add new child profiles with initial measurements
- View latest measurements for each child
- Delete child profiles (with confirmation)
- Quick access to add new measurements
- View measurement history

**Adding a Child:**
1. Click "Add Child" button
2. Fill in required fields:
   - Name (required)
   - Date of Birth (required)
   - Sex (required)
3. Optionally add initial measurements:
   - Height in cm
   - Weight in kg
4. Click "Add Child" to save

### 2. Measurement Tracking

**Adding Measurements:**
1. From the profile page, click "Add Measurement" on any child card
2. Enter:
   - Height (cm) - required
   - Weight (kg) - required
   - Measurement Date - defaults to today
   - Notes - optional
3. Click "Add Measurement" to save

**Viewing History:**
1. Click "View History" on any child card
2. See all measurements sorted by date (newest first)
3. View calculated BMI for each measurement
4. See growth changes between measurements (height/weight differences)

### 3. Food Entry Association

**When Saving Food Entries:**
1. After analyzing a food photo, you'll see a child selector on the results page
2. Options:
   - "For myself (parent)" - default, no child association
   - Select any registered child from the dropdown
3. The food entry will be associated with the selected child

**Filtering by Child:**
- Food entries can be filtered by child_id in the API
- Future enhancement: Add child filter to history page

## API Endpoints

### Children Management

#### `GET /api/children`
Get all children for the current user
- Query params:
  - `includeMeasurements=true` - Include latest measurement for each child

#### `POST /api/children`
Create a new child profile
- Body:
  ```json
  {
    "name": "Child Name",
    "dateOfBirth": "2020-01-15",
    "sex": "male",
    "initialHeight": 100.5,  // optional
    "initialWeight": 15.2    // optional
  }
  ```

#### `GET /api/children/:id`
Get a specific child by ID

#### `PATCH /api/children/:id`
Update a child profile
- Body (all fields optional):
  ```json
  {
    "name": "Updated Name",
    "dateOfBirth": "2020-01-15",
    "sex": "female"
  }
  ```

#### `DELETE /api/children/:id`
Delete a child profile (cascades to measurements and food entries)

### Measurements

#### `GET /api/children/:id/measurements`
Get all measurements for a child (sorted by date, newest first)

#### `POST /api/children/:id/measurements`
Add a new measurement
- Body:
  ```json
  {
    "heightCm": 105.5,
    "weightKg": 16.8,
    "measurementDate": "2024-12-18",  // optional, defaults to today
    "notes": "Regular checkup"         // optional
  }
  ```

### Food Entries (Updated)

#### `POST /api/food-entries`
Now accepts `childId` in FormData
- FormData fields:
  - `image` (File)
  - `nutritionalData` (JSON string)
  - `mealType` (string, optional)
  - `dateTime` (ISO string)
  - `childId` (UUID string, optional) - **NEW**

#### `GET /api/food-entries`
Now accepts `childId` query parameter to filter entries
- Query params:
  - `childId` (UUID) - Filter entries for specific child
  - ... (existing params)

## File Structure

### New Files Created

```
src/
├── types/
│   └── child.ts                                    # TypeScript types for children and measurements
├── services/
│   └── childService.ts                             # Service functions for children/measurements
├── app/
│   ├── api/
│   │   └── children/
│   │       ├── route.ts                            # GET all, POST new child
│   │       └── [id]/
│   │           ├── route.ts                        # GET, PATCH, DELETE child
│   │           └── measurements/
│   │               └── route.ts                    # GET, POST measurements
│   └── profile/
│       ├── page.tsx                                # Children profile management page
│       └── [id]/
│           └── measurements/
│               └── page.tsx                        # Measurement history page
└── ...

DATABASE_MIGRATION.md                               # SQL migration scripts
CHILDREN_PROFILES_FEATURE.md                        # This documentation file
```

### Modified Files

```
src/
├── services/
│   └── foodEntryService.ts                         # Added child_id support
├── hooks/
│   └── useFoodEntries.ts                           # Added childId parameter
├── screens/
│   └── ResultsScreen.tsx                           # Added child selector
├── components/
│   └── Navigation.tsx                              # Added "Children" nav link
└── app/
    └── api/
        └── food-entries/
            └── route.ts                            # Added child_id handling
```

## Usage Flow

### Complete User Journey

1. **Setup Children Profiles**
   - Navigate to "Children" in the menu
   - Add each child with their information
   - Add initial height/weight measurements

2. **Record Food Entries**
   - Take a photo of food (Camera page)
   - Review nutritional analysis
   - Select which child the food is for (or leave as parent)
   - Save the entry

3. **Track Growth**
   - Regularly add new measurements for each child
   - View measurement history to see growth trends
   - Monitor BMI changes over time

4. **Review History**
   - View all food entries (can be filtered by child in future)
   - See daily summaries
   - Export data if needed

## Security & Privacy

- **Row Level Security (RLS):** All tables use RLS policies
- **User Isolation:** Users can only access their own children and measurements
- **Cascade Deletes:** Deleting a child removes all associated measurements and food entries
- **Authentication Required:** All endpoints require valid user authentication

## Future Enhancements

Potential improvements for this feature:

1. **History Page Filtering**
   - Add child filter dropdown to history page
   - Show child name on food entry cards

2. **Growth Charts**
   - Visualize height/weight trends over time
   - Compare against WHO growth standards
   - BMI percentile tracking

3. **Nutritional Goals**
   - Set age-appropriate nutritional goals per child
   - Track daily/weekly progress
   - Recommendations based on age/sex

4. **Bulk Operations**
   - Import measurements from CSV
   - Export child-specific reports

5. **Photo Gallery**
   - View all food photos for a specific child
   - Create meal plans based on history

## Troubleshooting

### Database Migration Issues

**Problem:** Tables not found errors
- **Solution:** Make sure you ran all SQL migrations in order

**Problem:** Permission denied errors
- **Solution:** Check that RLS policies were created correctly

### Child Not Appearing in Selector

**Problem:** Child shows in profile but not in food entry selector
- **Solution:** Refresh the results page or check browser console for errors

### Measurements Not Saving

**Problem:** Measurement form doesn't save
- **Solution:** Ensure height and weight are positive numbers and date is not in the future

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify database migrations were run correctly
3. Check Supabase logs in the dashboard
4. Review the API endpoint documentation above

## Testing Checklist

Before deploying to production, test:

- [ ] Add a child profile
- [ ] Add initial measurements
- [ ] Add additional measurements
- [ ] View measurement history
- [ ] Take a food photo and associate it with a child
- [ ] Take a food photo for yourself (parent)
- [ ] Edit a child's information
- [ ] Delete a child profile
- [ ] Verify RLS policies (try accessing another user's children)

