import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swords, Users, Trophy, Clock, Zap, ArrowLeft, BookOpen, Atom, Dna, FlaskConical, Check, X, Sparkles, Globe } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { supabase } from '../lib/supabase';
import { getRandomQuestions, type BattleQuestion } from '../data/battleQuestions';

interface Match {
  id: string;
  player1_id: string;
  player2_id: string | null;
  player1_name: string;
  player2_name: string | null;
  player1_avatar: string;
  player2_avatar: string | null;
  player1_score: number;
  player2_score: number;
  player1_answers: { questionIndex: number; correct: boolean; timeLeft: number }[];
  player2_answers: { questionIndex: number; correct: boolean; timeLeft: number }[];
  status: 'waiting' | 'active' | 'completed' | 'cancelled';
  subject: 'physics' | 'chemistry' | 'biology' | 'mixed';
  questions: BattleQuestion[];
  current_question: number;
  winner_id: string | null;
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

type Subject = 'physics' | 'chemistry' | 'biology' | 'mixed';
type Grade = 'plus_one' | 'plus_two';

const SUBJECTS: { id: Subject; name: string; icon: React.ReactNode; color: string; bgColor: string }[] = [
  { id: 'physics', name: 'Physics', icon: <Atom className="w-6 h-6" />, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { id: 'chemistry', name: 'Chemistry', icon: <FlaskConical className="w-6 h-6" />, color: 'text-green-600', bgColor: 'bg-green-100' },
  { id: 'biology', name: 'Biology', icon: <Dna className="w-6 h-6" />, color: 'text-pink-600', bgColor: 'bg-pink-100' },
  { id: 'mixed', name: 'Mixed', icon: <Sparkles className="w-6 h-6" />, color: 'text-purple-600', bgColor: 'bg-purple-100' },
];

export default function Battle() {
  const { name, avatar, coins, addCoins, isAuthenticated, id: userId } = useUserStore();
  const [activeTab, setActiveTab] = useState<'find' | 'history'>('find');
  const [gameState, setGameState] = useState<'setup' | 'searching' | 'countdown' | 'playing' | 'finished'>('setup');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('mixed');
  const [selectedGrade, setSelectedGrade] = useState<Grade>('plus_one');
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [matchHistory, setMatchHistory] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch match history on mount
  useEffect(() => {
    fetchMatchHistory();
  }, []);

  const fetchMatchHistory = async () => {
    // In production, fetch from Supabase
    // For now, use local state
  };

  // AI Opponent names and avatars (fallback)
  const AI_OPPONENTS = [
    { name: 'NeoBot', avatar: '🤖' },
    { name: 'QuizMaster AI', avatar: '🧠' },
    { name: 'StudyBuddy', avatar: '📚' },
    { name: 'BrainyBot', avatar: '⚡' },
    { name: 'Genius AI', avatar: '🎯' },
  ];

  // Subscribe to match updates via Supabase Realtime
  const subscribeToMatch = useCallback((matchId: string) => {
    const channel = supabase
      .channel(`battle:${matchId}`)
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'battle_matches', filter: `id=eq.${matchId}` },
        (payload) => {
          const updated = payload.new as Match;
          
          // Check if opponent joined before updating state
          const opponentJustJoined = updated.player2_id && updated.status === 'active';
          
          setCurrentMatch(prev => {
            if (opponentJustJoined && prev?.status === 'waiting') {
              // Opponent joined - start countdown
              setGameState('countdown');
              let count = 3;
              const interval = setInterval(() => {
                count--;
                setCountdown(count);
                if (count <= 0) {
                  clearInterval(interval);
                  setGameState('playing');
                }
              }, 1000);
            }
            return prev ? { ...prev, ...updated } : null;
          });
        }
      )
      .subscribe();
    
    return channel;
  }, []);

