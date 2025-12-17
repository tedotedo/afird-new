'use client';

import { useState, useEffect, useCallback } from 'react';
import { FoodEntry } from '@/services/foodEntryService';
import { NutritionalData } from '@/types/nutrition';

interface UseFoodEntriesOptions {
  startDate?: Date;
  endDate?: Date;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  limit?: number;
  autoFetch?: boolean;
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

      const response = await fetch(`/api/food-entries?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }

      const data = await response.json();
      setEntries(data.entries || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch entries');
    } finally {
      setLoading(false);
    }
  }, [fetchOptions.startDate, fetchOptions.endDate, fetchOptions.mealType, fetchOptions.limit]);

  useEffect(() => {
    if (autoFetch) {
      fetchEntries();
    }
  }, [autoFetch, fetchEntries]);

  const saveEntry = async (
    imageFile: File,
    nutritionalData: NutritionalData,
    mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    dateTime?: Date
  ): Promise<FoodEntry> => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('nutritionalData', JSON.stringify(nutritionalData));
      if (mealType) {
        formData.append('mealType', mealType);
      }
      formData.append('dateTime', (dateTime || new Date()).toISOString());

      const response = await fetch('/api/food-entries', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save entry');
      }

      const data = await response.json();
      const newEntry = data.entry;

      // Add to local state
      setEntries((prev) => [newEntry, ...prev]);

      return newEntry;
    } catch (err: any) {
      setError(err.message || 'Failed to save entry');
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
        throw new Error(errorData.error || 'Failed to delete entry');
      }

      // Remove from local state
      setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete entry');
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

