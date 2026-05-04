import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { PageSkeleton } from '../components/Skeleton';
import { Home, BookOpen, Swords, User, X } from 'lucide-react';

// Task types for each module
interface Task {
  id: string;
  type: 'learn' | 'practice' | 'recall' | 'test' | 'mastery';
  name: string;
  icon: string;
  color: string;
  completed: boolean;
}

// Module data structure
interface Module {
  id: string;
  name: string;
  stars: number; // 0-3
  status: 'completed' | 'current' | 'next' | 'locked';
  chapter: string;
  tasks: Task[];
}

const taskTemplates: Task[] = [
  { id: '1', type: 'learn', name: 'Learn', icon: '🎯', color: 'bg-blue-500', completed: false },
  { id: '2', type: 'practice', name: 'Practice', icon: '⚡', color: 'bg-yellow-500', completed: false },
  { id: '3', type: 'recall', name: 'Recall', icon: '🧠', color: 'bg-purple-500', completed: false },
  { id: '4', type: 'test', name: 'Test', icon: '🔥', color: 'bg-red-500', completed: false },
  { id: '5', type: 'mastery', name: 'Mastery', icon: '🏆', color: 'bg-green-500', completed: false },
];

const modules: Module[] = [
  { 
    id: '1', 
    name: 'Digestive Overview', 
    stars: 3, 
    status: 'completed', 
    chapter: '',
    tasks: taskTemplates.map(t => ({ ...t, completed: true }))
  },
  { 
    id: '2', 
    name: 'Alimentary Canal', 
    stars: 2, 
    status: 'current', 
    chapter: 'Chapter 1',
    tasks: [
      { ...taskTemplates[0], completed: true },
      { ...taskTemplates[1], completed: true },
      { ...taskTemplates[2], completed: false },
      { ...taskTemplates[3], completed: false },
      { ...taskTemplates[4], completed: false },
    ]
  },
  { 
    id: '3', 
    name: 'Digestive Glands', 
    stars: 0, 
    status: 'next', 
    chapter: '',
    tasks: taskTemplates.map(t => ({ ...t, completed: false }))
  },
  { 
    id: '4', 
    name: 'Digestion Process', 
    stars: 0, 
    status: 'locked', 
    chapter: '',
    tasks: taskTemplates.map(t => ({ ...t, completed: false }))
  },
  { 
    id: '5', 
    name: 'Absorption', 
    stars: 0, 
    status: 'locked', 
    chapter: '',
    tasks: taskTemplates.map(t => ({ ...t, completed: false }))
  },
];

// Star rating component
const StarRating = ({ stars }: { stars: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((star) => (
        <span key={star} className={`text-base ${star <= stars ? 'text-yellow-300' : 'text-white/40'}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default function HomeDuolingo() {
  const { user, coins } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Animation Area */}
      <div className="bg-gray-200 h-32 mx-4 mt-4 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 text-sm">animation</span>
      </div>

      {/* Progress Bar */}
      <div className="mx-4 mt-3">
        <div className="h-2.5 bg-green-700 rounded-full shadow-inner"></div>
      </div>

      {/* Module List */}
      <div className="px-4 mt-4 space-y-3">
        {modules.map((module, index) => {
          const isCurrent = module.status === 'current';
          const isNext = module.status === 'next';
          const isLocked = module.status === 'locked';
          const isCompleted = module.status === 'completed';
          
          return (
            <div key={module.id}>
              {/* Chapter Label */}
              {module.chapter && (
                <p className="text-xs font-bold text-gray-800 mb-1.5 ml-1">{module.chapter}</p>
              )}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => !isLocked && setSelectedModule(module)}
                disabled={isLocked}
                className={`w-full h-20 rounded-xl flex flex-col justify-center px-5 text-left relative overflow-hidden transition-transform active:scale-95 ${
                  isCurrent 
                    ? 'bg-gradient-to-b from-green-500 to-green-700 shadow-[0_4px_0_rgb(21,128,61)]' 
                    : isNext 
                    ? 'bg-gradient-to-r from-green-300 to-green-500 shadow-[0_4px_0_rgb(21,128,61)]'
                    : isLocked
                    ? 'bg-gray-200 shadow-[0_4px_0_rgb(156,163,175)]'
                    : 'bg-gray-100 shadow-[0_4px_0_rgb(156,163,175)]'
                } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className={`text-sm font-semibold ${isCurrent || isNext || isCompleted ? 'text-white' : 'text-gray-500'}`}>
                  {module.name}
                </span>
                {(isCurrent || isCompleted) && <StarRating stars={module.stars} />}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Task Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg rounded-t-3xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="font-bold text-lg">{selectedModule.name}</h2>
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Task List */}
              <div className="p-4 space-y-3">
                {selectedModule.tasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer ${
                      task.completed ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                    onClick={() => navigate(`/module/biology/digestion/${selectedModule.id}?task=${task.type}`)}
                  >
                    <div className={`w-10 h-10 rounded-lg ${task.color} flex items-center justify-center text-xl`}>
                      {task.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{task.name}</p>
                      <p className="text-xs text-gray-500">
                        {task.completed ? 'Completed' : '4 tasks • Tap to start'}
                      </p>
                    </div>
                    {task.completed && <span className="text-green-500 text-lg">✓</span>}
                  </motion.div>
                ))}
              </div>

              {/* Start Button */}
              <div className="p-4 pb-8">
                <button 
                  className="w-full py-3.5 rounded-xl bg-green-500 text-white font-bold text-base hover:bg-green-600 transition-colors"
                  onClick={() => navigate(`/module/biology/digestion/${selectedModule.id}`)}
                >
                  CONTINUE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav - Match Layout Style */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-8 z-40">
        <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 text-green-600">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => navigate('/practice')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-medium">Practice</span>
        </button>
        <button onClick={() => navigate('/battle')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
          <Swords className="w-6 h-6" />
          <span className="text-[10px] font-medium">Battle</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
}
