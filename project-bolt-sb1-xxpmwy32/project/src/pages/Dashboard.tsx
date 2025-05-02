import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Activity, Clock, Users } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Tabs from '../components/common/Tabs';
import StatCard from '../components/dashboard/StatCard';
import RecentSessions from '../components/dashboard/RecentSessions';
import SuggestionCard from '../components/dashboard/SuggestionCard';
import { DASHBOARD_TABS } from '../config/constants';
import { useAuthStore } from '../store/authStore';
import { useSessionStore } from '../store/sessionStore';
import { useExerciseStore } from '../store/exerciseStore';
import Loading from '../components/common/Loading';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  
  const { user, status } = useAuthStore();
  const { exercises, suggestions, fetchExercises, fetchSuggestions, setCurrentExercise } = useExerciseStore();
  const { sessions, fetchUserSessions, startSession } = useSessionStore();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (status === 'authenticated' && user) {
      const loadData = async () => {
        setIsLoading(true);
        await Promise.all([
          fetchExercises(),
          fetchUserSessions(user.uid),
          fetchSuggestions(user.uid)
        ]);
        setIsLoading(false);
      };
      
      loadData();
    }
  }, [fetchExercises, fetchUserSessions, fetchSuggestions, user, status]);
  
  const handleSuggestionStart = (exerciseId: string) => {
    setCurrentExercise(exerciseId);
    navigate('/exercise/session/start');
  };
  
  const handleViewAllSessions = () => {
    navigate('/sessions');
  };
  
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loading size="large" message="Loading dashboard..." />
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    navigate('/login');
    return null;
  }
  
  // Calculate statistics
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.completed).length;
  const totalReps = sessions.reduce((sum, session) => sum + session.repsCounted, 0);
  const totalMinutes = sessions.reduce((sum, session) => {
    const duration = session.duration || 0;
    return sum + Math.floor(duration / 60);
  }, 0);
  
  // Find exercises for suggestions
  const suggestedExercises = suggestions.map(s => {
    const exercise = exercises.find(ex => ex.id === s.exerciseId);
    return {
      suggestion: s,
      exercise: exercise
    };
  }).filter(item => item.exercise);
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">Welcome back, {user?.displayName || 'User'}</h1>
            <p className="text-neutral-600">Here's an overview of your recovery progress</p>
          </div>
          
          <Tabs
            tabs={DASHBOARD_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="pills"
          />
          
          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total Sessions"
                    value={totalSessions}
                    icon={<Calendar size={20} className="text-primary-600" />}
                    trend={totalSessions > 0 ? { value: '+2', positive: true } : undefined}
                  />
                  <StatCard
                    title="Total Exercises"
                    value={exercises.length}
                    icon={<Activity size={20} className="text-primary-600" />}
                  />
                  <StatCard
                    title="Total Reps"
                    value={totalReps}
                    icon={<Activity size={20} className="text-primary-600" />}
                    trend={totalReps > 0 ? { value: '+15', positive: true } : undefined}
                  />
                  <StatCard
                    title="Active Minutes"
                    value={totalMinutes}
                    icon={<Clock size={20} className="text-primary-600" />}
                    trend={totalMinutes > 0 ? { value: '+23', positive: true } : undefined}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <RecentSessions 
                      sessions={sessions} 
                      exercises={exercises}
                      onViewAll={handleViewAllSessions}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-neutral-900">Recommended Exercises</h2>
                    
                    {suggestedExercises.length > 0 ? (
                      <div className="space-y-4">
                        {suggestedExercises.map(({ suggestion, exercise }) => (
                          exercise && (
                            <SuggestionCard
                              key={suggestion.exerciseId}
                              suggestion={suggestion}
                              exercise={exercise}
                              onStart={() => handleSuggestionStart(exercise.id)}
                            />
                          )
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-neutral-500">
                          Complete more sessions to get personalized recommendations
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'patients' && (
              <div className="animate-fadeIn bg-white rounded-lg shadow p-6">
                <div className="text-center py-10">
                  <Users size={48} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Patient Management</h3>
                  <p className="text-neutral-500">
                    Patient management features will be available in the next update.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'tracking' && (
              <div className="animate-fadeIn bg-white rounded-lg shadow p-6">
                <div className="text-center py-10">
                  <Activity size={48} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Motion Tracking</h3>
                  <p className="text-neutral-500 mb-4">
                    Track your exercises using our advanced motion detection.
                  </p>
                  <button 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    onClick={() => navigate('/exercises')}
                  >
                    Browse available exercises
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'exercises' && (
              <div className="animate-fadeIn bg-white rounded-lg shadow p-6">
                <div className="text-center py-10">
                  <Calendar size={48} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Start Today's Exercise</h3>
                  <p className="text-neutral-500 mb-4">
                    Choose an exercise from our library to begin your session.
                  </p>
                  <button 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    onClick={() => navigate('/exercises')}
                  >
                    Browse exercises
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;