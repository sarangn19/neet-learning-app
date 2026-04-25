import { motion } from 'framer-motion';
import { Cat, Trophy } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export default function Shop() {
  const { catFood } = useUserStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Cat className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Your Cat Food</h1>
        <p className="text-gray-500">Complete modules to earn more cat food!</p>

        {/* Cat Food Balance */}
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-100 px-6 py-3 rounded-xl">
          <Cat className="w-6 h-6 text-amber-600" />
          <span className="font-bold text-xl text-amber-700">{catFood}</span>
          <span className="text-amber-600">cat food</span>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 text-center"
      >
        <Trophy className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
        <h2 className="font-bold text-gray-900 mb-2">How to Earn Cat Food</h2>
        <p className="text-gray-500 mb-4">Complete any module to earn 1 cat food!</p>
        <div className="text-sm text-gray-400">
          Finish all levels in a module to get your reward.
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 card bg-brand-blue/5 border-2 border-brand-blue/20"
      >
        <div className="flex items-start gap-3">
          <Cat className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-1">About Virtual Cat Food</h3>
            <p className="text-sm text-gray-600">
              This is virtual cat food for your virtual pet! Complete lessons and activities 
              to earn tokens, then spend them here to buy treats for your furry friend. 
              Remember: this is just for fun - no real cats will be fed! 🐱
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
