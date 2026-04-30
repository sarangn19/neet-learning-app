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
      battle_matches: {
        Row: {
          id: string;
          player1_id: string;
          player2_id: string | null;
          player1_name: string;
          player2_name: string | null;
          player1_avatar: string | null;
          player2_avatar: string | null;
          player1_score: number;
          player2_score: number;
          player1_answers: any;
          player2_answers: any;
          status: 'waiting' | 'active' | 'completed' | 'cancelled';
          subject: 'physics' | 'chemistry' | 'biology' | 'mixed';
          grade: string;
          questions: any;
          current_question: number;
          winner_id: string | null;
          player1_ready: boolean;
          player2_ready: boolean;
          created_at: string;
          started_at: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          player1_id: string;
          player2_id?: string | null;
          player1_name: string;
          player2_name?: string | null;
          player1_avatar?: string | null;
          player2_avatar?: string | null;
          player1_score?: number;
          player2_score?: number;
          player1_answers?: any;
          player2_answers?: any;
          status?: 'waiting' | 'active' | 'completed' | 'cancelled';
          subject?: 'physics' | 'chemistry' | 'biology' | 'mixed';
          grade?: string;
          questions: any;
          current_question?: number;
          winner_id?: string | null;
          player1_ready?: boolean;
          player2_ready?: boolean;
          created_at?: string;
          started_at?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          player1_id?: string;
          player2_id?: string | null;
          player1_name?: string;
          player2_name?: string | null;
          player1_avatar?: string | null;
          player2_avatar?: string | null;
          player1_score?: number;
          player2_score?: number;
          player1_answers?: any;
          player2_answers?: any;
          status?: 'waiting' | 'active' | 'completed' | 'cancelled';
          subject?: 'physics' | 'chemistry' | 'biology' | 'mixed';
          grade?: string;
          questions?: any;
          current_question?: number;
          winner_id?: string | null;
          player1_ready?: boolean;
          player2_ready?: boolean;
          created_at?: string;
          started_at?: string | null;
          completed_at?: string | null;
        };
      };
      battle_history: {
        Row: {
          id: string;
          match_id: string;
          player1_id: string;
          player2_id: string;
          player1_score: number | null;
          player2_score: number | null;
          winner_id: string | null;
          player1_coins_earned: number;
          player2_coins_earned: number;
          subject: string | null;
          duration_seconds: number | null;
          played_at: string;
        };
        Insert: {
          id?: string;
          match_id: string;
          player1_id: string;
          player2_id: string;
          player1_score?: number | null;
          player2_score?: number | null;
          winner_id?: string | null;
          player1_coins_earned?: number;
          player2_coins_earned?: number;
          subject?: string | null;
          duration_seconds?: number | null;
          played_at?: string;
        };
        Update: {
          id?: string;
          match_id?: string;
          player1_id?: string;
          player2_id?: string;
          player1_score?: number | null;
          player2_score?: number | null;
          winner_id?: string | null;
          player1_coins_earned?: number;
          player2_coins_earned?: number;
          subject?: string | null;
          duration_seconds?: number | null;
          played_at?: string;
        };
      };
      matchmaking_queue: {
        Row: {
          id: string;
          user_id: string;
          user_name: string;
          user_avatar: string | null;
          subject: 'physics' | 'chemistry' | 'biology' | 'mixed';
          grade: string;
          skill_rating: number;
          joined_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_name: string;
          user_avatar?: string | null;
          subject?: 'physics' | 'chemistry' | 'biology' | 'mixed';
          grade?: string;
          skill_rating?: number;
          joined_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          user_name?: string;
          user_avatar?: string | null;
          subject?: 'physics' | 'chemistry' | 'biology' | 'mixed';
          grade?: string;
          skill_rating?: number;
          joined_at?: string;
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
