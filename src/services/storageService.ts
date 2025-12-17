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
    throw new Error(`Failed to upload image: ${error.message}`);
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

