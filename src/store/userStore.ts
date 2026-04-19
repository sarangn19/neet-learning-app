import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LessonProgress, DailyGoal, Badge } from '../types';

interface UserState extends User {
  lessonProgress: Record<string, LessonProgress>;
  dailyGoals: DailyGoal[];
  
  // Actions
  setUser: (user: Partial<User>) => void;
  addXP: (amount: number) => void;
  useHeart: () => boolean;
  refillHearts: () => void;
  completeLesson: (levelId: string, stars: number, xpEarned: number) => void;
  updateStreak: () => void;
  addGems: (amount: number) => void;
  unlockBadge: (badge: Badge) => void;
  getDailyGoal: () => DailyGoal | undefined;
}

const defaultUser: User = {
  id: 'user-1',
  name: 'Science Learner',
  avatar: '👨‍🔬',
  xp: 0,
  level: 1,
  streak: 1,
  longestStreak: 1,
  gems: 100,
  hearts: 5,
  lastActive: new Date().toISOString().split('T')[0],
  badges: [],
  completedLessons: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...defaultUser,
      lessonProgress: {},
      dailyGoals: [],

      setUser: (userData) => set((state) => ({ ...state, ...userData })),

      addXP: (amount) => {
        const state = get();
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        
        set({ xp: newXP, level: newLevel });
        
        // Update daily goal
        const today = new Date().toISOString().split('T')[0];
        const goal = state.dailyGoals.find(g => g.date === today);
        if (goal) {
          goal.earnedXP += amount;
          goal.completed = goal.earnedXP >= goal.targetXP;
        }
      },

      useHeart: () => {
        const state = get();
        if (state.hearts > 0) {
          set({ hearts: state.hearts - 1 });
          return true;
        }
        return false;
      },

      refillHearts: () => set({ hearts: 5 }),

      completeLesson: (levelId, stars, xpEarned) => {
        const state = get();
        const progress: LessonProgress = {
          levelId,
          completed: true,
          stars,
          xpEarned,
          lastAttempted: new Date().toISOString(),
        };
        
        set({
          lessonProgress: { ...state.lessonProgress, [levelId]: progress },
          completedLessons: [...state.completedLessons, levelId],
        });
        
        get().addXP(xpEarned);
        get().updateStreak();
      },

      updateStreak: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const lastActive = state.lastActive;
        
        if (lastActive === today) return;
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        let newStreak = 1;
        if (lastActive === yesterdayStr) {
          newStreak = state.streak + 1;
        }
        
        set({
          streak: newStreak,
          longestStreak: Math.max(newStreak, state.longestStreak),
          lastActive: today,
        });
      },

      addGems: (amount) => set((state) => ({ gems: state.gems + amount })),

      unlockBadge: (badge) => set((state) => ({
        badges: [...state.badges, badge],
      })),

      getDailyGoal: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        return state.dailyGoals.find(g => g.date === today);
      },
    }),
    {
      name: 'science-learn-user',
    }
  )
);
