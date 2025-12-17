# Food Nutrition Analyzer (Web)

A Next.js web app that captures food photos, analyzes them using Google Gemini 2.0 Flash Exp API, and displays detailed nutritional information along with the date and time the photo was taken.

## Features

- 📸 Capture food photos using device camera
- 🖼️ Select images from file system
- 🤖 AI-powered nutritional analysis using Gemini 2.0 Flash Exp
- 📊 Detailed nutrition breakdown (calories, macros, micros)
- 📅 Date and time tracking
- 🎨 Modern, responsive UI with Tailwind CSS

## Setup

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

3. Get a Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file

### Running the App

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page (camera screen)
│   ├── results/
│   │   └── page.tsx          # Results page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── screens/
│   ├── CameraScreen.tsx      # Camera capture and file selection
│   └── ResultsScreen.tsx     # Display analysis results
├── components/
│   ├── FoodImageDisplay.tsx  # Food image display component
│   ├── DateTimeDisplay.tsx   # Date/time display component
│   └── NutritionCard.tsx     # Nutrition information cards
├── services/
│   ├── geminiService.ts      # Gemini API integration
│   └── imageService.ts       # Image processing utilities (Canvas API)
├── types/
│   ├── nutrition.ts          # TypeScript type definitions
│   └── navigation.ts         # Navigation types (not used in web)
└── utils/
    └── dateUtils.ts          # Date formatting utilities
```

## How It Works

1. **Image Capture**: User takes a photo using webcam or selects from file system
2. **Image Processing**: Image is resized using Canvas API to optimize API token usage (max 1024px)
3. **AI Analysis**: Image is sent to Gemini 2.0 Flash Exp API for nutritional analysis
4. **Results Display**: Nutritional data, date/time, and image are displayed

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variable `EXPO_PUBLIC_GEMINI_API_KEY`
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Future Enhancements

- Database integration for saving food entries
- Historical tracking and trends
- User profiles and authentication
- Export functionality
- Meal planning features

## License

Private project
