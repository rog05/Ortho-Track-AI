// Type definitions for the application

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bodyPart: string;
  estimatedDuration: number; // in minutes
  recommendedReps: number;
  instructions: string[];
}

export interface Session {
  id: string;
  userId: string;
  exerciseId: string;
  startTime: Date;
  endTime?: Date;
  repsCounted: number;
  completed: boolean;
  duration?: number; // in seconds
  performance?: number; // 0-100 score
  notes?: string;
}

export interface ExerciseSuggestion {
  exerciseId: string;
  confidence: number; // 0-1 score from AI
  reason: string;
}

export interface PoseDetectionResult {
  keypoints: Array<{
    name: string;
    x: number;
    y: number;
    z?: number;
    score?: number;
  }>;
  score: number;
}

export interface TabItem {
  id: string;
  label: string;
  icon: string;
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';