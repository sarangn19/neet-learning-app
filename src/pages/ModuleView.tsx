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
  
  // Calculate completed count
  const completedCount = module.levels.filter((l) => lessonProgress[l.id]?.completed).length;

  // Determine level status
  const getLevelStatus = (level: Level, index: number) => {
    const progress = lessonProgress[level.id];
    if (progress?.completed) return 'completed';
    if (index === 0 || lessonProgress[module.levels[index - 1]?.id]?.completed) return 'available';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm font-medium transition-colors"
        >
          <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        <div className="flex items-start gap-4">
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            style={{ backgroundColor: subject.color }}
          >
            {subject.icon}
          </div>
          <div className="flex-1 pt-1">
            <p className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wide">{subject.name} • {gradeLabel}</p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{module.name}</h1>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">{module.description}</p>
          </div>
        </div>

        {/* Module Stats */}
        <div className="flex gap-3 mt-5">
          <div className="bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-2xl font-semibold flex items-center gap-2 text-sm text-gray-700">
            <div className="w-6 h-6 bg-lime-100 rounded-lg flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-lime-600" />
            </div>
            {module.levels.length} Levels
          </div>
          <div className="bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-2xl font-semibold flex items-center gap-2 text-sm text-gray-700">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-blue-600" />
            </div>
            {completedCount} Completed
          </div>
        </div>
      </motion.div>

      {/* Level Path - Vertical Timeline with connecting line */}
      <div className="relative py-6">
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
  const totalHeight = levels.length * 100;
  const lineProgress = completedCount > 0 ? ((completedCount - 0.5) / levels.length) * 100 : 0;

  return (
    <div className="relative px-4 pb-12" style={{ minHeight: totalHeight }}>
      {/* Center vertical line - background */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-8 bottom-24 w-1 bg-gray-200 rounded-full">
        {/* Progress line - shows completed portion */}
        <div 
          className="absolute top-0 left-0 w-full bg-lime-500 rounded-full transition-all duration-700"
          style={{ height: `${lineProgress}%` }}
        />
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
      className="relative flex items-center py-6"
    >
      {/* Content side */}
      <div className={`flex-1 ${isLeft ? 'text-right pr-6' : 'order-3 pl-6'}`}>
        <div className={`inline-block ${isLeft ? 'text-right' : 'text-left'}`}>
          <p className={`font-semibold text-base ${status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
            {level.name}
          </p>
          {status === 'completed' && stars > 0 && (
            <div className={`flex gap-0.5 mt-1.5 ${isLeft ? 'justify-end' : 'justify-start'}`}>
              {[...Array(stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          )}
          {status === 'locked' && (
            <p className="text-xs text-gray-400 mt-1">Complete previous level to unlock</p>
          )}
        </div>
      </div>

      {/* Center node */}
      <div className="order-2 flex-shrink-0">
        <Link to={status === 'locked' ? '#' : `/lesson/${level.id}`}>
          <motion.div
            whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
            whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20 relative transition-all duration-300
              ${status === 'completed' 
                ? 'bg-lime-500 text-white shadow-lime-200' 
                : status === 'available'
                  ? 'bg-blue-500 text-white shadow-blue-200'
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              }
            `}
          >
            {status === 'completed' ? (
              <Check className="w-7 h-7" strokeWidth={3} />
            ) : status === 'available' ? (
              <span className="font-bold text-lg">{index + 1}</span>
            ) : (
              <Lock className="w-6 h-6" />
            )}
          </motion.div>
        </Link>
      </div>

      {/* Empty side for alignment */}
      <div className={`flex-1 ${isLeft ? 'order-3 pl-6' : 'text-right pr-6'}`}>
        {status === 'available' && !isLeft && (
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            Start Now
          </span>
        )}
      </div>
    </motion.div>
  );
}
