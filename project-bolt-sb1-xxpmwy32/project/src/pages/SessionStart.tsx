import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SessionTracker from '../components/session/SessionTracker';
import Loading from '../components/common/Loading';
import { useAuthStore } from '../store/authStore';
import { useExerciseStore } from '../store/exerciseStore';
import { useSessionStore } from '../store/sessionStore';

const SessionStart: React.FC = () => {
  const navigate = useNavigate();
  const { user, status } = useAuthStore();
  const { currentExercise } = useExerciseStore();
  const { startSession, updateSessionRepCount, completeSession, currentSession } = useSessionStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      navigate('/login');
      return;
    }
    
    const initSession = async () => {
      if (!user || !currentExercise) {
        navigate('/exercises');
        return;
      }
      
      try {
        setIsLoading(true);
        if (!currentSession) {
          const session = await startSession(user.uid, currentExercise.id);
          setSessionId(session.id);
        } else {
          setSessionId(currentSession.id);
        }
      } catch (error) {
        console.error('Error starting session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initSession();
  }, [navigate, user, currentExercise, status, startSession, currentSession]);
  
  const handleRepCount = (repCount: number) => {
    if (sessionId) {
      updateSessionRepCount(sessionId, repCount);
    }
  };
  
  const handleCompleteSession = async (repCount: number, notes?: string) => {
    if (!sessionId) return;
    
    try {
      await completeSession(sessionId, repCount, notes);
      navigate('/sessions');
    } catch (error) {
      console.error('Error completing session:', error);
    }
  };
  
  if (isLoading || !currentExercise || !sessionId || !currentSession) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loading size="large" message="Preparing your session..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Exercise Session</h1>
            <p className="text-neutral-600">
              Complete your exercise with guidance and tracking
            </p>
          </div>
          
          <SessionTracker
            exercise={currentExercise}
            session={currentSession}
            onRepCount={handleRepCount}
            onComplete={handleCompleteSession}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SessionStart;