import { FoodAnalysisResult } from './nutrition';

export type RootStackParamList = {
  Camera: undefined;
  Results: { result: FoodAnalysisResult };
};

