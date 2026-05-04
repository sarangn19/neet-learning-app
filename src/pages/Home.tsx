import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate, Link } from 'react-router-dom';
import { PageSkeleton } from '../components/Skeleton';
import { X, LogOut, Cat, Flame, Target, Zap } from 'lucide-react';
import { useRive } from '@rive-app/react-canvas';

// Rive Cat Component - Mouse Tracking
function RiveCat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { RiveComponent, rive } = useRive({
    src: '/images/cat%20rive.riv',
    autoplay: true,
    stateMachines: 'State Machine 1',
    onLoad: () => {
      // Debug: Log all available inputs when Rive loads
      if (rive) {
        const inputs = rive.stateMachineInputs('State Machine 1');
        console.log('Available Rive inputs:', inputs?.map(i => ({ name: i.name, type: i.type })));
      }
    }
  });

  // Track mouse position and feed to Rive
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rive || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to cat center (-1 to 1)
      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      // Get state machine inputs
      const inputs = rive.stateMachineInputs('State Machine 1');

      // Try common mouse input names
      const possibleXNames = ['MouseX', 'mouseX', 'Look X', 'look_x', 'X', 'x'];
      const possibleYNames = ['MouseY', 'mouseY', 'Look Y', 'look_y', 'Y', 'y'];

      const xInput = inputs?.find(input => possibleXNames.includes(input.name));
      const yInput = inputs?.find(input => possibleYNames.includes(input.name));

      if (xInput) xInput.value = Math.max(-1, Math.min(1, mouseX));
      if (yInput) yInput.value = Math.max(-1, Math.min(1, mouseY));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rive]);

  const handleClick = () => {
    if (rive) {
      const inputs = rive.stateMachineInputs('State Machine 1');
      const possibleClickNames = ['Click', 'click', 'Tap', 'tap', 'Trigger', 'trigger'];
      const trigger = inputs?.find(input => possibleClickNames.includes(input.name));
      if (trigger && trigger.type === 'trigger') trigger.fire();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative mx-2 w-28 h-24 cursor-pointer hover:scale-105 transition-transform"
      onClick={handleClick}
    >
      <RiveComponent />
    </div>
  );
}

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { catFood, name, avatar, level, streak, longestStreak, completedLessons, logout } = useUserStore();
  const navigate = useNavigate();


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
            {/* Rive Cat Animation */}
            <RiveCat />
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
          className="flex gap-3 justify-center mb-20"
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

