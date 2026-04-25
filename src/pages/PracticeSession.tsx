import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { getQuestionsForChapters, shuffleArray } from '../data/questionBank';

export default function PracticeSession() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load questions once using state initializer (runs only once on mount)
  const [questions] = useState(() => {
    const chaptersValue = searchParams.get('chapters') || '';
    const countValue = searchParams.get('count') || '10';
    const chapterIds = chaptersValue.split(',').filter(Boolean);
    const allQuestions = getQuestionsForChapters(chapterIds);
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, Math.min(parseInt(countValue, 10), shuffled.length));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (!showResult) setSelected(idx);
  };

  const handleCheck = () => {
    if (selected === null) return;
    if (selected === question.correctAnswer) {
      setScore(s => s + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // Force re-render to show results
      setCurrentIndex(questions.length);
    }
  };

  // Results screen
  if (!question || currentIndex >= questions.length) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="fixed inset-0 bg-white flex flex-col z-50 p-4 overflow-auto">
        <div className="max-w-md mx-auto w-full text-center pt-8">
          <div className="text-5xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '📚'}</div>
          <h1 className="text-2xl font-bold mb-2">
            {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
          </h1>
          <p className="text-gray-500 mb-6">You got {score} out of {questions.length} correct</p>
          <div className="text-3xl font-bold text-brand-green mb-8">{percentage}%</div>

          <div className="space-y-3">
            <button onClick={() => window.location.reload()} className="w-full py-3 bg-brand-green text-white rounded-xl font-bold">
              Practice Again
            </button>
            <button onClick={() => navigate('/practice')} className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold">
              New Session
            </button>
            <button onClick={() => navigate('/')} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-gray-100">
        <button onClick={() => navigate('/practice')} className="p-2">
          <X className="w-6 h-6 text-gray-500" />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-3 bg-gray-200 rounded-full">
            <div
              className="h-full bg-brand-green rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-center text-gray-500 mt-1">{currentIndex + 1} / {questions.length}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Score</p>
          <p className="font-bold text-brand-green">{score}</p>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 p-4 overflow-auto pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
              {question.subjectName} • {question.chapterName}
            </span>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              let cls = 'w-full p-4 rounded-xl border-2 text-left font-bold transition-all ';
              if (showResult) {
                if (idx === question.correctAnswer) cls += 'bg-green-100 border-green-500 text-green-700';
                else if (idx === selected) cls += 'bg-red-100 border-red-500 text-red-700';
                else cls += 'bg-gray-50 border-gray-200 text-gray-400';
              } else {
                cls += selected === idx
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400';
              }

              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={showResult} className={cls}>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                    {showResult && idx === question.correctAnswer && <CheckCircle2 className="w-5 h-5 ml-auto text-green-600" />}
                    {showResult && idx === selected && idx !== question.correctAnswer && <XCircle className="w-5 h-5 ml-auto text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-bold">Explanation: </span>{question.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Fixed above bottom nav */}
      <div className="fixed bottom-16 left-0 right-0 p-4 border-t-2 border-gray-100 bg-white z-50">
        {!showResult ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className={`w-full py-4 rounded-xl font-bold ${
              selected !== null ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-400'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl font-bold bg-brand-blue text-white flex items-center justify-center gap-2"
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
