import { motion } from 'framer-motion';
import { Trophy, Crown } from 'lucide-react';
import { useUserStore } from '../store/userStore';

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: 'Science Pro', avatar: '🧑‍🔬', catFood: 45, streak: 45 },
  { rank: 2, name: 'Bio Whiz', avatar: '🔬', catFood: 38, streak: 32 },
  { rank: 3, name: 'Chem Master', avatar: '🧪', catFood: 32, streak: 28 },
  { rank: 4, name: 'Physics Fan', avatar: '⚛️', catFood: 28, streak: 21 },
  { rank: 5, name: 'Learner', avatar: '📚', catFood: 22, streak: 15 },
];

export default function Leaderboard() {
  const { name, avatar, catFood } = useUserStore();
  
  // Add current user to leaderboard
  const allUsers = [...leaderboardData, { rank: 0, name, avatar, catFood, streak: 0 }]
    .sort((a, b) => b.catFood - a.catFood)
    .map((u, i) => ({ ...u, rank: i + 1 }));
  
  const currentUser = allUsers.find(u => u.name === name);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-brand-yellow" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Diamond League</h1>
        <p className="text-gray-500">Top learners this week</p>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center items-end gap-4 mb-8"
      >
        {[1, 0, 2].map((offset) => {
          const user = allUsers[offset];
          if (!user) return null;
          
          const heights = ['h-24', 'h-32', 'h-28'];
          const positions = [2, 1, 3];
          const colors = ['bg-gray-300', 'bg-brand-yellow', 'bg-orange-300'];
          
          return (
            <div key={offset} className="flex flex-col items-center">
              <div className="text-xl mb-2">{user.avatar}</div>
              <p className="font-bold text-sm text-gray-900 mb-2">{user.name}</p>
              <div className={`w-20 ${heights[offset]} ${colors[offset]} rounded-t-xl flex items-center justify-center`}>
                <Crown className={`w-6 h-6 ${offset === 1 ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-b-xl px-4 py-2 w-20 text-center">
                <p className="font-bold text-lg">{positions[offset]}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Leaderboard List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="space-y-2">
          {allUsers.slice(3).map((user, index) => (
            <div 
              key={index}
              className={`flex items-center gap-4 p-3 rounded-xl ${user.name === name ? 'bg-brand-blue/10 border-2 border-brand-blue' : 'bg-gray-50'}`}
            >
              <span className="w-8 text-center font-bold text-gray-400">{user.rank}</span>
              <span className="text-xl">{user.avatar}</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.catFood} 🐱 food</p>
              </div>
              {user.streak > 0 && (
                <div className="text-brand-orange text-sm font-bold">
                  🔥 {user.streak}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Your Ranking */}
      {currentUser && currentUser.rank > 6 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-4 border-2 border-brand-blue bg-brand-blue/5"
        >
          <div className="flex items-center gap-4">
            <span className="w-8 text-center font-bold text-brand-blue">{currentUser.rank}</span>
            <span className="text-xl">{avatar}</span>
            <div className="flex-1">
              <p className="font-bold text-gray-900">You</p>
              <p className="text-sm text-gray-500">{catFood} 🐱 food</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
