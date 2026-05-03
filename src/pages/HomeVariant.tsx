import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { PageSkeleton } from '../components/Skeleton';

// Icons as simple SVG components for performance
const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </svg>
);

const SwordIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21l10-10M3 21l10-10M14 11l5-5M14 11l5-5M5 5l5 5" />
  </svg>
);

const subjects = [
  { id: 'physics', name: 'Physics', color: 'from-blue-500 to-blue-700', icon: '⚛️' },
  { id: 'chemistry', name: 'Chemistry', color: 'from-green-500 to-green-700', icon: '⚗️' },
  { id: 'biology', name: 'Biology', color: 'from-pink-500 to-pink-700', icon: '🧬' },
  { id: 'math', name: 'Math', color: 'from-purple-500 to-purple-700', icon: '📐' },
];

export default function HomeVariant() {
  const { user, coins, streak, lessonProgress } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header Stats Bar */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                <img 
                  src={user?.avatar || '/images/profile pictures/1.png'} 
                  alt="" 
                  className="w-full h-full rounded-full object-cover bg-gray-900"
                />
              </div>
              <div>
                <p className="font-bold text-sm">{user?.name || 'Player'}</p>
                <p className="text-xs text-gray-400">Level {Math.floor(Object.keys(lessonProgress || {}).length / 10) + 1}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-yellow-400">
                <FireIcon />
                <span className="font-bold text-sm">{streak || 0}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <span className="text-lg">🪙</span>
                <span className="font-bold text-sm">{coins || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        
        {/* Battle CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 cursor-pointer"
          onClick={() => navigate('/battle')}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <SwordIcon />
              </div>
              <div>
                <h2 className="text-xl font-black italic">BATTLE ARENA</h2>
                <p className="text-sm text-white/80">Challenge players & win coins!</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">⚡ Quick Match</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">🤖 vs AI</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/mcqs')}
            className="bg-gray-800 rounded-xl p-4 text-left border border-gray-700 hover:border-purple-500 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
              <BookIcon />
            </div>
            <p className="font-bold text-sm">Practice</p>
            <p className="text-xs text-gray-400">MCQs & quizzes</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/performance')}
            className="bg-gray-800 rounded-xl p-4 text-left border border-gray-700 hover:border-green-500 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mb-2">
              <TrophyIcon />
            </div>
            <p className="font-bold text-sm">Progress</p>
            <p className="text-xs text-gray-400">Stats & badges</p>
          </motion.button>
        </div>

        {/* Subject Cards */}
        <div>
          <h3 className="font-bold text-lg mb-3">Subjects</h3>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map((subject, index) => (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => navigate(`/chapter/${subject.id}/11`)}
                className={`relative overflow-hidden rounded-xl p-4 text-left bg-gradient-to-br ${subject.color}`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{subject.icon}</div>
                <p className="font-bold">{subject.name}</p>
                <p className="text-xs text-white/70">Grade 11</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-200 font-bold uppercase">Daily Challenge</p>
              <p className="font-bold mt-1">Complete 3 lessons today!</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-24 h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-white rounded-full" />
                </div>
                <span className="text-xs">1/3</span>
              </div>
            </div>
            <div className="text-3xl">🎯</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
