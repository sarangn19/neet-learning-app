import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* White EduCat Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/white logo.png"
              alt="EduCat"
              className="w-48 h-48 object-contain"
            />
          </motion.div>

          {/* Circular Loader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
            />
          </motion.div>

          {/* Powered by Cognix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-24 flex flex-col items-center gap-2"
          >
            <span className="text-white/60 text-xs font-medium tracking-wide">Powered by</span>
            <img
              src="/images/cognix logo.png"
              alt="Cognix"
              className="h-10 object-contain opacity-80"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
