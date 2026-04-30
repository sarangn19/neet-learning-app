import { useState, useCallback } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { subjects } from '../data/curriculum';
import { useUserStore } from '../store/userStore';
import type { Activity, Level, Badge } from '../types';



// Activity Components

import QuizActivity from '../components/activities/QuizActivity';

import FlashcardActivity from '../components/activities/FlashcardActivity';

import MatchActivity from '../components/activities/MatchActivity';

import TrueFalseActivity from '../components/activities/TrueFalseActivity';

import FillBlankActivity from '../components/activities/FillBlankActivity';



export default function Lesson() {

  const { levelId } = useParams<{ levelId: string }>();

  const navigate = useNavigate();

  const { completeLesson, addCatFood, lessonProgress } = useUserStore();

  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stars, setStars] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<Badge[]>([]);
  const [showBadgeIndex, setShowBadgeIndex] = useState(0);



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



  const handleActivityComplete = useCallback((correct: boolean, points: number) => {

    setTimeout(() => {

      

      if (correct) {

        setScore(s => s + points);

      }



      if (currentActivityIndex < activities.length - 1) {

        setCurrentActivityIndex(i => i + 1);

      } else {

        // Level completed

        const earnedStars = Math.min(3, Math.ceil((score + points) / (activities.length * 5)));

        setIsCompleted(true);
        setStars(earnedStars);
        
        // Complete lesson and check for badges
        completeLesson(levelId!, earnedStars).then((newBadges) => {
          if (newBadges && newBadges.length > 0) {
            setUnlockedBadges(newBadges);
            setShowBadgeIndex(0);
          }
        });

        

        // Check if all levels in parent module are completed

        let parentModule = null;

        let allModuleLevelsCompleted = false;

        

        for (const subject of subjects) {

          for (const grade of ['plus_one', 'plus_two'] as const) {

            for (const chapter of subject.grades[grade]) {

              for (const mod of chapter.modules) {

                const levelIndex = mod.levels.findIndex(l => l.id === levelId);

                if (levelIndex !== -1) {

                  parentModule = mod;

                  // Check if all levels in this module are now completed

                  allModuleLevelsCompleted = mod.levels.every(l => 

                    l.id === levelId || lessonProgress[l.id]?.completed

                  );

                  break;

                }

              }

              if (parentModule) break;

            }

            if (parentModule) break;

          }

          if (parentModule) break;

        }

        

        // Award cat food if module is completed

        if (parentModule && allModuleLevelsCompleted) {

          setModuleCompleted(true);

          addCatFood(3);

        }

        

        confetti({

          particleCount: 100,

          spread: 70,

          origin: { y: 0.6 },

          colors: ['#58cc02', '#ffc800', '#1cb0f6', '#ff4b4b']

        });

      }

    }, 1500); // Delay before next activity

  }, [currentActivityIndex, activities.length, score, levelId, completeLesson, addCatFood, lessonProgress]);



  const handleExit = () => navigate(-1);



  if (!level) return <div>Level not found</div>;



  // Show badge unlock popup
  if (unlockedBadges.length > 0 && showBadgeIndex < unlockedBadges.length) {
    const badge = unlockedBadges[showBadgeIndex];
    return (
      <BadgeUnlockPopup
        badge={badge}
        currentIndex={showBadgeIndex}
        totalCount={unlockedBadges.length}
        onContinue={() => {
          if (showBadgeIndex < unlockedBadges.length - 1) {
            setShowBadgeIndex(prev => prev + 1);
          } else {
            setShowBadgeIndex(unlockedBadges.length); // Mark all as shown
          }
        }}
      />
    );
  }

  if (isCompleted) {
    return <LessonComplete 
      level={level} 
      stars={stars} 
      score={score} 
      onContinue={handleExit}
      moduleCompleted={moduleCompleted}
    />;
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



function ActivityRenderer({ activity, onComplete }: { activity: Activity; onComplete: (correct: boolean, tokens: number) => void }) {

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



function LessonComplete({ level, stars, score, onContinue, moduleCompleted }: { level: Level; stars: number; score: number; onContinue: () => void; moduleCompleted: boolean }) {

  return (

    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 p-4">

      <motion.div

        initial={{ scale: 0.8, opacity: 0 }}

        animate={{ scale: 1, opacity: 1 }}

        className="text-center"

      >

        <div className="text-xl mb-4">🎉</div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">Lesson Complete!</h1>

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



        {/* Module completion bonus */}

        {moduleCompleted && (

          <motion.div 

            initial={{ scale: 0.8, opacity: 0 }}

            animate={{ scale: 1, opacity: 1 }}

            transition={{ delay: 0.3 }}

            className="bg-amber-100 rounded-2xl p-4 mb-6"

          >

            <p className="text-amber-600 font-bold text-sm mb-1">🎊 Module Completed!</p>

            <p className="text-amber-700 text-lg font-bold">+3 Cat Food 🍗</p>

          </motion.div>

        )}



        {/* Score */}

        <div className="bg-brand-yellow/10 rounded-2xl p-6 mb-6">

          <p className="text-gray-500 mb-1">Score</p>

          <p className="text-xl font-bold text-brand-yellow">{score} pts</p>

        </div>



        <button onClick={onContinue} className="btn-primary w-full max-w-xs">

          Continue

        </button>

      </motion.div>

    </div>

  );

}

// Badge Unlock Popup Component
function BadgeUnlockPopup({ 
  badge, 
  currentIndex, 
  totalCount, 
  onContinue 
}: { 
  badge: Badge; 
  currentIndex: number; 
  totalCount: number; 
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
      >
        {/* Badge Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 10 }}
          className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <span className="text-5xl">{badge.icon}</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Badge Unlocked!
        </motion.h2>

        {/* Badge Name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-semibold text-purple-600 mb-2"
        >
          {badge.name}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 mb-6"
        >
          {badge.description}
        </motion.p>

        {/* Progress indicator */}
        {totalCount > 1 && (
          <p className="text-sm text-gray-400 mb-4">
            {currentIndex + 1} of {totalCount}
          </p>
        )}

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onContinue}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-colors"
        >
          {currentIndex < totalCount - 1 ? 'Next Badge →' : 'Awesome!'}
        </motion.button>
      </motion.div>
    </div>
  );
}

