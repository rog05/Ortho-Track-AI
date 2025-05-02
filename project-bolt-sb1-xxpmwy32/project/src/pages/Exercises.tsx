import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ExerciseCard from '../components/exercise/ExerciseCard';
import ExerciseDetail from '../components/exercise/ExerciseDetail';
import Loading from '../components/common/Loading';
import { useAuthStore } from '../store/authStore';
import { useExerciseStore } from '../store/exerciseStore';
import { useSessionStore } from '../store/sessionStore';
import { Exercise } from '../types';

const Exercises: React.FC = () => {
  const navigate = useNavigate();
  const { user, status } = useAuthStore();
  const { exercises, fetchExercises, setCurrentExercise } = useExerciseStore();
  const { startSession } = useSessionStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    bodyPart: 'all'
  });
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      navigate('/login');
    }
    
    const loadExercises = async () => {
      setIsLoading(true);
      await fetchExercises();
      setIsLoading(false);
    };
    
    loadExercises();
  }, [fetchExercises, navigate, status]);
  
  useEffect(() => {
    let result = [...exercises];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(ex => 
        ex.name.toLowerCase().includes(term) || 
        ex.description.toLowerCase().includes(term)
      );
    }
    
    // Apply difficulty filter
    if (filters.difficulty !== 'all') {
      result = result.filter(ex => ex.difficulty === filters.difficulty);
    }
    
    // Apply body part filter
    if (filters.bodyPart !== 'all') {
      result = result.filter(ex => ex.bodyPart === filters.bodyPart);
    }
    
    setFilteredExercises(result);
  }, [exercises, searchTerm, filters]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (type: 'difficulty' | 'bodyPart', value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };
  
  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };
  
  const handleBackClick = () => {
    setSelectedExercise(null);
  };
  
  const handleStartSession = async (exercise: Exercise) => {
    if (!user) return;
    
    try {
      setCurrentExercise(exercise.id);
      navigate('/exercise/session/start');
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loading size="large" message="Loading exercises..." />
      </div>
    );
  }
  
  // Extract unique body parts for filter
  const bodyParts = ['all', ...new Set(exercises.map(ex => ex.bodyPart))];
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!selectedExercise ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">Exercise Library</h1>
                <p className="text-neutral-600">
                  Browse our collection of orthopedic exercises designed for your recovery
                </p>
              </div>
              
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-neutral-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search exercises..."
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md 
                              shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 
                              focus:border-primary-500 sm:text-sm"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-neutral-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
                      className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 
                                focus:outline-none focus:ring-primary-500 focus:border-primary-500 
                                sm:text-sm rounded-md"
                      value={filters.difficulty}
                      onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                    >
                      <option value="all">All Difficulties</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="bodyPart" className="block text-sm font-medium text-neutral-700 mb-1">
                      Body Part
                    </label>
                    <select
                      id="bodyPart"
                      className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 
                                focus:outline-none focus:ring-primary-500 focus:border-primary-500 
                                sm:text-sm rounded-md"
                      value={filters.bodyPart}
                      onChange={(e) => handleFilterChange('bodyPart', e.target.value)}
                    >
                      {bodyParts.map((part) => (
                        <option key={part} value={part}>
                          {part === 'all' ? 'All Body Parts' : part.charAt(0).toUpperCase() + part.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {filteredExercises.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <Search size={48} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No exercises found</h3>
                  <p className="text-neutral-500">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredExercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => handleExerciseClick(exercise)}
                      onStartSession={() => handleStartSession(exercise)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <ExerciseDetail
              exercise={selectedExercise}
              onBack={handleBackClick}
              onStartSession={() => handleStartSession(selectedExercise)}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Exercises;