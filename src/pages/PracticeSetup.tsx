import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, Check, BookOpen, Layers, Search } from 'lucide-react';
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
  
  const [selectedChaptersBySubject, setSelectedChaptersBySubject] = useState<Record<string, Set<string>>>({});
  const [questionCount, setQuestionCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectId || 'physics');

  const subjects = [
    { id: 'physics', name: 'Physics', color: 'bg-blue-500' },
    { id: 'chemistry', name: 'Chemistry', color: 'bg-emerald-500' },
    { id: 'biology', name: 'Biology', color: 'bg-violet-500' },
  ];

  // Get selected chapters for current subject
  const selectedChapters = selectedChaptersBySubject[selectedSubject] || new Set<string>();

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
    // Don't clear - selections persist per subject
  };

  const handleSelectAll = () => {
    const subjectChapters = allChapters
      .filter(c => c.subjectId === selectedSubject)
      .map(c => c.id);
    setSelectedChaptersBySubject(prev => ({
      ...prev,
      [selectedSubject]: new Set(subjectChapters)
    }));
  };

  const filteredChapters = useMemo(() => {
    let chapters = allChapters.filter(c => c.subjectId === selectedSubject);
    if (searchQuery.trim()) {
      chapters = chapters.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return chapters;
  }, [allChapters, selectedSubject, searchQuery]);

  const toggleChapter = (chapterId: string) => {
    setSelectedChaptersBySubject(prev => {
      const currentSet = prev[selectedSubject] || new Set<string>();
      const newSet = new Set(currentSet);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return { ...prev, [selectedSubject]: newSet };
    });
  };

  const maxQuestions = useMemo(() => {
    // Sum across all subjects
    let total = 0;
    Object.entries(selectedChaptersBySubject).forEach(([subjId, chaptersSet]) => {
      const subjectChapters = allChapters.filter(c => c.subjectId === subjId && chaptersSet.has(c.id));
      total += subjectChapters.reduce((sum, c) => sum + c.questionCount, 0);
    });
    return total;
  }, [allChapters, selectedChaptersBySubject]);

  const totalSelectedChapters = useMemo(() => {
    return Object.values(selectedChaptersBySubject).reduce((sum, set) => sum + set.size, 0);
  }, [selectedChaptersBySubject]);

  const canStart = totalSelectedChapters > 0 && maxQuestions >= 5;

  const handleStartPractice = () => {
    if (!canStart) return;
    // Collect all selected chapter IDs from all subjects
    const allSelectedIds: string[] = [];
    Object.entries(selectedChaptersBySubject).forEach(([subjId, chaptersSet]) => {
      allSelectedIds.push(...Array.from(chaptersSet));
    });
    navigate(`/practice/session?chapters=${allSelectedIds.join(',')}&count=${questionCount}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 pb-28">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <button 
          onClick={() => navigate('/')} 
          className="w-10 h-10 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MCQ Practice</h1>
          <p className="text-sm text-gray-500 mt-0.5">Select chapters to practice</p>
        </div>
      </motion.div>

      {/* Question Count */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-gray-900">Number of questions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {[5, 10, 15, 20, 30, 180].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuestionCount(num)}
              className={`w-14 h-14 flex items-center justify-center text-lg font-semibold rounded-2xl transition-all shadow-sm ${
                questionCount === num
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-300 hover:shadow-md'
              }`}
            >
              {num}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Subject Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8"
      >
        <div className="flex bg-gray-100/80 rounded-2xl p-1.5 gap-1">
          {subjects.map((subject) => (
            <motion.button
              key={subject.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubjectChange(subject.id)}
              className={`flex-1 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                selectedSubject === subject.id
                  ? `${subject.color} text-white shadow-lg`
                  : 'text-gray-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              {subject.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Chapters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-24"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-gray-900 text-lg">Chapters</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSelectAll}
            className="text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-2 rounded-full hover:bg-amber-100 transition-colors"
          >
            Select All
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
          />
        </div>
        
        <div className="space-y-3">
          {filteredChapters.map((chapter) => {
            const isSelected = selectedChapters.has(chapter.id);
            return (
              <motion.button
                key={chapter.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 shadow-amber-100'
                    : 'bg-white border-2 border-gray-100 hover:border-amber-200 hover:shadow-md'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 border-transparent shadow-sm' 
                    : 'border-gray-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {chapter.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{chapter.questionCount} questions</p>
                </div>
              </motion.button>
            );
          })}
        </div>
        {filteredChapters.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No chapters available for this subject</p>
          </div>
        )}
      </motion.div>

      {/* Start Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-24 left-4 right-4"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-gray-200/50">
          <button
            onClick={handleStartPractice}
            disabled={!canStart}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 text-base transition-all ${
              canStart
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200 hover:shadow-xl hover:scale-[1.02]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${canStart ? 'bg-white/20' : 'bg-gray-200'}`}>
              <Play className="w-4 h-4" fill="currentColor" />
            </div>
            <span>Start Practice ({questionCount} questions)</span>
          </button>
          {!canStart && (
            <p className="text-center text-xs text-gray-500 mt-3 pb-1">
              Select chapters with at least 5 questions to start
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
