import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Shield,
  Settings,
  Database,
  Activity,
  LogOut,
  LayoutDashboard,
  Crown,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useUserStore } from '../store/userStore';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
  lastActive: string;
}

const mockUsers: AdminUser[] = [
  { id: '1', name: 'John Admin', email: 'john@example.com', role: 'admin', status: 'active', joinedAt: '2024-01-15', lastActive: '2 hours ago' },
  { id: '2', name: 'Sarah Super', email: 'sarah@example.com', role: 'superadmin', status: 'active', joinedAt: '2024-01-10', lastActive: '5 min ago' },
  { id: '3', name: 'Mike User', email: 'mike@example.com', role: 'user', status: 'active', joinedAt: '2024-02-20', lastActive: '1 day ago' },
  { id: '4', name: 'Jane Doe', email: 'jane@example.com', role: 'user', status: 'inactive', joinedAt: '2024-03-05', lastActive: '3 days ago' },
  { id: '5', name: 'Tom Wilson', email: 'tom@example.com', role: 'user', status: 'suspended', joinedAt: '2024-02-10', lastActive: '1 week ago' },
];

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

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'admins' | 'system'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'superadmin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SuperAdmin</h1>
                <p className="text-xs text-white/70">System Control Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'users', label: 'All Users', icon: Users },
              { id: 'admins', label: 'Admins', icon: Shield },
              { id: 'system', label: 'System', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Users"
                value="45,231"
                change="+18% this month"
                icon={<Users className="w-6 h-6 text-white" />}
                color="bg-blue-500"
              />
              <StatCard
                title="Active Admins"
                value="12"
                change="+2 this month"
                icon={<Shield className="w-6 h-6 text-white" />}
                color="bg-purple-500"
              />
              <StatCard
                title="System Health"
                value="99.9%"
                change="Uptime"
                icon={<Activity className="w-6 h-6 text-white" />}
                color="bg-green-500"
              />
              <StatCard
                title="Database Size"
                value="2.4 GB"
                change="+120 MB this week"
                icon={<Database className="w-6 h-6 text-white" />}
                color="bg-orange-500"
              />
            </div>

            {/* Recent Activity & Server Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Logs</h2>
                <div className="space-y-3">
                  {[
                    { action: 'Database backup completed', time: '2 min ago', type: 'success' },
                    { action: 'New admin user created: John', time: '15 min ago', type: 'info' },
                    { action: 'User account suspended: spam_user', time: '1 hour ago', type: 'warning' },
                    { action: 'System update deployed v2.4.1', time: '3 hours ago', type: 'success' },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        log.type === 'success' ? 'bg-green-500' :
                        log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <span className="flex-1 text-sm text-gray-700">{log.action}</span>
                      <span className="text-xs text-gray-400">{log.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Server Status</h2>
                <div className="space-y-4">
                  {[
                    { name: 'API Server', status: 'Operational', load: '45%', color: 'bg-green-500' },
                    { name: 'Database', status: 'Operational', load: '62%', color: 'bg-green-500' },
                    { name: 'Cache', status: 'Operational', load: '38%', color: 'bg-green-500' },
                    { name: 'CDN', status: 'Warning', load: '78%', color: 'bg-yellow-500' },
                  ].map((server, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${server.color}`} />
                        <span className="font-medium text-gray-700">{server.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{server.status}</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${server.color}`} style={{ width: server.load }} />
                        </div>
                        <span className="text-xs text-gray-400 w-10">{server.load}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            {/* Search & Filter */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
                    <Plus className="w-4 h-4" />
                    Add User
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'superadmin' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 ${
                          user.status === 'active' ? 'text-green-600' :
                          user.status === 'inactive' ? 'text-gray-500' :
                          'text-red-600'
                        }`}>
                          {user.status === 'active' ? <CheckCircle className="w-4 h-4" /> :
                           user.status === 'suspended' ? <XCircle className="w-4 h-4" /> :
                           <div className="w-4 h-4 rounded-full border-2 border-gray-400" />}
                          <span className="capitalize">{user.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.joinedAt}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'admins' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Admin Management</h2>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
                <Plus className="w-4 h-4" />
                Create Admin
              </button>
            </div>
            <p className="text-gray-500">Manage admin users and their permissions here.</p>
          </motion.div>
        )}

        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
              <div className="space-y-4">
                {['Enable registrations', 'Email notifications', 'Maintenance mode', 'Debug logging'].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <span className="text-gray-700">{setting}</span>
                    <div className={`w-12 h-6 rounded-full ${i % 2 === 0 ? 'bg-purple-600' : 'bg-gray-200'} relative cursor-pointer`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${i % 2 === 0 ? 'left-7' : 'left-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <button className="w-full p-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-left">
                  Clear all cache
                </button>
                <button className="w-full p-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-left">
                  Reset user passwords
                </button>
                <button className="w-full p-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-left">
                  Export database backup
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
