import { motion } from 'framer-motion';
import { Trophy, Flame, Star, Target, Zap, Award } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export default function Profile() {
  const { name, avatar, xp, level, streak, longestStreak, gems, completedLessons, badges } = useUserStore();

  const stats = [
    { icon: <Trophy className="w-5 h-5" />, label: 'Total XP', value: xp, color: 'text-brand-yellow' },
    { icon: <Flame className="w-5 h-5" />, label: 'Current Streak', value: streak, color: 'text-brand-orange' },
    { icon: <Target className="w-5 h-5" />, label: 'Longest Streak', value: longestStreak, color: 'text-brand-red' },
    { icon: <Zap className="w-5 h-5" />, label: 'Lessons Completed', value: completedLessons.length, color: 'text-brand-blue' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6 text-center"
      >
        <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">
          {avatar}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{name}</h1>
        <p className="text-gray-500 mb-4">Level {level} Learner</p>
        
        {/* Level Progress */}
        <div className="max-w-xs mx-auto">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
            <motion.div 
              className="h-full bg-brand-yellow"
              initial={{ width: 0 }}
              animate={{ width: `${(xp % 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{xp % 100}/100 XP to next level</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
      >
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${stat.color.replace('text-', 'bg-').replace('400', '100').replace('500', '100')}`}>
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Badges */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-purple" />
          Achievements
        </h2>
        
        {badges.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-4xl mb-2">🏆</p>
            <p>No badges yet. Keep learning to earn achievements!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl text-center">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="font-bold text-gray-900 text-sm">{badge.name}</p>
                <p className="text-xs text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
