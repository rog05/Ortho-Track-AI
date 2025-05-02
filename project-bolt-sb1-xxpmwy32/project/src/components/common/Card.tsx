import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  subtitle, 
  footer, 
  className = '',
  onClick 
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-card overflow-hidden
        border border-neutral-200 hover:border-primary-200
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="p-4 border-b border-neutral-200">
          {title && <h3 className="text-lg font-medium text-neutral-800">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;