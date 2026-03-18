# AFIRD Food Tracker - Project Overview

## 🎯 Application Purpose
The AFIRD Food Tracker is an AI-powered Next.js web application designed to help users track nutritional intake and physical development. It enables users to take or upload food photos, automates nutritional analysis using Google's Gemini AI, and manages detailed growth tracking for children.

## 🛠️ Technology Stack & Architecture
- **Frontend Framework**: Next.js 14 (App Router) & React 18
- **Styling**: Tailwind CSS & PostCSS
- **Database & Authentication**: Supabase (PostgreSQL with Row Level Security)
- **AI Integration**: Google Gemini 2.0 Flash Exp API (`@google/genai`)
- **Data Visualization**: Recharts (for BMI and growth trends)
- **Additional Utilities**: `date-fns` (time/date formatting), `jspdf` (report generation)
- **Deployment Hub**: Configured primarily for Netlify deployment (`netlify.toml`)

## 🔑 Core Features

### 1. AI-Powered Food Analysis
- **Image Processing**: Users can capture device camera photos or upload files. The Canvas API handles client-side resizing (max 1024px) to optimize API token boundaries.
- **Nutritional Breakdown**: Powered by Gemini AI, the app scans the plate to estimate and deliver detailed metrics on calories, macronutrients (carbs, proteins, fats), and micronutrients.

### 2. Comprehensive Child Profiles
- **Profile Management**: Parents can create and maintain distinct profiles for multiple children, tracking their Name, Date of Birth, and biological Sex.
- **Privacy First**: Fully structured under Supabase Row Level Security to uniquely secure users' profiles and prevent data overlaps.

### 3. Growth & BMI Tracking
- **Sequential Measurement Logs**: Chronologically records height and weight inputs with date identifiers and custom notes.
- **Automated Trend Calculation**: Automatically updates current BMI metrics based on recent measurement entries and highlights immediate proportional growth shifts (positive/negative deltas) since the last input.

### 4. Direct Food Entry Association
- **Smart Attribution**: AI-processed food nutrition logs can be attached explicitly to a specific child's profile or saved independently under the parent's default log.

## 🗄️ Database Schema Summary
The Supabase PostgreSQL database utilizes three primary components linking data cleanly:

1. **`children` Table**:
   - Stores the core parameters: `name`, `dob`, `sex`.
   - Contains a one-to-many relationship linking outbound to measurements and meal entries.

2. **`child_measurements` Table**:
   - Maps chronologically updated `height` and `weight` fields.
   - Linked explicitly to the `children` reference table.

3. **`food_entries` Table**:
   - Contains the actual historical AI-processed meal log entries.
   - Includes a `child_id` column to route independent meals to specified children (null routes default back to parent records).

## 🚀 Future Roadmap & Enhancements
Current goals based on implementation documentation include:
- Implementing visual growth chart projections based directly on official WHO standard comparisons.
- Constructing age-appropriate nutritional targets and alerts based on registered children.
- Enhanced dataset handling (child-specific historical filtering and comprehensive PDF export/backup utilities).
