import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, CheckCircle2 } from 'lucide-react';
import { getSubject } from '../data/curriculum';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import type { Grade, Chapter } from '../types';

// Chapter illustrations (using SVG placeholders - can be replaced with actual images)
const chapterIllustrations: Record<string, JSX.Element> = {
  'bio-11-4': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Digestive System Abstract Illustration */}
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

export default function ChapterMap() {
  const { subjectId, grade } = useParams<{ subjectId: string; grade: Grade }>();
  const subject = getSubject(subjectId || '');
  const { completedLessons } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!subject) return <div>Subject not found</div>;

  const chapters = subject.grades[grade || 'plus_one'];

  // Filter chapters by search
  const filteredChapters = chapters.filter(ch => 
    ch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24 bg-gray-50 min-h-screen">
      {/* Header with Back Arrow */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">{subject.name}</h1>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Chapter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
          />
        </div>
      </motion.div>

      {/* Chapter Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredChapters.map((chapter, index) => (
          <ChapterCard 
            key={chapter.id}
            chapter={chapter}
            subjectId={subjectId!}
            grade={grade!}
            completedLessons={completedLessons}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}

function ChapterCard({ chapter, subjectId, grade, completedLessons, index }: {
  chapter: Chapter;
  subjectId: string;
  grade: Grade;
  completedLessons: string[];
  index: number;
}) {
  // Calculate completion
  const totalLevels = chapter.modules.reduce((acc, m) => acc + m.levels.length, 0);
  const completedLevels = chapter.modules.reduce((acc, m) => 
    acc + m.levels.filter(l => completedLessons.includes(l.id)).length, 0
  );
  const isCompleted = completedLevels === totalLevels;

  // Get illustration (use chapter-specific or default)
  const illustration = chapterIllustrations[chapter.id] || chapterIllustrations.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="w-full"
    >
      <Link
        to={`/learn/${subjectId}/${grade}/${chapter.id}`}
        className="flex flex-row items-center p-2 pr-4 sm:pr-7 gap-3 sm:gap-6 w-full bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl hover:shadow-md transition-shadow"
        style={{ minHeight: '100px' }}
      >
        {/* Illustration */}
        <div 
          className="flex-shrink-0 overflow-hidden bg-rose-50 rounded-xl sm:rounded-2xl"
          style={{ width: '80px', height: '70px' }}
        >
          {illustration}
        </div>

        {/* Chapter Info */}
        <div className="flex flex-col justify-center items-start gap-1 sm:gap-2 flex-1 min-w-0">
          {/* Title */}
          <h3 className="w-full text-black truncate font-semibold text-base sm:text-lg">
            {chapter.name}
          </h3>
          
          {/* Subtitle */}
          <p className="w-full text-black text-xs sm:text-sm">
            {chapter.modules.length} modules
          </p>
          
          {/* Progress indicator */}
          {isCompleted && (
            <div className="flex items-center gap-1 mt-1 text-brand-green">
              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs font-bold">Completed</span>
            </div>
          )}
        </div>

        {/* Arrow or completion status */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-green" />
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 rotate-180" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
