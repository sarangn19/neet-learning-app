import { motion } from 'framer-motion';
import { Search, Cat, Flame, Target, Zap, Award, LogOut, X, Atom, FlaskConical, Dna, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate, Link } from 'react-router-dom';

import RevisionPopup from '../components/RevisionPopup';

import DailyRevision from '../components/DailyRevision';

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

        disabled={false}

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
            className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl hover:opacity-80 transition-opacity cursor-pointer overflow-hidden border-2 border-white shadow-sm"
          >
            {avatar ? (
              <img src={avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-white text-sm">👤</span>
            )}
          </button>

          <div className="flex flex-col">
            <p className="text-gray-500 text-sm font-normal leading-4">Hello</p>
            <p className="text-gray-900 text-base font-semibold leading-5">{name}</p>
          </div>
        </div>

        {/* Right: Search Icon & Cat Food */}
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <button className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-sm">
            <Search className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
          </button>

          {/* Cat Food Icon */}
          <div className="relative cursor-pointer hover:scale-105 transition-transform">
            <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
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



      {/* NEET Learning Roadmap - Duolingo Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4"
      >
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h3 className="font-bold text-lg text-gray-900">Your NEET Journey</h3>
            <p className="text-sm text-gray-500">42 weeks • 11 phases</p>
          </div>
          <button 
            onClick={() => navigate('/mcqs')}
            className="text-amber-600 text-sm font-medium hover:text-amber-700"
          >
            Practice
          </button>
        </div>

        <div className="space-y-6">
          {/* Phase 1 */}
          <PhaseSection 
            phase="1"
            title="BASICS"
            weeks="Week 1–3"
            color="green"
            chapters={[
              { subject: 'physics', name: 'Units and Measurements', icon: '📏' },
              { subject: 'physics', name: 'Motion in a Straight Line', icon: '🏃' },
              { subject: 'physics', name: 'Motion in a Plane', icon: '📐' },
              { subject: 'chemistry', name: 'Some Basic Concepts (Mole)', icon: '⚖️', important: true },
              { subject: 'chemistry', name: 'Structure of Atom', icon: '⚛️' },
              { subject: 'biology', name: 'The Living World', icon: '🌍' },
              { subject: 'biology', name: 'Biological Classification', icon: '🔬' },
            ]}
          />

          {/* Phase 2 */}
          <PhaseSection 
            phase="2"
            title="CORE FOUNDATION"
            weeks="Week 4–7"
            color="blue"
            chapters={[
              { subject: 'physics', name: 'Laws of Motion', icon: '⚡' },
              { subject: 'physics', name: 'Work, Energy and Power', icon: '💪' },
              { subject: 'chemistry', name: 'Periodic Table', icon: '📊' },
              { subject: 'chemistry', name: 'Chemical Bonding', icon: '🔗', important: true },
              { subject: 'biology', name: 'Plant Kingdom', icon: '🌿' },
              { subject: 'biology', name: 'Animal Kingdom', icon: '🦁' },
              { subject: 'biology', name: 'Morphology of Plants', icon: '🌱' },
            ]}
          />

          {/* Phase 3 */}
          <PhaseSection 
            phase="3"
            title="STRUCTURE + CELL"
            weeks="Week 8–10"
            color="yellow"
            chapters={[
              { subject: 'physics', name: 'Rotational Motion', icon: '🔄' },
              { subject: 'chemistry', name: 'States of Matter', icon: '💨' },
              { subject: 'chemistry', name: 'Thermodynamics', icon: '🌡️' },
              { subject: 'biology', name: 'Anatomy of Plants', icon: '🌾' },
              { subject: 'biology', name: 'Structural Organisation', icon: '🦴' },
              { subject: 'biology', name: 'Cell: Unit of Life', icon: '🧫' },
              { subject: 'biology', name: 'Biomolecules', icon: '🧬' },
            ]}
          />

          {/* Phase 4 */}
          <PhaseSection 
            phase="4"
            title="PHYSIOLOGY + EQUILIBRIUM"
            weeks="Week 11–14"
            color="red"
            chapters={[
              { subject: 'physics', name: 'Gravitation', icon: '🌍' },
              { subject: 'physics', name: 'Mechanical Properties of Solids', icon: '🧱' },
              { subject: 'physics', name: 'Mechanical Properties of Fluids', icon: '💧' },
              { subject: 'chemistry', name: 'Equilibrium', icon: '⚖️' },
              { subject: 'chemistry', name: 'Redox Reactions', icon: '⚡' },
              { subject: 'biology', name: 'Cell Cycle & Division', icon: '🔄' },
              { subject: 'biology', name: 'Transport in Plants', icon: '🚰' },
              { subject: 'biology', name: 'Mineral Nutrition', icon: '💊' },
            ]}
          />

          {/* Phase 5 */}
          <PhaseSection 
            phase="5"
            title="PLANT + THERMAL"
            weeks="Week 15–18"
            color="purple"
            chapters={[
              { subject: 'physics', name: 'Thermal Properties', icon: '🔥' },
              { subject: 'physics', name: 'Thermodynamics', icon: '🌡️' },
              { subject: 'physics', name: 'Kinetic Theory', icon: '💨' },
              { subject: 'chemistry', name: 'Hydrogen', icon: '💧' },
              { subject: 'chemistry', name: 's-Block Elements', icon: '🧪' },
              { subject: 'biology', name: 'Photosynthesis', icon: '☀️' },
              { subject: 'biology', name: 'Respiration in Plants', icon: '🫁' },
              { subject: 'biology', name: 'Plant Growth', icon: '📈' },
            ]}
          />

          {/* Phase 6 */}
          <PhaseSection 
            phase="6"
            title="HUMAN PHYSIOLOGY"
            weeks="Week 19–22"
            color="orange"
            important
            chapters={[
              { subject: 'physics', name: 'Oscillations', icon: '📳' },
              { subject: 'physics', name: 'Waves', icon: '〰️' },
              { subject: 'chemistry', name: 'p-Block Elements', icon: '🧪' },
              { subject: 'chemistry', name: 'Organic Chemistry Basics', icon: '⚗️' },
              { subject: 'chemistry', name: 'Hydrocarbons', icon: '⛽' },
              { subject: 'biology', name: 'Digestion & Absorption', icon: '🍽️' },
              { subject: 'biology', name: 'Breathing & Gases', icon: '🫁' },
              { subject: 'biology', name: 'Body Fluids & Circulation', icon: '🩸' },
              { subject: 'biology', name: 'Excretory System', icon: '🚽' },
              { subject: 'biology', name: 'Locomotion & Movement', icon: '🏃' },
              { subject: 'biology', name: 'Neural Control', icon: '🧠' },
              { subject: 'biology', name: 'Chemical Coordination', icon: '🔬' },
            ]}
          />

          {/* Phase 7 */}
          <PhaseSection 
            phase="7"
            title="CLASS 12 START"
            weeks="Week 23–26"
            color="gray"
            chapters={[
              { subject: 'physics', name: 'Electric Charges & Fields', icon: '⚡' },
              { subject: 'physics', name: 'Electrostatic Potential', icon: '🔋' },
              { subject: 'physics', name: 'Current Electricity', icon: '💡' },
              { subject: 'chemistry', name: 'Solutions', icon: '💧' },
              { subject: 'chemistry', name: 'Electrochemistry', icon: '🔋' },
              { subject: 'biology', name: 'Reproduction in Organisms', icon: '🐣' },
              { subject: 'biology', name: 'Sexual Reproduction in Plants', icon: '🌸' },
              { subject: 'biology', name: 'Human Reproduction', icon: '👶' },
              { subject: 'biology', name: 'Reproductive Health', icon: '💕' },
            ]}
          />

          {/* Phase 8 */}
          <PhaseSection 
            phase="8"
            title="MAGNETISM + GENETICS"
            weeks="Week 27–30"
            color="brown"
            important
            chapters={[
              { subject: 'physics', name: 'Moving Charges & Magnetism', icon: '🧲' },
              { subject: 'physics', name: 'Magnetism and Matter', icon: '🧭' },
              { subject: 'chemistry', name: 'Chemical Kinetics', icon: '⏱️' },
              { subject: 'chemistry', name: 'Surface Chemistry', icon: '🔬' },
              { subject: 'biology', name: 'Principles of Inheritance', icon: '🧬' },
              { subject: 'biology', name: 'Molecular Basis of Inheritance', icon: '🔬' },
            ]}
          />

          {/* Phase 9 */}
          <PhaseSection 
            phase="9"
            title="ADVANCED"
            weeks="Week 31–34"
            color="indigo"
            chapters={[
              { subject: 'physics', name: 'Electromagnetic Induction', icon: '⚡' },
              { subject: 'physics', name: 'Alternating Current', icon: '🔌' },
              { subject: 'physics', name: 'Electromagnetic Waves', icon: '📡' },
              { subject: 'chemistry', name: 'p-Block (Class 12)', icon: '🧪' },
              { subject: 'chemistry', name: 'd & f Block Elements', icon: '⚗️' },
              { subject: 'chemistry', name: 'Coordination Compounds', icon: '🔗' },
              { subject: 'biology', name: 'Evolution', icon: '🦕' },
              { subject: 'biology', name: 'Human Health & Disease', icon: '🏥' },
              { subject: 'biology', name: 'Food Production', icon: '🌾' },
            ]}
          />

          {/* Phase 10 */}
          <PhaseSection 
            phase="10"
            title="FINAL + SCORING"
            weeks="Week 35–38"
            color="teal"
            chapters={[
              { subject: 'physics', name: 'Ray Optics', icon: '🔍' },
              { subject: 'physics', name: 'Wave Optics', icon: '🌊' },
              { subject: 'chemistry', name: 'Haloalkanes & Haloarenes', icon: '⚗️' },
              { subject: 'chemistry', name: 'Alcohols, Phenols, Ethers', icon: '🍷' },
              { subject: 'biology', name: 'Microbes in Human Welfare', icon: '🦠' },
              { subject: 'biology', name: 'Biotechnology', icon: '🔬' },
            ]}
          />

          {/* Phase 11 */}
          <PhaseSection 
            phase="11"
            title="LAST PHASE"
            weeks="Week 39–42"
            color="rose"
            chapters={[
              { subject: 'physics', name: 'Dual Nature', icon: '⚛️' },
              { subject: 'physics', name: 'Atoms', icon: '🔬' },
              { subject: 'physics', name: 'Nuclei', icon: '⚡' },
              { subject: 'physics', name: 'Semiconductors', icon: '💻' },
              { subject: 'physics', name: 'Communication Systems', icon: '📡' },
              { subject: 'chemistry', name: 'Aldehydes, Ketones', icon: '⚗️' },
              { subject: 'chemistry', name: 'Amines', icon: '🧪' },
              { subject: 'chemistry', name: 'Biomolecules', icon: '🧬' },
              { subject: 'chemistry', name: 'Polymers', icon: '🔗' },
              { subject: 'chemistry', name: 'Chemistry in Everyday Life', icon: '🏠' },
              { subject: 'biology', name: 'Organisms & Populations', icon: '🌳' },
              { subject: 'biology', name: 'Ecosystem', icon: '🌲' },
              { subject: 'biology', name: 'Biodiversity', icon: '🦋' },
              { subject: 'biology', name: 'Environmental Issues', icon: '🌏' },
            ]}
          />
        </div>
      </motion.div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200 rounded-3xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
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
                className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl hover:opacity-80 transition-opacity cursor-pointer relative group overflow-hidden border-4 border-white shadow-lg"
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
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-gray-500">Level {level} Learner</p>
            </div>

            {/* Avatar Picker */}
            {showAvatarPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-200"
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

    </div>

  );

}

