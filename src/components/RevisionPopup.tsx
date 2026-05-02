import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, BookOpen, AlertCircle, TrendingDown, Target } from 'lucide-react';
import { usePerformanceStore } from '../store/performanceStore';

interface RevisionPopupProps {
  onClose: () => void;
  onStartRevision: () => void;
  onPracticeWeakArea?: (subjectId: string) => void;
  disabled?: boolean;
}

export default function RevisionPopup({ onClose, onStartRevision, onPracticeWeakArea, disabled = false }: RevisionPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const weakAreas = usePerformanceStore((state) => state.weakAreas);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!disabled && weakAreas.length > 0) {
        setIsVisible(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [disabled, weakAreas.length]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleStart = () => {
    setIsVisible(false);
    onStartRevision();
  };

  const handlePracticeWeakArea = (subjectId: string) => {
    setIsVisible(false);
    onPracticeWeakArea?.(subjectId);
  };

  // Get top 2 weak areas to suggest
  const topWeakAreas = weakAreas.slice(0, 2);

  if (weakAreas.length === 0) {
    return null; // Don't show if no weak areas
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[15%] z-[100] flex justify-center pointer-events-none"
          >
            <div className="bg-white rounded-2xl p-6 shadow-2xl relative w-full max-w-[360px] pointer-events-auto">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Icon */}
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Target className="w-7 h-7 text-amber-600" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Time to Improve! 🎯
              </h3>
              <p className="text-sm text-gray-500 text-center mb-5">
                Based on your performance, these topics need more practice
              </p>

              {/* Stats Summary */}
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-red-500">
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-bold text-sm">{weakAreas.length}</span>
                  </div>
                  <p className="text-xs text-gray-500">Weak areas</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-bold text-sm">{Math.round(weakAreas[0]?.accuracy || 0)}%</span>
                  </div>
                  <p className="text-xs text-gray-500">Lowest accuracy</p>
                </div>
              </div>

              {/* Weak Areas List */}
              <div className="space-y-2 mb-5">
                {topWeakAreas.map((area) => (
                  <motion.div
                    key={area.chapterId}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handlePracticeWeakArea(area.subjectId)}
                    className="flex items-center gap-3 p-3 bg-red-50 rounded-xl cursor-pointer hover:bg-red-100 transition-colors border border-red-100"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{area.chapterName}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500 capitalize">{area.subjectId}</p>
                        <span className="text-xs text-red-500 font-medium">{area.accuracy.toFixed(0)}% accuracy</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Later
                </button>
                <button
                  onClick={() => handlePracticeWeakArea(topWeakAreas[0]?.subjectId)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-sm hover:shadow-lg transition-all"
                >
                  Practice Now
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-3">
                Tap on a topic to practice it
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
