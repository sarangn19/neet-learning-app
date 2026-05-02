import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Shield,
  Settings,
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
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  AlertTriangle,
  X,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  CreditCard,
  Award,
  BookOpen,
  Clock
} from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useAdminStore, AdminUser } from '../store/adminStore';
import { PageSkeleton } from '../components/Skeleton';

// User Modal Component
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: AdminUser | null;
  onSave: (user: Partial<AdminUser>) => void;
}

function UserModal({ isOpen, onClose, user, onSave }: UserModalProps) {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'superadmin';
    status: 'active' | 'inactive' | 'suspended';
    gems: number;
    level: number;
  }>({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active',
    gems: 100,
    level: 1,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        status: user.status,
        gems: user.gems,
        level: user.level,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active',
        gems: 100,
        level: 1,
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: user?.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {user ? 'Edit User' : 'Create New User'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter email"
            />
          </div>

          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required={!user}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gems</label>
              <input
                type="number"
                value={formData.gems}
                onChange={(e) => setFormData({ ...formData, gems: parseInt(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <input
                type="number"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="1"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
            >
              {user ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Delete Confirmation Modal
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

function DeleteModal({ isOpen, onClose, onConfirm, userName }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6"
      >
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Delete User?</h2>
        <p className="text-gray-500 text-center mb-6">
          Are you sure you want to delete <strong>{userName}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

function StatCard({ title, value, change, icon, color, onClick }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {change}
          </p>
        </div>
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// Toggle Switch Component
function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-14 h-7 rounded-full transition-all relative ${checked ? 'bg-purple-600' : 'bg-gray-200'}`}
    >
      <motion.div
        animate={{ x: checked ? 28 : 2 }}
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
      />
    </button>
  );
}

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const adminStore = useAdminStore();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'admins' | 'system'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Load real users from database on mount
  useEffect(() => {
    const loadData = async () => {
      await adminStore.loadUsers();
      adminStore.refreshStats();
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'superadmin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateUser = (userData: Partial<AdminUser>) => {
    if (selectedUser) {
      adminStore.updateUser(selectedUser.id, userData);
    } else {
      adminStore.createUser(userData as Omit<AdminUser, 'id' | 'joinedAt'>);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      adminStore.deleteUser(selectedUser.id);
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  const handleClearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    adminStore.addSystemLog({
      action: 'All cache cleared',
      time: 'Just now',
      type: 'warning',
      user: user?.email,
    });
    alert('Cache cleared successfully!');
  };

  const handleExportData = () => {
    const data = {
      users: adminStore.users,
      logs: adminStore.systemLogs,
      settings: adminStore.systemSettings,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    adminStore.addSystemLog({
      action: 'Database backup exported',
      time: 'Just now',
      type: 'success',
      user: user?.email,
    });
  };

  const filteredUsers = adminStore.users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const adminUsers = filteredUsers.filter((u) => u.role === 'admin' || u.role === 'superadmin');

  if (isLoading) {
    return <PageSkeleton type="admin" />;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white sticky top-0 z-40">
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
                  <span className="text-white text-sm font-bold">{user.name?.charAt(0).toUpperCase()}</span>
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
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={adminStore.stats?.totalUsers?.toLocaleString() || '0'}
                  change=""
                  icon={<Users className="w-6 h-6 text-white" />}
                  color="bg-blue-500"
                  onClick={() => setActiveTab('users')}
                />
                <StatCard
                  title="Active Admins"
                  value={adminUsers.filter(u => u.status === 'active').length}
                  change="+2 this month"
                  icon={<Shield className="w-6 h-6 text-white" />}
                  color="bg-purple-500"
                  onClick={() => setActiveTab('admins')}
                />
                <StatCard
                  title="System Health"
                  value="99.9%"
                  change="Uptime"
                  icon={<Activity className="w-6 h-6 text-white" />}
                  color="bg-green-500"
                />
                <StatCard
                  title="Revenue"
                  value={`$${adminStore.stats?.totalRevenue?.toLocaleString() || '0'}`}
                  change=""
                  icon={<CreditCard className="w-6 h-6 text-white" />}
                  color="bg-orange-500"
                />
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Lessons</p>
                      <p className="text-xl font-bold text-gray-900">{adminStore.stats?.totalLessons || 0}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-xl font-bold text-gray-900">{adminStore.stats?.completedLessons?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg. Session</p>
                      <p className="text-xl font-bold text-gray-900">12m 34s</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>

              {/* System Logs & Server Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">System Logs</h2>
                    <button
                      onClick={() => adminStore.clearSystemLogs()}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {adminStore.systemLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          log.type === 'success' ? 'bg-green-500' :
                          log.type === 'warning' ? 'bg-yellow-500' :
                          log.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{log.action}</p>
                          <p className="text-xs text-gray-400">{log.time}</p>
                          {expandedLogId === log.id && log.user && (
                            <p className="text-xs text-gray-500 mt-1">By: {log.user}</p>
                          )}
                        </div>
                        {log.user && (
                          expandedLogId === log.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </motion.div>
                    ))}
                    {adminStore.systemLogs.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No logs available</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Server Status</h2>
                  <div className="space-y-4">
                    {adminStore.serverStatus.map((server, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            server.status === 'operational' ? 'bg-green-500' :
                            server.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="font-medium text-gray-700">{server.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-sm ${
                            server.status === 'operational' ? 'text-green-600' :
                            server.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {server.status === 'operational' ? 'Operational' : server.status}
                          </span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${server.load}%` }}
                              className={`h-full rounded-full ${
                                server.load > 80 ? 'bg-red-500' :
                                server.load > 60 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-10">{server.load}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
                    <button
                      onClick={() => adminStore.refreshStats()}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(null);
                        setShowUserModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
                    >
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((u) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <img src={u.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{u.name}</p>
                              <p className="text-sm text-gray-500">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            u.role === 'superadmin' ? 'bg-purple-100 text-purple-700' :
                            u.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => u.status === 'active' ? adminStore.suspendUser(u.id) : adminStore.activateUser(u.id)}
                            className={`flex items-center gap-1.5 ${
                              u.status === 'active' ? 'text-green-600' :
                              u.status === 'inactive' ? 'text-gray-500' :
                              'text-red-600'
                            }`}
                          >
                            {u.status === 'active' ? <CheckCircle className="w-4 h-4" /> :
                             u.status === 'suspended' ? <XCircle className="w-4 h-4" /> :
                             <div className="w-4 h-4 rounded-full border-2 border-gray-400" />}
                            <span className="capitalize">{u.status}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Lvl {u.level}</span>
                            <span className="text-sm text-purple-600">{u.gems} 💎</span>
                          </div>
                          <p className="text-xs text-gray-400">{u.completedLessons} lessons</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <p>{u.joinedAt}</p>
                          <p className="text-xs text-gray-400">{u.lastActive}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                                setShowUserModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'admins' && (
            <motion.div
              key="admins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Admin Management</h2>
                    <p className="text-gray-500 mt-1">Manage admin users and their permissions</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedUser(null);
                      setShowUserModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4" />
                    Create Admin
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {adminUsers.map((admin) => (
                    <motion.div
                      key={admin.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <img src={admin.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{admin.name}</h3>
                          <p className="text-sm text-gray-500">{admin.email}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              admin.role === 'superadmin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {admin.role}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              admin.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {admin.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => {
                            setSelectedUser(admin);
                            setShowUserModal(true);
                          }}
                          className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(admin);
                            setShowDeleteModal(true);
                          }}
                          className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div>
                      <span className="text-gray-700 font-medium">Enable Registrations</span>
                      <p className="text-xs text-gray-400">Allow new user signups</p>
                    </div>
                    <ToggleSwitch
                      checked={adminStore.systemSettings.enableRegistrations}
                      onChange={() => adminStore.updateSystemSetting('enableRegistrations', !adminStore.systemSettings.enableRegistrations)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div>
                      <span className="text-gray-700 font-medium">Email Notifications</span>
                      <p className="text-xs text-gray-400">Send email alerts to users</p>
                    </div>
                    <ToggleSwitch
                      checked={adminStore.systemSettings.emailNotifications}
                      onChange={() => adminStore.updateSystemSetting('emailNotifications', !adminStore.systemSettings.emailNotifications)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div>
                      <span className="text-gray-700 font-medium">Maintenance Mode</span>
                      <p className="text-xs text-gray-400">Put site in maintenance mode</p>
                    </div>
                    <ToggleSwitch
                      checked={adminStore.systemSettings.maintenanceMode}
                      onChange={() => adminStore.updateSystemSetting('maintenanceMode', !adminStore.systemSettings.maintenanceMode)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div>
                      <span className="text-gray-700 font-medium">Debug Logging</span>
                      <p className="text-xs text-gray-400">Enable detailed error logs</p>
                    </div>
                    <ToggleSwitch
                      checked={adminStore.systemSettings.debugLogging}
                      onChange={() => adminStore.updateSystemSetting('debugLogging', !adminStore.systemSettings.debugLogging)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleClearCache}
                    className="w-full p-4 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 text-left transition-all flex items-center gap-3"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Clear all cache</p>
                      <p className="text-xs text-red-400">Clear localStorage and sessionStorage</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Reset all user passwords to "password123"?')) {
                        adminStore.addSystemLog({
                          action: 'All passwords reset',
                          time: 'Just now',
                          type: 'warning',
                          user: user?.email,
                        });
                        alert('All passwords have been reset!');
                      }
                    }}
                    className="w-full p-4 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 text-left transition-all flex items-center gap-3"
                  >
                    <Shield className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Reset user passwords</p>
                      <p className="text-xs text-red-400">Reset all passwords to default</p>
                    </div>
                  </button>

                  <button
                    onClick={handleExportData}
                    className="w-full p-4 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 text-left transition-all flex items-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Export database backup</p>
                      <p className="text-xs text-red-400">Download all data as JSON</p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={selectedUser}
        onSave={handleCreateUser}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        userName={selectedUser?.name || ''}
      />
    </div>
  );
}
