import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto dismiss after 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      {type === 'success' ? (
        <CheckCircle className="toast-icon" />
      ) : (
        <AlertCircle className="toast-icon error" />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
