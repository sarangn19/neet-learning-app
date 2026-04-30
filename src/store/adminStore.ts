import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userService, logService } from '../services/database';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
  lastActive: string;
  avatar?: string;
  gems: number;
  level: number;
  completedLessons: number;
}

export interface SystemLog {
  id: string;
  action: string;
  time: string;
  type: 'success' | 'warning' | 'error' | 'info';
  user?: string;
}

export interface ServerStatus {
  name: string;
  status: 'operational' | 'warning' | 'down';
  load: number;
  uptime: string;
}

interface AdminState {
  // Users
  users: AdminUser[];
  currentUser: AdminUser | null;
  
  // System
  systemLogs: SystemLog[];
  serverStatus: ServerStatus[];
  systemSettings: {
    enableRegistrations: boolean;
    emailNotifications: boolean;
    maintenanceMode: boolean;
    debugLogging: boolean;
  };
  
  // Stats
  stats: {
    totalUsers: number;
    activeUsers: number;
    newUsersToday: number;
    totalLessons: number;
    completedLessons: number;
    totalRevenue: number;
  };

  // Actions
  createUser: (user: Omit<AdminUser, 'id' | 'joinedAt'>) => void;
  updateUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  suspendUser: (id: string) => void;
  activateUser: (id: string) => void;
  
  addSystemLog: (log: Omit<SystemLog, 'id'>) => void;
  clearSystemLogs: () => void;
  
  updateSystemSetting: (key: keyof AdminState['systemSettings'], value: boolean) => void;
  
  refreshStats: () => void;
  
  loadUsers: () => Promise<void>;
}

const generateId = () => {
  // Generate UUID v4 format
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const initialUsers: AdminUser[] = [];

const initialLogs: SystemLog[] = [];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      currentUser: null,
      systemLogs: initialLogs,
      serverStatus: [],
      systemSettings: {
        enableRegistrations: true,
        emailNotifications: true,
        maintenanceMode: false,
        debugLogging: false,
      },
      stats: {
        totalUsers: 0,
        activeUsers: 0,
        newUsersToday: 0,
        totalLessons: 0,
        completedLessons: 0,
        totalRevenue: 0,
      },

      createUser: async (userData) => {
        try {
          const newUser = await userService.createUser(userData);
          set((state) => ({
            users: [...state.users, newUser],
            systemLogs: [
              { id: generateId(), action: `User created: ${newUser.name}`, time: 'Just now', type: 'success', user: newUser.email },
              ...state.systemLogs.slice(0, 49),
            ],
          }));
          get().refreshStats();
        } catch (error) {
          console.error('Failed to create user:', error);
          // Fallback to local state only
          const newUser: AdminUser = {
            ...userData,
            id: generateId(),
            joinedAt: new Date().toISOString().split('T')[0],
            lastActive: 'Just now',
          };
          set((state) => ({
            users: [...state.users, newUser],
            systemLogs: [
              { id: generateId(), action: `User created (local): ${newUser.name}`, time: 'Just now', type: 'warning', user: newUser.email },
              ...state.systemLogs.slice(0, 49),
            ],
          }));
          get().refreshStats();
        }
      },

      updateUser: async (id, updates) => {
        try {
          await userService.updateUser(id, updates);
          set((state) => ({
            users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
            systemLogs: [
              { id: generateId(), action: `User updated: ${updates.name || id}`, time: 'Just now', type: 'info' },
              ...state.systemLogs.slice(0, 49),
            ],
          }));
        } catch (error) {
          console.error('Failed to update user:', error);
          // Still update local state
          set((state) => ({
            users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
            systemLogs: [
              { id: generateId(), action: `User updated (local): ${updates.name || id}`, time: 'Just now', type: 'warning' },
              ...state.systemLogs.slice(0, 49),
            ],
          }));
        }
      },

      deleteUser: async (id) => {
        const user = get().users.find((u) => u.id === id);
        try {
          await userService.deleteUser(id);
          set((state) => ({
            users: state.users.filter((u) => u.id !== id),
            systemLogs: [
              { id: generateId(), action: `User deleted: ${user?.name || id}`, time: 'Just now', type: 'warning' },
              ...state.systemLogs.slice(0, 49),
            ],
          }));
          get().refreshStats();
        } catch (error) {
          console.error('Failed to delete user:', error);
          // Still remove from local state
          set((state) => ({
            users: state.users.filter((u) => u.id !== id),
            systemLogs: [
              { id: generateId(), action: `User deleted (local): ${user?.name || id}`, time: 'Just now', type: 'warning' },
              ...state.systemLogs.slice(0, 49),
            ],
          }));
          get().refreshStats();
        }
      },

      suspendUser: (id) => {
        const user = get().users.find((u) => u.id === id);
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, status: 'suspended' } : u)),
          systemLogs: [
            { id: generateId(), action: `User suspended: ${user?.name || id}`, time: 'Just now', type: 'warning', user: user?.email },
            ...state.systemLogs.slice(0, 49),
          ],
        }));
      },

      activateUser: (id) => {
        const user = get().users.find((u) => u.id === id);
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, status: 'active' } : u)),
          systemLogs: [
            { id: generateId(), action: `User activated: ${user?.name || id}`, time: 'Just now', type: 'success', user: user?.email },
            ...state.systemLogs.slice(0, 49),
          ],
        }));
      },

      addSystemLog: async (log) => {
        set((state) => ({
          systemLogs: [{ ...log, id: generateId() }, ...state.systemLogs.slice(0, 99)],
        }));
        try {
          await logService.addLog(log);
        } catch (error) {
          console.error('Failed to save log to database:', error);
        }
      },

      loadUsers: async () => {
        try {
          const users = await userService.getAllUsers();
          set({ users });
          get().refreshStats();
        } catch (error) {
          console.error('Failed to load users from database:', error);
        }
      },

      clearSystemLogs: () => {
        set({ systemLogs: [] });
      },

      updateSystemSetting: (key, value) => {
        set((state) => ({
          systemSettings: { ...state.systemSettings, [key]: value },
          systemLogs: [
            { id: generateId(), action: `Setting changed: ${key} = ${value}`, time: 'Just now', type: 'info' },
            ...state.systemLogs.slice(0, 49),
          ],
        }));
      },

      refreshStats: () => {
        const state = get();
        set({
          stats: {
            totalUsers: state.users.length,
            activeUsers: state.users.filter((u) => u.status === 'active').length,
            newUsersToday: Math.floor(Math.random() * 10) + 5,
            totalLessons: 156,
            completedLessons: state.users.reduce((acc, u) => acc + u.completedLessons, 0),
            totalRevenue: state.users.length * 10 + Math.floor(Math.random() * 1000),
          },
        });
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);
