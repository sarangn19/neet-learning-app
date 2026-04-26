import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useUserStore } from '../store/userStore';
import RevisionPopup from '../components/RevisionPopup';
import DailyRevision from '../components/DailyRevision';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const { catFood, name } = useUserStore();

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
      />
      {/* Header - Greeting & Cat Food */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        {/* Left: Avatar & Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center">
          </div>
          <div className="flex flex-col">
            <p className="text-[#0F172A] text-sm font-normal leading-4">Hello</p>
            <p className="text-[#0F172A] text-base font-semibold leading-5">{name}</p>
          </div>
        </div>

        {/* Right: Cat Food Icon (Feed Button) */}
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

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4"
      >
        <div className="flex items-center gap-3 h-12 px-4 bg-white border border-gray-200 rounded-2xl">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search Chapter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 h-full bg-transparent focus:outline-none text-sm text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </motion.div>

      {/* Subject Cards - Horizontal Scroll */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
      >
        {/* Chemistry Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-shrink-0"
        >
          <Link 
            to={`/chapter/chemistry/plus_one`}
            className="flex items-start gap-2 h-[166px] bg-[#FEFEFE] border border-[#E2E8F0] rounded-2xl p-2 shadow-[0_0_32px_rgba(0,0,0,0.06)] hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-all"
          >
            <img 
              src="/images/chemistry-icon.png" 
              alt="Chemistry"
              className="w-[140px] h-[150px] object-contain rounded-xl flex-shrink-0"
            />
            <div className="flex items-center gap-1 pt-6 pr-2 whitespace-nowrap">
              <span className="text-base font-medium text-[#0F172A]">Chemistry</span>
              <svg className="w-4 h-4 text-[#0F172A] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </motion.div>

        {/* Biology Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-shrink-0"
        >
          <Link 
            to={`/chapter/biology/plus_one`}
            className="flex items-start gap-2 h-[166px] bg-[#FEFEFE] border border-[#E2E8F0] rounded-2xl p-2 shadow-[0_0_32px_rgba(0,0,0,0.06)] hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-all"
          >
            <img 
              src="/images/biology-icon.png" 
              alt="Biology"
              className="w-[140px] h-[150px] object-contain rounded-xl flex-shrink-0"
            />
            <div className="flex items-center gap-1 pt-6 pr-2 whitespace-nowrap">
              <span className="text-base font-medium text-[#0F172A]">Biology</span>
              <svg className="w-4 h-4 text-[#0F172A] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </motion.div>

        {/* Physics Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0"
        >
          <Link 
            to={`/chapter/physics/plus_one`}
            className="flex items-start gap-2 h-[166px] bg-[#FEFEFE] border border-[#E2E8F0] rounded-2xl p-2 shadow-[0_0_32px_rgba(0,0,0,0.06)] hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-all"
          >
            <img 
              src="/images/physics-icon.png" 
              alt="Physics"
              className="w-[140px] h-[150px] object-contain rounded-xl flex-shrink-0"
            />
            <div className="flex items-center gap-1 pt-6 pr-2 whitespace-nowrap">
              <span className="text-base font-medium text-[#0F172A]">Physics</span>
              <svg className="w-4 h-4 text-[#0F172A] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
