import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, CheckCircle2, Lock } from 'lucide-react';
import { getChapter, getSubject } from '../data/curriculum';
import { useUserStore } from '../store/userStore';
import type { Grade, Module } from '../types';

// Chapter illustrations
const chapterIllustrations: Record<string, JSX.Element> = {
  'bio-11-4': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Digestive System Abstract */}
      <path d="M 20 20 Q 30 10 40 20 Q 50 30 40 40 Q 35 50 45 55 Q 55 60 50 70 Q 45 85 50 95" 
        fill="none" stroke="#E74C3C" strokeWidth="8" strokeLinecap="round"/>
      <path d="M 45 55 Q 60 50 70 55 Q 80 60 75 70 Q 70 80 75 90" 
        fill="none" stroke="#F39C12" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="30" cy="30" r="8" fill="#E74C3C" opacity="0.3"/>
      <circle cx="70" cy="65" r="6" fill="#F39C12" opacity="0.3"/>
      <circle cx="55" cy="80" r="5" fill="#9B59B6" opacity="0.4"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="20" y="20" width="60" height="60" rx="10" fill="#E8F4FD" stroke="#3498DB" strokeWidth="2"/>
      <circle cx="50" cy="50" r="20" fill="#3498DB" opacity="0.3"/>
    </svg>
  )
};

export default function ChapterView() {
  const { subjectId, grade, chapterId } = useParams<{ 
    subjectId: string; 
    grade: Grade; 
    chapterId: string;
  }>();
  const navigate = useNavigate();
  const subject = getSubject(subjectId || '');
  const chapter = getChapter(subjectId || '', grade || 'plus_one', chapterId || '');
  const { lessonProgress } = useUserStore();

  if (!subject || !chapter) return <div>Chapter not found</div>;

  const illustration = chapterIllustrations[chapter.id] || chapterIllustrations.default;

  // Calculate chapter progress
  const totalLevels = chapter.modules.reduce((acc, m) => acc + m.levels.length, 0);
  const completedLevels = chapter.modules.reduce((acc, m) => 
    acc + m.levels.filter(l => lessonProgress[l.id]?.completed).length, 0
  );
  const progressPercent = Math.round((completedLevels / totalLevels) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate(`/chapter/${subjectId}/${grade}`)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">{chapter.name}</h1>
        </div>

        {/* Chapter Hero Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm mb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0">
              {illustration}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2">{chapter.name}</h2>
              <p className="text-gray-500 text-sm sm:text-base mb-3">{chapter.description}</p>
              
              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-brand-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="font-bold text-sm text-brand-blue">{progressPercent}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{completedLevels} of {totalLevels} levels completed</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modules List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-4">Modules</h3>
        
        {chapter.modules.map((module, index) => (
          <ModuleCard 
            key={module.id}
            module={module}
            subjectId={subjectId!}
            grade={grade!}
            chapterId={chapterId!}
            lessonProgress={lessonProgress}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}

function ModuleCard({ module, subjectId, grade, chapterId, lessonProgress, index }: {
  module: Module;
  subjectId: string;
  grade: Grade;
  chapterId: string;
  lessonProgress: Record<string, any>;
  index: number;
}) {
  const totalLevels = module.levels.length;
  const completedLevels = module.levels.filter(l => lessonProgress[l.id]?.completed).length;
  const isCompleted = completedLevels === totalLevels;
  const isStarted = completedLevels > 0;
  const isLocked = index > 0 && !lessonProgress[module.levels[0]?.id]; // Simplified locking

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={isLocked ? '#' : `/module/${subjectId}/${grade}/${chapterId}/${module.id}`}
        className={`block bg-white rounded-2xl p-4 border border-gray-200 shadow-sm transition-all ${
          isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md'
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Module Number / Status */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
            isCompleted 
              ? 'bg-brand-green/10 text-brand-green' 
              : isStarted
                ? 'bg-brand-blue/10 text-brand-blue'
                : isLocked
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-gray-100 text-gray-600'
          }`}>
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : isLocked ? (
              <Lock className="w-5 h-5" />
            ) : (
              index + 1
            )}
          </div>

          {/* Module Info */}
          <div className="flex-1">
            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1">{module.name}</h4>
            <p className="text-xs sm:text-sm text-gray-500">{completedLevels}/{totalLevels} levels</p>
            
            {/* Progress dots */}
            <div className="flex items-center gap-1 mt-2">
              {module.levels.map((level) => (
                <div 
                  key={level.id}
                  className={`w-2 h-2 rounded-full ${
                    lessonProgress[level.id]?.completed 
                      ? 'bg-brand-green' 
                      : lessonProgress[level.id] 
                        ? 'bg-brand-blue'
                        : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Icon */}
          <div className="flex-shrink-0">
            {isCompleted ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-green" />
              </div>
            ) : isLocked ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
