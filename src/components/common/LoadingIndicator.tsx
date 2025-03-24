import React from 'react';

type LoadingIndicatorProps = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
};

/**
 * A reusable loading indicator component
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'medium', 
  color = 'indigo',
  text,
  fullScreen = false,
}) => {
  const sizeMap = {
    small: {
      diameter: 'w-4 h-4',
      border: 'border-2',
      container: 'text-xs py-1',
    },
    medium: {
      diameter: 'w-8 h-8',
      border: 'border-3',
      container: 'text-sm py-2',
    },
    large: {
      diameter: 'w-12 h-12',
      border: 'border-4',
      container: 'text-base py-3',
    },
  };

  const colorMap = {
    indigo: 'border-indigo-600',
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    gray: 'border-gray-600',
  };

  const colorClass = colorMap[color as keyof typeof colorMap] || colorMap.indigo;
  const { diameter, border, container } = sizeMap[size];

  const spinnerElement = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${diameter} ${border} border-t-transparent border-solid rounded-full animate-spin ${colorClass}`}
        role="status"
        aria-label="loading"
      />
      {text && <p className={`mt-2 ${container} text-gray-700`}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

export default LoadingIndicator; 