// User & Gamification Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tokens: number;
  level: number;
  streak: number;
  longestStreak: number;
  gems: number;
  lastActive: string;
  badges: Badge[];
  completedLessons: string[];
  role: 'user' | 'admin' | 'superadmin';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// Curriculum Types
export type Grade = 'plus_one' | 'plus_two';

export type SubjectType = 'physics' | 'chemistry' | 'biology';

export interface Subject {
  id: SubjectType;
  name: string;
  color: string;
  icon: string;
  grades: Record<Grade, Chapter[]>;
}

export interface Chapter {
  id: string;
  name: string;
  description: string;
  moduleCount: number;
  modules: Module[];
  icon?: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  totalTokens: number;
  levels: Level[];
}

export interface Level {
  id: string;
  name: string;
  order: number;
  totalTokens: number;
  activities: Activity[];
}

// Activity Types
export type ActivityType = 
  | 'quiz'
  | 'flashcard'
  | 'match'
  | 'fill_blank'
  | 'drag_drop'
  | 'sequence'
  | 'true_false'
  | 'identify';

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  tokenReward: number;
  data: QuizData | FlashcardData | MatchData | FillBlankData | DragDropData | SequenceData | TrueFalseData | IdentifyData;
}

export interface QuizData {
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FlashcardData {
  front: string;
  back: string;
  hint?: string;
}

export interface MatchData {
  pairs: { term: string; definition: string }[];
}

export interface FillBlankData {
  sentence: string;
  blanks: string[];
  options: string[];
}

export interface DragDropData {
  items: { id: string; text: string; category: string }[];
  categories: string[];
}

export interface SequenceData {
  items: { id: string; text: string; order: number }[];
}

export interface TrueFalseData {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface IdentifyData {
  imageLabel?: string;
  parts: { id: string; name: string; x: number; y: number }[];
  options: string[];
}

// Progress Types
export interface LessonProgress {
  levelId: string;
  completed: boolean;
  stars: number;
  tokensEarned: number;
  lastAttempted: string;
}

export interface DailyGoal {
  date: string;
  targetTokens: number;
  earnedTokens: number;
  completed: boolean;
}

// Game State
export interface GameSession {
  currentActivityIndex: number;
  score: number;
  heartsUsed: number;
  startTime: string;
  activities: Activity[];
}
