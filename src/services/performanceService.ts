import { supabase, isFallbackMode } from '../lib/supabase';

export interface PerformanceMetrics {
  totalQuestionsAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyRate: number;
  averageTimePerQuestion: number;
  totalTimeSpent: number;
  streakDays: number;
  longestStreak: number;
  lastPracticeDate: string;
  subjectPerformance: Record<string, SubjectPerformance>;
  chapterPerformance: Record<string, ChapterPerformance>;
  weeklyProgress: WeeklyProgress[];
  monthlyProgress: MonthlyProgress[];
}

export interface SubjectPerformance {
  subjectId: string;
  subjectName: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracyRate: number;
  timeSpent: number;
}

export interface ChapterPerformance {
  chapterId: string;
  chapterName: string;
  subjectId: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracyRate: number;
  timeSpent: number;
  lastAttempted: string;
}

export interface WeeklyProgress {
  week: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracyRate: number;
}

export interface MonthlyProgress {
  month: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracyRate: number;
}

export interface MCQSessionResult {
  userId: string;
  sessionId: string;
  subjectId: string;
  chapterIds: string[];
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpent: number;
  questions: QuestionResult[];
  completedAt: string;
}

export interface QuestionResult {
  questionId: string;
  chapterId: string;
  subjectId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  moduleId: string;
  chapterId: string;
  subjectId: string;
  completed: boolean;
  timeSpent: number;
  completionDate: string;
}

