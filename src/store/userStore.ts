import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User, LessonProgress, DailyGoal, Badge } from '../types';

interface UserState extends User {
  lessonProgress: Record<string, LessonProgress>;
  dailyGoals: DailyGoal[];
  catFood: number;
  coins: number;
  isAuthenticated: boolean;
  user: User | null;
  purchasedBanners: string[];
  equippedBanner: string;

  // Actions
  setUser: (user: Partial<User>) => void;
  completeLesson: (levelId: string, stars: number) => Promise<Badge[]>;
  loadLessonProgress: () => Promise<void>;
  updateStreak: () => void;
  addGems: (amount: number) => void;
  recordBattleVictory: () => number;
  unlockBadge: (badge: Badge) => void;
  checkBadges: (lessonStars: number, coinsEarned: number) => Badge[];
  getDailyGoal: () => DailyGoal | undefined;
  addCatFood: (amount: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  purchaseAvatar: (avatar: string, cost: number) => boolean;
  purchaseBanner: (bannerId: string, cost: number) => boolean;
  equipBanner: (bannerId: string) => void;
  completeModule: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  signup: (data: { name: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearStorage: () => void;
}

// Profile picture options
export const AVATAR_IMAGES = [
  '/images/profile pictures/1.png',
  '/images/profile pictures/2.png',
  '/images/profile pictures/3.png',
  '/images/profile pictures/4.png',
  '/images/profile pictures/5.png',
  '/images/profile pictures/6.png',
  '/images/profile pictures/7.png',
  '/images/profile pictures/8.png',
  '/images/profile pictures/9.png',
];

const defaultUser: User & { purchasedBanners: string[]; equippedBanner: string } = {
  id: 'user-1',
  name: 'Science Learner',
  email: 'learner@example.com',
  avatar: AVATAR_IMAGES[0],
  tokens: 0,
  level: 1,
  streak: 0,
  longestStreak: 0,
  gems: 0,
  lastActive: new Date().toISOString().split('T')[0],
  badges: [],
  completedLessons: [],
  role: 'user',
  purchasedAvatars: [AVATAR_IMAGES[0]],
  purchasedBanners: ['banner-default'],
  equippedBanner: 'banner-default',
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...defaultUser,
      lessonProgress: {},
      dailyGoals: [],
      catFood: 0,
      coins: 0,
      isAuthenticated: false,
      user: null,

      setUser: (userData) => set((state) => ({ ...state, ...userData })),

      login: async (email: string, password: string) => {
        try {
          const { isFallbackMode } = await import('../lib/supabase');

          if (isFallbackMode) {
            // Fallback mode - check localStorage for user
            const storedUser = get().user;
            if (storedUser && storedUser.email === email) {
              set({ isAuthenticated: true, ...storedUser, lessonProgress: get().lessonProgress });
              return { success: true, user: storedUser };
            }
            return { success: false, error: 'User not found. Please sign up first.' };
          }

          // Check if user exists in database
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();

          if (error || !userData) {
            // Supabase connection failed - try localStorage fallback
            const storedUser = get().user;
            if (storedUser && storedUser.email === email) {
              set({ isAuthenticated: true, ...storedUser, lessonProgress: get().lessonProgress });
              return { success: true, user: storedUser };
            }
            return { success: false, error: 'User not found. Please sign up first.' };
          }

          const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar || '',
            tokens: userData.tokens || 0,
            level: userData.level || 1,
            streak: userData.streak || 0,
            longestStreak: userData.longest_streak || 0,
            gems: userData.gems || 0,
            lastActive: userData.last_active || new Date().toISOString().split('T')[0],
            badges: [],
            completedLessons: [],
            role: userData.role || 'user',
            purchasedAvatars: [AVATAR_IMAGES[0]],
          };

          set({ isAuthenticated: true, user, ...user, lessonProgress: {} });
          await get().loadLessonProgress();
          return { success: true, user };
        } catch (error) {
          console.error('Login error:', error);
          // Network error - try localStorage fallback
          const storedUser = get().user;
          if (storedUser && storedUser.email === email) {
            set({ isAuthenticated: true, ...storedUser, lessonProgress: get().lessonProgress });
            return { success: true, user: storedUser };
          }
          return { success: false, error: 'Login failed. Please try again.' };
        }
      },

      signup: async (data) => {
        try {
          // Check if Supabase is configured
          const { isFallbackMode } = await import('../lib/supabase');
          
          if (isFallbackMode) {
            // Fallback mode - create local user without Supabase
            const newUser: User = {
              id: 'user-' + Date.now(),
              name: data.name,
              email: data.email,
              avatar: AVATAR_IMAGES[0],
              tokens: 0,
              level: 1,
              streak: 1,
              longestStreak: 1,
              gems: 100,
              lastActive: new Date().toISOString().split('T')[0],
              badges: [],
              completedLessons: [],
              role: 'user',
              purchasedAvatars: [AVATAR_IMAGES[0]],
            };

            set({ 
              isAuthenticated: true, 
              user: newUser,
              ...newUser,
              lessonProgress: {} 
            });
            return { success: true };
          }

          // Check if user already exists (use maybeSingle to avoid error when no user found)
          const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('email')
            .eq('email', data.email)
            .maybeSingle();

          if (checkError) {
            console.error('Error checking existing user:', checkError);
          }

          if (existingUser) {
            return { success: false, error: 'Email already registered. Please log in.' };
          }

          // Create new user in database
          const { data: userData, error } = await supabase
            .from('users')
            .insert({
              email: data.email,
              name: data.name,
              avatar: '�‍🔬',
              role: 'user',
              status: 'active',
              gems: 100,
              level: 1,
              streak: 1,
              longest_streak: 1,
              tokens: 0,
              completed_lessons: 0,
              last_active: new Date().toISOString().split('T')[0],
            })
            .select()
            .single();

          if (error) {
            console.error('Signup error:', error);
            return { success: false, error: error.message || 'Failed to create account. Please try again.' };
          }

          const newUser: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar || AVATAR_IMAGES[0],
            tokens: userData.tokens || 0,
            level: userData.level || 1,
            streak: userData.streak || 1,
            longestStreak: userData.longest_streak || 1,
            gems: userData.gems || 100,
            lastActive: userData.last_active || new Date().toISOString().split('T')[0],
            badges: [],
            completedLessons: [],
            role: userData.role || 'user',
            purchasedAvatars: [AVATAR_IMAGES[0]],
          };

          set({ 
            isAuthenticated: true, 
            user: newUser,
            ...newUser,
            lessonProgress: {} 
          });
          return { success: true };
        } catch (error: any) {
          console.error('Signup error:', error);
          // Network error - create local user as fallback
          const newUser: User = {
            id: 'user-' + Date.now(),
            name: data.name,
            email: data.email,
            avatar: AVATAR_IMAGES[0],
            tokens: 0,
            level: 1,
            streak: 1,
            longestStreak: 1,
            gems: 100,
            lastActive: new Date().toISOString().split('T')[0],
            badges: [],
            completedLessons: [],
            role: 'user',
            purchasedAvatars: [AVATAR_IMAGES[0]],
          };
          set({ isAuthenticated: true, user: newUser, ...newUser, lessonProgress: {} });
          return { success: true };
        }
      },

      logout: () => {
        set({ 
          isAuthenticated: false, 
          user: null,
          lessonProgress: {},
          dailyGoals: [],
          catFood: 0,
          coins: 0
        });
      },

      clearStorage: () => {
        set({
          ...defaultUser,
          lessonProgress: {},
          dailyGoals: [],
          catFood: 0,
          coins: 0,
          isAuthenticated: false,
          user: null
        });
      },

          completeLesson: async (levelId: string, stars: number) => {
        const state = get();
        const progress: LessonProgress = {
          levelId,
          completed: true,
          stars,
          tokensEarned: 0,
          lastAttempted: new Date().toISOString(),
        };
        
        // Calculate coins reward
        const baseCoins = 10;
        const bonusCoins = stars === 3 ? 20 : stars === 2 ? 10 : 0;
        const totalCoins = baseCoins + bonusCoins;
        
        // Save to local state
        set({
          lessonProgress: { ...state.lessonProgress, [levelId]: progress },
          completedLessons: [...state.completedLessons, levelId],
          coins: state.coins + totalCoins,
        });
        
        // Save to database if user is logged in
        if (state.user) {
          try {
            await supabase.from('lesson_progress').upsert({
              user_id: state.user.id,
              lesson_id: levelId,
              completed: true,
              score: stars,
              completed_at: new Date().toISOString(),
            });
          } catch (error) {
            console.error('Failed to save lesson progress:', error);
          }
        }
        
        get().updateStreak();
        
        // Check and unlock badges
        return get().checkBadges(stars, totalCoins);
      },

      checkBadges: (lessonStars: number, coinsEarned: number) => {
        const state = get();
        const newlyUnlocked: Badge[] = [];
        const now = new Date().toISOString();
        const currentHour = new Date().getHours();
        
        const hasBadge = (id: string) => state.badges.some(b => b.id === id);
        
        // First Steps - Complete 1 lesson
        if (!hasBadge('first_lesson') && state.completedLessons.length + 1 >= 1) {
          const badge: Badge = { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '👣', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        
        // Quick Learner - Complete 10 lessons
        if (!hasBadge('ten_lessons') && state.completedLessons.length + 1 >= 10) {
          const badge: Badge = { id: 'ten_lessons', name: 'Quick Learner', description: 'Complete 10 lessons', icon: '📚', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        
        // Fifty Lessons - Complete 50 lessons
        if (!hasBadge('fifty_lessons') && state.completedLessons.length + 1 >= 50) {
          const badge: Badge = { id: 'fifty_lessons', name: 'Knowledge Seeker', description: 'Complete 50 lessons', icon: '🎓', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        
        // Streak badges
        if (!hasBadge('streak_3') && state.streak >= 3) {
          const badge: Badge = { id: 'streak_3', name: 'On Fire', description: 'Maintain a 3-day streak', icon: '🔥', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        if (!hasBadge('streak_7') && state.streak >= 7) {
          const badge: Badge = { id: 'streak_7', name: 'Dedicated', description: 'Maintain a 7-day streak', icon: '⭐', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        if (!hasBadge('streak_30') && state.streak >= 30) {
          const badge: Badge = { id: 'streak_30', name: 'Unstoppable', description: 'Maintain a 30-day streak', icon: '🏆', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        
        // Perfectionist - Perfect score
        if (!hasBadge('perfect_score') && lessonStars === 3) {
          const badge: Badge = { id: 'perfect_score', name: 'Perfectionist', description: 'Get a perfect score on any lesson', icon: '💯', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        
        // Coin Collector - 500 coins
        if (!hasBadge('coin_collector') && state.coins + coinsEarned >= 500) {
          const badge: Badge = { id: 'coin_collector', name: 'Coin Collector', description: 'Collect 500 coins', icon: '🪙', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        
        // Early Bird - Complete lesson before 8 AM
        if (!hasBadge('early_bird') && currentHour < 8) {
          const badge: Badge = { id: 'early_bird', name: 'Early Bird', description: 'Complete a lesson before 8 AM', icon: '🌅', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        
        // Night Owl - Complete lesson after 10 PM
        if (!hasBadge('night_owl') && currentHour >= 22) {
          const badge: Badge = { id: 'night_owl', name: 'Night Owl', description: 'Complete a lesson after 10 PM', icon: '🦉', unlockedAt: now };
          newlyUnlocked.push(badge);
        }
        
        // Add newly unlocked badges
        if (newlyUnlocked.length > 0) {
          set({ badges: [...state.badges, ...newlyUnlocked] });
        }
        
        return newlyUnlocked;
      },

      loadLessonProgress: async () => {
        const state = get();
        if (!state.user) return;

        try {
          const { data, error } = await supabase
            .from('lesson_progress')
            .select('*')
            .eq('user_id', state.user.id);

          if (error) throw error;

          if (data) {
            const progressMap: Record<string, LessonProgress> = {};
            const completed: string[] = [];
            
            data.forEach((item: any) => {
              progressMap[item.lesson_id] = {
                levelId: item.lesson_id,
                completed: item.completed,
                stars: item.score || 0,
                tokensEarned: 0,
                lastAttempted: item.completed_at || item.created_at,
              };
              if (item.completed) {
                completed.push(item.lesson_id);
              }
            });

            set({
              lessonProgress: progressMap,
              completedLessons: completed,
            });
          }
        } catch (error) {
          console.error('Failed to load lesson progress:', error);
        }
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

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

      // Track battle victories for magic boxes (returns new victory count, max 4/day)
      recordBattleVictory: () => {
        const today = new Date().toDateString();
        const savedDate = localStorage.getItem('lastBattleVictoryDate');
        const savedCount = parseInt(localStorage.getItem('battleVictoriesToday') || '0');
        
        // Max 4 keys per day
        const MAX_KEYS_PER_DAY = 4;
        
        let newCount;
        if (savedDate !== today) {
          // New day - reset count
          newCount = 1;
          localStorage.setItem('lastBattleVictoryDate', today);
        } else {
          // Same day - increment only if under limit
          if (savedCount >= MAX_KEYS_PER_DAY) {
            // Already at max, don't give more keys
            return savedCount;
          }
          newCount = savedCount + 1;
        }
        
        localStorage.setItem('battleVictoriesToday', newCount.toString());
        return newCount;
      },

      spendCoins: (amount) => {
        const state = get();
        if (state.coins >= amount) {
          set({ coins: state.coins - amount });
          return true;
        }
        return false;
      },

      completeModule: () => {
        // Give 1 cat food for completing a module
        get().addCatFood(1);
      },

      unlockBadge: (badge) => set((state) => ({
        badges: [...state.badges, badge],
      })),

      purchaseAvatar: (avatar, cost) => {
        const state = get();
        if (state.coins >= cost && !state.purchasedAvatars.includes(avatar)) {
          set({
            coins: state.coins - cost,
            purchasedAvatars: [...state.purchasedAvatars, avatar],
          });
          return true;
        }
        return false;
      },

      purchaseBanner: (bannerId, cost) => {
        const state = get();
        if (state.coins >= cost && !state.purchasedBanners.includes(bannerId)) {
          set({
            coins: state.coins - cost,
            purchasedBanners: [...state.purchasedBanners, bannerId],
          });
          return true;
        }
        return false;
      },

      equipBanner: (bannerId) => {
        const state = get();
        if (state.purchasedBanners.includes(bannerId)) {
          set({ equippedBanner: bannerId });
        }
      },

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
