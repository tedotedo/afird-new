/**
 * Type definitions for parent measurements
 */

export interface ParentMeasurement {
  id: string;
  user_id: string;
  height_cm: number;
  weight_kg: number;
  measurement_date: string; // ISO date string
  notes?: string;
  created_at: string;
}

export interface CreateParentMeasurementInput {
  height_cm: number;
  weight_kg: number;
  measurement_date: string; // ISO date string
  notes?: string;
}

export interface UpdateParentMeasurementInput {
  height_cm?: number;
  weight_kg?: number;
  measurement_date?: string;
  notes?: string;
}