// Performance Service
export const performanceService = {
  // Record an MCQ session result
  async recordMCQSession(result: MCQSessionResult): Promise<void> {
    if (isFallbackMode) {
      // Store in localStorage for fallback mode
      const sessions = JSON.parse(localStorage.getItem('mcq_sessions') || '[]');
      sessions.push(result);
      localStorage.setItem('mcq_sessions', JSON.stringify(sessions));
      performanceService._updateLocalMetrics(result.userId, result);
      return;
    }

    try {
      // Insert session
      const { error: sessionError } = await supabase
        .from('mcq_sessions')
        .insert({
          id: result.sessionId,
          user_id: result.userId,
          subject_id: result.subjectId,
          chapter_ids: result.chapterIds,
          total_questions: result.totalQuestions,
          correct_answers: result.correctAnswers,
          incorrect_answers: result.incorrectAnswers,
          time_spent: result.timeSpent,
          completed_at: result.completedAt,
        });

      if (sessionError) throw sessionError;

      // Insert individual question results
      const { error: questionsError } = await supabase
        .from('question_results')
        .insert(
          result.questions.map((q) => ({
            session_id: result.sessionId,
            user_id: result.userId,
            question_id: q.questionId,
            chapter_id: q.chapterId,
            subject_id: q.subjectId,
            selected_answer: q.selectedAnswer,
            correct_answer: q.correctAnswer,
            is_correct: q.isCorrect,
            time_spent: q.timeSpent,
          }))
        );

      if (questionsError) throw questionsError;

      // Update aggregated metrics
      await performanceService._updateUserMetrics(result.userId, result);
    } catch (error) {
      console.error('Failed to record MCQ session:', error);
      // Fallback to local storage
      const sessions = JSON.parse(localStorage.getItem('mcq_sessions') || '[]');
      sessions.push(result);
      localStorage.setItem('mcq_sessions', JSON.stringify(sessions));
    }
  },

  // Record lesson completion
  async recordLessonProgress(progress: LessonProgress): Promise<void> {
    if (isFallbackMode) {
      const progressData = JSON.parse(localStorage.getItem('lesson_progress') || '[]');
      const existingIndex = progressData.findIndex(
        (p: LessonProgress) => p.lessonId === progress.lessonId && p.userId === progress.userId
      );
      if (existingIndex >= 0) {
        progressData[existingIndex] = progress;
      } else {
        progressData.push(progress);
      }
      localStorage.setItem('lesson_progress', JSON.stringify(progressData));
      return;
    }

    try {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: progress.userId,
          lesson_id: progress.lessonId,
          module_id: progress.moduleId,
          chapter_id: progress.chapterId,
          subject_id: progress.subjectId,
          completed: progress.completed,
          time_spent: progress.timeSpent,
          completion_date: progress.completionDate,
        }, {
          onConflict: 'user_id,lesson_id',
        });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to record lesson progress:', error);
      // Fallback to local storage
      const progressData = JSON.parse(localStorage.getItem('lesson_progress') || '[]');
      const existingIndex = progressData.findIndex(
        (p: LessonProgress) => p.lessonId === progress.lessonId && p.userId === progress.userId
      );
      if (existingIndex >= 0) {
        progressData[existingIndex] = progress;
      } else {
        progressData.push(progress);
      }
      localStorage.setItem('lesson_progress', JSON.stringify(progressData));
    }
  },

  // Get user's performance metrics
  async getUserMetrics(userId: string): Promise<PerformanceMetrics | null> {
    if (isFallbackMode) {
      const metrics = localStorage.getItem(`performance_metrics_${userId}`);
      return metrics ? JSON.parse(metrics) : performanceService._calculateDefaultMetrics();
    }

    try {
      const { data, error } = await supabase
        .from('user_performance_metrics')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No data found, return default metrics
          return performanceService._calculateDefaultMetrics();
        }
        throw error;
      }

      return data ? performanceService._mapDbMetricsToPerformance(data) : performanceService._calculateDefaultMetrics();
    } catch (error) {
      console.error('Failed to get user metrics:', error);
      // Fallback to localStorage
      const metrics = localStorage.getItem(`performance_metrics_${userId}`);
      return metrics ? JSON.parse(metrics) : performanceService._calculateDefaultMetrics();
    }
  },

  // Get detailed session history
  async getSessionHistory(userId: string, limit: number = 20): Promise<MCQSessionResult[]> {
    if (isFallbackMode) {
      const sessions = JSON.parse(localStorage.getItem('mcq_sessions') || '[]');
      return sessions
        .filter((s: MCQSessionResult) => s.userId === userId)
        .sort((a: MCQSessionResult, b: MCQSessionResult) => 
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        )
        .slice(0, limit);
    }

    try {
      const { data, error } = await supabase
        .from('mcq_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data?.map(performanceService._mapDbSessionToResult) || [];
    } catch (error) {
      console.error('Failed to get session history:', error);
      // Fallback to localStorage
      const sessions = JSON.parse(localStorage.getItem('mcq_sessions') || '[]');
      return sessions
        .filter((s: MCQSessionResult) => s.userId === userId)
        .sort((a: MCQSessionResult, b: MCQSessionResult) => 
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        )
        .slice(0, limit);
    }
  },

  // Get weak areas (chapters with low accuracy)
  async getWeakAreas(userId: string): Promise<ChapterPerformance[]> {
    const metrics = await this.getUserMetrics(userId);
    if (!metrics) return [];

    return Object.values(metrics.chapterPerformance)
      .filter((c) => c.questionsAttempted >= 5) // Only consider chapters with enough data
      .sort((a, b) => a.accuracyRate - b.accuracyRate)
      .slice(0, 5);
  },

  // Get strong areas (chapters with high accuracy)
  async getStrongAreas(userId: string): Promise<ChapterPerformance[]> {
    const metrics = await this.getUserMetrics(userId);
    if (!metrics) return [];

    return Object.values(metrics.chapterPerformance)
      .filter((c) => c.questionsAttempted >= 5)
      .sort((a, b) => b.accuracyRate - a.accuracyRate)
      .slice(0, 5);
  },

  // Update user metrics after a session (internal method)
  _updateUserMetrics: async (userId: string, result: MCQSessionResult): Promise<void> => {
    const currentMetrics = await this.getUserMetrics(userId);
    if (!currentMetrics) return;

    // Update basic stats
    currentMetrics.totalQuestionsAttempted += result.totalQuestions;
    currentMetrics.correctAnswers += result.correctAnswers;
    currentMetrics.incorrectAnswers += result.incorrectAnswers;
    currentMetrics.accuracyRate = 
      (currentMetrics.correctAnswers / currentMetrics.totalQuestionsAttempted) * 100;
    currentMetrics.totalTimeSpent += result.timeSpent;
    currentMetrics.averageTimePerQuestion = 
      currentMetrics.totalTimeSpent / currentMetrics.totalQuestionsAttempted;
    currentMetrics.lastPracticeDate = new Date().toISOString();

    // Update streak
    const today = new Date().toDateString();
    const lastPractice = new Date(currentMetrics.lastPracticeDate).toDateString();
    if (today !== lastPractice) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastPractice === yesterday.toDateString()) {
        currentMetrics.streakDays += 1;
      } else {
        currentMetrics.streakDays = 1;
      }
      if (currentMetrics.streakDays > currentMetrics.longestStreak) {
        currentMetrics.longestStreak = currentMetrics.streakDays;
      }
    }

    // Update subject performance
    const subjectPerf = currentMetrics.subjectPerformance[result.subjectId] || {
      subjectId: result.subjectId,
      subjectName: result.subjectId.charAt(0).toUpperCase() + result.subjectId.slice(1),
      questionsAttempted: 0,
      correctAnswers: 0,
      accuracyRate: 0,
      timeSpent: 0,
    };
    subjectPerf.questionsAttempted += result.totalQuestions;
    subjectPerf.correctAnswers += result.correctAnswers;
    subjectPerf.accuracyRate = (subjectPerf.correctAnswers / subjectPerf.questionsAttempted) * 100;
    subjectPerf.timeSpent += result.timeSpent;
    currentMetrics.subjectPerformance[result.subjectId] = subjectPerf;

    // Update chapter performance
    result.questions.forEach((q) => {
      const chapterPerf = currentMetrics.chapterPerformance[q.chapterId] || {
        chapterId: q.chapterId,
        chapterName: q.chapterId,
        subjectId: q.subjectId,
        questionsAttempted: 0,
        correctAnswers: 0,
        accuracyRate: 0,
        timeSpent: 0,
        lastAttempted: new Date().toISOString(),
      };
      chapterPerf.questionsAttempted += 1;
      if (q.isCorrect) chapterPerf.correctAnswers += 1;
      chapterPerf.accuracyRate = (chapterPerf.correctAnswers / chapterPerf.questionsAttempted) * 100;
      chapterPerf.timeSpent += q.timeSpent;
      chapterPerf.lastAttempted = new Date().toISOString();
      currentMetrics.chapterPerformance[q.chapterId] = chapterPerf;
    });

    // Update weekly progress
    const weekKey = performanceService._getWeekKey(new Date());
    const weekIndex = currentMetrics.weeklyProgress.findIndex((w) => w.week === weekKey);
    if (weekIndex >= 0) {
      currentMetrics.weeklyProgress[weekIndex].questionsAttempted += result.totalQuestions;
      currentMetrics.weeklyProgress[weekIndex].correctAnswers += result.correctAnswers;
      currentMetrics.weeklyProgress[weekIndex].accuracyRate =
        (currentMetrics.weeklyProgress[weekIndex].correctAnswers / 
         currentMetrics.weeklyProgress[weekIndex].questionsAttempted) * 100;
    } else {
      currentMetrics.weeklyProgress.push({
        week: weekKey,
        questionsAttempted: result.totalQuestions,
        correctAnswers: result.correctAnswers,
        accuracyRate: (result.correctAnswers / result.totalQuestions) * 100,
      });
    }

    // Save to database
    if (isFallbackMode) {
      localStorage.setItem(`performance_metrics_${userId}`, JSON.stringify(currentMetrics));
    } else {
      try {
        const { error } = await supabase
          .from('user_performance_metrics')
          .upsert({
            user_id: userId,
            total_questions_attempted: currentMetrics.totalQuestionsAttempted,
            correct_answers: currentMetrics.correctAnswers,
            incorrect_answers: currentMetrics.incorrectAnswers,
            accuracy_rate: currentMetrics.accuracyRate,
            average_time_per_question: currentMetrics.averageTimePerQuestion,
            total_time_spent: currentMetrics.totalTimeSpent,
            streak_days: currentMetrics.streakDays,
            longest_streak: currentMetrics.longestStreak,
            last_practice_date: currentMetrics.lastPracticeDate,
            subject_performance: currentMetrics.subjectPerformance,
            chapter_performance: currentMetrics.chapterPerformance,
            weekly_progress: currentMetrics.weeklyProgress,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id',
          });

        if (error) throw error;
      } catch (error) {
        console.error('Failed to update metrics:', error);
        localStorage.setItem(`performance_metrics_${userId}`, JSON.stringify(currentMetrics));
      }
    }
  },

  // Update local metrics (fallback mode)
  _updateLocalMetrics: (userId: string, result: MCQSessionResult): void => {
    performanceService._updateUserMetrics(userId, result).catch(console.error);
  },

  // Helper: Calculate default metrics for new users
  _calculateDefaultMetrics: (): PerformanceMetrics => {
    return {
      totalQuestionsAttempted: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      accuracyRate: 0,
      averageTimePerQuestion: 0,
      totalTimeSpent: 0,
      streakDays: 0,
      longestStreak: 0,
      lastPracticeDate: '',
      subjectPerformance: {},
      chapterPerformance: {},
      weeklyProgress: [],
      monthlyProgress: [],
    };
  },

  // Helper: Get week key (e.g., "2024-W01")
  _getWeekKey: (date: Date): string => {
    const year = date.getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);
    const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    const weekNum = Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
    return `${year}-W${weekNum.toString().padStart(2, '0')}`;
  },

  // Helper: Map database metrics to PerformanceMetrics
  _mapDbMetricsToPerformance: (data: any): PerformanceMetrics => {
    return {
      totalQuestionsAttempted: data.total_questions_attempted || 0,
      correctAnswers: data.correct_answers || 0,
      incorrectAnswers: data.incorrect_answers || 0,
      accuracyRate: data.accuracy_rate || 0,
      averageTimePerQuestion: data.average_time_per_question || 0,
      totalTimeSpent: data.total_time_spent || 0,
      streakDays: data.streak_days || 0,
      longestStreak: data.longest_streak || 0,
      lastPracticeDate: data.last_practice_date || '',
      subjectPerformance: data.subject_performance || {},
      chapterPerformance: data.chapter_performance || {},
      weeklyProgress: data.weekly_progress || [],
      monthlyProgress: data.monthly_progress || [],
    };
  },

  // Helper: Map database session to MCQSessionResult
  _mapDbSessionToResult: (data: any): MCQSessionResult => {
    return {
      userId: data.user_id,
      sessionId: data.id,
      subjectId: data.subject_id,
      chapterIds: data.chapter_ids || [],
      totalQuestions: data.total_questions,
      correctAnswers: data.correct_answers,
      incorrectAnswers: data.incorrect_answers,
      timeSpent: data.time_spent,
      questions: [], // Would need separate query to get questions
      completedAt: data.completed_at,
    };
  },
};

// Export singleton instance
export default performanceService;
