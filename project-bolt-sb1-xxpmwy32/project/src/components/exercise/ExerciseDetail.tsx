import React from 'react';
import { Play, Clock, Activity, ArrowLeft, CheckCircle } from 'lucide-react';
import { Exercise } from '../../types';
import Button from '../common/Button';
import { DIFFICULTY_LEVELS } from '../../config/constants';

interface ExerciseDetailProps {
  exercise: Exercise;
  onBack: () => void;
  onStartSession: () => void;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ 
  exercise, 
  onBack,
  onStartSession 
}) => {
  const { 
    name, 
    description, 
    thumbnailUrl, 
    videoUrl, 
    difficulty, 
    bodyPart, 
    estimatedDuration, 
    recommendedReps,
    instructions 
  } = exercise;
  
  const difficultyInfo = DIFFICULTY_LEVELS[difficulty as keyof typeof DIFFICULTY_LEVELS];

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden border border-neutral-200">
      <div className="relative">
        <img 
          src={thumbnailUrl} 
          alt={name} 
          className="w-full h-64 object-cover"
        />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-neutral-700" />
        </button>
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${difficultyInfo.color}`}>
          {difficultyInfo.label}
        </span>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{name}</h2>
        
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center text-neutral-600">
            <Clock size={18} className="mr-2" />
            <span>{estimatedDuration} minutes</span>
          </div>
          <div className="flex items-center text-neutral-600">
            <Activity size={18} className="mr-2" />
            <span>{recommendedReps} recommended reps</span>
          </div>
          <div className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
            {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}
          </div>
        </div>
        
        <p className="text-neutral-700 mb-6">
          {description}
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-neutral-800 mb-3">Instructions</h3>
          <ol className="space-y-2">
            {instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={18} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-700">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-neutral-800 mb-3">Video Demonstration</h3>
          <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-neutral-100">
            <iframe 
              src={videoUrl}
              title={`${name} demonstration`}
              allowFullScreen
              className="w-full h-64 border-0"
            />
          </div>
        </div>
        
        <Button 
          variant="primary" 
          size="large"
          icon={<Play size={18} />}
          className="w-full"
          onClick={onStartSession}
        >
          Start Exercise Session
        </Button>
      </div>
    </div>
  );
};

export default ExerciseDetail;