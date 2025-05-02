import React, { ReactNode } from 'react';
import Card from '../common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  className = '' 
}) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-neutral-900">{value}</p>
          
          {trend && (
            <div className="mt-1 flex items-center">
              <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-neutral-500 ml-1">vs. last week</span>
            </div>
          )}
        </div>
        
        <div className="p-2 bg-primary-50 rounded-md">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;