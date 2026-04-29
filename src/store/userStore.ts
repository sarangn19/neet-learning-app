import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LessonProgress, DailyGoal, Badge } from '../types';

interface UserState extends User {
  lessonProgress: Record<string, LessonProgress>;
  dailyGoals: DailyGoal[];
  catFood: number;
  isAuthenticated: boolean;
  user: User | null;
  
  // Actions
  setUser: (user: Partial<User>) => void;
  completeLesson: (levelId: string, stars: number) => void;
  updateStreak: () => void;
  addGems: (amount: number) => void;
  unlockBadge: (badge: Badge) => void;
  getDailyGoal: () => DailyGoal | undefined;
  addCatFood: (amount: number) => void;
  completeModule: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  signup: (data: { name: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const defaultUser: User = {
  id: 'user-1',
  name: 'Science Learner',
  email: 'learner@example.com',
  avatar: '👨‍🔬',
  tokens: 0,
  level: 1,
  streak: 0,
  longestStreak: 0,
  gems: 0,
  lastActive: new Date().toISOString().split('T')[0],
  badges: [],
  completedLessons: [],
  role: 'user',
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...defaultUser,
      lessonProgress: {},
      dailyGoals: [],
      catFood: 0,
      isAuthenticated: false,
      user: null,

      setUser: (userData) => set((state) => ({ ...state, ...userData })),

      login: async (email, password) => {
        // Mock login - replace with actual API
        if (email && password) {
          const mockUser: User = {
            id: 'admin-1',
            name: email.split('@')[0],
            email,
            avatar: '👨‍💼',
            tokens: 0,
            level: 1,
            streak: 1,
            longestStreak: 1,
            gems: 100,
            lastActive: new Date().toISOString().split('T')[0],
            badges: [],
            completedLessons: [],
            role: email.includes('super') ? 'superadmin' : email.includes('admin') ? 'admin' : 'user',
          };
          set({ isAuthenticated: true, user: mockUser });
          return { success: true, user: mockUser };
        }
        return { success: false, error: 'Invalid credentials' };
      },

      signup: async (data) => {
        // Mock signup - replace with actual API
        if (data.email && data.password) {
          const newUser: User = {
            id: 'user-' + Date.now(),
            name: data.name,
            email: data.email,
            avatar: '👤',
            tokens: 0,
            level: 1,
            streak: 1,
            longestStreak: 1,
            gems: 100,
            lastActive: new Date().toISOString().split('T')[0],
            badges: [],
            completedLessons: [],
            role: 'user',
          };
          set({ isAuthenticated: true, user: newUser });
          return { success: true };
        }
        return { success: false, error: 'Signup failed' };
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

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
