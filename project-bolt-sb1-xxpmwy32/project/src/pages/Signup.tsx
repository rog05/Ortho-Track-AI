import React from 'react';
import { Navigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { useAuthStore } from '../store/authStore';
import Loading from '../components/common/Loading';

const Signup: React.FC = () => {
  const { user, status } = useAuthStore();
  
  // If already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loading size="large" message="Loading..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary-600 text-white p-3 rounded-lg">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900">OrthoTrack AI</h1>
        <p className="text-neutral-600 mt-2">Create an account to start your recovery journey</p>
      </div>
      
      <SignupForm />
      
      <p className="mt-8 text-sm text-neutral-500">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-primary-600 hover:text-primary-500">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary-600 hover:text-primary-500">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default Signup;