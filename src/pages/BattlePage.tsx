import Battle from './Battle';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BattlePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-6"
      >
        <button 
          onClick={() => navigate('/')} 
          className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Battle Arena</h1>
          <p className="text-sm text-gray-500">Compete and win coins!</p>
        </div>
      </motion.div>

      {/* Battle Component */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4"
      >
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
          <Battle onClose={() => navigate('/')} />
        </div>
      </motion.div>
    </div>
  );
}
