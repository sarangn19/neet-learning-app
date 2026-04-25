import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { getSubject } from '../data/curriculum';
import type { Grade } from '../types';

export default function ChapterList() {
  const { subjectId, grade } = useParams<{ 
    subjectId: string; 
    grade: Grade;
  }>();
  const navigate = useNavigate();
  
  const subject = getSubject(subjectId || '');
  const gradeData = subject?.grades[grade || 'plus_one'];

  if (!subject || !gradeData) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <button onClick={() => navigate('/')} className="mb-4 flex items-center gap-2 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <p>Subject or grade not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <button 
          onClick={() => navigate('/')} 
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold">{subject.name}</h1>
          <p className="text-sm text-gray-500 capitalize">{grade?.replace('_', ' ')}</p>
        </div>
      </motion.div>

      {/* Chapters Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        {gradeData.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/chapter/${subjectId}/${grade}/${chapter.id}`}
              className="block bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-brand-blue hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${subject.color}15` }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: subject.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{chapter.name}</h3>
                  <p className="text-xs text-gray-500">{chapter.modules.length} modules</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
