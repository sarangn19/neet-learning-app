import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
  onComplete: (correct: boolean, tokens: number) => void;
}

export default function WordScrambleActivity({ activity, onComplete }: Props) {
  const { word, scrambled, hint } = activity.data as { 
    word: string; 
    scrambled: string; 
    hint?: string;
  };
  
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);

  // Create letter tiles from scrambled word
  useEffect(() => {
    const letters = scrambled.split('');
    setShuffledLetters(letters.sort(() => Math.random() - 0.5));
  }, [scrambled]);

  const handleLetterClick = (letter: string, index: number) => {
    if (showResult) return;
    setInput(prev => prev + letter);
    // Remove used letter
    setShuffledLetters(prev => prev.filter((_, i) => i !== index));
  };

  const handleBackspace = () => {
    if (showResult || input.length === 0) return;
    const lastChar = input[input.length - 1];
    setInput(prev => prev.slice(0, -1));
    // Return letter to pool
    setShuffledLetters(prev => [...prev, lastChar]);
  };

  const handleReset = () => {
    if (showResult) return;
    // Return all letters to pool
    const allLetters = [...shuffledLetters, ...input.split('')];
    setShuffledLetters(allLetters.sort(() => Math.random() - 0.5));
    setInput('');
  };

  const handleCheck = () => {
    if (input.length === 0) return;
    
    setAttempts(a => a + 1);
    const correct = input.toLowerCase() === word.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct, activity.tokenReward);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Question */}
      <div className="mb-4">
        <p className="text-lg font-bold text-gray-900">{activity.question}</p>
        <p className="text-sm text-gray-500">Unscramble the word</p>
      </div>

      {/* Hint */}
      {hint && (
        <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Hint:</span> {hint}
          </p>
        </div>
      )}

      {/* Answer Display */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold tracking-widest uppercase">
              {input || '_'}
            </span>
          </div>
          <button
            onClick={handleBackspace}
            disabled={input.length === 0 || showResult}
            className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center disabled:opacity-50"
          >
            <span className="text-xl">←</span>
          </button>
          <button
            onClick={handleReset}
            disabled={showResult}
            className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center disabled:opacity-50"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Letter Tiles */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {shuffledLetters.map((letter, index) => (
          <motion.button
            key={`${letter}-${index}`}
            onClick={() => handleLetterClick(letter, index)}
            disabled={showResult}
            className="w-12 h-12 bg-brand-blue text-white rounded-xl font-bold text-xl shadow-md hover:shadow-lg transition-shadow"
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {letter.toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* Result / Action */}
      <AnimatePresence>
        {showResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-brand-green/10 border-2 border-brand-green' : 'bg-brand-red/10 border-2 border-brand-red'}`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-brand-green" />
              ) : (
                <XCircle className="w-6 h-6 text-brand-red" />
              )}
              <p className={`font-bold ${isCorrect ? 'text-brand-green' : 'text-brand-red'}`}>
                {isCorrect ? 'Correct!' : `The answer was: ${word}`}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="mt-auto">
            <button
              onClick={handleCheck}
              disabled={input.length !== word.length}
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
