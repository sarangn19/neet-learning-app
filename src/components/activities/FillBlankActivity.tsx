import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
  onComplete: (correct: boolean, xp: number) => void;
}

export default function FillBlankActivity({ activity, onComplete }: Props) {
  const { sentence, blanks, options } = activity.data as { sentence: string; blanks: string[]; options: string[] };
  
  const [filled, setFilled] = useState<string[]>(new Array(blanks.length).fill(''));
  const [availableOptions, setAvailableOptions] = useState(options);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectOption = (option: string) => {
    if (showResult) return;
    
    const firstEmptyIndex = filled.findIndex(f => f === '');
    if (firstEmptyIndex === -1) return;
    
    const newFilled = [...filled];
    newFilled[firstEmptyIndex] = option;
    setFilled(newFilled);
    setAvailableOptions(prev => prev.filter(o => o !== option));
  };

  const handleRemoveFilled = (index: number) => {
    if (showResult) return;
    
    const option = filled[index];
    if (!option) return;
    
    const newFilled = [...filled];
    newFilled[index] = '';
    setFilled(newFilled);
    setAvailableOptions(prev => [...prev, option]);
  };

  const handleCheck = () => {
    if (filled.some(f => f === '')) return;
    
    const correct = filled.every((f, i) => f === blanks[i]);
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct, correct ? activity.xpReward : Math.floor(activity.xpReward / 2));
    }, 1500);
  };

  // Parse sentence with blanks
  const parts = sentence.split('_____');

  return (
    <div className="h-full flex flex-col">
      {/* Question */}
      <div className="mb-6">
        <p className="text-lg font-bold text-gray-900 mb-2">{activity.question}</p>
      </div>

      {/* Sentence with Blanks */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-6">
        <p className="text-lg leading-relaxed">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < blanks.length && (
                <motion.button
                  onClick={() => handleRemoveFilled(i)}
                  className={`inline-block mx-1 px-3 py-1 rounded-lg font-bold min-w-[80px] ${
                    filled[i]
                      ? showResult
                        ? filled[i] === blanks[i]
                          ? 'bg-brand-green text-white'
                          : 'bg-brand-red text-white'
                        : 'bg-brand-blue text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  disabled={!filled[i] || showResult}
                >
                  {filled[i] || '___'}
                </motion.button>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Options */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-3">Choose words to fill in the blanks:</p>
        <div className="flex flex-wrap gap-2">
          {availableOptions.map((option) => (
            <motion.button
              key={option}
              onClick={() => handleSelectOption(option)}
              className="px-4 py-2 rounded-xl border-2 border-gray-200 bg-white font-bold hover:border-brand-blue hover:bg-brand-blue/10 transition-all duration-200"
              whileTap={{ scale: 0.95 }}
              disabled={showResult}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Result / Check */}
      <AnimatePresence>
        {showResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl ${isCorrect ? 'bg-brand-green/10 border-2 border-brand-green' : 'bg-brand-red/10 border-2 border-brand-red'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-brand-green" />
                  <span className="font-bold text-brand-green">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-brand-red" />
                  <span className="font-bold text-brand-red">Incorrect!</span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Correct answer: {blanks.join(', ')}
            </p>
          </motion.div>
        ) : (
          <div className="mt-auto">
            <button
              onClick={handleCheck}
              disabled={filled.some(f => f === '')}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
