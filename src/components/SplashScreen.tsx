import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Atom, FlaskConical, Dna, Calculator } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 4;
      });
    }, duration / 25);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center"
        >
          {/* Animated Icons */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border-4 border-white/20 border-t-white flex items-center justify-center"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Orbiting icons */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <Atom className="w-6 h-6 text-white/80" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <FlaskConical className="w-6 h-6 text-white/80" />
              </div>
              <div className="absolute top-1/2 -left-2 -translate-y-1/2">
                <Dna className="w-6 h-6 text-white/80" />
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2">
                <Calculator className="w-6 h-6 text-white/80" />
              </div>
            </motion.div>
          </div>

          {/* Logo Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Science Learn</h1>
            <p className="text-white/80 text-lg">Master NEET with Interactive Learning</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mt-12 w-64">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-white/60 text-sm mt-3">
              Loading... {progress}%
            </p>
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