  // Start matchmaking - tries real-time first, falls back to AI
  const startMatchmaking = useCallback(async () => {
    setGameState('searching');
    setIsLoading(true);
    setError(null);

    try {
      // 1. Check if user is authenticated via store
      if (!isAuthenticated || !userId) {
        setError('Please login to play multiplayer');
        setGameState('setup');
        setIsLoading(false);
        return;
      }

      const questions = getRandomQuestions(selectedSubject, 5);

      // 2. Try to find an existing match waiting for opponent
      const { data: waitingMatches, error: searchError } = await supabase
        .from('battle_matches')
        .select('*')
        .eq('status', 'waiting')
        .eq('subject', selectedSubject)
        .neq('player1_id', userId)
        .limit(1);

      if (searchError) throw searchError;

      if (waitingMatches && waitingMatches.length > 0) {
        // Join existing match
        const match = waitingMatches[0];
        
        const { error: updateError } = await supabase
          .from('battle_matches')
          .update({
            player2_id: userId,
            player2_name: name,
            player2_avatar: avatar,
            status: 'active',
            started_at: new Date().toISOString(),
          })
          .eq('id', match.id);

        if (updateError) throw updateError;

        const fullMatch: Match = {
          ...match,
          player2_id: userId,
          player2_name: name,
          player2_avatar: avatar,
          status: 'active',
        };

        setCurrentMatch(fullMatch);
        subscribeToMatch(match.id);
        setGameState('countdown');
        setIsLoading(false);

        // Start countdown
        let count = 3;
        const interval = setInterval(() => {
          count--;
          setCountdown(count);
          if (count <= 0) {
            clearInterval(interval);
            setGameState('playing');
          }
        }, 1000);
      } else {
        // 3. No waiting match - create new match and wait
        const { data: newMatch, error: createError } = await supabase
          .from('battle_matches')
          .insert({
            player1_id: userId,
            player1_name: name,
            player1_avatar: avatar,
            status: 'waiting',
            subject: selectedSubject,
            grade: selectedGrade,
            questions: questions,
          })
          .select()
          .single();

        if (createError) throw createError;
        if (!newMatch) throw new Error('Failed to create match');

        setCurrentMatch(newMatch);
        
        // Subscribe to match updates (waiting for opponent)
        const channel = subscribeToMatch(newMatch.id);

        // Wait 15 seconds for opponent, then fallback to AI
        setTimeout(async () => {
          const { data: currentMatchData } = await supabase
            .from('battle_matches')
            .select('*')
            .eq('id', newMatch.id)
            .single();

          if (currentMatchData && !currentMatchData.player2_id) {
            // No opponent joined - switch to AI
            const aiOpponent = AI_OPPONENTS[Math.floor(Math.random() * AI_OPPONENTS.length)];
            
            await supabase
              .from('battle_matches')
              .update({
                player2_id: 'ai-opponent',
                player2_name: aiOpponent.name,
                player2_avatar: aiOpponent.avatar,
                status: 'active',
                started_at: new Date().toISOString(),
              })
              .eq('id', newMatch.id);

            // Unsubscribe from realtime for AI matches
            channel.unsubscribe();

            setCurrentMatch(prev => prev ? {
              ...prev,
              player2_id: 'ai-opponent',
              player2_name: aiOpponent.name,
              player2_avatar: aiOpponent.avatar,
              status: 'active',
            } : null);
            
            setGameState('countdown');
            
            let count = 3;
            const interval = setInterval(() => {
              count--;
              setCountdown(count);
              if (count <= 0) {
                clearInterval(interval);
                setGameState('playing');
              }
            }, 1000);
          }
        }, 15000); // Wait 15 seconds

        setIsLoading(false);
      }
    } catch (err) {
      console.error('Matchmaking error:', err);
      setError('Failed to start matchmaking. Falling back to AI opponent...');
      
      // Fallback to AI immediately on error
      setTimeout(() => {
        const questions = getRandomQuestions(selectedSubject, 5);
        const aiOpponent = AI_OPPONENTS[Math.floor(Math.random() * AI_OPPONENTS.length)];
        
        const match: Match = {
          id: 'local-' + Date.now(),
          player1_id: userId || 'current-user',
          player1_name: name,
          player1_avatar: avatar,
          player1_score: 0,
          player1_answers: [],
          player2_id: 'ai-opponent',
          player2_name: aiOpponent.name,
          player2_avatar: aiOpponent.avatar,
          player2_score: 0,
          player2_answers: [],
          status: 'active',
          subject: selectedSubject,
          questions: questions,
          current_question: 0,
          winner_id: null,
          created_at: new Date().toISOString(),
        };
        
        setCurrentMatch(match);
        setError(null);
        setGameState('countdown');
        setIsLoading(false);
        
        let count = 3;
        const interval = setInterval(() => {
          count--;
          setCountdown(count);
          if (count <= 0) {
            clearInterval(interval);
            setGameState('playing');
          }
        }, 1000);
      }, 2000);
    }
  }, [name, avatar, selectedSubject, selectedGrade, subscribeToMatch, isAuthenticated, userId]);

