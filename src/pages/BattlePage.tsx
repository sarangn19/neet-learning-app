import { useState, useEffect } from 'react';
import Battle from './Battle';
import { motion } from 'framer-motion';
import { ChevronLeft, Trophy, Crown, Swords, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { supabase } from '../lib/supabase';

interface BattleLeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  victories: number;
  battlesPlayed: number;
  rank: number;
}

export default function BattlePage() {
  const navigate = useNavigate();
  const { name, avatar, id: userId } = useUserStore();
  const [leaderboard, setLeaderboard] = useState<BattleLeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<BattleLeaderboardUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    loadLeaderboard();
    // Set current month display
    const now = new Date();
    setCurrentMonth(now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  }, []);

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);
      
      // Get start of current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      
      // Fetch completed battles from this month
      const { data: battles, error } = await supabase
        .from('battle_matches')
        .select('*')
        .eq('status', 'completed')
        .gte('completed_at', startOfMonth)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      // Count victories per user
      const userStats: Record<string, { 
        id: string; 
        name: string; 
        avatar: string; 
        victories: number; 
        battlesPlayed: number;
      }> = {};

      battles?.forEach((battle: any) => {
        // Track player 1
        if (!userStats[battle.player1_id]) {
          userStats[battle.player1_id] = {
            id: battle.player1_id,
            name: battle.player1_name,
            avatar: battle.player1_avatar || '/images/profile pictures/1.png',
            victories: 0,
            battlesPlayed: 0,
          };
        }
        userStats[battle.player1_id].battlesPlayed++;
        
        // Track player 2
        if (battle.player2_id && !userStats[battle.player2_id]) {
          userStats[battle.player2_id] = {
            id: battle.player2_id,
            name: battle.player2_name,
            avatar: battle.player2_avatar || '/images/profile pictures/1.png',
            victories: 0,
            battlesPlayed: 0,
          };
        }
        if (battle.player2_id) {
          userStats[battle.player2_id].battlesPlayed++;
        }

        // Determine winner and increment victories
        const isPlayer1Winner = battle.player1_score > battle.player2_score;
        if (isPlayer1Winner) {
          userStats[battle.player1_id].victories++;
        } else if (battle.player2_score > battle.player1_score && battle.player2_id) {
          userStats[battle.player2_id].victories++;
        }
      });

      // Convert to array and sort by victories
      const sortedUsers = Object.values(userStats)
        .sort((a, b) => b.victories - a.victories)
        .map((user, index) => ({ ...user, rank: index + 1 }));

      setLeaderboard(sortedUsers.slice(0, 10));
      
      // Find current user's rank
      const currentUser = sortedUsers.find(u => u.id === userId);
      if (currentUser && currentUser.rank > 10) {
        setUserRank(currentUser);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-100 text-amber-700 border-amber-300';
    if (rank === 2) return 'bg-gray-100 text-gray-700 border-gray-300';
    if (rank === 3) return 'bg-orange-100 text-orange-700 border-orange-300';
    return 'bg-white text-gray-600 border-gray-200';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-4 h-4 text-amber-500" />;
    if (rank === 2) return <Trophy className="w-4 h-4 text-gray-500" />;
    if (rank === 3) return <Trophy className="w-4 h-4 text-orange-500" />;
    return <span className="w-6 text-center font-bold">{rank}</span>;
  };

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

      {/* Monthly Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mt-6"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Leaderboard Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center gap-2 mb-1">
              <Swords className="w-5 h-5 text-amber-600" />
              <h2 className="font-bold text-gray-900">Battle Champions</h2>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{currentMonth} • Resets 1st of every month</span>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="p-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No battles yet this month!</p>
                <p className="text-sm">Be the first to compete</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 ${
                      user.id === userId 
                        ? 'bg-blue-50 border-blue-300' 
                        : getRankStyle(user.rank)
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Avatar */}
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${
                        user.id === userId ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {user.name}
                        {user.id === userId && (
                          <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.battlesPlayed} battles • {((user.victories / user.battlesPlayed) * 100).toFixed(0)}% win rate
                      </p>
                    </div>

                    {/* Victories */}
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        user.rank <= 3 ? 'text-amber-600' : 'text-gray-700'
                      }`}>
                        {user.victories}
                      </p>
                      <p className="text-xs text-gray-500">wins</p>
                    </div>
                  </div>
                ))}

                {/* User's rank if not in top 10 */}
                {userRank && (
                  <>
                    <div className="flex items-center justify-center py-2">
                      <div className="h-px bg-gray-200 flex-1" />
                      <span className="px-3 text-xs text-gray-400">Your Ranking</span>
                      <div className="h-px bg-gray-200 flex-1" />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border-2 border-blue-300">
                      <div className="flex items-center justify-center w-8">
                        <span className="font-bold text-blue-700">{userRank.rank}</span>
                      </div>
                      <img
                        src={userRank.avatar}
                        alt={userRank.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-blue-900 truncate">
                          {userRank.name}
                          <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                            You
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {userRank.battlesPlayed} battles • {((userRank.victories / userRank.battlesPlayed) * 100).toFixed(0)}% win rate
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">{userRank.victories}</p>
                        <p className="text-xs text-gray-500">wins</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Stats Summary */}
            {!isLoading && leaderboard.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-amber-600">
                      {leaderboard.reduce((acc, u) => acc + u.victories, 0)}
                    </p>
                    <p className="text-xs text-gray-500">Total Wins</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-blue-600">
                      {leaderboard.length}
                    </p>
                    <p className="text-xs text-gray-500">Champions</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">
                      {Math.max(...leaderboard.map(u => u.victories))}
                    </p>
                    <p className="text-xs text-gray-500">Best Streak</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
