import React from 'react';
import { Session, Exercise } from '../../types';
import Card from '../common/Card';
import { Clock, CheckCircle, CalendarClock } from 'lucide-react';
import { format } from 'date-fns';

interface RecentSessionsProps {
  sessions: Session[];
  exercises: Exercise[];
  onViewAll: () => void;
}

const RecentSessions: React.FC<RecentSessionsProps> = ({ 
  sessions, 
  exercises,
  onViewAll 
}) => {
  // Sort sessions by date (newest first)
  const sortedSessions = [...sessions].sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  }).slice(0, 3); // Only show 3 most recent
  
  const getExerciseName = (exerciseId: string) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    return exercise ? exercise.name : 'Unknown Exercise';
  };
  
  const formatSessionDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };
  
  return (
    <Card 
      title="Recent Sessions" 
      footer={
        <button 
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          onClick={onViewAll}
        >
          View all sessions
        </button>
      }
    >
      {sortedSessions.length > 0 ? (
        <div className="space-y-4">
          {sortedSessions.map((session) => (
            <div key={session.id} className="flex items-center">
              <div className="p-2 bg-primary-50 rounded-md mr-4">
                <Clock size={18} className="text-primary-600" />
              </div>
              
              <div className="flex-grow">
                <p className="text-sm font-medium text-neutral-800">
                  {getExerciseName(session.exerciseId)}
                </p>
                <div className="flex items-center text-xs text-neutral-500">
                  <CalendarClock size={14} className="mr-1" />
                  {formatSessionDate(session.startTime)}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-sm text-neutral-700 mr-4">
                  <span className="font-medium">{session.repsCounted}</span> reps
                </div>
                
                {session.completed && (
                  <CheckCircle size={18} className="text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-neutral-500">
          No recent sessions found
        </div>
      )}
    </Card>
  );
};

export default RecentSessions;