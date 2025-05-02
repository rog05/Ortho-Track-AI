import { create } from 'zustand';
import { User, AuthStatus } from '../types';

interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: string | null;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => void;
}

// Mock user storage
const STORAGE_KEY = 'orthotrack_user';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'loading',
  error: null,

  signUp: async (email, password, displayName) => {
    try {
      set({ error: null });
      
      // Simple validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create user object
      const newUser: User = {
        uid: `user_${Date.now()}`,
        email,
        displayName: displayName || '',
        photoURL: '',
        createdAt: new Date()
      };
      
      // Store user in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      
      set({ 
        user: newUser,
        status: 'authenticated'
      });
    } catch (error) {
      console.error('Sign up error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign up',
        status: 'unauthenticated'
      });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ error: null });
      
      // Get stored user
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (!storedUser) {
        throw new Error('Invalid email or password');
      }
      
      const user = JSON.parse(storedUser) as User;
      if (user.email !== email) {
        throw new Error('Invalid email or password');
      }
      
      set({ 
        user,
        status: 'authenticated'
      });
    } catch (error) {
      console.error('Sign in error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign in',
        status: 'unauthenticated' 
      });
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      set({ user: null, status: 'unauthenticated' });
    } catch (error) {
      console.error('Logout error:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to log out' });
    }
  },

  initialize: () => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        set({ user, status: 'authenticated' });
      } else {
        set({ status: 'unauthenticated' });
      }
    } catch (error) {
      console.error('Initialization error:', error);
      set({ status: 'unauthenticated' });
    }
  }
}));