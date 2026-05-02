import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { performanceService, PerformanceMetrics, MCQSessionResult } from '../services/performanceService';

export interface SubjectStat {
  subjectId: string;
  subjectName: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
}

export interface ChapterStat {
  chapterId: string;
  chapterName: string;
  subjectId: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  lastPracticed: string;
}

export interface SessionHistory {
  sessionId: string;
  subjectId: string;
  chapterNames: string[];
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  date: string;
}

interface PerformanceState {
  // Metrics
  totalQuestionsAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyRate: number;
  averageTimePerQuestion: number;
  totalTimeSpent: number;
  streakDays: number;
  longestStreak: number;
  lastPracticeDate: string;
  
  // Detailed stats
  subjectStats: SubjectStat[];
  chapterStats: ChapterStat[];
  sessionHistory: SessionHistory[];
  weakAreas: ChapterStat[];
  strongAreas: ChapterStat[];
  
  // Loading state
  isLoading: boolean;
  
  // Actions
  loadPerformance: (userId: string) => Promise<void>;
  recordMCQSession: (result: MCQSessionResult) => Promise<void>;
  getWeeklyProgress: () => { day: string; questions: number; correct: number }[];
  getMonthlyComparison: () => { month: string; accuracy: number }[];
}

const defaultStats = {
  totalQuestionsAttempted: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  accuracyRate: 0,
  averageTimePerQuestion: 0,
  totalTimeSpent: 0,
  streakDays: 0,
  longestStreak: 0,
  lastPracticeDate: '',
  subjectStats: [],
  chapterStats: [],
  sessionHistory: [],
  weakAreas: [],
  strongAreas: [],
  isLoading: false,
};

export const usePerformanceStore = create<PerformanceState>()(
  persist(
    (set, get) => ({
      ...defaultStats,

      loadPerformance: async (userId: string) => {
        set({ isLoading: true });
        try {
          // Get metrics
          const metrics = await performanceService.getUserMetrics(userId);
          
          if (metrics) {
            // Transform subject performance
            const subjectStats: SubjectStat[] = Object.values(metrics.subjectPerformance).map((s) => ({
              subjectId: s.subjectId,
              subjectName: s.subjectName,
              totalQuestions: s.questionsAttempted,
              correctAnswers: s.correctAnswers,
              accuracy: s.accuracyRate,
              timeSpent: s.timeSpent,
            }));

            // Transform chapter performance
            const chapterStats: ChapterStat[] = Object.values(metrics.chapterPerformance).map((c) => ({
              chapterId: c.chapterId,
              chapterName: c.chapterName,
              subjectId: c.subjectId,
              totalQuestions: c.questionsAttempted,
              correctAnswers: c.correctAnswers,
              accuracy: c.accuracyRate,
              lastPracticed: c.lastAttempted,
            }));

            // Get weak and strong areas
            const weakAreas = chapterStats
              .filter((c) => c.totalQuestions >= 5)
              .sort((a, b) => a.accuracy - b.accuracy)
              .slice(0, 5);

            const strongAreas = chapterStats
              .filter((c) => c.totalQuestions >= 5)
              .sort((a, b) => b.accuracy - a.accuracy)
              .slice(0, 5);

            // Get session history
            const sessions = await performanceService.getSessionHistory(userId, 20);
            const sessionHistory: SessionHistory[] = sessions.map((s) => ({
              sessionId: s.sessionId,
              subjectId: s.subjectId,
              chapterNames: s.chapterIds,
              totalQuestions: s.totalQuestions,
              correctAnswers: s.correctAnswers,
              accuracy: (s.correctAnswers / s.totalQuestions) * 100,
              timeSpent: s.timeSpent,
              date: s.completedAt,
            }));

            set({
              totalQuestionsAttempted: metrics.totalQuestionsAttempted,
              correctAnswers: metrics.correctAnswers,
              incorrectAnswers: metrics.incorrectAnswers,
              accuracyRate: metrics.accuracyRate,
              averageTimePerQuestion: metrics.averageTimePerQuestion,
              totalTimeSpent: metrics.totalTimeSpent,
              streakDays: metrics.streakDays,
              longestStreak: metrics.longestStreak,
              lastPracticeDate: metrics.lastPracticeDate,
              subjectStats,
              chapterStats,
              weakAreas,
              strongAreas,
              sessionHistory,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error('Failed to load performance:', error);
          set({ isLoading: false });
        }
      },

      recordMCQSession: async (result: MCQSessionResult) => {
        try {
          await performanceService.recordMCQSession(result);
          // Reload performance after recording
          await get().loadPerformance(result.userId);
        } catch (error) {
          console.error('Failed to record MCQ session:', error);
        }
      },

      getWeeklyProgress: () => {
        const { sessionHistory } = get();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const weekData: { day: string; questions: number; correct: number }[] = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dayName = days[date.getDay()];
          const dateStr = date.toISOString().split('T')[0];

          const daySessions = sessionHistory.filter((s) => s.date.startsWith(dateStr));
          const questions = daySessions.reduce((sum, s) => sum + s.totalQuestions, 0);
          const correct = daySessions.reduce((sum, s) => sum + s.correctAnswers, 0);

          weekData.push({ day: dayName, questions, correct });
        }

        return weekData;
      },

      getMonthlyComparison: () => {
        const { sessionHistory } = get();
        const months: Record<string, { total: number; correct: number }> = {};

        sessionHistory.forEach((session) => {
          const month = session.date.substring(0, 7); // YYYY-MM
          if (!months[month]) {
            months[month] = { total: 0, correct: 0 };
          }
          months[month].total += session.totalQuestions;
          months[month].correct += session.correctAnswers;
        });

        return Object.entries(months)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .slice(-6) // Last 6 months
          .map(([month, data]) => ({
            month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            accuracy: data.total > 0 ? (data.correct / data.total) * 100 : 0,
          }));
      },
    }),
    {
      name: 'performance-storage',
      partialize: (state) => ({
        totalQuestionsAttempted: state.totalQuestionsAttempted,
        correctAnswers: state.correctAnswers,
        incorrectAnswers: state.incorrectAnswers,
        accuracyRate: state.accuracyRate,
        streakDays: state.streakDays,
        longestStreak: state.longestStreak,
        subjectStats: state.subjectStats,
        chapterStats: state.chapterStats,
        weakAreas: state.weakAreas,
        strongAreas: state.strongAreas,
      }),
    }
  )
);