// Phase Section Component for NEET Roadmap
interface Chapter {
  subject: 'physics' | 'chemistry' | 'biology';
  name: string;
  icon: string;
  important?: boolean;
}

interface PhaseSectionProps {
  phase: string;
  title: string;
  weeks: string;
  color: string;
  important?: boolean;
  chapters: Chapter[];
}

function PhaseSection({ phase, title, weeks, color, important, chapters }: PhaseSectionProps) {
  const colorClasses: Record<string, string> = {
    green: 'from-green-500 to-emerald-600 border-green-400',
    blue: 'from-blue-500 to-indigo-600 border-blue-400',
    yellow: 'from-yellow-500 to-amber-600 border-yellow-400',
    red: 'from-red-500 to-rose-600 border-red-400',
    purple: 'from-purple-500 to-violet-600 border-purple-400',
    orange: 'from-orange-500 to-red-600 border-orange-400',
    gray: 'from-gray-500 to-slate-600 border-gray-400',
    brown: 'from-amber-700 to-orange-800 border-amber-600',
    indigo: 'from-indigo-500 to-purple-600 border-indigo-400',
    teal: 'from-teal-500 to-cyan-600 border-teal-400',
    rose: 'from-rose-500 to-pink-600 border-rose-400',
  };

  const subjectColors: Record<string, string> = {
    physics: 'text-blue-600 bg-blue-100',
    chemistry: 'text-emerald-600 bg-emerald-100',
    biology: 'text-violet-600 bg-violet-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="relative"
    >
      {/* Phase Header */}
      <div className={`relative rounded-2xl bg-gradient-to-r ${colorClasses[color]} p-4 mb-3 border-2 ${important ? 'ring-2 ring-offset-2 ring-amber-400' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-black text-lg">{phase}</span>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">{title}</h4>
              <p className="text-white/80 text-sm">{weeks}</p>
            </div>
          </div>
          {important && (
            <div className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
              🔥 IMPORTANT
            </div>
          )}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-2 gap-2">
        {chapters.map((chapter, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-left ${
              chapter.important ? 'ring-1 ring-amber-400 border-amber-300' : ''
            }`}
          >
            <span className="text-2xl">{chapter.icon}</span>
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${subjectColors[chapter.subject]}`}>
                {chapter.subject === 'physics' ? '⚛️ Physics' : chapter.subject === 'chemistry' ? '🧪 Chemistry' : '🧬 Biology'}
              </span>
              <p className="text-gray-800 text-sm font-medium mt-1 truncate">{chapter.name}</p>
            </div>
            {chapter.important && (
              <span className="text-amber-500 text-xs">🔥</span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

