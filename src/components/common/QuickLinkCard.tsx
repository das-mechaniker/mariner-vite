import React from 'react';
import { Link } from 'react-router-dom';

export interface QuickLinkCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

export const QuickLinkCard: React.FC<QuickLinkCardProps> = ({
  title,
  description,
  path,
  icon,
  color
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border hover:shadow-lg transition-all">
      <div className="flex flex-col items-center justify-center p-6 flex-grow">
        <div className={`${color} p-4 rounded-full text-white mb-4`}>
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-dark mb-2">{title}</h2>
        <p className="text-gray-600 text-center mb-4">{description}</p>
      </div>
      <div className="px-6 pb-6 mt-auto">
        <Link 
          to={path}
          className="block w-full text-center py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
        >
          Go to {title}
        </Link>
      </div>
    </div>
  );
}; 