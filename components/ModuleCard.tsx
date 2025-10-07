
import React from 'react';
import type { CurriculumModule } from '../types';

interface ModuleCardProps {
  module: CurriculumModule;
  index: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-lg transition-all hover:shadow-blue-500/20 hover:border-blue-500/50 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-center gap-4 mb-4">
        <span className="flex-shrink-0 bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">
          {index + 1}
        </span>
        <h3 className="text-xl font-bold text-blue-300">{module.title}</h3>
      </div>
      <p className="text-slate-400 mb-5">{module.description}</p>
      <div>
        <h4 className="font-semibold text-slate-300 mb-3">المواضيع الفرعية:</h4>
        <ul className="space-y-2">
          {module.subtopics.map((subtopic, subIndex) => (
            <li key={subIndex} className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-slate-300">{subtopic}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ModuleCard;
