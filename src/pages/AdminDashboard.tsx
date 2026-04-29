import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Trophy,
  TrendingUp,
  Activity,
  Calendar,
  DollarSign,
  LogOut,
  LayoutDashboard,
  Settings,
  Bell
} from 'lucide-react';
import { useUserStore } from '../store/userStore';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-sm text-green-600 mt-1">{change}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="12,345"
            change="+12% from last month"
            icon={<Users className="w-6 h-6 text-white" />}
            color="bg-blue-500"
          />
          <StatCard
            title="Active Lessons"
            value="8,234"
            change="+8% from last month"
            icon={<BookOpen className="w-6 h-6 text-white" />}
            color="bg-green-500"
          />
          <StatCard
            title="Completed Quizzes"
            value="45,678"
            change="+23% from last month"
            icon={<Trophy className="w-6 h-6 text-white" />}
            color="bg-yellow-500"
          />
          <StatCard
            title="Avg. Score"
            value="78.5%"
            change="+5% from last month"
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="bg-purple-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">User Activity</h2>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 bg-gradient-to-b from-blue-50 to-white rounded-xl flex items-end justify-around p-4">
              {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'Completed Biology Quiz', time: '2 min ago', icon: <Trophy className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-600' },
                { user: 'Jane Smith', action: 'Started Physics Module', time: '5 min ago', icon: <BookOpen className="w-4 h-4" />, color: 'bg-blue-100 text-blue-600' },
                { user: 'Mike Johnson', action: 'Earned 50 points', time: '12 min ago', icon: <DollarSign className="w-4 h-4" />, color: 'bg-green-100 text-green-600' },
                { user: 'Sarah Williams', action: 'Achieved streak x7', time: '25 min ago', icon: <Activity className="w-4 h-4" />, color: 'bg-purple-100 text-purple-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.user}</p>
                    <p className="text-xs text-gray-500">{item.action}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Manage Users', icon: <Users className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
              { label: 'Add Content', icon: <BookOpen className="w-5 h-5" />, color: 'bg-green-50 text-green-600' },
              { label: 'View Reports', icon: <Activity className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
              { label: 'Schedule', icon: <Calendar className="w-5 h-5" />, color: 'bg-yellow-50 text-yellow-600' },
            ].map((action, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
