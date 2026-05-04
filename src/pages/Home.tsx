import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate, Link } from 'react-router-dom';
import { PageSkeleton } from '../components/Skeleton';
import { Home, BookOpen, Trophy, User, X, LogOut, Cat, Flame, Target, Zap, Award } from 'lucide-react';

// Profile picture options
const AVATAR_OPTIONS = [
  '/images/profile pictures/1.png',
  '/images/profile pictures/2.png',
  '/images/profile pictures/3.png',
  '/images/profile pictures/4.png',
  '/images/profile pictures/5.png',
  '/images/profile pictures/6.png',
  '/images/profile pictures/7.png',
  '/images/profile pictures/8.png',
  '/images/profile pictures/9.png',
];

interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

const ALL_BADGES: BadgeDefinition[] = [
  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '👣', requirement: 'Complete 1 lesson' },
  { id: 'ten_lessons', name: 'Quick Learner', description: 'Complete 10 lessons', icon: '📚', requirement: 'Complete 10 lessons' },
  { id: 'fifty_lessons', name: 'Knowledge Seeker', description: 'Complete 50 lessons', icon: '🎓', requirement: 'Complete 50 lessons' },
  { id: 'streak_3', name: 'On Fire', description: 'Maintain a 3-day streak', icon: '🔥', requirement: '3-day streak' },
  { id: 'streak_7', name: 'Dedicated', description: 'Maintain a 7-day streak', icon: '⭐', requirement: '7-day streak' },
  { id: 'streak_30', name: 'Unstoppable', description: 'Maintain a 30-day streak', icon: '🏆', requirement: '30-day streak' },
  { id: 'perfect_score', name: 'Perfectionist', description: 'Get a perfect score on any lesson', icon: '💯', requirement: 'Perfect score' },
  { id: 'module_master', name: 'Module Master', description: 'Complete an entire module', icon: '🎯', requirement: 'Complete 1 module' },
  { id: 'all_subjects', name: 'Well Rounded', description: 'Complete lessons in all 4 subjects', icon: '🌟', requirement: 'All subjects' },
  { id: 'early_bird', name: 'Early Bird', description: 'Complete a lesson before 8 AM', icon: '🌅', requirement: 'Early morning lesson' },
  { id: 'night_owl', name: 'Night Owl', description: 'Complete a lesson after 10 PM', icon: '🦉', requirement: 'Late night lesson' },
  { id: 'coin_collector', name: 'Coin Collector', description: 'Collect 500 coins', icon: '🪙', requirement: '500 coins' },
];

export default function Home() {
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeDefinition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { catFood, coins, name, avatar, level, streak, longestStreak, completedLessons, badges, logout, setUser, purchasedAvatars, recordBattleVictory } = useUserStore();
  const navigate = useNavigate();

  const hasBadge = (badgeId: string) => badges.some(b => b.id === badgeId);


  // Simulate loading for demo
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return <PageSkeleton type="home" />;
  }



  return (
    <div className="min-h-screen bg-[#F57556] relative overflow-hidden">
      {/* Main Content */}
      <div className="px-6 pt-8 pb-32">
        {/* Header with Avatar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowProfile(true)}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md"
            >
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl">👤</span>
              )}
            </button>
            <div>
              <p className="text-white/80 text-sm">Hello,</p>
              <p className="text-white font-semibold">{name}</p>
            </div>
          </div>
        </motion.div>

        {/* Bookshelf with Cat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12"
        >
          {/* Books on Shelf */}
          <div className="flex items-end justify-center gap-1 mb-0">
            {/* Green book */}
            <div className="w-10 h-20 bg-[#2D5016] rounded-t-sm relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-8 bg-[#4A7C2E] rounded-full" />
            </div>
            {/* Red book leaning */}
            <div className="w-10 h-24 bg-[#B8382F] rounded-t-sm transform -rotate-6 origin-bottom-left relative">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-6 bg-white/20 rounded" />
            </div>
            {/* Black Cat */}
            <div className="relative mx-2">
              <div className="w-24 h-20 bg-[#1A1A2E] rounded-t-full relative">
                {/* Cat ears */}
                <div className="absolute -top-3 left-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#1A1A2E]" />
                <div className="absolute -top-3 right-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#1A1A2E]" />
                {/* Cat eyes */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-[#39FF14] rounded-full animate-pulse" />
                <div className="absolute top-4 right-4 w-3 h-3 bg-[#39FF14] rounded-full animate-pulse" />
                {/* Cat tail */}
                <div className="absolute -right-6 bottom-0 w-4 h-16 bg-[#1A1A2E] rounded-full transform rotate-12 origin-bottom" />
              </div>
            </div>
          </div>
          {/* Wooden Shelf */}
          <div className="h-4 bg-[#8B4513] rounded-sm shadow-lg" />
          <div className="h-1 bg-[#5D3A1A] rounded-sm" />
        </motion.div>

        {/* Subject Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 justify-center"
        >
          {/* Biology Card - Active */}
          <Link
            to="/chapter/biology/plus_one"
            className="flex-1 bg-[#7CD968] rounded-2xl p-4 h-32 shadow-lg transform hover:scale-105 transition-transform"
          >
            <p className="text-[#1B4D1B] font-bold text-sm">Biology</p>
          </Link>

          {/* Chemistry Card */}
          <Link
            to="/chapter/chemistry/plus_one"
            className="flex-1 bg-[#E8E8E8] rounded-2xl p-4 h-32 shadow-lg transform hover:scale-105 transition-transform"
          >
            <p className="text-[#666] font-bold text-sm">Chemistry</p>
          </Link>

          {/* Physics Card */}
          <Link
            to="/chapter/physics/plus_one"
            className="flex-1 bg-[#E8E8E8] rounded-2xl p-4 h-32 shadow-lg transform hover:scale-105 transition-transform"
          >
            <p className="text-[#666] font-bold text-sm">Physics</p>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-6 z-40"
      >
        <button className="w-12 h-12 bg-[#F57556] rounded-full flex items-center justify-center">
          <Home className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={() => navigate('/learn')}
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <BookOpen className="w-6 h-6 text-gray-600" />
        </button>
        <button 
          onClick={() => navigate('/leaderboard')}
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <Trophy className="w-6 h-6 text-gray-600" />
        </button>
        <button 
          onClick={() => setShowProfile(true)}
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </motion.div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Profile</h2>
              <button 
                onClick={() => setShowProfile(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F57556] to-[#FF8A65] rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">👤</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-gray-500">Level {level} Learner</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Cat className="w-5 h-5 text-[#F57556] mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{catFood}</p>
                <p className="text-xs text-gray-500">Cat Food</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{streak}</p>
                <p className="text-xs text-gray-500">Streak</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Target className="w-5 h-5 text-red-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{longestStreak}</p>
                <p className="text-xs text-gray-500">Best Streak</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{completedLessons.length}</p>
                <p className="text-xs text-gray-500">Lessons</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F57556] hover:bg-[#E56447] text-white rounded-xl transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

