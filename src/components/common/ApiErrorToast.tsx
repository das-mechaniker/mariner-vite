import React, { useEffect, useState } from 'react';
import { ApiError } from '../../services/api/base';
import { X } from 'lucide-react';

interface ApiErrorToastProps {
  error: ApiError | null;
  onDismiss?: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * A toast component for displaying API errors
 */
export const ApiErrorToast: React.FC<ApiErrorToastProps> = ({
  error,
  onDismiss,
  duration = 5000,
  position = 'bottom-right',
}) => {
  const [visible, setVisible] = useState(false);

  // Map position to CSS classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  useEffect(() => {
    if (error) {
      setVisible(true);
      
      // Auto-dismiss after duration
      if (duration > 0) {
        const timer = setTimeout(() => {
          setVisible(false);
          if (onDismiss) onDismiss();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setVisible(false);
    }
  }, [error, duration, onDismiss]);

  if (!error || !visible) {
    return null;
  }

  // Get the appropriate error message
  let title = 'Error';
  let message = error.message || 'An unexpected error occurred';

  switch (error.status) {
    case 400:
      title = 'Invalid Request';
      break;
    case 401:
      title = 'Authentication Required';
      message = 'Please log in to continue';
      break;
    case 403:
      title = 'Access Denied';
      message = 'You do not have permission to access this resource';
      break;
    case 404:
      title = 'Not Found';
      message = 'The requested resource was not found';
      break;
    case 500:
      title = 'Server Error';
      message = 'An unexpected server error occurred. Please try again later.';
      break;
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 max-w-md w-full animate-slide-in-right`}
      role="alert"
    >
      <div className="bg-white rounded-lg shadow-lg border-l-4 border-red-500 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-red-800">{title}</p>
              <p className="mt-1 text-sm text-gray-700">{message}</p>
              
              {/* Show error details if available */}
              {error.details && Object.keys(error.details).length > 0 && (
                <div className="mt-2 text-xs text-gray-600">
                  <p className="font-medium">Details:</p>
                  <ul className="list-disc pl-5">
                    {Object.entries(error.details).map(([key, value]) => (
                      <li key={key}>
                        {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="inline-flex text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setVisible(false);
                  if (onDismiss) onDismiss();
                }}
              >
                <span className="sr-only">Close</span>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiErrorToast; 