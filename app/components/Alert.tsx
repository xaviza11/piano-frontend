// app/components/Alert.tsx
import React, { useState, useEffect } from 'react';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  dismissible?: boolean;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ 
  message, 
  type = 'info', 
  dismissible = true, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✔️';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-30`}>
      <div
        className={`flex items-center max-w-sm w-full mx-auto border-l-4 p-4 rounded-lg shadow-lg space-x-3 ${getAlertStyles()}`}
      >
        <span className="text-2xl">{getIcon()}</span>
        <span className="flex-1">{message}</span>
        {dismissible && (
          <button
            onClick={handleClose}
            className="ml-4 font-bold text-gray-500 hover:text-gray-700 text-lg transition duration-150"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
