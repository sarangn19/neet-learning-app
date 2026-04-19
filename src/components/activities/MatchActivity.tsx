import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
  onComplete: (correct: boolean, xp: number) => void;
}

interface Item {
  id: string;
  text: string;
  pairIndex: number;
}

export default function MatchActivity({ activity, onComplete }: Props) {
  const { pairs } = activity.data as { pairs: { term: string; definition: string }[] };
  
  // Create items with unique IDs linked to their pair index
  const [termItems] = useState<Item[]>(() => 
    pairs.map((p, i) => ({ id: `term-${i}`, text: p.term, pairIndex: i }))
      .sort(() => Math.random() - 0.5)
  );
  
  const [defItems] = useState<Item[]>(() => 
    pairs.map((p, i) => ({ id: `def-${i}`, text: p.definition, pairIndex: i }))
      .sort(() => Math.random() - 0.5)
  );
  
  const [selectedTerm, setSelectedTerm] = useState<Item | null>(null);
  const [selectedDef, setSelectedDef] = useState<Item | null>(null);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);

  const handleTermClick = (term: Item) => {
    if (matchedIndices.includes(term.pairIndex)) return;
    setSelectedTerm(term);
    
    if (selectedDef) {
      checkMatch(term, selectedDef);
    }
  };

  const handleDefClick = (def: Item) => {
    if (matchedIndices.includes(def.pairIndex)) return;
    setSelectedDef(def);
    
    if (selectedTerm) {
      checkMatch(selectedTerm, def);
    }
  };

  const checkMatch = (term: Item, def: Item) => {
    setAttempts(a => a + 1);
    
    const isMatch = term.pairIndex === def.pairIndex;
    
    if (isMatch) {
      setMatchedIndices(prev => [...prev, term.pairIndex]);
      setSelectedTerm(null);
      setSelectedDef(null);
    } else {
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 500);
    }
  };

  useEffect(() => {
    if (matchedIndices.length === pairs.length) {
      const accuracy = pairs.length / Math.max(attempts, pairs.length);
      const earnedXP = Math.floor(activity.xpReward * (0.5 + accuracy * 0.5));
      setTimeout(() => onComplete(true, earnedXP), 500);
    }
  }, [matchedIndices, pairs.length, attempts, activity.xpReward, onComplete]);

  const isTermMatched = (item: Item) => matchedIndices.includes(item.pairIndex);
  const isDefMatched = (item: Item) => matchedIndices.includes(item.pairIndex);
  const isTermSelected = (item: Item) => selectedTerm?.id === item.id;
  const isDefSelected = (item: Item) => selectedDef?.id === item.id;

  return (
    <div className="h-full flex flex-col">
      {/* Question */}
      <div className="mb-4">
        <p className="text-lg font-bold text-gray-900">{activity.question}</p>
        <p className="text-sm text-gray-500">Match the terms with their definitions</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{matchedIndices.length}/{pairs.length} matched</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-green"
              animate={{ width: `${(matchedIndices.length / pairs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Match Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* Terms Column */}
        <div className="space-y-2">
          <p className="font-bold text-gray-700 text-sm mb-2">Terms</p>
          {termItems.map((item) => {
            const matched = isTermMatched(item);
            const selected = isTermSelected(item);
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleTermClick(item)}
                disabled={matched}
                className={`w-full p-3 rounded-xl border-2 text-left font-bold transition-all duration-200 ${
                  matched
                    ? 'border-brand-green bg-brand-green/10 text-brand-green'
                    : selected
                      ? 'border-brand-blue bg-brand-blue/10'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  {matched && <CheckCircle2 className="w-4 h-4" />}
                  <span className="text-sm">{item.text}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Definitions Column */}
        <div className="space-y-2">
          <p className="font-bold text-gray-700 text-sm mb-2">Definitions</p>
          {defItems.map((item) => {
            const matched = isDefMatched(item);
            const selected = isDefSelected(item);
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleDefClick(item)}
                disabled={matched}
                className={`w-full p-3 rounded-xl border-2 text-left text-sm transition-all duration-200 ${
                  matched
                    ? 'border-brand-green bg-brand-green/10 text-brand-green'
                    : selected
                      ? 'border-brand-blue bg-brand-blue/10'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {matched && <CheckCircle2 className="w-4 h-4 inline mr-2" />}
                {item.text}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
