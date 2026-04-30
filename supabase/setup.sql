-- Supabase Database Setup for NEET Learning App
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  gems INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  tokens INTEGER DEFAULT 0,
  completed_lessons INTEGER DEFAULT 0,
  last_active TEXT DEFAULT 'Just now',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lesson Progress Table
CREATE TABLE lesson_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  time_spent INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Badges Table
CREATE TABLE badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Logs Table
CREATE TABLE system_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  action TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('success', 'warning', 'error', 'info')),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Battle Matches Table (Real-time 1v1 battles)
CREATE TABLE battle_matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  player1_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  player2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  player1_name TEXT NOT NULL,
  player2_name TEXT,
  player1_avatar TEXT DEFAULT '👨‍🔬',
  player2_avatar TEXT DEFAULT '👨‍🔬',
  player1_score INTEGER DEFAULT 0,
  player2_score INTEGER DEFAULT 0,
  player1_answers JSONB DEFAULT '[]',
  player2_answers JSONB DEFAULT '[]',
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed', 'cancelled')),
  subject TEXT DEFAULT 'mixed' CHECK (subject IN ('physics', 'chemistry', 'biology', 'mixed')),
  grade TEXT DEFAULT 'plus_one',
  questions JSONB NOT NULL,
  current_question INTEGER DEFAULT 0,
  winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  player1_ready BOOLEAN DEFAULT FALSE,
  player2_ready BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Battle Match History Table
CREATE TABLE battle_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES battle_matches(id) ON DELETE CASCADE,
  player1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  player2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  player1_score INTEGER,
  player2_score INTEGER,
  winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  player1_coins_earned INTEGER DEFAULT 0,
  player2_coins_earned INTEGER DEFAULT 0,
  subject TEXT,
  duration_seconds INTEGER,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matchmaking Queue Table
CREATE TABLE matchmaking_queue (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  user_name TEXT NOT NULL,
  user_avatar TEXT DEFAULT '👨‍🔬',
  subject TEXT DEFAULT 'mixed' CHECK (subject IN ('physics', 'chemistry', 'biology', 'mixed')),
  grade TEXT DEFAULT 'plus_one',
  skill_rating INTEGER DEFAULT 1000,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX idx_badges_user ON badges(user_id);
CREATE INDEX idx_system_logs_created ON system_logs(created_at DESC);
CREATE INDEX idx_battle_matches_player1 ON battle_matches(player1_id);
CREATE INDEX idx_battle_matches_player2 ON battle_matches(player2_id);
CREATE INDEX idx_battle_matches_status ON battle_matches(status);
CREATE INDEX idx_battle_history_player1 ON battle_history(player1_id);
CREATE INDEX idx_battle_history_player2 ON battle_history(player2_id);
CREATE INDEX idx_matchmaking_queue_subject ON matchmaking_queue(subject);
CREATE INDEX idx_matchmaking_queue_user ON matchmaking_queue(user_id);

-- Enable Real-time for tables
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE lesson_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE badges;
ALTER PUBLICATION supabase_realtime ADD TABLE system_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE battle_matches;
ALTER PUBLICATION supabase_realtime ADD TABLE matchmaking_queue;

-- Insert default admin users
INSERT INTO users (email, name, role, status, gems, level, completed_lessons, avatar) VALUES
  ('super@example.com', 'Super Admin', 'superadmin', 'active', 9999, 100, 500, '👑'),
  ('admin@example.com', 'John Admin', 'admin', 'active', 2500, 50, 200, '🛡️'),
  ('mike@example.com', 'Mike Johnson', 'user', 'active', 850, 12, 45, '👤'),
  ('jane@example.com', 'Jane Smith', 'user', 'inactive', 320, 8, 23, '👩'),
  ('tom@example.com', 'Tom Wilson', 'user', 'suspended', 150, 5, 12, '👨');
