import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
  onComplete: (correct: boolean, tokens: number) => void;
}

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryActivity({ activity, onComplete }: Props) {
  const { pairs } = activity.data as { pairs: { term: string; definition: string }[] };
  
  // Create cards from pairs (term and definition for each)
  const [cards, setCards] = useState<Card[]>(() => {
    const allCards: Card[] = [];
    pairs.forEach((pair, index) => {
      allCards.push(
        { id: index * 2, content: pair.term, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, content: pair.definition, isFlipped: false, isMatched: false }
      );
    });
    return allCards.sort(() => Math.random() - 0.5);
  });
  
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const handleCardClick = (id: number) => {
    if (isChecking) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    
    const newCards = cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);
    
    if (newSelected.length === 2) {
      setIsChecking(true);
      setAttempts(a => a + 1);
      
      const card1 = cards.find(c => c.id === newSelected[0]);
      const card2 = newCards.find(c => c.id === id);
      
      // Check if they form a pair
      const pairIndex1 = Math.floor(card1!.id / 2);
      const pairIndex2 = Math.floor(card2!.id / 2);
      
      if (pairIndex1 === pairIndex2) {
        // Match!
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === newSelected[0] || c.id === id 
              ? { ...c, isMatched: true } 
              : c
          ));
          setSelectedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === newSelected[0] || c.id === id 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setSelectedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const matchedCount = cards.filter(c => c.isMatched).length;
    if (matchedCount === cards.length && cards.length > 0) {
      const accuracy = pairs.length / Math.max(attempts, pairs.length);
      const earnedXP = Math.floor(activity.tokenReward * (0.5 + accuracy * 0.5));
      setTimeout(() => onComplete(true, earnedXP), 500);
    }
  }, [cards, pairs.length, attempts, activity.tokenReward, onComplete]);

  const matchedPairs = cards.filter(c => c.isMatched).length / 2;

  return (
    <div className="h-full flex flex-col">
      {/* Question */}
      <div className="mb-4">
        <p className="text-lg font-bold text-gray-900">{activity.question}</p>
        <p className="text-sm text-gray-500">Find matching pairs</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{matchedPairs}/{pairs.length} pairs found</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-green"
              animate={{ width: `${(matchedPairs / pairs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Memory Grid */}
      <div className="grid grid-cols-3 gap-3 flex-1">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched || card.isFlipped}
            className={`relative aspect-square rounded-xl border-2 transition-all duration-300 ${
              card.isMatched
                ? 'border-brand-green bg-brand-green/10'
                : card.isFlipped
                  ? 'border-brand-blue bg-brand-blue/10'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-2">
              {card.isFlipped || card.isMatched ? (
                <span className="text-sm font-bold text-center leading-tight">
                  {card.content}
                </span>
              ) : (
                <span className="text-2xl">❓</span>
              )}
            </div>
            
            {card.isMatched && (
              <div className="absolute top-1 right-1">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
