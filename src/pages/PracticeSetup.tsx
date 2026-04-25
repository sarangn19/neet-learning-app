import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, Check, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters;
    return chapters.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chapters, searchQuery]);

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
    <div className="max-w-5xl mx-auto px-3 py-4 pb-28 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/')} className="p-1.5 hover:bg-gray-200 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold">MCQ Practice</h1>
          <p className="text-xs text-gray-500">{subjectId ? `${subjectId.charAt(0).toUpperCase() + subjectId.slice(1)} - Select chapters` : 'Select chapters'}</p>
        </div>
      </div>

      {/* Question Count */}
      <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
        <h2 className="font-bold text-sm mb-2">Questions</h2>
        <div className="flex flex-wrap gap-1.5">
          {[5, 10, 15, 20, 25, 30].map((num) => (
            <button
              key={num}
              onClick={() => setQuestionCount(num)}
              className={`px-3 py-1.5 rounded-md text-sm font-bold ${
                questionCount === num
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters */}
      <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
        <h2 className="font-bold text-sm mb-2">Chapters</h2>
        
        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>
        
        <div className="space-y-1.5">
          {filteredChapters.map((chapter) => {
            const isSelected = selectedChapters.has(chapter.id);
            return (
              <button
                key={chapter.id}
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg border text-left ${
                  isSelected
                    ? 'border-brand-blue bg-brand-blue/5'
                    : 'border-gray-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'bg-brand-blue border-brand-blue' : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs truncate">{chapter.name}</p>
                  <p className="text-xs text-gray-500">{chapter.questionCount} Q</p>
                </div>
              </button>
            );
          })}
        </div>
        {filteredChapters.length === 0 && (
          <p className="text-center text-gray-500 py-3 text-sm">No chapters found</p>
        )}
      </div>

      {/* Start Button */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-white border-t border-gray-200">
        <button
          onClick={handleStartPractice}
          disabled={!canStart}
          className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-1.5 text-sm ${
            canStart
              ? 'bg-brand-green text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Play className="w-4 h-4" fill="currentColor" />
          Start ({questionCount} Q)
        </button>
        {!canStart && (
          <p className="text-center text-xs text-gray-500 mt-1.5">
            Need 5+ questions
          </p>
        )}
      </div>
    </div>
  );
}
