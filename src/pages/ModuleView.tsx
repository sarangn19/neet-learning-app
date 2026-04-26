import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star } from 'lucide-react';
import { getModule, getSubject } from '../data/curriculum';
import { useUserStore } from '../store/userStore';
import type { Grade, Level } from '../types';

export default function ModuleView() {
  const { subjectId, grade, chapterId, moduleId } = useParams<{ 
    subjectId: string; 
    grade: Grade; 
    chapterId: string; 
    moduleId: string;
  }>();
  const navigate = useNavigate();
  const subject = getSubject(subjectId || '');
  const module = getModule(subjectId || '', grade || 'plus_one', chapterId || '', moduleId || '');
  const { lessonProgress } = useUserStore();

  if (!subject || !module) return <div>Module not found</div>;

  const gradeLabel = grade === 'plus_one' ? 'Plus One' : 'Plus Two';

  // Determine level status
  const getLevelStatus = (level: Level, index: number) => {
    const progress = lessonProgress[level.id];
    if (progress?.completed) return 'completed';
    if (index === 0 || lessonProgress[module.levels[index - 1]?.id]?.completed) return 'available';
    return 'locked';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-32">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-3 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Chapters
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl"
            style={{ backgroundColor: `${subject.color}20` }}
          >
            🎯
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500">{subject.name} • {gradeLabel}</p>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">{module.name}</h1>
            <p className="text-gray-500 text-xs sm:text-sm">{module.description}</p>
          </div>
        </div>

        {/* Module Stats */}
        <div className="flex gap-3">
          <div className="bg-lime-100 text-lime-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-bold flex items-center gap-2 text-xs sm:text-sm">
            <Star className="w-4 h-4 sm:w-5 sm:h-5" />
            {module.levels.length} Levels
          </div>
        </div>
      </motion.div>

      {/* Level Path - Vertical Timeline with connecting line */}
      <div className="relative py-4 px-4 pb-12">
        {/* Continuous vertical line - runs through all nodes */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-8 bottom-24 w-2 bg-gray-300 -z-10">
          {/* Progress overlay - shows completed portion */}
          <div 
            className="w-full bg-lime-500 transition-all duration-500"
            style={{ 
              height: `${(module.levels.filter((l) => lessonProgress[l.id]?.completed).length / module.levels.length) * 100}%` 
            }}
          />
        </div>

        <div className="space-y-0">
          {module.levels.map((level, index) => {
            const status = getLevelStatus(level, index);
            const progress = lessonProgress[level.id];
            
            return (
              <LevelNode 
                key={level.id}
                level={level}
                index={index}
                status={status}
                stars={progress?.stars || 0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LevelNode({ level, index, status, stars }: {
  level: Level;
  index: number;
  status: 'locked' | 'available' | 'completed';
  stars: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-center py-6"
    >
      {/* Left content - text on alternating sides */}
      <div className={`flex-1 ${isLeft ? 'text-right pr-6' : 'order-3 pl-6'}`}>
        {isLeft && status !== 'locked' && (
          <p className="text-xs text-gray-500 font-medium">{level.name}</p>
        )}
        {!isLeft && status === 'locked' && (
          <p className="text-xs text-gray-400">Locked</p>
        )}
      </div>

      {/* Center - Node (always centered on the vertical line) */}
      <div className="order-2 flex items-center justify-center">
        {status === 'locked' ? (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gray-200 text-gray-400 cursor-not-allowed border-4 border-white shadow-md z-10">
            <span className="text-xl">🔒</span>
          </div>
        ) : status === 'completed' ? (
          <Link to={`/lesson/${level.id}`} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-lime-500 text-white shadow-lg hover:scale-110 active:scale-95 transition-all border-4 border-white z-10">
            <span className="text-2xl">{stars > 0 ? '⭐' : '✓'}</span>
          </Link>
        ) : (
          <Link to={`/lesson/${level.id}`} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white text-brand-blue border-4 border-brand-blue shadow-lg hover:scale-110 active:scale-95 transition-all z-10">
            <span className="font-bold text-sm">{index === 0 ? 'GO' : index + 1}</span>
          </Link>
        )}
      </div>

      {/* Right content - text on alternating sides */}
      <div className={`flex-1 ${isLeft ? 'order-3 pl-6' : 'text-right pr-6'}`}>
        {!isLeft && status !== 'locked' && (
          <p className="text-xs text-gray-500 font-medium">{level.name}</p>
        )}
        {isLeft && status === 'locked' && (
          <p className="text-xs text-gray-400">Locked</p>
        )}
      </div>
    </motion.div>
  );
}