  const cancelMatchmaking = () => {
    setGameState('setup');
    setIsLoading(false);
  };

  const handleGameComplete = (playerScore: number, opponentScore: number, playerAnswers: Match['player1_answers']) => {
    if (currentMatch) {
      const updatedMatch = {
        ...currentMatch,
        player1_score: playerScore,
        player2_score: opponentScore,
        player1_answers: playerAnswers,
        status: 'completed' as const,
        winner_id: playerScore > opponentScore ? 'current-user' : playerScore < opponentScore ? 'opponent' : null,
        completed_at: new Date().toISOString(),
      };
      
      setCurrentMatch(updatedMatch);
      setMatchHistory(prev => [updatedMatch, ...prev]);
    }
    setGameState('finished');
    
    // Award coins based on result
    if (playerScore > opponentScore) {
      addCoins(50);
    } else if (playerScore === opponentScore) {
      addCoins(25);
    } else {
      addCoins(10);
    }
  };

  const exitBattle = () => {
    setCurrentMatch(null);
    setGameState('setup');
    setCountdown(3);
    setError(null);
  };

  // Render countdown screen
  if (gameState === 'countdown' && currentMatch) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            key={countdown}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text-8xl font-bold text-white mb-8"
          >
            {countdown > 0 ? countdown : 'GO!'}
          </motion.div>
          <p className="text-white/80 text-lg">Battle starting...</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="text-center">
              <span className="text-4xl">{currentMatch.player1_avatar}</span>
              <p className="text-white text-sm mt-2">{currentMatch.player1_name}</p>
            </div>
            <div className="text-white text-xl font-bold">VS</div>
            <div className="text-center">
              <span className="text-4xl">{currentMatch.player2_avatar}</span>
              <p className="text-white text-sm mt-2">{currentMatch.player2_name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render game screen
  if (gameState === 'playing' && currentMatch) {
    return (
      <BattleGame
        match={currentMatch}
        onComplete={handleGameComplete}
        onExit={exitBattle}
      />
    );
  }

  // Render results screen
  if (gameState === 'finished' && currentMatch) {
    return (
      <BattleResults
        match={currentMatch}
        onExit={exitBattle}
        onRematch={() => {
          setGameState('searching');
          startMatchmaking();
        }}
      />
    );
  }

  // Render lobby/setup
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Swords className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">1v1 Battle</h1>
        <p className="text-gray-500">Challenge other players in real-time quiz duels!</p>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('find')}
          className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
            activeTab === 'find'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Swords className="w-4 h-4" />
            Find Match
          </div>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
            activeTab === 'history'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" />
            History
          </div>
        </button>
      </div>

      {activeTab === 'find' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Stats Card */}
          <div className="bg-white border-2 border-purple-100 rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{matchHistory.length}</p>
                <p className="text-xs text-gray-500">Matches</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {matchHistory.filter(m => m.player1_score > m.player2_score).length}
                </p>
                <p className="text-xs text-gray-500">Wins</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{coins}</p>
                <p className="text-xs text-gray-500">Coins</p>
              </div>
            </div>
          </div>

