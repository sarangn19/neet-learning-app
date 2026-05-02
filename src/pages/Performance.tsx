import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Target,
  TrendingUp,
  Clock,
  Flame,
  Award,
  BookOpen,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Calendar,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { usePerformanceStore } from '../store/performanceStore';
import { useUserStore } from '../store/userStore';

// Stat Card Component
const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
  delay,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${color}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
      <div className={`p-2 rounded-xl ${color.replace('border-', 'bg-').replace('500', '100')}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

// Progress Bar Component
const ProgressBar = ({ label, value, total, color = 'bg-amber-500' }: { label: string; value: number; total: number; color?: string }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{value}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

// Weekly Progress Chart
const WeeklyChart = ({ data }: { data: { day: string; questions: number; correct: number }[] }) => {
  const maxQuestions = Math.max(...data.map((d) => d.questions), 1);

  return (
    <div className="flex items-end justify-between h-32 gap-2">
      {data.map((day, i) => {
        const height = day.questions > 0 ? (day.questions / maxQuestions) * 100 : 5;
        const accuracy = day.questions > 0 ? (day.correct / day.questions) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`w-full max-w-8 rounded-t-lg ${accuracy >= 70 ? 'bg-green-400' : accuracy >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                style={{ minHeight: day.questions > 0 ? '4px' : '4px' }}
              />
            </div>
            <span className="text-xs text-gray-500 mt-2">{day.day}</span>
          </div>
        );
      })}
    </div>
  );
};

export default function Performance() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const {
    totalQuestionsAttempted,
    correctAnswers,
    accuracyRate,
    streakDays,
    longestStreak,
    averageTimePerQuestion,
    subjectStats,
    chapterStats,
    weakAreas,
    strongAreas,
    sessionHistory,
    isLoading,
    loadPerformance,
    getWeeklyProgress,
  } = usePerformanceStore();

  const [weeklyData, setWeeklyData] = useState<{ day: string; questions: number; correct: number }[]>([]);

  useEffect(() => {
    if (user?.id) {
      loadPerformance(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    setWeeklyData(getWeeklyProgress());
  }, [sessionHistory]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-6"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance</h1>
            <p className="text-sm text-gray-500">Track your learning progress</p>
          </div>
        </div>
      </motion.div>

      <div className="px-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Accuracy"
            value={`${accuracyRate.toFixed(1)}%`}
            subtitle={`${correctAnswers} correct of ${totalQuestionsAttempted}`}
            icon={<Target className="w-5 h-5 text-blue-600" />}
            color="border-blue-500"
            delay={0.1}
          />
          <StatCard
            title="Current Streak"
            value={streakDays}
            subtitle={`Best: ${longestStreak} days`}
            icon={<Flame className="w-5 h-5 text-orange-600" />}
            color="border-orange-500"
            delay={0.2}
          />
          <StatCard
            title="Questions"
            value={totalQuestionsAttempted}
            subtitle="Total attempted"
            icon={<BookOpen className="w-5 h-5 text-purple-600" />}
            color="border-purple-500"
            delay={0.3}
          />
          <StatCard
            title="Avg Time"
            value={averageTimePerQuestion > 0 ? `${averageTimePerQuestion.toFixed(1)}s` : '-'}
            subtitle="Per question"
            icon={<Clock className="w-5 h-5 text-green-600" />}
            color="border-green-500"
            delay={0.4}
          />
        </div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            <h2 className="font-semibold text-gray-900">Weekly Activity</h2>
          </div>
          {weeklyData.length > 0 && weeklyData.some((d) => d.questions > 0) ? (
            <WeeklyChart data={weeklyData} />
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No activity this week. Start practicing!</p>
            </div>
          )}
        </motion.div>

        {/* Subject Performance */}
        {subjectStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h2 className="font-semibold text-gray-900">Subject Performance</h2>
            </div>
            <div className="space-y-3">
              {subjectStats.map((subject) => (
                <ProgressBar
                  key={subject.subjectId}
                  label={subject.subjectName}
                  value={subject.correctAnswers}
                  total={subject.totalQuestions}
                  color={
                    subject.accuracy >= 70
                      ? 'bg-green-500'
                      : subject.accuracy >= 50
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Weak Areas */}
        {weakAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-red-400"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h2 className="font-semibold text-gray-900">Areas to Improve</h2>
            </div>
            <div className="space-y-3">
              {weakAreas.map((area) => (
                <div
                  key={area.chapterId}
                  onClick={() => navigate(`/mcqs/${area.subjectId}`)}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-xl cursor-pointer hover:bg-red-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{area.chapterName}</p>
                    <p className="text-xs text-gray-500">{area.totalQuestions} questions attempted</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">{area.accuracy.toFixed(0)}%</p>
                    <p className="text-xs text-gray-500">accuracy</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">Tap to practice these chapters</p>
          </motion.div>
        )}

        {/* Strong Areas */}
        {strongAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-400"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="font-semibold text-gray-900">Strong Areas</h2>
            </div>
            <div className="space-y-3">
              {strongAreas.map((area) => (
                <div
                  key={area.chapterId}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{area.chapterName}</p>
                    <p className="text-xs text-gray-500">{area.totalQuestions} questions attempted</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{area.accuracy.toFixed(0)}%</p>
                    <p className="text-xs text-gray-500">accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Sessions */}
        {sessionHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-amber-600" />
              <h2 className="font-semibold text-gray-900">Recent Sessions</h2>
            </div>
            <div className="space-y-3">
              {sessionHistory.slice(0, 5).map((session, i) => (
                <div key={session.sessionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {session.subjectId.charAt(0).toUpperCase() + session.subjectId.slice(1)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.correctAnswers}/{session.totalQuestions} correct • {formatTime(session.timeSpent)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        session.accuracy >= 70 ? 'text-green-600' : session.accuracy >= 50 ? 'text-amber-600' : 'text-red-600'
                      }`}
                    >
                      {session.accuracy.toFixed(0)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {totalQuestionsAttempted === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Practice Data Yet</h3>
            <p className="text-gray-500 mb-4">Start practicing to see your performance analytics</p>
            <button
              onClick={() => navigate('/mcqs')}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
            >
              Start Practicing
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
