import { create } from 'zustand';
import { Session } from '../types';
import { MOCK_SESSIONS, API_ENDPOINTS } from '../config/constants';

interface SessionState {
  sessions: Session[];
  currentSession: Session | null;
  loading: boolean;
  error: string | null;
  fetchUserSessions: (userId: string) => Promise<void>;
  startSession: (userId: string, exerciseId: string) => Promise<Session>;
  completeSession: (sessionId: string, repsCounted: number, notes?: string) => Promise<void>;
  updateSessionRepCount: (sessionId: string, repCount: number) => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  sessions: [],
  currentSession: null,
  loading: false,
  error: null,

  fetchUserSessions: async (userId) => {
    try {
      set({ loading: true });
      
      // In a real implementation, fetch from API or Firestore
      // const response = await fetch(`${API_ENDPOINTS.sessions}?userId=${userId}`);
      // if (!response.ok) throw new Error('Failed to fetch sessions');
      // const data = await response.json();
      
      // Use mock data for now
      setTimeout(() => {
        set({ 
          sessions: MOCK_SESSIONS as Session[], 
          loading: false 
        });
      }, 500);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch sessions',
        loading: false 
      });
    }
  },

  startSession: async (userId, exerciseId) => {
    try {
      set({ loading: true });
      
      // In a real implementation, create via API
      // const response = await fetch(API_ENDPOINTS.startSession, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, exerciseId })
      // });
      // if (!response.ok) throw new Error('Failed to start session');
      // const data = await response.json();
      
      // Create a new session
      const newSession: Session = {
        id: `session-${Date.now()}`,
        userId,
        exerciseId,
        startTime: new Date(),
        repsCounted: 0,
        completed: false
      };
      
      set(state => ({ 
        currentSession: newSession,
        sessions: [...state.sessions, newSession],
        loading: false
      }));
      
      return newSession;
    } catch (error) {
      console.error('Error starting session:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to start session',
        loading: false 
      });
      throw error;
    }
  },

  completeSession: async (sessionId, repsCounted, notes) => {
    try {
      set({ loading: true });
      
      // Find the session to update
      const { sessions, currentSession } = get();
      const sessionToUpdate = sessions.find(s => s.id === sessionId);
      
      if (!sessionToUpdate) {
        throw new Error('Session not found');
      }
      
      // Calculate duration
      const endTime = new Date();
      const duration = sessionToUpdate.startTime 
        ? Math.floor((endTime.getTime() - sessionToUpdate.startTime.getTime()) / 1000) 
        : 0;
      
      // In a real implementation, update via API
      // const response = await fetch(API_ENDPOINTS.completeSession, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     sessionId, 
      //     repsCounted, 
      //     endTime, 
      //     duration,
      //     notes 
      //   })
      // });
      // if (!response.ok) throw new Error('Failed to complete session');
      
      // Update the session
      const updatedSession: Session = {
        ...sessionToUpdate,
        repsCounted,
        endTime,
        duration,
        completed: true,
        notes,
        // Simple performance calculation (could be more sophisticated)
        performance: Math.min(repsCounted * 8, 100)
      };
      
      set(state => ({ 
        sessions: state.sessions.map(s => s.id === sessionId ? updatedSession : s),
        currentSession: currentSession?.id === sessionId ? updatedSession : currentSession,
        loading: false
      }));
    } catch (error) {
      console.error('Error completing session:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to complete session',
        loading: false 
      });
    }
  },

  updateSessionRepCount: (sessionId, repCount) => {
    set(state => ({
      currentSession: state.currentSession?.id === sessionId 
        ? { ...state.currentSession, repsCounted: repCount }
        : state.currentSession,
      sessions: state.sessions.map(s => 
        s.id === sessionId ? { ...s, repsCounted: repCount } : s
      )
    }));
  }
}));