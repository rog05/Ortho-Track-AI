import React, { useState } from 'react';
import { TabItem } from '../../types';
import * as Icons from 'lucide-react';

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'cards';
}

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTab, 
  onChange, 
  variant = 'underline' 
}) => {
  // Get icon component from string name
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={18} /> : null;
  };

  const getTabStyle = (tabId: string, variant: string) => {
    const isActive = tabId === activeTab;
    
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          : 'bg-white text-neutral-600 hover:bg-neutral-100';
      
      case 'cards':
        return isActive
          ? 'bg-white border-neutral-200 text-primary-700 shadow-sm border-b-0'
          : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100';
          
      case 'underline':
      default:
        return isActive
          ? 'border-b-2 border-primary-600 text-primary-700'
          : 'border-b-2 border-transparent text-neutral-600 hover:border-neutral-300';
    }
  };

  return (
    <div className="border-b border-neutral-200">
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => {
          const icon = getIcon(tab.icon);
          const tabStyle = getTabStyle(tab.id, variant);
          
          return (
            <button
              key={tab.id}
              className={`
                px-4 py-3 rounded-t-md font-medium text-sm transition-colors
                flex items-center focus:outline-none
                ${tabStyle}
              `}
              onClick={() => onChange(tab.id)}
            >
              {icon && <span className="mr-2">{icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;