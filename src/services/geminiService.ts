import { GoogleGenAI } from '@google/genai';
import { NutritionalData } from '@/types/nutrition';

function getApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_GEMINI_API_KEY is not set. Please add it to your .env.local file.');
  }
  return apiKey;
}

function getAIClient() {
  const apiKey = getApiKey();
  return new GoogleGenAI({
    apiKey: apiKey,
  });
}

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

export async function analyzeFoodImage(
  imageBase64: string,
  mimeType: string = 'image/jpeg'
): Promise<NutritionalData> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const ai = getAIClient();
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
      model: 'gemini-2.0-flash-exp',
      contents: contents,
    });

    if (!response.text) {
      throw new Error('No response text received from Gemini API');
    }

    const text = response.text.trim();

    // Extract JSON from response (handle markdown code blocks if present)
    let jsonString = text;
    
    // Remove markdown code blocks if present
    if (text.includes('```')) {
      const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        jsonString = jsonMatch[1];
      } else {
        // Try to find JSON object directly
        const directMatch = text.match(/\{[\s\S]*\}/);
        if (directMatch) {
          jsonString = directMatch[0];
        }
      }
    } else {
      // Find JSON object in text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }
    }

    const nutritionalData = JSON.parse(jsonString) as NutritionalData;

    // Validate and clean the data
    return {
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
    };
  } catch (error: any) {
    console.error('Error analyzing food with Gemini:', error);
    
    const errorMessage = error.message || error.toString() || 'Unknown error';
    const lowerMessage = errorMessage.toLowerCase();
    
    // Check for quota-related errors
    if (lowerMessage.includes('quota') || 
        lowerMessage.includes('rate limit') || 
        lowerMessage.includes('resource exhausted') ||
        lowerMessage.includes('429') ||
        error.status === 429) {
      throw new Error('API quota exceeded. Please try again later or check your Gemini API quota limits.');
    }
    
    if (lowerMessage.includes('api key') || lowerMessage.includes('authentication')) {
      throw new Error('Invalid or missing Gemini API key');
    }
    
    if (lowerMessage.includes('json') || lowerMessage.includes('parse')) {
      throw new Error('Failed to parse nutritional data from API response');
    }
    
    throw new Error(`Failed to analyze food: ${errorMessage}`);
  }
}

