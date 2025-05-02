import { create } from 'zustand';
import { Exercise, ExerciseSuggestion } from '../types';
import { DEFAULT_EXERCISES, API_ENDPOINTS } from '../config/constants';

interface ExerciseState {
  exercises: Exercise[];
  currentExercise: Exercise | null;
  loading: boolean;
  error: string | null;
  suggestions: ExerciseSuggestion[];
  fetchExercises: () => Promise<void>;
  setCurrentExercise: (exerciseId: string) => void;
  fetchSuggestions: (userId: string) => Promise<void>;
  getExerciseById: (id: string) => Exercise | undefined;
}

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  exercises: DEFAULT_EXERCISES as Exercise[],
  currentExercise: null,
  loading: false,
  error: null,
  suggestions: [],

  fetchExercises: async () => {
    try {
      set({ loading: true });
      
      // In a real implementation, fetch from API
      // const response = await fetch(API_ENDPOINTS.exercises);
      // if (!response.ok) throw new Error('Failed to fetch exercises');
      // const data = await response.json();
      
      // Simulate API call with default data for now
      setTimeout(() => {
        set({ exercises: DEFAULT_EXERCISES as Exercise[], loading: false });
      }, 500);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch exercises',
        loading: false 
      });
    }
  },

  setCurrentExercise: (exerciseId) => {
    const { exercises } = get();
    const exercise = exercises.find(ex => ex.id === exerciseId);
    set({ currentExercise: exercise || null });
  },

  fetchSuggestions: async (userId) => {
    try {
      set({ loading: true });
      
      // In a real implementation, fetch from API
      // const response = await fetch(`${API_ENDPOINTS.suggestions}?userId=${userId}`);
      // if (!response.ok) throw new Error('Failed to fetch suggestions');
      // const data = await response.json();
      
      // Mock suggestion data for now
      const mockSuggestions: ExerciseSuggestion[] = [
        {
          exerciseId: 'knee-raises',
          confidence: 0.85,
          reason: 'Based on your progress with shoulder exercises, this will complement your recovery plan.'
        },
        {
          exerciseId: 'arm-lifts',
          confidence: 0.75,
          reason: 'Your previous sessions indicate this would be beneficial for your current mobility goals.'
        }
      ];
      
      setTimeout(() => {
        set({ suggestions: mockSuggestions, loading: false });
      }, 500);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch suggestions',
        loading: false 
      });
    }
  },

  getExerciseById: (id) => {
    return get().exercises.find(ex => ex.id === id);
  }
}));