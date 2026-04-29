import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Check, Lock } from 'lucide-react';
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

        <TimelinePath 
          levels={module.levels}
          lessonProgress={lessonProgress}
          getLevelStatus={getLevelStatus}
        />
      </div>
    </div>
  );
}

function TimelinePath({ 
  levels, 
  lessonProgress,
  getLevelStatus
}: { 
  levels: Level[]; 
  lessonProgress: Record<string, any>;
  getLevelStatus: (level: Level, index: number) => 'locked' | 'available' | 'completed';
}) {
  const completedCount = levels.filter((l, idx) => getLevelStatus(l, idx) === 'completed').length;
  const totalHeight = levels.length * 80; // 80px per level
  const lineProgress = completedCount > 0 ? ((completedCount - 0.5) / levels.length) * 100 : 0;

  return (
    <div className="relative" style={{ minHeight: totalHeight }}>
      {/* Center vertical line - background (gray) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-8 bottom-8 w-1.5 bg-gray-200 rounded-full">
        {/* Progress line (green) - shows completed portion */}
        <div 
          className="absolute top-0 left-0 w-full bg-lime-500 rounded-full transition-all duration-700"
          style={{ height: `${lineProgress}%` }}
        />
        
        {/* Current level indicator (blue) */}
        {completedCount < levels.length && (
          <div 
            className="absolute left-0 w-full h-8 bg-blue-500 rounded-full transition-all duration-500"
            style={{ top: `${lineProgress}%` }}
          />
        )}
      </div>

      {/* Level nodes */}
      <div className="relative z-10 space-y-0">
        {levels.map((level, index) => {
          const status = getLevelStatus(level, index);
          const progress = lessonProgress[level.id];
          const isLeft = index % 2 === 0;
          
          return (
            <TimelineLevelNode 
              key={level.id}
              level={level}
              index={index}
              status={status}
              stars={progress?.stars || 0}
              isLeft={isLeft}
            />
          );
        })}
      </div>
    </div>
  );
}

function TimelineLevelNode({ 
  level, 
  index, 
  status, 
  stars,
  isLeft
}: {
  level: Level;
  index: number;
  status: 'locked' | 'available' | 'completed';
  stars: number;
  isLeft: boolean;
}) {
  // Variables available for future use:
  // const isCurrent = index === 0 || status === 'available';
  // const isFirst = index === 0;
  // const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      className="relative flex items-center py-5"
    >
      {/* Left side content */}
      <div className={`flex-1 ${isLeft ? 'text-right pr-5' : 'order-3 pl-5'}`}>
        {isLeft ? (
          <div className="inline-block">
            <p className={`font-semibold text-sm ${status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
              {level.name}
            </p>
            {status === 'completed' && stars > 0 && (
              <div className="flex justify-end gap-0.5 mt-1">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            )}
          </div>
        ) : (
          status === 'locked' && (
            <p className="text-xs text-gray-400">Locked</p>
          )
        )}
      </div>

      {/* Center node */}
      <div className="order-2 flex-shrink-0">
        <Link to={status === 'locked' ? '#' : `/lesson/${level.id}`}>
          <motion.div
            whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
            whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
            className={`
              w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-20 relative
              ${status === 'completed' 
                ? 'bg-lime-500 text-white' 
                : status === 'available'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {status === 'completed' ? (
              <Check className="w-6 h-6" strokeWidth={3} />
            ) : status === 'available' ? (
              <span className="font-bold text-sm">{index + 1}</span>
            ) : (
              <Lock className="w-5 h-5" />
            )}
          </motion.div>
        </Link>
      </div>

      {/* Right side content */}
      <div className={`flex-1 ${isLeft ? 'order-3 pl-5' : 'text-right pr-5'}`}>
        {!isLeft ? (
          <div className="inline-block text-left">
            <p className={`font-semibold text-sm ${status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
              {level.name}
            </p>
            {status === 'completed' && stars > 0 && (
              <div className="flex gap-0.5 mt-1">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            )}
          </div>
        ) : (
          status === 'locked' && (
            <p className="text-xs text-gray-400">Locked</p>
          )
        )}
      </div>
    </motion.div>
  );
}
