import { supabase, isFallbackMode } from '../lib/supabase';

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar: string;
  victories: number;
  rank: number;
}

export const leaderboardService = {
  // Record a battle victory
  async recordVictory(userId: string, userName: string, userAvatar: string): Promise<void> {
    if (isFallbackMode) {
      // Store in localStorage for fallback mode
      const victories = JSON.parse(localStorage.getItem('battle_victories') || '[]');
      const existingIndex = victories.findIndex((v: any) => v.userId === userId);
      
      if (existingIndex >= 0) {
        victories[existingIndex].victories += 1;
        victories[existingIndex].name = userName;
        victories[existingIndex].avatar = userAvatar;
        victories[existingIndex].lastUpdated = new Date().toISOString();
      } else {
        victories.push({
          userId,
          name: userName,
          avatar: userAvatar,
          victories: 1,
          lastUpdated: new Date().toISOString(),
        });
      }
      
      localStorage.setItem('battle_victories', JSON.stringify(victories));
      return;
    }

    try {
      // Try to update existing record
      const { data: existing } = await supabase
        .from('battle_leaderboard')
        .select('victories')
        .eq('user_id', userId)
        .single();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('battle_leaderboard')
          .update({
            victories: existing.victories + 1,
            name: userName,
            avatar: userAvatar,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('battle_leaderboard')
          .insert({
            user_id: userId,
            name: userName,
            avatar: userAvatar,
            victories: 1,
            updated_at: new Date().toISOString(),
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Failed to record victory:', error);
      // Fallback to localStorage
      const victories = JSON.parse(localStorage.getItem('battle_victories') || '[]');
      const existingIndex = victories.findIndex((v: any) => v.userId === userId);
      
      if (existingIndex >= 0) {
        victories[existingIndex].victories += 1;
        victories[existingIndex].name = userName;
        victories[existingIndex].avatar = userAvatar;
        victories[existingIndex].lastUpdated = new Date().toISOString();
      } else {
        victories.push({
          userId,
          name: userName,
          avatar: userAvatar,
          victories: 1,
          lastUpdated: new Date().toISOString(),
        });
      }
      
      localStorage.setItem('battle_victories', JSON.stringify(victories));
    }
  },

  // Get top 10 leaderboard
  async getTop10(): Promise<LeaderboardEntry[]> {
    if (isFallbackMode) {
      const victories = JSON.parse(localStorage.getItem('battle_victories') || '[]');
      return victories
        .sort((a: any, b: any) => b.victories - a.victories)
        .slice(0, 10)
        .map((v: any, index: number) => ({
          userId: v.userId,
          name: v.name,
          avatar: v.avatar,
          victories: v.victories,
          rank: index + 1,
        }));
    }

    try {
      const { data, error } = await supabase
        .from('battle_leaderboard')
        .select('user_id, name, avatar, victories')
        .order('victories', { ascending: false })
        .limit(10);

      if (error) throw error;

      return (data || []).map((entry, index) => ({
        userId: entry.user_id,
        name: entry.name,
        avatar: entry.avatar,
        victories: entry.victories,
        rank: index + 1,
      }));
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      // Fallback to localStorage
      const victories = JSON.parse(localStorage.getItem('battle_victories') || '[]');
      return victories
        .sort((a: any, b: any) => b.victories - a.victories)
        .slice(0, 10)
        .map((v: any, index: number) => ({
          userId: v.userId,
          name: v.name,
          avatar: v.avatar,
          victories: v.victories,
          rank: index + 1,
        }));
    }
  },

  // Get user's rank
  async getUserRank(userId: string): Promise<{ rank: number; victories: number } | null> {
    if (isFallbackMode) {
      const victories = JSON.parse(localStorage.getItem('battle_victories') || '[]');
      const sorted = victories.sort((a: any, b: any) => b.victories - a.victories);
      const userIndex = sorted.findIndex((v: any) => v.userId === userId);
      
      if (userIndex >= 0) {
        return {
          rank: userIndex + 1,
          victories: sorted[userIndex].victories,
        };
      }
      return null;
    }

    try {
      // Get all entries sorted by victories
      const { data, error } = await supabase
        .from('battle_leaderboard')
        .select('user_id, victories')
        .order('victories', { ascending: false });

      if (error) throw error;

      const userIndex = (data || []).findIndex((entry) => entry.user_id === userId);
      
      if (userIndex >= 0) {
        return {
          rank: userIndex + 1,
          victories: data[userIndex].victories,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get user rank:', error);
      // Fallback to localStorage
      const victories = JSON.parse(localStorage.getItem('battle_victories') || '[]');
      const sorted = victories.sort((a: any, b: any) => b.victories - a.victories);
      const userIndex = sorted.findIndex((v: any) => v.userId === userId);
      
      if (userIndex >= 0) {
        return {
          rank: userIndex + 1,
          victories: sorted[userIndex].victories,
        };
      }
      return null;
    }
  },
};

export default leaderboardService;
