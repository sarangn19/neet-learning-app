import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Zap, User } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { subjects } from '../data/curriculum';
import { Atom, FlaskConical, Leaf } from 'lucide-react';
import { useState } from 'react';
import DailyRevision from '../components/DailyRevision';

const subjectIcons = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: Leaf,
};

export default function Home() {
  const { name, completedLessons } = useUserStore();
  const [showRevision, setShowRevision] = useState(completedLessons.length > 0);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Daily Revision Modal */}
      {showRevision && (
        <DailyRevision 
          onClose={() => setShowRevision(false)}
          onStartLesson={() => setShowRevision(false)}
        />
      )}
      
      {/* Header - Hello Username */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Hello</p>
            <h1 className="text-xl font-bold text-gray-900">{name || 'Username'}</h1>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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

      {/* Revision Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-white rounded-3xl p-6 flex items-center gap-6">
          {/* Mascot */}
          <div className="w-24 h-24 flex-shrink-0">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Cute Fox Character */}
              <ellipse cx="100" cy="110" rx="55" ry="65" fill="#FF9600" />
              <ellipse cx="100" cy="100" rx="45" ry="50" fill="#FFB84D" />
              {/* Ears */}
              <polygon points="60,55 50,20 85,45" fill="#FF9600" />
              <polygon points="140,55 150,20 115,45" fill="#FF9600" />
              <polygon points="60,50 55,30 80,45" fill="#FFB84D" />
              <polygon points="140,50 145,30 120,45" fill="#FFB84D" />
              {/* Eyes */}
              <circle cx="75" cy="85" r="12" fill="white" />
              <circle cx="125" cy="85" r="12" fill="white" />
              <circle cx="75" cy="85" r="7" fill="#1F1F1F" />
              <circle cx="125" cy="85" r="7" fill="#1F1F1F" />
              <circle cx="78" cy="82" r="3" fill="white" />
              <circle cx="128" cy="82" r="3" fill="white" />
              {/* Nose */}
              <ellipse cx="100" cy="100" rx="8" ry="6" fill="#1F1F1F" />
              {/* Mouth */}
              <path d="M 90 110 Q 100 115 110 110" stroke="#1F1F1F" strokeWidth="2" fill="none" />
              {/* Whiskers */}
              <line x1="50" y1="95" x2="70" y2="98" stroke="#1F1F1F" strokeWidth="1.5" />
              <line x1="50" y1="105" x2="70" y2="102" stroke="#1F1F1F" strokeWidth="1.5" />
              <line x1="150" y1="95" x2="130" y2="98" stroke="#1F1F1F" strokeWidth="1.5" />
              <line x1="150" y1="105" x2="130" y2="102" stroke="#1F1F1F" strokeWidth="1.5" />
              {/* Body/Bag */}
              <ellipse cx="100" cy="145" rx="35" ry="25" fill="#FF9600" />
              <path d="M 70 135 Q 60 150 75 155" stroke="#8B4513" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M 130 135 Q 140 150 125 155" stroke="#8B4513" strokeWidth="8" fill="none" strokeLinecap="round" />
              {/* Paws waving */}
              <ellipse cx="45" cy="115" rx="12" ry="10" fill="#FF9600" />
              <ellipse cx="55" cy="110" rx="8" ry="6" fill="#FFB84D" />
              <ellipse cx="50" cy="108" rx="3" ry="4" fill="#1F1F1F" />
              <ellipse cx="58" cy="106" rx="3" ry="4" fill="#1F1F1F" />
              <ellipse cx="66" cy="104" rx="3" ry="4" fill="#1F1F1F" />
              {/* Sparkles */}
              <text x="25" y="50" fontSize="20">✨</text>
              <text x="155" y="60" fontSize="16">⭐</text>
              <text x="160" y="35" fontSize="14">✨</text>
            </svg>
          </div>

          {/* Text & Button */}
          <div className="flex-1">
            <p className="text-gray-600 mb-3">Revise before you start</p>
            <button
              onClick={() => setShowRevision(true)}
              className="flex items-center gap-2 bg-brand-blue hover:bg-blue-600 text-white font-bold py-2.5 px-5 rounded-xl transition-colors"
            >
              <Zap className="w-4 h-4" />
              Quick flashcards
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Subject Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-4"
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
                to={`/learn/${subject.id}/plus_one`}
                className="block bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${subject.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: subject.color }} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{subject.name}</h3>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
