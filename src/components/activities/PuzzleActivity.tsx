import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
  onComplete: (correct: boolean, tokens: number) => void;
}

interface PuzzlePiece {
  id: number;
  currentPos: number;
  correctPos: number;
  emoji: string;
}

export default function PuzzleActivity({ activity, onComplete }: Props) {
  const { pieces: puzzlePieces } = activity.data as { pieces: { id: string; emoji: string; correctPos: number }[] };
  
  // Create puzzle pieces
  const [pieces, setPieces] = useState<PuzzlePiece[]>(() => {
    return puzzlePieces.map((item, index) => ({
      id: index,
      currentPos: index,
      correctPos: item.correctPos,
      emoji: item.emoji,
    })).sort(() => Math.random() - 0.5);
  });

  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handlePieceClick = (index: number) => {
    if (isComplete) return;

    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else if (selectedPiece === index) {
      setSelectedPiece(null);
    } else {
      // Swap pieces
      const newPieces = [...pieces];
      const temp = newPieces[selectedPiece];
      newPieces[selectedPiece] = newPieces[index];
      newPieces[index] = temp;
      
      setPieces(newPieces);
      setSelectedPiece(null);
      setAttempts(a => a + 1);

      // Check if complete
      const isCorrect = newPieces.every((piece, i) => piece.correctPos === i);
      if (isCorrect) {
        setIsComplete(true);
        const earnedXP = Math.floor(activity.tokenReward * (0.5 + (puzzlePieces.length / Math.max(attempts + 1, puzzlePieces.length)) * 0.5));
        setTimeout(() => onComplete(true, earnedXP), 500);
      }
    }
  };

  const correctCount = pieces.filter((piece, i) => piece.correctPos === i).length;

  return (
    <div className="h-full flex flex-col">
      {/* Question */}
      <div className="mb-4">
        <p className="text-lg font-bold text-gray-900">{activity.question}</p>
        <p className="text-sm text-gray-500">Tap two pieces to swap them</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{correctCount}/{pieces.length} in place</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-green"
              animate={{ width: `${(correctCount / pieces.length) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">Moves: {attempts}</p>
      </div>

      {/* Puzzle Grid */}
      <div className="grid grid-cols-3 gap-2 flex-1 max-w-xs mx-auto w-full">
        {pieces.map((piece, index) => (
          <motion.button
            key={piece.id}
            onClick={() => handlePieceClick(index)}
            disabled={isComplete}
            className={`relative aspect-square rounded-xl border-2 transition-all ${
              isComplete
                ? 'border-brand-green bg-brand-green/10'
                : selectedPiece === index
                  ? 'border-brand-blue bg-brand-blue/10 ring-2 ring-brand-blue'
                  : piece.correctPos === index
                    ? 'border-brand-green/50 bg-brand-green/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: selectedPiece === index ? 1.05 : 1,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">{piece.emoji}</span>
            </div>
            
            {/* Position indicator */}
            {!isComplete && piece.correctPos === index && (
              <div className="absolute top-1 right-1">
                <div className="w-2 h-2 bg-brand-green rounded-full" />
              </div>
            )}

            {/* Piece number for hint */}
            <div className="absolute bottom-1 left-1">
              <span className="text-[10px] text-gray-400 font-medium">
                {piece.correctPos + 1}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Completion message */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-brand-green/10 border-2 border-brand-green rounded-xl"
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-brand-green" />
            <p className="font-bold text-brand-green">Puzzle Complete!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
