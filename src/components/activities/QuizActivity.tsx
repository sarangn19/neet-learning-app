import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Activity } from '../../types';
import { Sounds } from '../../utils/sounds';

interface Props {
  activity: Activity;
  onComplete: (correct: boolean, tokens: number) => void;
}

export default function QuizActivity({ activity, onComplete }: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { options, correctAnswer, explanation } = activity.data as { options: string[]; correctAnswer: number; explanation: string };

  const handleSelect = (index: number) => {
    if (showResult) return;
    Sounds.click();
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // Play sound based on correctness
    if (correct) {
      Sounds.correct();
    } else {
      Sounds.wrong();
    }
    
    setTimeout(() => {
      onComplete(correct, activity.tokenReward);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Question */}
      <div className="mb-8">
        <p className="text-lg font-bold text-gray-900 mb-2">{activity.question}</p>
        <p className="text-sm text-gray-500">Select the correct answer</p>
      </div>

      {/* Options */}
      <div className="space-y-3 flex-1">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all duration-200 ${
              selectedOption === index
                ? showResult
                  ? index === correctAnswer
                    ? 'border-brand-green bg-brand-green/10'
                    : 'border-brand-red bg-brand-red/10'
                  : 'border-brand-blue bg-brand-blue/10'
                : showResult && index === correctAnswer
                  ? 'border-brand-green bg-brand-green/10'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-600 font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              {showResult && index === correctAnswer && (
                <CheckCircle2 className="w-6 h-6 text-brand-green" />
              )}
              {showResult && selectedOption === index && index !== correctAnswer && (
                <XCircle className="w-6 h-6 text-brand-red" />
              )}
            </div>
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
            <p className={`font-bold ${isCorrect ? 'text-brand-green' : 'text-brand-red'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p className="text-sm text-gray-600 mt-1">{explanation}</p>
          </motion.div>
        ) : (
          <div className="mt-6">
            <button
              onClick={handleCheck}
              disabled={selectedOption === null}
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
