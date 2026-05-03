import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { PageSkeleton } from '../components/Skeleton';

// Module data structure
interface Module {
  id: string;
  name: string;
  emoji: string;
  color: string;
  locked: boolean;
  progress: number; // 0-100
  totalTasks: number;
  completedTasks: number;
}

const modules: Module[] = [
  { id: '1', name: 'Digestive Overview', emoji: '🧬', color: 'from-blue-500 to-blue-600', locked: false, progress: 100, totalTasks: 20, completedTasks: 20 },
  { id: '2', name: 'Alimentary Canal', emoji: '🎯', color: 'from-purple-500 to-purple-600', locked: false, progress: 60, totalTasks: 20, completedTasks: 12 },
  { id: '3', name: 'Digestive Glands', emoji: '⚡', color: 'from-yellow-500 to-orange-500', locked: false, progress: 0, totalTasks: 20, completedTasks: 0 },
  { id: '4', name: 'Digestion Process', emoji: '🔥', color: 'from-red-500 to-red-600', locked: true, progress: 0, totalTasks: 20, completedTasks: 0 },
  { id: '5', name: 'Absorption', emoji: '🟣', color: 'from-indigo-500 to-purple-600', locked: true, progress: 0, totalTasks: 20, completedTasks: 0 },
  { id: '6', name: 'Assimilation', emoji: '🟠', color: 'from-orange-500 to-orange-600', locked: true, progress: 0, totalTasks: 20, completedTasks: 0 },
  { id: '7', name: 'Disorders', emoji: '⚫', color: 'from-gray-600 to-gray-700', locked: true, progress: 0, totalTasks: 20, completedTasks: 0 },
];

// Task breakdown for each module (shown when expanded)
const taskBreakdown = {
  learn: { icon: '🎯', color: 'bg-blue-500', name: 'Learn' },
  practice: { icon: '⚡', color: 'bg-yellow-500', name: 'Practice' },
  recall: { icon: '🧠', color: 'bg-purple-500', name: 'Recall' },
  test: { icon: '🔥', color: 'bg-red-500', name: 'Test' },
  mastery: { icon: '🏆', color: 'bg-green-500', name: 'Mastery' },
};

export default function HomeDuolingo() {
  const { coins } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [currentSubject] = useState('Biology');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Back & Subject */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/')}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                ←
              </button>
              <div>
                <p className="text-xs text-gray-500">SUBJECT</p>
                <p className="font-bold text-green-600">{currentSubject}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-amber-500">⚡</span>
                <span className="font-bold text-gray-700">{coins || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Title */}
      <div className="bg-gradient-to-b from-green-50 to-gray-100 py-4 px-4">
        <div className="max-w-lg mx-auto">
          <p className="text-center text-gray-500 text-sm mb-1">SECTION 1</p>
          <h1 className="text-center font-bold text-xl text-gray-800">DIGESTION & ABSORPTION</h1>
          <div className="flex justify-center mt-2">
            <div className="w-20 h-1 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Path */}
      <div className="max-w-lg mx-auto px-4 py-6 pb-32">
        <div className="relative">
          {/* Path line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gray-300 rounded-full top-8 bottom-8"></div>
          
          {/* Modules */}
          {modules.map((module, index) => {
            const isLeft = index % 2 === 0;
            const isCompleted = module.progress === 100;
            const isCurrent = module.progress > 0 && module.progress < 100;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {/* Connection dot on path */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow z-10"></div>
                
                {/* Module Circle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => !module.locked && setSelectedModule(module.id)}
                  className={`relative w-24 h-24 rounded-full shadow-lg flex flex-col items-center justify-center z-20 ${
                    module.locked 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : isCompleted
                      ? `bg-gradient-to-br ${module.color}`
                      : isCurrent
                      ? `bg-gradient-to-br ${module.color}`
                      : `bg-gradient-to-br ${module.color}`
                  }`}
                  style={{ marginLeft: isLeft ? '0' : '0', marginRight: isLeft ? '0' : '0' }}
                >
                  {/* Progress ring for current module */}
                  {isCurrent && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                      <circle 
                        cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="4"
                        strokeDasharray={`${module.progress * 2.89} 289`}
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  
                  {/* Completed checkmark */}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white">
                      ✓
                    </div>
                  )}
                  
                  {/* Locked icon */}
                  {module.locked && (
                    <div className="absolute inset-0 bg-gray-400/80 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                  
                  {/* Content */}
                  <span className="text-3xl">{module.emoji}</span>
                  <span className="text-white text-xs font-bold mt-1">{module.id}</span>
                </motion.button>
                
                {/* Module label */}
                <div className={`absolute ${isLeft ? 'left-28' : 'right-28'} text-center`}>
                  <p className="font-bold text-gray-800 text-sm">{module.name}</p>
                  <p className="text-xs text-gray-500">
                    {isCompleted ? 'Completed!' : `${module.completedTasks}/${module.totalTasks}`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Module Detail Modal */}
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
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-xl">
                    {modules.find(m => m.id === selectedModule)?.name}
                  </h2>
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Task Types */}
              <div className="p-4 space-y-3">
                {Object.entries(taskBreakdown).map(([key, value], idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/module/biology/digestion/${selectedModule}`)}
                  >
                    <div className={`w-12 h-12 rounded-xl ${value.color} flex items-center justify-center text-2xl`}>
                      {value.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{value.name}</p>
                      <p className="text-xs text-gray-500">4 tasks • {idx === 0 ? 'Unlocked' : idx === 1 ? 'In Progress' : 'Locked'}</p>
                    </div>
                    <div className="text-gray-400">›</div>
                  </motion.div>
                ))}
              </div>

              {/* Start Button */}
              <div className="p-4 pb-8">
                <button 
                  className="w-full py-4 rounded-xl bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition-colors"
                  onClick={() => navigate(`/module/biology/digestion/${selectedModule}`)}
                >
                  START LEARNING
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <div className="max-w-lg mx-auto flex justify-around">
          <button className="flex flex-col items-center text-green-600">
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-bold">Learn</span>
          </button>
          <button className="flex flex-col items-center text-gray-400" onClick={() => navigate('/practice')}>
            <span className="text-2xl">⚔️</span>
            <span className="text-xs font-bold">Practice</span>
          </button>
          <button className="flex flex-col items-center text-gray-400" onClick={() => navigate('/profile')}>
            <span className="text-2xl">👤</span>
            <span className="text-xs font-bold">Profile</span>
          </button>
          <button className="flex flex-col items-center text-gray-400" onClick={() => navigate('/shop')}>
            <span className="text-2xl">🛍️</span>
            <span className="text-xs font-bold">Shop</span>
          </button>
        </div>
      </div>
    </div>
  );
}
