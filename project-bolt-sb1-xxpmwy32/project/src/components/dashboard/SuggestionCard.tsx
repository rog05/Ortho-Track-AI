import React from 'react';
import { ExerciseSuggestion, Exercise } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import { Play, Star } from 'lucide-react';

interface SuggestionCardProps {
  suggestion: ExerciseSuggestion;
  exercise: Exercise;
  onStart: () => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ 
  suggestion, 
  exercise, 
  onStart 
}) => {
  const confidencePercent = Math.round(suggestion.confidence * 100);
  
  return (
    <Card className="h-full flex flex-col">
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-medium text-neutral-900">{exercise.name}</h3>
          <div className="flex items-center bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs">
            <Star size={14} className="mr-1 fill-primary-500 text-primary-500" />
            <span>{confidencePercent}% match</span>
          </div>
        </div>
        
        <div className="mb-3">
          <img 
            src={exercise.thumbnailUrl} 
            alt={exercise.name} 
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
        
        <div className="text-sm text-neutral-600 mb-4">
          <p>{suggestion.reason}</p>
        </div>
        
        <div className="text-sm text-neutral-500 mb-1">
          <span className="font-medium">Duration:</span> {exercise.estimatedDuration} min
        </div>
        <div className="text-sm text-neutral-500 mb-4">
          <span className="font-medium">Recommended reps:</span> {exercise.recommendedReps}
        </div>
      </div>
      
      <Button 
        variant="primary" 
        className="w-full"
        icon={<Play size={16} />}
        onClick={onStart}
      >
        Start Exercise
      </Button>
    </Card>
  );
};

export default SuggestionCard;