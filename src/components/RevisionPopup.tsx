import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, BookOpen } from 'lucide-react';

interface RevisionPopupProps {
  onClose: () => void;
  onStartRevision: () => void;
  disabled?: boolean;
}

export default function RevisionPopup({ onClose, onStartRevision, disabled = false }: RevisionPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!disabled) {
        setIsVisible(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [disabled]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleStart = () => {
    setIsVisible(false);
    onStartRevision();
  };

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
            className="fixed inset-x-4 top-[20%] z-[100] flex justify-center pointer-events-none"
          >
            <div className="bg-white rounded-2xl p-6 shadow-2xl relative w-full max-w-[340px] pointer-events-auto">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Icon */}
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Time to Revise!
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                You have some chapters ready for revision. Spaced repetition helps you remember better!
              </p>

              {/* Chapter list */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Living World</p>
                    <p className="text-xs text-gray-500">Biology • Due today</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Laws of Motion</p>
                    <p className="text-xs text-gray-500">Physics • Due tomorrow</p>
                  </div>
                </div>
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
                  onClick={handleStart}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
                >
                  Start Revision
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
