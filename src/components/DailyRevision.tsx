import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCw, ChevronRight, Zap, BookOpen, Atom, FlaskConical } from 'lucide-react';
import { useUserStore } from '../store/userStore';

interface Props {
  onClose: () => void;
  onStartLesson: () => void;
}

// Subject-specific flashcards
const subjectFlashcards: Record<string, { front: string; back: string; subject: string; icon: any }[]> = {
  biology: [
    { front: 'Dental Formula', back: '2-1-2-3 = 32 permanent teeth in adults', subject: 'Biology', icon: BookOpen },
    { front: 'Pepsin', back: 'Protein-digesting enzyme activated by HCl in stomach', subject: 'Biology', icon: BookOpen },
    { front: 'Bile', back: 'Produced by liver, stored in gall bladder, NO enzymes - only emulsifies fats', subject: 'Biology', icon: BookOpen },
    { front: 'Villi', back: 'Finger-like projections in small intestine for absorption', subject: 'Biology', icon: BookOpen },
    { front: 'Lacteals', back: 'Lymph vessels in villi that absorb fatty acids', subject: 'Biology', icon: BookOpen },
    { front: 'Trypsin', back: 'Pancreatic enzyme that digests proteins into peptides', subject: 'Biology', icon: BookOpen },
    { front: 'Intrinsic Factor', back: 'Secreted by parietal cells for Vitamin B12 absorption', subject: 'Biology', icon: BookOpen },
    { front: 'HCl', back: 'Secreted by parietal cells; activates pepsinogen and kills bacteria', subject: 'Biology', icon: BookOpen },
  ],
  physics: [
    { front: 'Newton\'s 1st Law', back: 'Object remains at rest or uniform motion unless acted by external force', subject: 'Physics', icon: Atom },
    { front: 'Force', back: 'F = ma (Mass × Acceleration)', subject: 'Physics', icon: Atom },
    { front: 'Velocity', back: 'Rate of change of displacement with time (vector quantity)', subject: 'Physics', icon: Atom },
    { front: 'Acceleration', back: 'Rate of change of velocity with time', subject: 'Physics', icon: Atom },
    { front: 'Momentum', back: 'p = mv (Mass × Velocity)', subject: 'Physics', icon: Atom },
    { front: 'Work', back: 'W = F × d (Force × Displacement)', subject: 'Physics', icon: Atom },
    { front: 'Kinetic Energy', back: 'KE = ½mv²', subject: 'Physics', icon: Atom },
    { front: 'Potential Energy', back: 'PE = mgh', subject: 'Physics', icon: Atom },
  ],
  chemistry: [
    { front: 'Mole Concept', back: '1 mole = 6.022 × 10²³ particles (Avogadro number)', subject: 'Chemistry', icon: FlaskConical },
    { front: 'Molarity', back: 'Moles of solute per liter of solution', subject: 'Chemistry', icon: FlaskConical },
    { front: 'Atomic Number', back: 'Number of protons in nucleus', subject: 'Chemistry', icon: FlaskConical },
    { front: 'Mass Number', back: 'Protons + Neutrons in nucleus', subject: 'Chemistry', icon: FlaskConical },
    { front: 'Isotopes', back: 'Same atomic number, different mass number', subject: 'Chemistry', icon: FlaskConical },
    { front: 'Covalent Bond', back: 'Sharing of electron pairs between atoms', subject: 'Chemistry', icon: FlaskConical },
    { front: 'Ionic Bond', back: 'Transfer of electrons from metal to non-metal', subject: 'Chemistry', icon: FlaskConical },
    { front: 'pH Scale', back: 'pH < 7 acidic, pH = 7 neutral, pH > 7 basic', subject: 'Chemistry', icon: FlaskConical },
  ],
};

export default function DailyRevision({ onClose, onStartLesson }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { completedLessons } = useUserStore();

  // Determine which subjects were attempted (mock logic - in real app, this would check lastAttempted date)
  // For now, show mix of all subjects or specific subject if lessons completed
  const attemptedSubjects = useMemo(() => {
    const subjects = new Set<string>();
    if (completedLessons.some(l => l.includes('bio'))) subjects.add('biology');
    if (completedLessons.some(l => l.includes('phy'))) subjects.add('physics');
    if (completedLessons.some(l => l.includes('chem'))) subjects.add('chemistry');
    
    // Default to biology if no subjects found (first time user)
    if (subjects.size === 0) subjects.add('biology');
    
    return Array.from(subjects);
  }, [completedLessons]);

  // Get flashcards from attempted subjects
  const revisionFlashcards = useMemo(() => {
    let cards: { front: string; back: string; subject: string; icon: any }[] = [];
    attemptedSubjects.forEach(subject => {
      if (subjectFlashcards[subject]) {
        cards = [...cards, ...subjectFlashcards[subject]];
      }
    });
    // Shuffle and take max 8 cards
    return cards.sort(() => Math.random() - 0.5).slice(0, 8);
  }, [attemptedSubjects]);

  const currentCard = revisionFlashcards[currentIndex] || revisionFlashcards[0];
  const progress = revisionFlashcards.length > 0 ? ((currentIndex + 1) / revisionFlashcards.length) * 100 : 0;
  const SubjectIcon = currentCard?.icon || BookOpen;

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < revisionFlashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Completed revision
      onStartLesson();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button 
          onClick={handleSkip}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-blue"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <span className="text-sm text-gray-500 font-bold">
          {currentIndex + 1}/{revisionFlashcards.length}
        </span>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start p-4 sm:p-6 bg-gray-50">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 text-center">
          Daily Revision 🔥
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mb-3 text-center">
          Quick review of subjects you attempted
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {attemptedSubjects.map(subject => (
            <span 
              key={subject} 
              className="px-2 py-1 bg-violet-100 text-violet-600 text-xs font-bold rounded-full capitalize"
            >
              {subject}
            </span>
          ))}
        </div>

        {/* Flashcard */}
        <div className="w-full max-w-sm mb-6">
          <motion.div
            onClick={handleFlip}
            className="w-full aspect-[3/2] cursor-pointer"
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-full h-full relative"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div 
                className="absolute inset-0 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-lg"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SubjectIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                    {currentCard.subject}
                  </span>
                </div>
                <p className="text-base sm:text-xl font-bold text-gray-900 text-center">{currentCard.front}</p>
                <div className="mt-4 flex items-center gap-2 text-gray-400">
                  <RotateCw className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Tap to flip</span>
                </div>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 bg-brand-blue/10 border-2 border-brand-blue rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-lg"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SubjectIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
                  <span className="text-xs text-brand-blue font-bold uppercase tracking-wide">
                    Answer
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-brand-blue text-center">{currentCard.back}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Action Button */}
        <AnimatePresence mode="wait">
          {isFlipped ? (
            <motion.button
              key="next"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={handleNext}
              className="btn-cta-sm flex items-center gap-2"
            >
              {currentIndex < revisionFlashcards.length - 1 ? (
                <>
                  Next Card
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Start Learning!
                  <Zap className="w-5 h-5" />
                </>
              )}
            </motion.button>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 text-sm"
            >
              Tap the card to see the answer
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip Option */}
        <button 
          onClick={handleSkip}
          className="mt-4 text-gray-400 hover:text-gray-600 text-sm font-bold"
        >
          Skip revision
        </button>
      </div>
    </div>
  );
}
