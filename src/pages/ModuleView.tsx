import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Trophy } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Chapters
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${subject.color}20` }}
          >
            🎯
          </div>
          <div>
            <p className="text-sm text-gray-500">{subject.name} • {gradeLabel}</p>
            <h1 className="text-2xl font-bold text-gray-900">{module.name}</h1>
            <p className="text-gray-500">{module.description}</p>
          </div>
        </div>

        {/* Module Stats */}
        <div className="flex gap-4">
          <div className="bg-brand-yellow/10 text-brand-yellow px-4 py-2 rounded-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            {module.totalXP} XP
          </div>
          <div className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5" />
            {module.levels.length} Levels
          </div>
        </div>
      </motion.div>

      {/* Level Path */}
      <div className="relative py-8">
        {/* Curved Path SVG */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <path 
            d="M 100 50 Q 200 150 100 250 Q 0 350 100 450 Q 200 550 100 650"
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        <div className="space-y-16 relative">
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
                subjectColor={subject.color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LevelNode({ level, index, status, stars, subjectColor }: {
  level: Level;
  index: number;
  status: 'locked' | 'available' | 'completed';
  stars: number;
  subjectColor: string;
}) {
  // Alternate sides
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${isLeft ? 'justify-start' : 'justify-end'} px-4 sm:px-16`}
    >
      {status === 'locked' ? (
        <div className="level-node level-locked">
          <span className="text-xl">🔒</span>
        </div>
      ) : status === 'completed' ? (
        <Link to={`/lesson/${level.id}`} className="level-node level-completed">
          <span className="text-xl">⭐</span>
        </Link>
      ) : (
        <Link to={`/lesson/${level.id}`} className="level-node level-available">
          <span className="text-xl">{index === 0 ? 'START' : index + 1}</span>
        </Link>
      )}

      {/* Level Info Card */}
      {status !== 'locked' && (
        <div 
          className={`absolute ${isLeft ? 'left-32' : 'right-32'} top-0 hidden sm:block`}
        >
          <div className="bg-white rounded-xl border-2 border-gray-200 px-4 py-2 shadow-sm">
            <p className="font-bold text-gray-900 text-sm">{level.name}</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(3)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${i < stars ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">{level.totalXP} XP</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
