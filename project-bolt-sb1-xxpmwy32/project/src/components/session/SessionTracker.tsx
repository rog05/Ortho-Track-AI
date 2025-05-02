import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Play, Pause, StopCircle, Clock, Activity } from 'lucide-react';
import Button from '../common/Button';
import { Session, Exercise } from '../../types';

interface SessionTrackerProps {
  exercise: Exercise;
  session: Session;
  onRepCount: (repCount: number) => void;
  onComplete: (repCount: number, notes?: string) => void;
}

const SessionTracker: React.FC<SessionTrackerProps> = ({
  exercise,
  session,
  onRepCount,
  onComplete
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [isActive, setIsActive] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  // Mock rep counting (in a real app this would use MediaPipe or TensorFlow)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        // This is where actual pose detection would happen
        // For demo purposes, we'll just increment the rep count randomly
        if (Math.random() > 0.85) {
          const newCount = repCount + 1;
          setRepCount(newCount);
          onRepCount(newCount);
        }
        
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, repCount, onRepCount]);
  
  const handlePauseResume = () => {
    setIsActive(!isActive);
  };
  
  const handleStop = () => {
    setIsActive(false);
    setShowResults(true);
  };
  
  const handleFinish = () => {
    onComplete(repCount, notes);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {!showResults ? (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">{exercise.name}</h2>
            <p className="text-neutral-600 mb-2">{exercise.description}</p>
            <p className="text-neutral-600">Target: {exercise.recommendedReps} reps</p>
          </div>
          
          <div className="relative mb-4">
            <Webcam
              ref={webcamRef}
              style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
            />
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md flex items-center text-sm">
              <Clock size={16} className="mr-2" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
            <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-md flex items-center text-sm">
              <Activity size={16} className="mr-2" />
              <span>{repCount} reps</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={isActive ? "outline" : "primary"}
              icon={isActive ? <Pause size={18} /> : <Play size={18} />}
              onClick={handlePauseResume}
              className="w-full"
            >
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button
              variant="outline"
              icon={<StopCircle size={18} />}
              onClick={handleStop}
              className="w-full"
            >
              End Session
            </Button>
          </div>
        </>
      ) : (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Session Complete</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-neutral-50 p-4 rounded-md">
              <p className="text-sm text-neutral-500 mb-1">Duration</p>
              <p className="text-lg font-medium flex items-center">
                <Clock size={18} className="mr-2 text-primary-600" />
                {formatTime(elapsedTime)}
              </p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-md">
              <p className="text-sm text-neutral-500 mb-1">Reps Completed</p>
              <p className="text-lg font-medium flex items-center">
                <Activity size={18} className="mr-2 text-primary-600" />
                {repCount}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">
              Session Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md 
                        shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 
                        focus:border-primary-500 sm:text-sm"
              placeholder="How did the session feel? Any pain or discomfort?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <Button
            variant="primary"
            onClick={handleFinish}
            className="w-full"
          >
            Save Session
          </Button>
        </div>
      )}
    </div>
  );
};

export default SessionTracker;