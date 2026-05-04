import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { PageSkeleton } from '../components/Skeleton';
import { Home, BookOpen, Swords, User } from 'lucide-react';

// Module data structure
interface Module {
  id: string;
  name: string;
  stars: number; // 0-3
  status: 'completed' | 'current' | 'next' | 'locked';
  chapter: string;
}

const modules: Module[] = [
  { id: '1', name: 'Module', stars: 3, status: 'completed', chapter: '' },
  { id: '2', name: 'Module', stars: 2, status: 'current', chapter: 'Chapter' },
  { id: '3', name: 'Module', stars: 0, status: 'next', chapter: '' },
  { id: '4', name: 'Module', stars: 0, status: 'locked', chapter: '' },
  { id: '5', name: 'Module', stars: 0, status: 'locked', chapter: '' },
];

// Star rating component
const StarRating = ({ stars }: { stars: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((star) => (
        <span key={star} className={`text-lg ${star <= stars ? 'text-yellow-400' : 'text-gray-400'}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default function HomeDuolingo() {
  const { coins } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Animation Area */}
      <div className="bg-gray-200 h-32 mx-4 mt-4 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 text-sm">animation</span>
      </div>

      {/* Progress Bar */}
      <div className="mx-4 mt-4">
        <div className="h-3 bg-green-700 rounded-full"></div>
      </div>

      {/* Module List */}
      <div className="px-4 mt-4 space-y-3">
        {modules.map((module, index) => {
          const isCurrent = module.status === 'current';
          const isNext = module.status === 'next';
          const isLocked = module.status === 'locked';
          
          return (
            <div key={module.id}>
              {/* Chapter Label */}
              {index === 1 && (
                <p className="text-sm font-medium text-gray-700 mb-2">Chapter</p>
              )}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => !isLocked && navigate(`/module/biology/digestion/${module.id}`)}
                disabled={isLocked}
                className={`w-full h-20 rounded-xl flex flex-col justify-center px-4 ${
                  isCurrent 
                    ? 'bg-green-600' 
                    : isNext 
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : isLocked
                    ? 'bg-gray-200'
                    : 'bg-gray-100'
                } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className={`text-sm font-medium ${isCurrent || isNext ? 'text-white' : 'text-gray-600'}`}>
                  {module.name}
                </span>
                {isCurrent && <StarRating stars={module.stars} />}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4">
        <div className="max-w-lg mx-auto flex justify-around">
          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Home className="w-5 h-5 text-green-600" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-1" onClick={() => navigate('/practice')}>
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gray-500" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-1" onClick={() => navigate('/battle')}>
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Swords className="w-5 h-5 text-gray-500" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-1" onClick={() => navigate('/profile')}>
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
