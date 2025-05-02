import React from 'react';
import { Play, Clock, Activity } from 'lucide-react';
import { Exercise } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';
import { DIFFICULTY_LEVELS } from '../../config/constants';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
  onStartSession?: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onClick, onStartSession }) => {
  const { name, description, thumbnailUrl, difficulty, estimatedDuration, recommendedReps } = exercise;
  const difficultyInfo = DIFFICULTY_LEVELS[difficulty as keyof typeof DIFFICULTY_LEVELS];

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative pb-2">
        <img 
          src={thumbnailUrl} 
          alt={name} 
          className="w-full h-48 object-cover rounded-md"
        />
        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${difficultyInfo.color}`}>
          {difficultyInfo.label}
        </span>
      </div>
      
      <h3 className="text-lg font-medium text-neutral-900 mb-2">{name}</h3>
      
      <p className="text-neutral-600 text-sm mb-4 flex-grow">
        {description.length > 120 ? `${description.substring(0, 120)}...` : description}
      </p>
      
      <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          <span>{estimatedDuration} min</span>
        </div>
        <div className="flex items-center">
          <Activity size={16} className="mr-1" />
          <span>{recommendedReps} reps</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onClick}
        >
          Details
        </Button>
        <Button 
          variant="primary" 
          className="flex-1"
          icon={<Play size={16} />}
          onClick={onStartSession}
        >
          Start
        </Button>
      </div>
    </Card>
  );
};

export default ExerciseCard;