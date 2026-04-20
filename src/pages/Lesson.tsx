import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { subjects } from '../data/curriculum';
import { useUserStore } from '../store/userStore';
import type { Activity, Level } from '../types';

// Activity Components
import QuizActivity from '../components/activities/QuizActivity';
import FlashcardActivity from '../components/activities/FlashcardActivity';
import MatchActivity from '../components/activities/MatchActivity';
import TrueFalseActivity from '../components/activities/TrueFalseActivity';
import FillBlankActivity from '../components/activities/FillBlankActivity';

export default function Lesson() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { hearts, useHeart, completeLesson } = useUserStore();
  
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [heartsUsed, setHeartsUsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stars, setStars] = useState(0);

  // Find level and activities
  let level: Level | null = null;
  for (const subject of subjects) {
    for (const grade of ['plus_one', 'plus_two'] as const) {
      for (const chapter of subject.grades[grade]) {
        for (const mod of chapter.modules) {
          const found = mod.levels.find(l => l.id === levelId);
          if (found) {
            level = found;
            break;
          }
        }
      }
    }
  }

  const activities = level?.activities || [];
  const currentActivity = activities[currentActivityIndex];

  const handleActivityComplete = useCallback((correct: boolean, xpEarned: number) => {
    if (correct) {
      setScore(s => s + xpEarned);
    } else {
      const newHeartsUsed = heartsUsed + 1;
      setHeartsUsed(newHeartsUsed);
      useHeart();
      
      if (hearts - newHeartsUsed <= 0) {
        // Out of hearts
        return;
      }
    }

    if (currentActivityIndex < activities.length - 1) {
      setCurrentActivityIndex(i => i + 1);
    } else {
      // Level completed
      const earnedStars = Math.min(3, Math.ceil((score + xpEarned) / (activities.length * 5)));
      setStars(earnedStars);
      setIsCompleted(true);
      completeLesson(levelId!, earnedStars, score + xpEarned);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#58cc02', '#ffc800', '#1cb0f6', '#ff4b4b']
      });
    }
  }, [currentActivityIndex, activities.length, hearts, heartsUsed, score, levelId, completeLesson, useHeart]);

  const handleExit = () => navigate(-1);

  if (!level) return <div>Level not found</div>;

  if (isCompleted) {
    return <LessonComplete 
      level={level} 
      stars={stars} 
      score={score} 
      onContinue={handleExit}
    />;
  }

  if (hearts <= 0) {
    return <OutOfHearts onExit={handleExit} />;
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-gray-100">
        <button onClick={handleExit} className="p-2 hover:bg-gray-100 rounded-xl">
          <X className="w-6 h-6 text-gray-500" />
        </button>
        
        {/* Progress */}
        <div className="flex-1 mx-4">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-green"
              initial={{ width: 0 }}
              animate={{ width: `${((currentActivityIndex) / activities.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-2 text-brand-red font-bold">
          <Heart className="w-6 h-6 fill-current" />
          <span>{hearts - heartsUsed}</span>
        </div>
      </div>

      {/* Activity */}
      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentActivityIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto h-full"
          >
            <ActivityRenderer 
              activity={currentActivity}
              onComplete={handleActivityComplete}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Progress */}
      <div className="p-4 border-t-2 border-gray-100">
        <p className="text-center text-gray-500 text-sm">
          Question {currentActivityIndex + 1} of {activities.length}
        </p>
      </div>
    </div>
  );
}

function ActivityRenderer({ activity, onComplete }: { activity: Activity; onComplete: (correct: boolean, xp: number) => void }) {
  switch (activity.type) {
    case 'quiz':
      return <QuizActivity activity={activity} onComplete={onComplete} />;
    case 'flashcard':
      return <FlashcardActivity activity={activity} onComplete={onComplete} />;
    case 'match':
      return <MatchActivity activity={activity} onComplete={onComplete} />;
    case 'true_false':
      return <TrueFalseActivity activity={activity} onComplete={onComplete} />;
    case 'fill_blank':
      return <FillBlankActivity activity={activity} onComplete={onComplete} />;
    default:
      return <div>Unknown activity type</div>;
  }
}

function LessonComplete({ level, stars, score, onContinue }: { level: Level; stars: number; score: number; onContinue: () => void }) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete!</h1>
        <p className="text-gray-500 mb-6">{level.name}</p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <Star 
              key={i}
              className={`w-16 h-16 ${i < stars ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-200'}`}
            />
          ))}
        </div>

        {/* XP Earned */}
        <div className="bg-brand-yellow/10 rounded-2xl p-6 mb-6">
          <p className="text-gray-500 mb-1">Total XP Earned</p>
          <p className="text-4xl font-bold text-brand-yellow">+{score}</p>
        </div>

        <button onClick={onContinue} className="btn-primary w-full max-w-xs">
          Continue
        </button>
      </motion.div>
    </div>
  );
}

const REFILL_COST = 50; // Gems required to refill hearts

function OutOfHearts({ onExit }: { onExit: () => void }) {
  const { refillHearts, gems, addGems } = useUserStore();
  const canRefill = gems >= REFILL_COST;
  
  const handleRefill = () => {
    if (canRefill) {
      addGems(-REFILL_COST); // Deduct gems
      refillHearts(); // Refill hearts to 5
      onExit();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 p-4">
      <div className="text-6xl mb-4">💔</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Out of Hearts!</h1>
      <p className="text-gray-500 mb-2 text-center">
        You ran out of hearts. Spend gems to refill instantly!
      </p>
      
      {/* Gem Cost Display */}
      <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-blue-50 rounded-xl">
        <span className="text-2xl">💎</span>
        <span className={`font-bold ${canRefill ? 'text-brand-blue' : 'text-red-500'}`}>
          {REFILL_COST} gems
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-500">You have: {gems} 💎</span>
      </div>

      <div className="flex gap-4">
        <button onClick={onExit} className="btn-secondary">
          Exit
        </button>
        <button 
          onClick={handleRefill}
          disabled={!canRefill}
          className={`btn-primary flex items-center gap-2 ${!canRefill ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span>💎</span>
          Refill Now
        </button>
      </div>
      
      {!canRefill && (
        <p className="text-red-500 text-sm mt-4 text-center">
          Not enough gems! Complete lessons to earn more.
        </p>
      )}
    </div>
  );
}
