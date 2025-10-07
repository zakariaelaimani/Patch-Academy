
import React from 'react';
import type { CurriculumModule } from '../types';
import ModuleCard from './ModuleCard';

interface CurriculumDisplayProps {
  curriculum: CurriculumModule[];
}

const CurriculumDisplay: React.FC<CurriculumDisplayProps> = ({ curriculum }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-slate-200 mb-6">خطة التعلم الخاصة بك</h2>
      {curriculum.map((module, index) => (
        <ModuleCard key={index} module={module} index={index} />
      ))}
    </div>
  );
};

export default CurriculumDisplay;
