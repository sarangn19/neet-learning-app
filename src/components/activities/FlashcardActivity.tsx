import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
  onComplete: (correct: boolean, tokens: number) => void;
}

export default function FlashcardActivity({ activity, onComplete }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasSeenBack, setHasSeenBack] = useState(false);

  const { front, back, hint } = activity.data as { front: string; back: string; hint?: string };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setHasSeenBack(true);
    }
  };

  const handleKnowIt = () => {
    onComplete(true, activity.tokenReward);
  };

  const handleNeedPractice = () => {
    onComplete(true, Math.floor(activity.tokenReward / 2));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Question */}
      <div className="mb-6">
        <p className="text-lg font-bold text-gray-900">{activity.question}</p>
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <motion.div
          onClick={handleFlip}
          className="w-full max-w-md aspect-[3/2] cursor-pointer perspective-1000"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="w-full h-full relative preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div 
              className="absolute inset-0 bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden shadow-lg"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className="text-xl font-bold text-gray-900 text-center">{front}</p>
              <div className="mt-4 flex items-center gap-2 text-gray-400">
                <RotateCw className="w-4 h-4" />
                <span className="text-sm">Tap to flip</span>
              </div>
              {hint && (
                <p className="mt-4 text-sm text-gray-400">Hint: {hint}</p>
              )}
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 bg-brand-blue/10 border-2 border-brand-blue rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-xl font-bold text-brand-blue text-center">{back}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Actions */}
      {hasSeenBack && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
        >
          <button onClick={handleNeedPractice} className="flex-1 btn-secondary">
            Need Practice
          </button>
          <button onClick={handleKnowIt} className="flex-1 btn-primary">
            I Know This!
          </button>
        </motion.div>
      )}
    </div>
  );
}
