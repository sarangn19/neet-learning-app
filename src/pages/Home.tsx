import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { subjects } from '../data/curriculum';
import { Atom, FlaskConical, Leaf, Milk } from 'lucide-react';
import { useState } from 'react';
import DailyRevision from '../components/DailyRevision';
import { useUserStore } from '../store/userStore';

const subjectIcons = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: Leaf,
};

export default function Home() {
  const [showRevision, setShowRevision] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { catFood, name } = useUserStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Daily Revision Modal */}
      {showRevision && (
        <DailyRevision 
          onClose={() => setShowRevision(false)}
          onStartLesson={() => setShowRevision(false)}
        />
      )}

      {/* Header - Greeting & Cat Food */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        {/* Left: Avatar & Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
            👤
          </div>
          <div>
            <p className="text-gray-500 text-sm">Hello</p>
            <p className="font-bold text-gray-900">{name}</p>
          </div>
        </div>
        
        {/* Right: Cat Food Icon */}
        <div className="relative">
          <Milk className="w-8 h-8 text-amber-500" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {catFood}
          </span>
        </div>
      </motion.div>

      {/* Feed Me Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-4"
      >
        <button className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full shadow-sm hover:shadow-md transition-shadow">
          <span>Feed me</span>
          <span>🍗</span>
        </button>
      </motion.div>

      {/* Mascot - Cat in Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          {/* Box */}
          <div className="w-48 h-32 bg-amber-200 rounded-lg relative overflow-visible">
            {/* Box flaps */}
            <div className="absolute -top-4 left-0 w-20 h-8 bg-amber-300 transform -rotate-12 rounded-sm"></div>
            <div className="absolute -top-4 right-0 w-20 h-8 bg-amber-300 transform rotate-12 rounded-sm"></div>
            {/* Cat face peeking */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-12 bg-gray-800 rounded-full relative">
                {/* Eyes */}
                <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-3 right-3 w-4 h-4 bg-white rounded-full">
                  <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                </div>
                {/* Nose */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-1.5 bg-pink-400 rounded-full"></div>
                {/* Whiskers */}
                <div className="absolute bottom-4 left-0 w-3 h-0.5 bg-gray-400"></div>
                <div className="absolute bottom-3 left-0 w-3 h-0.5 bg-gray-400"></div>
                <div className="absolute bottom-4 right-0 w-3 h-0.5 bg-gray-400"></div>
                <div className="absolute bottom-3 right-0 w-3 h-0.5 bg-gray-400"></div>
              </div>
            </div>
            {/* Box label */}
            <div className="absolute bottom-4 right-4 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
              FelEx
            </div>
            {/* Arrow */}
            <div className="absolute bottom-4 right-1 text-purple-500 text-xs transform rotate-90">
              ↑
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Chapter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
          />
        </div>
      </motion.div>

      {/* Revise Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">Revise before you start</h2>
      </motion.div>

      {/* Subject Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-3 sm:gap-4"
      >
        {subjects.map((subject, index) => {
          const Icon = subjectIcons[subject.id];
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link 
                to={`/chapter/${subject.id}/plus_one`}
                className="block bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${subject.color}15` }}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: subject.color }} />
                </div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm">{subject.name}</h3>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
