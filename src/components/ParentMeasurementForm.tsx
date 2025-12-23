'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import type { CreateParentMeasurementInput } from '@/types/parent';

interface ParentMeasurementFormProps {
  onSubmit: (data: CreateParentMeasurementInput) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<CreateParentMeasurementInput>;
}

export function ParentMeasurementForm({
  onSubmit,
  onCancel,
  initialData,
}: ParentMeasurementFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateParentMeasurementInput>({
    height_cm: initialData?.height_cm || 0,
    weight_kg: initialData?.weight_kg || 0,
    measurement_date: initialData?.measurement_date || format(new Date(), 'yyyy-MM-dd'),
    notes: initialData?.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.height_cm <= 0 || formData.height_cm > 300) {
      setError('Height must be between 1 and 300 cm');
      return;
    }

    if (formData.weight_kg <= 0 || formData.weight_kg > 500) {
      setError('Weight must be between 1 and 500 kg');
      return;
    }

    if (!formData.measurement_date) {
      setError('Measurement date is required');
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save measurement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Height */}
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
          Height (cm) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="height"
          step="0.1"
          min="1"
          max="300"
          required
          value={formData.height_cm || ''}
          onChange={(e) =>
            setFormData({ ...formData, height_cm: parseFloat(e.target.value) || 0 })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 170.5"
        />
        <p className="text-xs text-gray-500 mt-1">Your height in centimeters</p>
      </div>

      {/* Weight */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
          Weight (kg) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="weight"
          step="0.1"
          min="1"
          max="500"
          required
          value={formData.weight_kg || ''}
          onChange={(e) =>
            setFormData({ ...formData, weight_kg: parseFloat(e.target.value) || 0 })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 70.5"
        />
        <p className="text-xs text-gray-500 mt-1">Your current weight in kilograms</p>
      </div>

      {/* Measurement Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Measurement Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          required
          value={formData.measurement_date}
          onChange={(e) =>
            setFormData({ ...formData, measurement_date: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Any additional notes about this measurement..."
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
        >
          {isLoading ? 'Saving...' : 'Save Measurement'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}


