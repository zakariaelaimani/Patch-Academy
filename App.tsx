
import React, { useState, useCallback } from 'react';
import type { CurriculumModule } from './types';
import { generateCurriculum } from './services/geminiService';
import CurriculumDisplay from './components/CurriculumDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [curriculum, setCurriculum] = useState<CurriculumModule[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('الرجاء إدخال موضوع صالح.');
      return;
    }

    setIsLoading(true);
    setCurriculum(null);
    setError(null);

    try {
      const result = await generateCurriculum(topic);
      setCurriculum(result);
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء المنهج. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">
            صانع المناهج
          </h1>
          <p className="text-lg text-slate-400">
            أدخل موضوعًا لإنشاء خطة تعليمية مخصصة لك.
          </p>
        </header>

        <main>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-10">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="على سبيل المثال: تعلم فيزياء الكم"
              className="flex-grow bg-slate-800 border border-slate-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 4a1 1 0 00-.606.92l.5 9A1 1 0 004 17h12a1 1 0 00.994-.92l.5-9a1 1 0 00-.606-.92l-7-4zM10 4.268L15.394 7 10 9.732 4.606 7 10 4.268zM5 8.5l5 2.857L15 8.5v5.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-5.5z" />
              </svg>
              <span>{isLoading ? 'جاري الإنشاء...' : 'إنشاء المنهج'}</span>
            </button>
          </form>

          <div className="mt-6">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {curriculum && <CurriculumDisplay curriculum={curriculum} />}
            {!isLoading && !error && !curriculum && (
              <div className="text-center text-slate-500 py-10">
                <p>سوف يظهر منهجك التعليمي هنا.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
