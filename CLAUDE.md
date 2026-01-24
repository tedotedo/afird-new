# ARFID Wellness App - Development Notes

## Project Overview
A Next.js app for managing ARFID (Avoidant/Restrictive Food Intake Disorder) with food tracking, nutrition analysis, and progress monitoring.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL with RLS)
- **Styling:** Tailwind CSS
- **Auth:** Supabase Auth
- **Deployment:** Netlify

## Key Features
- Food photo capture and AI analysis
- Food journey tracking with milestones
- Achievement system for encouraging progress
- Children profiles with measurements
- WHO BMI standards comparison

## Database Tables
All tables use Row Level Security (RLS). Required tables:

1. **children** - Child profiles
2. **child_measurements** - Height/weight tracking for children
3. **parent_measurements** - Height/weight tracking for parents
4. **food_entries** - Food log entries
5. **food_milestones** - Tracks new foods tried (required for Food Journey)
6. **achievement_preferences** - Custom achievement settings (required for Food Journey)

## Common Issues

### "Failed to fetch statistics" on Food Journey page
This means database tables are missing. Run the migrations in `supabase/migrations/`:
- `create_food_milestones_table.sql`
- `create_achievement_preferences_table.sql`

### Adding children fails
Run the parental consent migration in `DATABASE_MIGRATION.md` Section 6.

## Development
```bash
npm run dev    # Start dev server
npm run build  # Build for production
```

## Migrations
SQL migrations are in `supabase/migrations/`. Run them manually via Supabase SQL Editor or use `supabase db push` if CLI is configured.
