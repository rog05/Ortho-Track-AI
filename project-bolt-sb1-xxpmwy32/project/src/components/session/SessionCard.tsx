import React from 'react';
import { Calendar, Clock, Activity, Award } from 'lucide-react';
import { Session, Exercise } from '../../types';
import Card from '../common/Card';
import { format } from 'date-fns';
import { SESSION_STATUS } from '../../config/constants';

interface SessionCardProps {
  session: Session;
  exercise: Exercise;
  onClick?: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, exercise, onClick }) => {
  const { startTime, endTime, repsCounted, completed, performance } = session;
  
  const formattedDate = startTime 
    ? format(new Date(startTime), 'MMM dd, yyyy')
    : 'Unknown date';
    
  const formattedTime = startTime 
    ? format(new Date(startTime), 'h:mm a')
    : 'Unknown time';
    
  const duration = session.duration 
    ? Math.floor(session.duration / 60) 
    : endTime && startTime 
      ? Math.floor((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60))
      : 0;
  
  const status = completed 
    ? SESSION_STATUS.completed 
    : SESSION_STATUS.inProgress;
    
  return (
    <Card className="hover:shadow-lg transition-shadow" onClick={onClick}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-neutral-900">{exercise.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
          {status.label}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-neutral-600">
          <Calendar size={16} className="mr-2" />
          <span>{formattedDate} at {formattedTime}</span>
        </div>
        
        <div className="flex items-center text-sm text-neutral-600">
          <Clock size={16} className="mr-2" />
          <span>{duration} minutes</span>
        </div>
        
        <div className="flex items-center text-sm text-neutral-600">
          <Activity size={16} className="mr-2" />
          <span>{repsCounted} reps completed</span>
        </div>
        
        {completed && performance !== undefined && (
          <div className="flex items-center text-sm text-neutral-600">
            <Award size={16} className="mr-2" />
            <span>Performance: {performance}%</span>
          </div>
        )}
      </div>
      
      {session.notes && (
        <div className="text-sm text-neutral-500 bg-neutral-50 p-2 rounded-md">
          <p className="font-medium mb-1">Notes:</p>
          <p>{session.notes}</p>
        </div>
      )}
    </Card>
  );
};

export default SessionCard;