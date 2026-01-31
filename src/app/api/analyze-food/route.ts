import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const NUTRITION_PROMPT = `Analyze this food image and provide detailed nutritional information including vitamins and minerals.

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just the JSON):
{
  "meal_type": "breakfast" | "lunch" | "dinner" | "snack",
  "food_items": ["item1", "item2", ...],
  "description": "brief description of the meal",
  "calories": number,
  "protein": number,
  "carbohydrates": number,
  "fat": number,
  "fiber": number,
  "sugar": number,
  "sodium": number,
  "vitamins": {
    "vitaminA": number (mcg RAE),
    "vitaminB1": number (mg),
    "vitaminB2": number (mg),
    "vitaminB3": number (mg),
    "vitaminB6": number (mg),
    "vitaminB12": number (mcg),
    "vitaminC": number (mg),
    "vitaminD": number (mcg),
    "vitaminE": number (mg),
    "vitaminK": number (mcg),
    "folate": number (mcg)
  },
  "minerals": {
    "calcium": number (mg),
    "iron": number (mg),
    "magnesium": number (mg),
    "phosphorus": number (mg),
    "potassium": number (mg),
    "zinc": number (mg),
    "copper": number (mg),
    "manganese": number (mg),
    "selenium": number (mcg)
  }
}

Units: grams for macros, milligrams (mg) for most minerals and some vitamins, micrograms (mcg) for trace vitamins/minerals, kcal for calories.
If you cannot determine a value, use null for that field. Only include vitamins and minerals that are present in significant amounts.
Be as accurate as possible with your estimates.`;

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { imageBase64, mimeType = 'image/jpeg' } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const contents = [
      {
        inlineData: {
          mimeType: mimeType,
          data: imageBase64,
        },
      },
      { text: NUTRITION_PROMPT },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contents,
    });

    if (!response.text) {
      return NextResponse.json(
        { error: 'No response received from Gemini API' },
        { status: 500 }
      );
    }

    const text = response.text.trim();

    // Extract JSON from response (handle markdown code blocks if present)
    let jsonString = text;

    if (text.includes('```')) {
      const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        jsonString = jsonMatch[1];
      } else {
        const directMatch = text.match(/\{[\s\S]*\}/);
        if (directMatch) {
          jsonString = directMatch[0];
        }
      }
    } else {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }
    }

    const nutritionalData = JSON.parse(jsonString);

    return NextResponse.json({
      meal_type: nutritionalData.meal_type || undefined,
      food_items: nutritionalData.food_items || [],
      description: nutritionalData.description || undefined,
      calories: nutritionalData.calories ?? undefined,
      protein: nutritionalData.protein ?? undefined,
      carbohydrates: nutritionalData.carbohydrates ?? undefined,
      fat: nutritionalData.fat ?? undefined,
      fiber: nutritionalData.fiber ?? undefined,
      sugar: nutritionalData.sugar ?? undefined,
      sodium: nutritionalData.sodium ?? undefined,
      vitamins: nutritionalData.vitamins || undefined,
      minerals: nutritionalData.minerals || undefined,
    });
  } catch (error: any) {
    console.error('Error analyzing food with Gemini:', error);

    const errorMessage = error.message || error.toString() || 'Unknown error';
    const lowerMessage = errorMessage.toLowerCase();

    if (error.status === 429 ||
        lowerMessage.includes('quota exceeded') ||
        lowerMessage.includes('rate limit') ||
        lowerMessage.includes('quota')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (lowerMessage.includes('resource exhausted') ||
        lowerMessage.includes('exceeded maximum') ||
        lowerMessage.includes('too large') ||
        lowerMessage.includes('compute limit')) {
      return NextResponse.json(
        { error: 'The image is too complex to process. Try a clearer photo or smaller image.' },
        { status: 413 }
      );
    }

    if (lowerMessage.includes('api key') || lowerMessage.includes('authentication')) {
      return NextResponse.json(
        { error: 'Invalid or missing Gemini API key' },
        { status: 500 }
      );
    }

    if (lowerMessage.includes('json') || lowerMessage.includes('parse')) {
      return NextResponse.json(
        { error: 'Failed to parse nutritional data from API response' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Failed to analyze food: ${errorMessage}` },
      { status: 500 }
    );
  }
}
