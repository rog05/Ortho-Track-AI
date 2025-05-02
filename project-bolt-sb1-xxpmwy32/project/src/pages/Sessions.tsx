import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Filter, Search } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SessionCard from '../components/session/SessionCard';
import Loading from '../components/common/Loading';
import { useAuthStore } from '../store/authStore';
import { useSessionStore } from '../store/sessionStore';
import { useExerciseStore } from '../store/exerciseStore';
import { Session, Exercise } from '../types';
import { format } from 'date-fns';

const Sessions: React.FC = () => {
  const navigate = useNavigate();
  const { user, status } = useAuthStore();
  const { sessions, fetchUserSessions } = useSessionStore();
  const { exercises, fetchExercises } = useExerciseStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [dateFilter, setDateFilter] = useState('all');
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      navigate('/login');
    }
    
    const loadData = async () => {
      setIsLoading(true);
      if (user) {
        await Promise.all([
          fetchUserSessions(user.uid),
          fetchExercises()
        ]);
      }
      setIsLoading(false);
    };
    
    loadData();
  }, [fetchUserSessions, fetchExercises, navigate, status, user]);
  
  useEffect(() => {
    let result = [...sessions];
    
    // Apply search filter (by exercise name)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(session => {
        const exercise = exercises.find(ex => ex.id === session.exerciseId);
        return exercise && exercise.name.toLowerCase().includes(term);
      });
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      switch (dateFilter) {
        case 'today':
          result = result.filter(session => {
            const sessionDate = new Date(session.startTime);
            return sessionDate >= today;
          });
          break;
        case 'week':
          const lastWeek = new Date(today);
          lastWeek.setDate(lastWeek.getDate() - 7);
          result = result.filter(session => {
            const sessionDate = new Date(session.startTime);
            return sessionDate >= lastWeek;
          });
          break;
        case 'month':
          const lastMonth = new Date(today);
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          result = result.filter(session => {
            const sessionDate = new Date(session.startTime);
            return sessionDate >= lastMonth;
          });
          break;
        default:
          break;
      }
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    
    setFilteredSessions(result);
  }, [sessions, searchTerm, dateFilter, exercises]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSessionClick = (session: Session) => {
    // Navigate to session details in the future
    console.log('Session clicked:', session);
  };
  
  const getExerciseForSession = (session: Session): Exercise | undefined => {
    return exercises.find(ex => ex.id === session.exerciseId);
  };
  
  const groupSessionsByDate = (sessions: Session[]) => {
    const grouped: { [date: string]: Session[] } = {};
    
    sessions.forEach(session => {
      const date = format(new Date(session.startTime), 'MMM dd, yyyy');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(session);
    });
    
    return grouped;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loading size="large" message="Loading sessions..." />
      </div>
    );
  }
  
  const groupedSessions = groupSessionsByDate(filteredSessions);
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Exercise Sessions</h1>
            <p className="text-neutral-600">
              Track and review your exercise progress
            </p>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-neutral-500" />
              </div>
              <input
                type="text"
                placeholder="Search sessions..."
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md 
                          shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 
                          focus:border-primary-500 sm:text-sm"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-neutral-500" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 
                          focus:outline-none focus:ring-primary-500 focus:border-primary-500 
                          sm:text-sm rounded-md"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
          
          {Object.keys(groupedSessions).length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Calendar size={48} className="mx-auto text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No sessions found</h3>
              <p className="text-neutral-500">
                Start an exercise to create your first session.
              </p>
              <button
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => navigate('/exercises')}
              >
                Browse exercises
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedSessions).map(([date, dateSessions]) => (
                <div key={date}>
                  <h3 className="text-lg font-medium text-neutral-900 mb-4 flex items-center">
                    <Calendar size={18} className="text-primary-600 mr-2" />
                    {date}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {dateSessions.map((session) => {
                      const exercise = getExerciseForSession(session);
                      
                      return exercise ? (
                        <SessionCard
                          key={session.id}
                          session={session}
                          exercise={exercise}
                          onClick={() => handleSessionClick(session)}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sessions;