          {/* Subject Selection */}
          {!isLoading && gameState === 'setup' && (
            <>
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Select Subject
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SUBJECTS.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedSubject === subject.id
                          ? `border-purple-500 ${subject.bgColor}`
                          : 'border-gray-100 hover:border-purple-200'
                      }`}
                    >
                      <div className={`${subject.color} mb-2`}>{subject.icon}</div>
                      <p className="font-semibold text-gray-900">{subject.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Selection */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Select Grade</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedGrade('plus_one')}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                      selectedGrade === 'plus_one'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-100 hover:border-purple-200'
                    }`}
                  >
                    +1 (Class 11)
                  </button>
                  <button
                    onClick={() => setSelectedGrade('plus_two')}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                      selectedGrade === 'plus_two'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-100 hover:border-purple-200'
                    }`}
                  >
                    +2 (Class 12)
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Matchmaking Card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            {isLoading ? (
              <div className="text-center py-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
                />
                <p className="font-semibold mb-2">Finding opponent...</p>
                <p className="text-white/80 text-sm mb-4">
                  Subject: {SUBJECTS.find(s => s.id === selectedSubject)?.name}
                </p>
                <button
                  onClick={cancelMatchmaking}
                  className="text-sm text-white/80 hover:text-white px-4 py-2 bg-white/20 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">Quick Match</h3>
                      <p className="text-white/80 text-sm">5 questions • {SUBJECTS.find(s => s.id === selectedSubject)?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/80">Mode</p>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-green-300" />
                      <p className="font-bold text-green-300">Real-time</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={startMatchmaking}
                  className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-white/90 transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Start Matchmaking
                  </div>
                </button>
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Rewards Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Rewards
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Win: +50 coins + XP</li>
              <li>• Draw: +25 coins</li>
              <li>• Loss: +10 coins</li>
              <li>• 3-win streak: Bonus 100 coins</li>
            </ul>
          </div>
        </motion.div>
      )}

      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {matchHistory.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No battles yet</p>
              <p className="text-sm text-gray-400">Start your first match!</p>
            </div>
          ) : (
            matchHistory.map((match) => (
              <div
                key={match.id}
                className="bg-white border-2 border-gray-100 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{match.player2_avatar}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{match.player2_name}</p>
                      <p className="text-xs text-gray-500">
                        {SUBJECTS.find(s => s.id === match.subject)?.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      match.player1_score > match.player2_score
                        ? 'text-green-600'
                        : match.player1_score < match.player2_score
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}>
                      {match.player1_score > match.player2_score ? 'Won' : match.player1_score < match.player2_score ? 'Lost' : 'Draw'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {match.player1_score} - {match.player2_score}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}

// Battle Game Component
function BattleGame({ match, onComplete, onExit }: { match: Match; onComplete: (p1: number, p2: number, answers: Match['player1_answers']) => void; onExit: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState<Match['player1_answers']>([]);
  const [opponentAnswered, setOpponentAnswered] = useState(false);

  const questions = match.questions;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
  }, [timeLeft, showResult]);

  // AI Opponent answering logic
  useEffect(() => {
    if (!showResult && selectedAnswer === null && match.player2_id === 'ai-opponent') {
      // AI answers after 3-11 seconds with 65% accuracy
      const aiResponseTime = 3000 + Math.random() * 8000;
      const aiTimer = setTimeout(() => {
        const isCorrect = Math.random() < 0.65; // 65% accuracy
        const aiTimeLeft = Math.floor(Math.random() * 8) + 3; // 3-11 seconds remaining
        const points = isCorrect ? 10 + aiTimeLeft : 0;
        setOpponentScore(s => s + points);
        setOpponentAnswered(true);
      }, aiResponseTime);
      return () => clearTimeout(aiTimer);
    }
  }, [currentQuestionIndex, showResult, selectedAnswer, match.player2_id]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const points = isCorrect ? 10 + timeLeft : 0;
    setPlayerScore(s => s + points);
    
    setPlayerAnswers(prev => [...prev, {
      questionIndex: currentQuestionIndex,
      correct: isCorrect,
      timeLeft: timeLeft,
    }]);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(c => c + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
        setOpponentAnswered(false);
      } else {
        // Small delay to show final scores before completing
        setTimeout(() => {
          onComplete(playerScore + points, opponentScore, [...playerAnswers, {
            questionIndex: currentQuestionIndex,
            correct: isCorrect,
            timeLeft: timeLeft,
          }]);
        }, 1000);
      }
    }, 2000);
  };

  // Get subject info
  const subjectInfo = SUBJECTS.find(s => s.id === currentQuestion.subject);

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${
        currentQuestion.subject === 'physics' ? 'from-blue-600 to-blue-500' :
        currentQuestion.subject === 'chemistry' ? 'from-green-600 to-green-500' :
        currentQuestion.subject === 'biology' ? 'from-pink-600 to-pink-500' :
        'from-purple-600 to-pink-500'
      } text-white p-4`}>
        <div className="flex items-center justify-between">
          <button onClick={onExit} className="p-2 hover:bg-white/20 rounded-xl">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            {subjectInfo?.icon}
            <span className="font-semibold capitalize">{currentQuestion.subject}</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Scores */}
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="text-center">
            <span className="text-2xl">{match.player1_avatar}</span>
            <p className="font-bold text-lg">{playerScore}</p>
            <p className="text-xs text-white/80">You</p>
          </div>
          <div className="text-2xl font-bold">VS</div>
          <div className="text-center">
            <span className="text-2xl">{match.player2_avatar}</span>
            <p className="font-bold text-lg">{opponentScore}</p>
            <p className="text-xs text-white/80">{match.player2_name}</p>
            {opponentAnswered && !showResult && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-yellow-300 mt-1"
              >
                Answered!
              </motion.p>
            )}
            {!opponentAnswered && !showResult && (
              <p className="text-xs text-white/60 mt-1">Thinking...</p>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-2 bg-gray-50 border-b">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {timeLeft}s
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${
              currentQuestion.subject === 'physics' ? 'bg-blue-500' :
              currentQuestion.subject === 'chemistry' ? 'bg-green-500' :
              currentQuestion.subject === 'biology' ? 'bg-pink-500' :
              'bg-purple-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-auto p-4">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-lg mx-auto"
        >
          {/* Topic badge */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.subject === 'physics' ? 'bg-blue-100 text-blue-700' :
              currentQuestion.subject === 'chemistry' ? 'bg-green-100 text-green-700' :
              currentQuestion.subject === 'biology' ? 'bg-pink-100 text-pink-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {currentQuestion.topic}
            </span>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ml-2 ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrectness = showResult && (isSelected || isCorrect);

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                    showCorrectness
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-500 text-green-900'
                        : isSelected
                        ? 'bg-red-100 border-2 border-red-500 text-red-900'
                        : 'bg-gray-100 text-gray-500'
                      : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                      showCorrectness
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : isSelected
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-300'
                        : 'bg-white'
                    }`}>
                      {showCorrectness
                        ? isCorrect
                          ? '✓'
                          : isSelected
                          ? '✗'
                          : String.fromCharCode(65 + index)
                        : String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Timer bar */}
          <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-400"
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / 15) * 100}%` }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Battle Results Component
function BattleResults({ match, onExit, onRematch }: { match: Match; onExit: () => void; onRematch: () => void }) {
  const playerWon = match.player1_score > match.player2_score;
  const isDraw = match.player1_score === match.player2_score;
  const coinsEarned = playerWon ? 50 : isDraw ? 25 : 10;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
      >
        {/* Result Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            playerWon ? 'bg-green-100' : isDraw ? 'bg-gray-100' : 'bg-red-100'
          }`}
        >
          <span className="text-5xl">
            {playerWon ? '🏆' : isDraw ? '🤝' : '😔'}
          </span>
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {playerWon ? 'Victory!' : isDraw ? 'Draw!' : 'Defeat!'}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {SUBJECTS.find(s => s.id === match.subject)?.name}
        </p>

        {/* Score Display */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <span className="text-3xl">{match.player1_avatar}</span>
            <p className="text-2xl font-bold text-gray-900">{match.player1_score}</p>
            <p className="text-xs text-gray-500">You</p>
          </div>
          <div className="text-xl text-gray-400">-</div>
          <div className="text-center">
            <span className="text-3xl">{match.player2_avatar}</span>
            <p className="text-2xl font-bold text-gray-900">{match.player2_score}</p>
            <p className="text-xs text-gray-500">{match.player2_name}</p>
          </div>
        </div>

        {/* Question Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex justify-around text-sm">
            <div className="text-center">
              <Check className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="font-bold text-green-600">
                {match.player1_answers.filter(a => a.correct).length}
              </p>
              <p className="text-gray-500 text-xs">Correct</p>
            </div>
            <div className="text-center">
              <X className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <p className="font-bold text-red-600">
                {match.player1_answers.filter(a => !a.correct).length}
              </p>
              <p className="text-gray-500 text-xs">Wrong</p>
            </div>
            <div className="text-center">
              <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="font-bold text-blue-600">
                {Math.round(match.player1_answers.reduce((acc, a) => acc + (15 - a.timeLeft), 0))}s
              </p>
              <p className="text-gray-500 text-xs">Time</p>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-yellow-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Coins Earned</p>
          <p className="text-3xl font-bold text-yellow-600">+{coinsEarned}</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRematch}
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-colors"
          >
            Rematch
          </button>
          <button
            onClick={onExit}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
          >
            Exit
          </button>
        </div>
      </motion.div>
    </div>
  );
}
