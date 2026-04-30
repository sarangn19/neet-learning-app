import { supabase, isFallbackMode } from '../lib/supabase';
import type { AdminUser, SystemLog } from '../store/adminStore';

// Helper to map database user to AdminUser format
function mapDbUserToAdminUser(dbUser: any): AdminUser {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
    status: dbUser.status,
    avatar: dbUser.avatar,
    gems: dbUser.gems,
    level: dbUser.level,
    completedLessons: dbUser.completed_lessons,
    joinedAt: dbUser.created_at?.split('T')[0] || '',
    lastActive: dbUser.last_active || 'Just now',
  };
}

// User Service
export const userService = {
  async getAllUsers(): Promise<AdminUser[]> {
    if (isFallbackMode) {
      const stored = localStorage.getItem('admin-storage');
      if (stored) {
        const data = JSON.parse(stored);
        return data.state?.users || [];
      }
      return [];
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data?.map(mapDbUserToAdminUser) || [];
  },

  async createUser(user: Omit<AdminUser, 'id' | 'joinedAt'>): Promise<AdminUser> {
    if (isFallbackMode) {
      const stored = localStorage.getItem('admin-storage');
      const data = stored ? JSON.parse(stored) : { state: { users: [] } };
      const newUser: AdminUser = {
        ...user,
        id: Math.random().toString(36).substr(2, 9),
        joinedAt: new Date().toISOString().split('T')[0],
        lastActive: 'Just now',
      };
      data.state.users.push(newUser);
      localStorage.setItem('admin-storage', JSON.stringify(data));
      return newUser;
    }

    const { data, error } = await supabase
      .from('users')
      .insert({
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        gems: user.gems,
        level: user.level,
        completed_lessons: user.completedLessons,
        avatar: user.avatar,
      })
      .select()
      .single();

    if (error) throw error;
    return mapDbUserToAdminUser(data);
  },

  async updateUser(id: string, updates: Partial<AdminUser>): Promise<void> {
    if (isFallbackMode) {
      const stored = localStorage.getItem('admin-storage');
      if (stored) {
        const data = JSON.parse(stored);
        const idx = data.state.users.findIndex((u: AdminUser) => u.id === id);
        if (idx !== -1) {
          data.state.users[idx] = { ...data.state.users[idx], ...updates };
          localStorage.setItem('admin-storage', JSON.stringify(data));
        }
      }
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({
        name: updates.name,
        email: updates.email,
        role: updates.role,
        status: updates.status,
        gems: updates.gems,
        level: updates.level,
        completed_lessons: updates.completedLessons,
      })
      .eq('id', id);

    if (error) throw error;
  },

  async deleteUser(id: string): Promise<void> {
    if (isFallbackMode) {
      const stored = localStorage.getItem('admin-storage');
      if (stored) {
        const data = JSON.parse(stored);
        data.state.users = data.state.users.filter((u: AdminUser) => u.id !== id);
        localStorage.setItem('admin-storage', JSON.stringify(data));
      }
      return;
    }

    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
  },
};

// System Logs Service
export const logService = {
  async getAllLogs(): Promise<SystemLog[]> {
    if (isFallbackMode) {
      const stored = localStorage.getItem('admin-storage');
      if (stored) {
        const data = JSON.parse(stored);
        return data.state?.systemLogs || [];
      }
      return [];
    }

    const { data, error } = await supabase
      .from('system_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data?.map((log: any) => ({
      id: log.id,
      action: log.action,
      type: log.type,
      user: log.user_email,
      time: new Date(log.created_at).toLocaleString(),
    })) || [];
  },

  async addLog(log: Omit<SystemLog, 'id'>): Promise<void> {
    if (isFallbackMode) return;

    const { error } = await supabase.from('system_logs').insert({
      action: log.action,
      type: log.type,
      user_email: log.user,
    });

    if (error) throw error;
  },
};
