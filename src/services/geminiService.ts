import { NutritionalData } from '@/types/nutrition';

export async function analyzeFoodImage(
  imageBase64: string,
  mimeType: string = 'image/jpeg'
): Promise<NutritionalData> {
  const response = await fetch('/api/analyze-food', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageBase64,
      mimeType,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || `Failed to analyze food: got status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
}
