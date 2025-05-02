import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Loader className={`${sizeClasses[size]} text-primary-600 animate-spin`} />
      {message && <p className="mt-2 text-neutral-600">{message}</p>}
    </div>
  );
};

export default Loading;