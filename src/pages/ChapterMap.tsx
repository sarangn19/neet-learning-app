import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock, CheckCircle2, Star, Play } from 'lucide-react';
import { getSubject } from '../data/curriculum';
import { useUserStore } from '../store/userStore';
import type { Grade, Chapter, Module } from '../types';

export default function ChapterMap() {
  const { subjectId, grade } = useParams<{ subjectId: string; grade: Grade }>();
  const subject = getSubject(subjectId || '');
  const { completedLessons, lessonProgress } = useUserStore();

  if (!subject) return <div>Subject not found</div>;

  const chapters = subject.grades[grade || 'plus_one'];
  const gradeLabel = grade === 'plus_one' ? 'Plus One' : 'Plus Two';

  // Calculate overall progress
  const totalLevels = chapters.reduce((acc, ch) => acc + ch.modules.reduce((macc, m) => macc + m.levels.length, 0), 0);
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLevels) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link to="/learn" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
          <ChevronLeft className="w-5 h-5" />
          Back to Subjects
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${subject.color}20` }}
          >
            {subject.id === 'physics' && '⚛️'}
            {subject.id === 'chemistry' && '🧪'}
            {subject.id === 'biology' && '🌿'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
            <p className="text-gray-500">{gradeLabel} • {chapters.length} chapters</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-700">Overall Progress</span>
            <span className="font-bold" style={{ color: subject.color }}>{progressPercent}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ backgroundColor: subject.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {completedCount} of {totalLevels} levels completed
          </p>
        </div>
      </motion.div>

      {/* Chapter Path */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden sm:block" />
        
        <div className="space-y-6">
          {chapters.map((chapter, chapterIndex) => (
            <ChapterNode 
              key={chapter.id}
              chapter={chapter}
              index={chapterIndex}
              subjectId={subjectId!}
              grade={grade!}
              subjectColor={subject.color}
              lessonProgress={lessonProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterNode({ chapter, index, subjectId, grade, subjectColor, lessonProgress }: {
  chapter: Chapter;
  index: number;
  subjectId: string;
  grade: Grade;
  subjectColor: string;
  lessonProgress: Record<string, any>;
}) {
  // Check if any level in this chapter is unlocked (first one always is, or if previous chapter has progress)
  const isUnlocked = index === 0 || true; // Simplified for now
  
  const completedModules = chapter.modules.filter(m => 
    m.levels.every(l => lessonProgress[l.id]?.completed)
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Chapter Circle */}
      <div className="flex items-start gap-4">
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 z-10 border-4 ${
            completedModules === chapter.modules.length 
              ? 'bg-brand-yellow border-brand-yellow/30' 
              : isUnlocked 
                ? 'bg-white border-gray-300' 
                : 'bg-gray-200 border-gray-300'
          }`}
        >
          {completedModules === chapter.modules.length ? '⭐' : index + 1}
        </div>

        <div className="flex-1 bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{chapter.name}</h3>
              <p className="text-sm text-gray-500">{chapter.description}</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(chapter.modules.length)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-5 h-5 ${
                    i < completedModules ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {chapter.modules.map((module, moduleIndex) => {
              const moduleCompleted = module.levels.every(l => lessonProgress[l.id]?.completed);
              const moduleStarted = module.levels.some(l => lessonProgress[l.id]);
              
              return (
                <Link
                  key={module.id}
                  to={`/learn/${subjectId}/${grade}/${chapter.id}/${module.id}`}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    moduleCompleted 
                      ? 'bg-brand-yellow/10 border-brand-yellow' 
                      : moduleStarted
                        ? 'bg-brand-blue/10 border-brand-blue'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-gray-900">{module.name}</span>
                    {moduleCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-brand-green" />
                    ) : moduleStarted ? (
                      <Play className="w-5 h-5 text-brand-blue" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{module.totalXP} XP</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
