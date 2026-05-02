import { motion } from 'framer-motion';
import { Search, Cat, Flame, Target, Zap, Award, LogOut, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

import RevisionPopup from '../components/RevisionPopup';

import DailyRevision from '../components/DailyRevision';
import Battle from './Battle';

import { PageSkeleton } from '../components/Skeleton';



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
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [victoriesToday, setVictoriesToday] = useState(0);
  const [lastResetDate, setLastResetDate] = useState<string>('');
  const [showBoxReward, setShowBoxReward] = useState<{boxIndex: number, coins: number} | null>(null);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const { catFood, coins, name, avatar, level, streak, longestStreak, completedLessons, badges, logout, setUser, purchasedAvatars, addCoins, recordBattleVictory } = useUserStore();
  const navigate = useNavigate();

  const hasBadge = (badgeId: string) => badges.some(b => b.id === badgeId);

  // Load magic box state from localStorage
  useEffect(() => {
    const savedOpened = localStorage.getItem('magicBoxesOpened');
    const savedReset = localStorage.getItem('magicBoxesLastReset');
    const savedVictories = localStorage.getItem('battleVictoriesToday');
    
    const today = new Date().toDateString();
    
    // Check if it's a new day - reset boxes
    if (savedReset !== today) {
      setOpenedBoxes([]);
      setVictoriesToday(0);
      setLastResetDate(today);
      localStorage.setItem('magicBoxesOpened', JSON.stringify([]));
      localStorage.setItem('magicBoxesLastReset', today);
      localStorage.setItem('battleVictoriesToday', '0');
    } else {
      setOpenedBoxes(savedOpened ? JSON.parse(savedOpened) : []);
      setVictoriesToday(savedVictories ? parseInt(savedVictories) : 0);
      setLastResetDate(savedReset || today);
    }
  }, []);

  // Check for midnight reset
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const today = now.toDateString();
      
      if (lastResetDate && lastResetDate !== today) {
        // Midnight passed - reset everything
        setOpenedBoxes([]);
        setVictoriesToday(0);
        setLastResetDate(today);
        localStorage.setItem('magicBoxesOpened', JSON.stringify([]));
        localStorage.setItem('magicBoxesLastReset', today);
        localStorage.setItem('battleVictoriesToday', '0');
      }
    };

    const interval = setInterval(checkMidnight, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastResetDate]);

  const handleOpenBox = (boxIndex: number) => {
    if (openedBoxes.includes(boxIndex)) return;

    // Generate random coins (10-50)
    const rewardCoins = Math.floor(Math.random() * 41) + 10;
    
    // Add coins
    addCoins(rewardCoins);
    
    // Mark box as opened
    const newOpened = [...openedBoxes, boxIndex];
    setOpenedBoxes(newOpened);
    localStorage.setItem('magicBoxesOpened', JSON.stringify(newOpened));
    
    // Show reward modal
    setShowBoxReward({ boxIndex, coins: rewardCoins });
  };

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

    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">

      {/* Flashcard Modal */}

      {showFlashcards && (

        <DailyRevision 

          onClose={() => setShowFlashcards(false)}

          onStartLesson={() => setShowFlashcards(false)}

        />

      )}



      {/* Revision Popup - appears after 10 seconds */}

      <RevisionPopup 

        onClose={() => {}} 

        onStartRevision={() => setShowFlashcards(true)} 

        disabled={showBattleModal}

      />

      {/* Header - Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-4 pt-4"
      >
        {/* Left: Avatar & Name */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl hover:opacity-80 transition-opacity cursor-pointer overflow-hidden border-2 border-white/10"
          >
            {avatar ? (
              <img src={avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-white text-sm">👤</span>
            )}
          </button>

          <div className="flex flex-col">
            <p className="text-gray-400 text-sm font-normal leading-4">Hello</p>
            <p className="text-white text-base font-semibold leading-5">{name}</p>
          </div>
        </div>

        {/* Right: Search Icon & Cat Food */}
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <button className="w-11 h-11 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <Search className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
          </button>

          {/* Cat Food Icon */}
          <div className="relative cursor-pointer hover:scale-105 transition-transform">
            <div className="w-11 h-11 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
              <img 
                src="/images/catfood.svg" 
                alt="Cat Food"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {catFood}
            </span>
          </div>
        </div>
      </motion.div>



      {/* Mascot - Cat GIF with NEW badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="my-6"
      >
        <div className="w-full relative overflow-hidden rounded-3xl shadow-xl flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-white/5">
          {/* NEW Badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            NEW
          </div>
          <img 
            src="/images/mascot.gif" 
            alt="Mascot"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </motion.div>

      {/* Magic Boxes - Dark pill design with NEW badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4"
      >
        <div className="relative mx-auto w-fit">
          {/* NEW Badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            NEW
          </div>
          {/* Pill container */}
          <div className="flex flex-row items-center justify-center p-2 gap-2 bg-[#1A1A1A] border border-white/10 rounded-full shadow-lg">
            {[0, 1, 2, 3].map((boxIndex) => {
              const isOpened = openedBoxes.includes(boxIndex);
              
              return (
                <motion.button
                  key={boxIndex}
                  onClick={() => !isOpened && handleOpenBox(boxIndex)}
                  disabled={isOpened}
                  whileHover={!isOpened ? { scale: 1.05 } : {}}
                  whileTap={!isOpened ? { scale: 0.95 } : {}}
                  className={`relative w-[41px] h-[41px] rounded-full border-2 border-amber-500/30 flex items-center justify-center transition-all bg-[#0A0A0A] overflow-hidden ${
                    isOpened 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'cursor-pointer shadow-sm hover:shadow-md hover:border-amber-500/50'
                  }`}
                >
                  {isOpened ? (
                    <img src="/images/opened-tin.png" alt="Claimed" className="w-7 h-7 object-contain grayscale" />
                  ) : (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <img src="/images/closed-tin.png" alt="Mystery Box" className="w-7 h-7 object-contain" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Battle Card with NEW badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div 
          onClick={() => setShowBattleModal(true)}
          className="relative rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all h-[120px] border border-white/10 group"
        >
          {/* NEW Badge */}
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            NEW
          </div>
          
          {/* Background Image */}
          <img 
            src="/images/battle.png" 
            alt="Battle"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-between px-5">
            {/* Left: Title */}
            <div>
              <h3 className="font-bold text-xl text-white drop-shadow-lg">
                1v1 Battle
              </h3>
              <p className="text-gray-300 text-sm mt-1">Compete & Win Coins!</p>
            </div>
            
            {/* Right: START Button */}
            <button 
              className="flex items-center justify-center font-bold text-white text-base px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Start
            </button>
          </div>
        </div>
      </motion.div>

      {/* Box Reward Modal */}
      {showBoxReward && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-8 max-w-xs w-full text-center"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-4"
            >
              <span className="text-6xl">🎉</span>
            </motion.div>
            
            <h3 className="text-xl font-bold text-white mb-2">
              Box #{showBoxReward.boxIndex + 1} Opened!
            </h3>
            
            <p className="text-gray-400 mb-4">You found:</p>
            
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-4 mb-6">
              <span className="text-3xl font-bold text-amber-400 flex items-center justify-center gap-2">
                <img src="/images/coin.png" alt="" className="w-8 h-8" /> +{showBoxReward.coins}
              </span>
            </div>
            
            <button
              onClick={() => setShowBoxReward(null)}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity"
            >
              Awesome!
            </button>
          </motion.div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A1A] border border-white/10 rounded-3xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Profile</h2>
              <button 
                onClick={() => setShowProfile(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center mb-6">
              <button
                onClick={() => setShowAvatarPicker(true)}
                className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl hover:opacity-80 transition-opacity cursor-pointer relative group overflow-hidden border-2 border-white/20"
              >
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span>👤</span>
                )}
                <span className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs">Change</span>
                </span>
              </button>
              <h3 className="text-xl font-bold text-white">{name}</h3>
              <p className="text-gray-400">Level {level} Learner</p>
            </div>

            {/* Avatar Picker */}
            {showAvatarPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 bg-[#0A0A0A] rounded-2xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-white">Choose Avatar</h4>
                  <button
                    onClick={() => setShowAvatarPicker(false)}
                    className="p-1 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {AVATAR_OPTIONS.filter(img => purchasedAvatars.includes(img)).map((img) => (
                    <button
                      key={img}
                      onClick={() => {
                        setUser({ avatar: img });
                        setShowAvatarPicker(false);
                      }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors p-1 ${
                        avatar === img
                          ? 'bg-blue-500 ring-2 ring-blue-500'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <img src={img} alt="Avatar" className="w-full h-full object-cover rounded" />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Buy more avatars from the shop!
                </p>
              </motion.div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Cat className="w-5 h-5 text-amber-600 mx-auto mb-1" />
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
                <Zap className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">{completedLessons.length}</p>
                <p className="text-xs text-gray-500">Lessons</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center col-span-2">
                <span className="text-xl mx-auto mb-1 block">🪙</span>
                <p className="text-lg font-bold text-gray-900">{coins}</p>
                <p className="text-xs text-gray-500">Coins</p>
              </div>
            </div>

            {/* Badges */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-purple-500" />
                <h4 className="font-bold text-gray-900">Achievements</h4>
                <span className="text-xs text-gray-500">({badges.length}/{ALL_BADGES.length})</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {ALL_BADGES.map((badge) => {
                  const unlocked = hasBadge(badge.id);
                  return (
                    <button
                      key={badge.id}
                      onClick={() => setSelectedBadge(badge)}
                      className={`rounded-lg p-2 text-center transition-all ${
                        unlocked
                          ? 'bg-purple-50 border-2 border-purple-200'
                          : 'bg-gray-100 border-2 border-gray-200 opacity-60 grayscale'
                      }`}
                    >
                      <div className="text-xl mb-1">{unlocked ? badge.icon : '🔒'}</div>
                      <p className={`text-xs font-medium truncate ${unlocked ? 'text-purple-900' : 'text-gray-500'}`}>
                        {badge.name}
                      </p>
                    </button>
                  );
                })}
              </div>
              
              {/* Badge Detail Modal */}
              {selectedBadge && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-white border-2 border-purple-200 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      hasBadge(selectedBadge.id) ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      {hasBadge(selectedBadge.id) ? selectedBadge.icon : '🔒'}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900">{selectedBadge.name}</h5>
                      <p className="text-sm text-gray-600 mb-2">{selectedBadge.description}</p>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                        hasBadge(selectedBadge.id)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {hasBadge(selectedBadge.id) ? (
                          <><span>✓</span> Unlocked!</>
                        ) : (
                          <><span>📋</span> To unlock: {selectedBadge.requirement}</>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedBadge(null)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        </div>
      )}

      {/* Battle Popup */}
      {showBattleModal && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-sm max-h-[85vh] rounded-2xl bg-black overflow-hidden shadow-2xl relative"
          >
            <Battle onClose={() => setShowBattleModal(false)} />
          </motion.div>
        </div>
      )}
    </div>

  );

}

