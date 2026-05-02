import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { getChaptersWithQuestionCount } from '../data/questionBank';

export default function PracticeSetup() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const allChapters = useMemo(() => getChaptersWithQuestionCount(), []);
  
  // Filter chapters by subject if specified
  const chapters = useMemo(() => {
    if (!subjectId) return allChapters;
    return allChapters.filter(c => c.subjectId === subjectId);
  }, [allChapters, subjectId]);
  
  const [selectedChapters, setSelectedChapters] = useState<Set<string>>(new Set());
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectId || 'physics');

  const subjects = [
    { id: 'physics', name: 'Physics', color: 'bg-blue-500' },
    { id: 'chemistry', name: 'Chemistry', color: 'bg-emerald-500' },
    { id: 'biology', name: 'Biology', color: 'bg-violet-500' },
  ];

  // Handle subject selection - just change subject, don't auto-select chapters
  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
    // Clear chapters when switching subjects
    setSelectedChapters(new Set());
  };

  // Handle select all chapters for current subject (when checkmark clicked)
  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering subject change
    const subjectChapters = allChapters
      .filter(c => c.subjectId === selectedSubject)
      .map(c => c.id);
    setSelectedChapters(new Set(subjectChapters));
  };

  const filteredChapters = useMemo(() => {
    return chapters.filter(c => c.subjectId === selectedSubject);
  }, [chapters, selectedSubject]);

  const toggleChapter = (chapterId: string) => {
    const newSet = new Set(selectedChapters);
    if (newSet.has(chapterId)) {
      newSet.delete(chapterId);
    } else {
      newSet.add(chapterId);
    }
    setSelectedChapters(newSet);
  };

  const maxQuestions = useMemo(() => {
    return chapters
      .filter(c => selectedChapters.has(c.id))
      .reduce((sum, c) => sum + c.questionCount, 0);
  }, [chapters, selectedChapters]);

  const canStart = selectedChapters.size > 0 && maxQuestions >= 5;

  const handleStartPractice = () => {
    if (!canStart) return;
    const chapterIds = Array.from(selectedChapters);
    navigate(`/practice/session?chapters=${chapterIds.join(',')}&count=${questionCount}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 pb-28">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <button 
          onClick={() => navigate('/')} 
          className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">MCQ Practice</h1>
          <p className="text-sm text-gray-500">Select subject and chapters</p>
        </div>
      </motion.div>

      {/* Question Count */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-3">Number of questions</h2>
        <div className="flex flex-wrap gap-3">
          {[5, 10, 15, 20, 30, 180].map((num) => (
            <button
              key={num}
              onClick={() => setQuestionCount(num)}
              className={`w-12 h-12 flex items-center justify-center text-lg font-medium border transition-all ${
                questionCount === num
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Subject Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <div className="flex bg-gray-100 rounded-full p-1.5">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => handleSubjectChange(subject.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-medium transition-all ${
                selectedSubject === subject.id
                  ? `${subject.color} text-white shadow-md`
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {subject.name}
              {selectedSubject === subject.id && (
                <div 
                  onClick={handleSelectAll}
                  className="w-5 h-5 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <Check className="w-3 h-3 text-gray-700" />
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chapters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-5 mb-4 shadow-lg border border-gray-200"
      >
        <h2 className="font-bold text-gray-900 mb-3">Chapters</h2>
        
        <div className="space-y-1.5 max-h-64 overflow-y-auto">
          {filteredChapters.map((chapter) => {
            const isSelected = selectedChapters.has(chapter.id);
            return (
              <button
                key={chapter.id}
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'border-2 border-amber-400 bg-amber-50'
                    : 'border border-gray-200 hover:border-amber-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-gradient-to-r from-amber-400 to-orange-500 border-transparent' : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{chapter.name}</p>
                  <p className="text-xs text-gray-500">{chapter.questionCount} questions</p>
                </div>
              </button>
            );
          })}
        </div>
        {filteredChapters.length === 0 && (
          <p className="text-center text-gray-500 py-3 text-sm">No chapters available for this subject</p>
        )}
      </motion.div>

      {/* Start Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-20 left-4 right-4 p-4 bg-white rounded-2xl shadow-xl border border-gray-200"
      >
        <button
          onClick={handleStartPractice}
          disabled={!canStart}
          className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all ${
            canStart
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg hover:opacity-90'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Play className="w-4 h-4" fill="currentColor" />
          Start Practice ({questionCount} questions)
        </button>
        {!canStart && (
          <p className="text-center text-xs text-gray-500 mt-2">
            Select chapters with at least 5 questions
          </p>
        )}
      </motion.div>
    </div>
  );
}
