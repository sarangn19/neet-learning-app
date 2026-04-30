export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar: string | null;
          role: 'user' | 'admin' | 'superadmin';
          status: 'active' | 'inactive' | 'suspended';
          gems: number;
          level: number;
          streak: number;
          longest_streak: number;
          tokens: number;
          completed_lessons: number;
          last_active: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar?: string | null;
          role?: 'user' | 'admin' | 'superadmin';
          status?: 'active' | 'inactive' | 'suspended';
          gems?: number;
          level?: number;
          streak?: number;
          longest_streak?: number;
          tokens?: number;
          completed_lessons?: number;
          last_active?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar?: string | null;
          role?: 'user' | 'admin' | 'superadmin';
          status?: 'active' | 'inactive' | 'suspended';
          gems?: number;
          level?: number;
          streak?: number;
          longest_streak?: number;
          tokens?: number;
          completed_lessons?: number;
          last_active?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          score: number | null;
          time_spent: number;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          score?: number | null;
          time_spent?: number;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          completed?: boolean;
          score?: number | null;
          time_spent?: number;
          completed_at?: string | null;
          created_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          icon: string;
          earned_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          icon: string;
          earned_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          icon?: string;
          earned_at?: string;
        };
      };
      system_logs: {
        Row: {
          id: string;
          action: string;
          type: 'success' | 'warning' | 'error' | 'info';
          user_id: string | null;
          user_email: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          action: string;
          type?: 'success' | 'warning' | 'error' | 'info';
          user_id?: string | null;
          user_email?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          action?: string;
          type?: 'success' | 'warning' | 'error' | 'info';
          user_id?: string | null;
          user_email?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}
