import { motion } from 'framer-motion';
import { Search, Cat, Flame, Target, Zap, Award, LogOut, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

import RevisionPopup from '../components/RevisionPopup';

import DailyRevision from '../components/DailyRevision';
import Battle from './Battle';

import { PageSkeleton } from '../components/Skeleton';



const AVATAR_OPTIONS = ['👨‍🔬', '👩‍🔬', '🧑‍🔬', '👨‍🎓', '👩‍🎓', '🧑‍🎓', '🐱', '🐶', '🐰', '🦊', '🦁', '🐯', '🐼', '🐨', '🐸', '🦄'];

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
    if (victoriesToday <= openedBoxes.length) return;

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

      {/* Header - Greeting & Cat Food */}

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

        className="flex items-center justify-between mb-8"

      >

        {/* Left: Avatar & Greeting */}

        <div className="flex items-center gap-3">

          <button 
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            {avatar || <span className="text-gray-500 text-sm">👤</span>}
          </button>

          <div className="flex flex-col">

            <p className="text-[#0F172A] text-sm font-normal leading-4">Hello</p>

            <p className="text-[#0F172A] text-base font-semibold leading-5">{name}</p>

          </div>

        </div>



        {/* Right: Search Icon & Cat Food */}
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <button className="w-11 h-11 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <Search className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
          </button>

          {/* Cat Food Icon */}
          <div className="relative cursor-pointer hover:scale-105 transition-transform">
            <div className="w-11 h-11 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
              <img 
                src="/images/catfood.svg" 
                alt="Cat Food"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {catFood}
            </span>
          </div>
        </div>
      </motion.div>



      {/* Mascot - Cat GIF */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="my-6"
      >
        <div className="w-full aspect-[16/9] relative overflow-hidden rounded-2xl shadow-sm">
          <img 
            src="/images/mascot.gif" 
            alt="Mascot"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Battle Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div 
          onClick={() => setShowBattleModal(true)}
          className="relative rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-[106px]"
        >
          {/* Background Image */}
          <img 
            src="/images/battle.png" 
            alt="Battle"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-between px-4">
            {/* Left: Title */}
            <div>
              <h3 className="font-bold text-lg text-white drop-shadow-md">
                1v1 Battle
              </h3>
            </div>
            
            {/* Right: START Button */}
            <button 
              className="flex items-center justify-center font-bold text-white text-lg"
              style={{
                background: 'linear-gradient(180deg, #FF7F00 0%, #CB6908 100%)',
                border: '1px solid #F98D0B',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                width: '100px',
                height: '50px'
              }}
            >
              Start
            </button>
          </div>
        </div>
      </motion.div>

      {/* Magic Boxes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((boxIndex) => {
            const isOpened = openedBoxes.includes(boxIndex);
            const canOpen = victoriesToday > openedBoxes.length && !isOpened;
            
            return (
              <motion.button
                key={boxIndex}
                onClick={() => canOpen && handleOpenBox(boxIndex)}
                disabled={isOpened || !canOpen}
                whileHover={canOpen ? { scale: 1.05 } : {}}
                whileTap={canOpen ? { scale: 0.95 } : {}}
                className={`relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                  isOpened 
                    ? 'bg-gray-100 border-2 border-gray-200' 
                    : canOpen 
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-amber-300 shadow-lg cursor-pointer' 
                      : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                }`}
              >
                {isOpened ? (
                  <>
                    <img src="/images/opened-tin.png" alt="Opened" className="w-12 h-12 mb-1 object-contain" />
                    <span className="text-[10px] text-gray-500 font-medium">Claimed</span>
                  </>
                ) : canOpen ? (
                  <>
                    <motion.img 
                      src="/images/closed-tin.png" 
                      alt="Gift Box"
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-12 h-12 mb-1 object-contain"
                    />
                    <span className="text-[10px] text-white font-medium">Tap to open!</span>
                  </>
                ) : (
                  <>
                    <img src="/images/closed-tin.png" alt="Locked" className="w-12 h-12 mb-1 object-contain grayscale opacity-60" />
                    <span className="text-[10px] text-gray-400 font-medium">Locked</span>
                  </>
                )}
                
                {/* Box number */}
                <span className="absolute top-1 left-2 text-[10px] font-bold text-white/80">
                  #{boxIndex + 1}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Box Reward Modal */}
      {showBoxReward && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-xs w-full text-center"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-4"
            >
              <span className="text-6xl">🎉</span>
            </motion.div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Box #{showBoxReward.boxIndex + 1} Opened!
            </h3>
            
            <p className="text-gray-600 mb-4">You found:</p>
            
            <div className="bg-amber-100 rounded-xl p-4 mb-6">
              <span className="text-3xl font-bold text-amber-600">
                +{showBoxReward.coins} coins
              </span>
            </div>
            
            <button
              onClick={() => setShowBoxReward(null)}
              className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors"
            >
              Awesome!
            </button>
          </motion.div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6"
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
              <button
                onClick={() => setShowAvatarPicker(true)}
                className="w-20 h-20 bg-[#D9D9D9] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl hover:opacity-80 transition-opacity cursor-pointer relative group"
              >
                {avatar || <span>👤</span>}
                <span className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs">Change</span>
                </span>
              </button>
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-gray-500">Level {level} Learner</p>
            </div>

            {/* Avatar Picker */}
            {showAvatarPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 bg-gray-50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900">Choose Avatar</h4>
                  <button
                    onClick={() => setShowAvatarPicker(false)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {AVATAR_OPTIONS.filter(emoji => purchasedAvatars.includes(emoji)).map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setUser({ avatar: emoji });
                        setShowAvatarPicker(false);
                      }}
                      className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-colors ${
                        avatar === emoji
                          ? 'bg-blue-500 text-white'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      {emoji}
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md h-[85vh] rounded-2xl bg-white overflow-hidden shadow-2xl relative"
          >
            <Battle onClose={() => setShowBattleModal(false)} />
          </motion.div>
        </div>
      )}
    </div>

  );

}

