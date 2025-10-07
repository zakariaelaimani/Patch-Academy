
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400">جاري إنشاء المنهج الخاص بك...</p>
    </div>
  );
};

export default LoadingSpinner;
