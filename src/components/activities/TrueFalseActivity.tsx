import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
  onComplete: (correct: boolean, tokens: number) => void;
}

export default function TrueFalseActivity({ activity, onComplete }: Props) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { statement, isTrue, explanation } = activity.data as { statement: string; isTrue: boolean; explanation: string };

  const handleSelect = (value: boolean) => {
    if (showResult) return;
    setSelected(value);
  };

  const handleCheck = () => {
    if (selected === null) return;
    
    setShowResult(true);
    const correct = selected === isTrue;
    
    setTimeout(() => {
      onComplete(correct, correct ? activity.tokenReward : Math.floor(activity.tokenReward / 2));
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Question */}
      <div className="mb-6">
        <p className="text-lg font-bold text-gray-900 mb-2">{activity.question}</p>
        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
          <p className="text-gray-800">{statement}</p>
        </div>
      </div>

      {/* True/False Buttons */}
      <div className="flex gap-4 mb-6">
        <motion.button
          onClick={() => handleSelect(true)}
          className={`flex-1 p-6 rounded-xl border-2 font-bold text-xl transition-all duration-200 ${
            selected === true
              ? showResult
                ? isTrue
                  ? 'border-brand-green bg-brand-green text-white'
                  : 'border-brand-red bg-brand-red text-white'
                : 'border-brand-blue bg-brand-blue text-white'
              : showResult && isTrue
                ? 'border-brand-green bg-brand-green text-white'
                : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">✓</span>
            <span>TRUE</span>
          </div>
        </motion.button>

        <motion.button
          onClick={() => handleSelect(false)}
          className={`flex-1 p-6 rounded-xl border-2 font-bold text-xl transition-all duration-200 ${
            selected === false
              ? showResult
                ? !isTrue
                  ? 'border-brand-green bg-brand-green text-white'
                  : 'border-brand-red bg-brand-red text-white'
                : 'border-brand-blue bg-brand-blue text-white'
              : showResult && !isTrue
                ? 'border-brand-green bg-brand-green text-white'
                : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">✗</span>
            <span>FALSE</span>
          </div>
        </motion.button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {showResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl ${selected === isTrue ? 'bg-brand-green/10 border-2 border-brand-green' : 'bg-brand-red/10 border-2 border-brand-red'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              {selected === isTrue ? (
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
            <p className="text-sm text-gray-600">{explanation}</p>
          </motion.div>
        ) : (
          <div className="mt-auto">
            <button
              onClick={handleCheck}
              disabled={selected === null}
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
