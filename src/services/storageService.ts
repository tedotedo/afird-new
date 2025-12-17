import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Upload food image to Supabase Storage
 * @param supabase - Supabase client instance (server or client)
 * @param file - File object or Blob
 * @param userId - User ID for folder structure
 * @param entryId - Entry ID for unique filename
 * @returns Public URL and storage path
 */
export async function uploadFoodImage(
  supabase: SupabaseClient,
  file: File | Blob,
  userId: string,
  entryId: string
): Promise<{ url: string; path: string }> {
  // Check file size (50 MB limit for Supabase free tier)
  const maxSize = 50 * 1024 * 1024; // 50 MB in bytes
  if (file.size > maxSize) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    throw new Error(`Image is too large. Maximum file size is 50 MB. Your file is ${fileSizeMB} MB.`);
  }

  // Check if file is a File object (safely handle environments where File might not be defined)
  const isFile = typeof File !== 'undefined' && file instanceof File;
  const fileExt = isFile ? (file as File).name.split('.').pop() : 'jpg';
  const fileName = `${entryId}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Convert file/blob to array buffer
  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from('food-images')
    .upload(filePath, arrayBuffer, {
      contentType: isFile ? (file as File).type : 'image/jpeg',
      upsert: false,
    });

  if (error) {
    const errorMessage = error.message || 'Unknown error';
    const lowerMessage = errorMessage.toLowerCase();
    
    // Check for quota-related errors
    if (lowerMessage.includes('quota') || 
        lowerMessage.includes('storage quota') ||
        lowerMessage.includes('insufficient')) {
      throw new Error('Storage quota exceeded. Please check your Supabase storage limits or contact support.');
    }
    
    throw new Error(`Failed to upload image: ${errorMessage}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('food-images')
    .getPublicUrl(filePath);

  return {
    url: urlData.publicUrl,
    path: filePath,
  };
}

/**
 * Delete food image from Supabase Storage
 * @param supabase - Supabase client instance (server or client)
 * @param storagePath - Storage path of the image
 */
export async function deleteFoodImage(
  supabase: SupabaseClient,
  storagePath: string
): Promise<void> {
  const { error } = await supabase.storage
    .from('food-images')
    .remove([storagePath]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

