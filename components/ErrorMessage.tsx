
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center" role="alert">
      <p className="font-bold">خطأ</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
