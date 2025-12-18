export interface Child {
  id: string;
  user_id: string;
  name: string;
  date_of_birth: string;
  sex: 'male' | 'female' | 'other';
  created_at: string;
  updated_at: string;
}

export interface ChildMeasurement {
  id: string;
  child_id: string;
  height_cm: number;
  weight_kg: number;
  measurement_date: string;
  notes?: string;
  created_at: string;
}

export interface CreateChildInput {
  name: string;
  dateOfBirth: Date;
  sex: 'male' | 'female' | 'other';
  initialHeight?: number;
  initialWeight?: number;
}

export interface UpdateChildInput {
  name?: string;
  dateOfBirth?: Date;
  sex?: 'male' | 'female' | 'other';
}

export interface CreateMeasurementInput {
  childId: string;
  heightCm: number;
  weightKg: number;
  measurementDate: Date;
  notes?: string;
}

export interface ChildWithLatestMeasurement extends Child {
  latestMeasurement?: ChildMeasurement;
}

