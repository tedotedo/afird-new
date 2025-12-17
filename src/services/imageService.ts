export interface ResizeResult {
  dataUrl: string;
  width: number;
  height: number;
  mimeType: string;
}

/**
 * Resize image to optimize for Gemini API token usage
 * Target: Keep under 1024px to minimize tiling
 * Uses Canvas API for web
 */
export async function resizeImageForAnalysis(
  imageFile: File | string,
  maxDimension: number = 1024
): Promise<ResizeResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        // Calculate new dimensions maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }
        
        // Create canvas and resize
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 data URL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        
        resolve({
          dataUrl,
          width: Math.round(width),
          height: Math.round(height),
          mimeType: 'image/jpeg',
        });
      } catch (error) {
        reject(new Error('Failed to resize image'));
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    // Set image source
    if (typeof imageFile === 'string') {
      img.src = imageFile;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(imageFile);
    }
  });
}

/**
 * Convert image to base64 string
 * Extracts base64 from data URL
 */
export async function convertToBase64(dataUrl: string): Promise<string> {
  // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64 = dataUrl.includes(',')
    ? dataUrl.split(',')[1]
    : dataUrl;
  return base64;
}

/**
 * Validate image format
 */
export function isValidImageFormat(mimeType: string): boolean {
  const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validFormats.includes(mimeType.toLowerCase());
}
