import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LessonProgress, DailyGoal, Badge } from '../types';

interface UserState extends User {
  lessonProgress: Record<string, LessonProgress>;
  dailyGoals: DailyGoal[];
  catFood: number;
  
  // Actions
  setUser: (user: Partial<User>) => void;
  completeLesson: (levelId: string, stars: number) => void;
  updateStreak: () => void;
  addGems: (amount: number) => void;
  unlockBadge: (badge: Badge) => void;
  getDailyGoal: () => DailyGoal | undefined;
  addCatFood: (amount: number) => void;
  completeModule: () => void;
}

const defaultUser: User = {
  id: 'user-1',
  name: 'Science Learner',
  avatar: '👨‍🔬',
  tokens: 0,
  level: 1,
  streak: 1,
  longestStreak: 1,
  gems: 100,
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
      catFood: 0,

      setUser: (userData) => set((state) => ({ ...state, ...userData })),

      completeLesson: (levelId: string, stars: number) => {
        const state = get();
        const progress: LessonProgress = {
          levelId,
          completed: true,
          stars,
          tokensEarned: 0,
          lastAttempted: new Date().toISOString(),
        };
        
        set({
          lessonProgress: { ...state.lessonProgress, [levelId]: progress },
          completedLessons: [...state.completedLessons, levelId],
        });
        
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

      addCatFood: (amount) => set((state) => ({ catFood: state.catFood + amount })),

      completeModule: () => {
        // Give 1 cat food for completing a module
        get().addCatFood(1);
      },

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
