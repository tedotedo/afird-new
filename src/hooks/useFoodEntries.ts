'use client';

import { useState, useEffect, useCallback } from 'react';
import { FoodEntry } from '@/services/foodEntryService';
import { NutritionalData } from '@/types/nutrition';
import { resizeFileForUpload } from '@/services/imageService';

interface UseFoodEntriesOptions {
  startDate?: Date;
  endDate?: Date;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  limit?: number;
  autoFetch?: boolean;
  childId?: string;
}

export function useFoodEntries(options: UseFoodEntriesOptions = {}) {
  const { autoFetch = true, ...fetchOptions } = options;
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (fetchOptions.startDate) {
        params.append('startDate', fetchOptions.startDate.toISOString());
      }
      if (fetchOptions.endDate) {
        params.append('endDate', fetchOptions.endDate.toISOString());
      }
      if (fetchOptions.mealType) {
        params.append('mealType', fetchOptions.mealType);
      }
      if (fetchOptions.limit) {
        params.append('limit', fetchOptions.limit.toString());
      }
      if (fetchOptions.childId) {
        params.append('childId', fetchOptions.childId);
      }

      const response = await fetch(`/api/food-entries?${params.toString()}`);
      if (!response.ok) {
        throw new Error('ENTRIES_FETCH_FAILED');
      }

      const data = await response.json();
      setEntries(data.entries || []);
    } catch (err: any) {
      console.error('Error fetching food entries:', err);
      setError("We couldn't load your food entries right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [fetchOptions.startDate, fetchOptions.endDate, fetchOptions.mealType, fetchOptions.limit, fetchOptions.childId]);

  useEffect(() => {
    if (autoFetch) {
      fetchEntries();
    }
  }, [autoFetch, fetchEntries]);

  const saveEntry = async (
    imageFile: File,
    nutritionalData: NutritionalData,
    mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    dateTime?: Date,
    childId?: string
  ): Promise<FoodEntry> => {
    try {
      setLoading(true);
      setError(null);

      // Resize/compress before upload to reduce storage usage
      const optimizedFile = await resizeFileForUpload(imageFile);

      const formData = new FormData();
      formData.append('image', optimizedFile);
      formData.append('nutritionalData', JSON.stringify(nutritionalData));
      if (mealType) {
        formData.append('mealType', mealType);
      }
      if (childId) {
        formData.append('childId', childId);
      }
      formData.append('dateTime', (dateTime || new Date()).toISOString());

      const response = await fetch('/api/food-entries', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "We couldn't save this entry. Please try again.");
      }

      const data = await response.json();
      const newEntry = data.entry;

      // Add to local state
      setEntries((prev) => [newEntry, ...prev]);

      return newEntry;
    } catch (err: any) {
      console.error('Error saving food entry:', err);
      setError("We couldn't save this entry. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (entryId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/food-entries/${entryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "We couldn't delete this entry. Please try again.");
      }

      // Remove from local state
      setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
    } catch (err: any) {
      console.error('Error deleting food entry:', err);
      setError("We couldn't delete this entry. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    entries,
    loading,
    error,
    fetchEntries,
    saveEntry,
    deleteEntry,
    refetch: fetchEntries,
  };
}

