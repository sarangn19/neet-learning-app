import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, XCircle, Bot, Swords, Check } from 'lucide-react';
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
  player1_banner?: string;
  player2_banner?: string;
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

const GRADE_MODES: { id: 'plus_one' | 'mixed'; name: string }[] = [
  { id: 'plus_one', name: 'Plus One Only' },
  { id: 'mixed', name: 'Plus One + Plus Two' },
];

export default function Battle({ onClose }: { onClose?: () => void }) {
  const { name, avatar, equippedBanner, coins, addCoins, isAuthenticated, id: userId, recordBattleVictory } = useUserStore();
  const [activeTab, setActiveTab] = useState<'find' | 'history'>('find');
  const [gameState, setGameState] = useState<'setup' | 'searching' | 'countdown' | 'playing' | 'finished'>('setup');
  const [selectedMode, setSelectedMode] = useState<'plus_one' | 'mixed'>('plus_one');
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [matchHistory, setMatchHistory] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePlayers, setActivePlayers] = useState(0);
  const [waitingMatches, setWaitingMatches] = useState(0);

  // Fetch match history and active players on mount
  useEffect(() => {
    fetchMatchHistory();
    fetchActivePlayers();
    // Poll active players every 30 seconds
    const interval = setInterval(fetchActivePlayers, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMatchHistory = async () => {
    // In production, fetch from Supabase
    // For now, use local state
  };

  const fetchActivePlayers = async () => {
    try {
      // Count total registered users (real data from Supabase)
      const { count: totalUsers, error: usersError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      if (usersError) {
        console.error('Error fetching users:', usersError);
        setActivePlayers(0);
        setWaitingMatches(0);
        return;
      }
      
      // Count waiting matches
      const { count: matchCount, error: matchError } = await supabase
        .from('battle_matches')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'waiting');

      if (matchError) {
        console.error('Error fetching matches:', matchError);
      }

      setActivePlayers(totalUsers || 0);
      setWaitingMatches(matchCount || 0);
    } catch (err) {
      console.error('Error fetching active players:', err);
      setActivePlayers(0);
      setWaitingMatches(0);
    }
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
    console.log('Subscribing to match:', matchId);
    
    const channel = supabase
      .channel(`battle:${matchId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'battle_matches', filter: `id=eq.${matchId}` },
        (payload) => {
          console.log('Realtime update received:', payload);
          const updated = payload.new as Match;
          
          console.log('Match update - player2_id:', updated.player2_id, 'status:', updated.status);
          
          setCurrentMatch(prev => {
            // Only react if I'm Player 1 (the creator) and opponent just joined
            const imPlayer1 = prev?.player1_id === userId;
            const hadNoOpponent = !prev?.player2_id;
            const nowHasOpponent = !!updated.player2_id;
            const opponentJustJoined = imPlayer1 && hadNoOpponent && nowHasOpponent;
            
            console.log('I am Player 1?', imPlayer1, 'Previous player2:', prev?.player2_id, 'New player2:', updated.player2_id);
            console.log('Opponent just joined?', opponentJustJoined);
            
            if (opponentJustJoined) {
              console.log('Starting countdown - opponent joined!');
              // Opponent joined - start countdown
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
            }
            return prev ? { ...prev, ...updated } : null;
          });
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });
    
    return channel;
  }, []);

  // Start AI match - directly playable
  const startAIMatch = useCallback(() => {
    // Check auth
    if (!isAuthenticated || !userId) {
      setError('Please login to play');
      return;
    }

    const questions = getRandomQuestions('mixed', 5);
    const aiOpponent = AI_OPPONENTS[Math.floor(Math.random() * AI_OPPONENTS.length)];

    const match: Match = {
      id: 'ai-' + Date.now(),
      player1_id: userId,
      player1_name: name,
      player1_avatar: avatar,
      player1_banner: equippedBanner,
      player1_score: 0,
      player1_answers: [],
      player2_id: 'ai-opponent',
      player2_name: aiOpponent.name,
      player2_avatar: aiOpponent.avatar,
      player2_banner: 'banner-default',
      player2_score: 0,
      player2_answers: [],
      status: 'active',
      subject: 'mixed',
      questions: questions,
      current_question: 0,
      winner_id: null,
      created_at: new Date().toISOString(),
    };
    setCurrentMatch(match);
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
  }, [isAuthenticated, userId, name, avatar, equippedBanner]);

  // Start matchmaking - tries real-time first, falls back to AI
  const startMatchmaking = useCallback(async () => {
    setGameState('searching');
    setIsLoading(true);
    setError(null);

    // Check if user is authenticated via store
    if (!isAuthenticated || !userId) {
      setError('Please login to play multiplayer');
      setGameState('setup');
      setIsLoading(false);
      return;
    }

    const questions = getRandomQuestions('mixed', 5);

    // Helper to start AI match on failure
    const fallbackToAI = () => {
      setIsLoading(false);
      startAIMatch();
    };

    try {
      // Try to find an existing match waiting for opponent
      const { data: waitingMatches, error: searchError } = await supabase
        .from('battle_matches')
        .select('*')
        .eq('status', 'waiting')
        .eq('grade', selectedMode === 'plus_one' ? 'plus_one' : 'mixed')
        .neq('player1_id', userId)
        .limit(1);

      console.log('Searching for waiting matches...', { searchError, waitingMatches });

      if (!searchError && waitingMatches && waitingMatches.length > 0) {
        // Join existing match - real multiplayer!
        const match = waitingMatches[0];
        console.log('Found waiting match, attempting to join:', match.id);
        
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

        console.log('Join result:', { updateError });

        if (!updateError) {
          console.log('Successfully joined match!');
          const fullMatch: Match = {
            id: match.id,
            player1_id: match.player1_id,
            player1_name: match.player1_name,
            player1_avatar: match.player1_avatar || '/images/profile pictures/1.png',
            player1_score: match.player1_score || 0,
            player1_answers: match.player1_answers || [],
            player2_id: userId,
            player2_name: name,
            player2_avatar: avatar,
            player2_score: 0,
            player2_answers: [],
            status: 'active',
            subject: match.subject,
            questions: match.questions,
            current_question: 0,
            winner_id: null,
            created_at: match.created_at,
          };

          setCurrentMatch(fullMatch);
          subscribeToMatch(match.id);
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
          return; // Real match started
        }
      }

      // No waiting match - create one and wait for real opponent
      const { data: newMatch, error: createError } = await supabase
        .from('battle_matches')
        .insert({
          player1_id: userId,
          player1_name: name,
          player1_avatar: avatar,
          status: 'waiting',
          subject: 'mixed',
          grade: selectedMode === 'plus_one' ? 'plus_one' : 'mixed',
          questions: questions,
        })
        .select()
        .single();

      if (createError || !newMatch) {
        // Can't create match in DB - start AI immediately
        console.error('Match create error:', createError);
        startAIMatch();
        return;
      }

      // Set current match state so Player 1 is recognized as creator
      setCurrentMatch(newMatch as Match);
      
      // Subscribe to match updates (waiting for opponent)
      const channel = subscribeToMatch(newMatch.id);

      // Wait 60 seconds for a real opponent, then fallback to AI
      const timeoutId = setTimeout(async () => {
        console.log('Timeout: Checking if opponent joined...');
        
        try {
          const { data: currentMatchData } = await supabase
            .from('battle_matches')
            .select('player2_id, status')
            .eq('id', newMatch.id)
            .single();

          console.log('Match status after timeout:', currentMatchData);

          if (currentMatchData && currentMatchData.status === 'waiting' && !currentMatchData.player2_id) {
            // No opponent joined - delete waiting match and start AI
            console.log('No opponent joined, starting AI match');
            await supabase.from('battle_matches').delete().eq('id', newMatch.id);
            channel.unsubscribe();
            startAIMatch();
          } else if (currentMatchData?.player2_id) {
            console.log('Opponent joined! Match should be active');
            // Opponent joined - don't delete, subscription will handle it
          }
        } catch (err) {
          console.error('Error checking match status:', err);
          channel.unsubscribe();
          startAIMatch();
        }
      }, 60000); // Wait 60 seconds

    } catch (err) {
      console.error('Matchmaking error:', err);
      // Any error - start AI match immediately
      startAIMatch();
    }
  }, [name, avatar, selectedMode, subscribeToMatch, isAuthenticated, userId, startAIMatch]);

  const cancelMatchmaking = () => {
    setGameState('setup');
    setIsLoading(false);
  };

  const handleGameComplete = (playerScore: number, opponentScore: number, playerAnswers: Match['player1_answers']) => {
    if (currentMatch) {
      // Determine if current user is player1 or player2
      const isPlayer1 = currentMatch.player1_id === userId;
      
      const updatedMatch = {
        ...currentMatch,
        // Set scores correctly based on which player I am
        player1_score: isPlayer1 ? playerScore : opponentScore,
        player2_score: isPlayer1 ? opponentScore : playerScore,
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
      // Record battle victory for magic boxes
      const newVictoryCount = recordBattleVictory();
      console.log('Battle victory recorded! Total today:', newVictoryCount);
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
    // Call onClose if provided (when used as modal)
    if (onClose) {
      onClose();
    }
  };

  // Render countdown screen - Simple Version
  if (gameState === 'countdown' && currentMatch) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center z-50 rounded-2xl overflow-hidden">
        {/* Countdown */}
        <motion.div
          key={countdown}
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="text-8xl font-bold text-white drop-shadow-2xl mb-8"
        >
          {countdown > 0 ? countdown : 'GO!'}
        </motion.div>
        
        <p className="text-white/80 text-lg mb-12">Battle starting...</p>

        {/* Simple Player Display */}
        <div className="flex items-center gap-8">
          {/* Player 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/20 p-1 border-2 border-white shadow-xl mb-2">
              <img src={currentMatch.player1_avatar} alt="" className="w-full h-full rounded-full object-cover" />
            </div>
            <span className="text-white font-bold">{currentMatch.player1_name}</span>
            <span className="text-blue-300 text-sm">P1</span>
          </div>

          {/* VS */}
          <div className="text-4xl font-black text-amber-400 drop-shadow-lg">VS</div>

          {/* Player 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/20 p-1 border-2 border-white shadow-xl mb-2">
              <img src={currentMatch.player2_avatar} alt="" className="w-full h-full rounded-full object-cover" />
            </div>
            <span className="text-white font-bold">{currentMatch.player2_name}</span>
            <span className="text-red-300 text-sm">P2</span>
          </div>
        </div>
      </div>
    );
  }

  // Render game screen
  if (gameState === 'playing' && currentMatch) {
    return (
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <BattleGame
        match={currentMatch}
        currentUserId={userId}
        onComplete={handleGameComplete}
        onExit={exitBattle}
      />
      </div>
    );
  }

  // Render results screen
  if (gameState === 'finished' && currentMatch) {
    return (
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <BattleResults
        match={currentMatch}
        currentUserId={userId}
        onExit={exitBattle}
        onRematch={() => {
          setGameState('setup');
          setCurrentMatch(null);
          setCountdown(3);
        }}
      />
      </div>
    );
  }

  // Render lobby/setup
  return (
    <div className="h-full overflow-y-auto bg-black rounded-2xl relative">
      {/* Boxing Arena Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <img 
          src="/images/battle-banner.png" 
          alt="Battle Arena"
          className="w-full h-48 object-cover"
        />
        {/* Black gradient overlay for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Players Info */}
          <div className="px-4 py-3">
            <p className="text-white font-semibold">{activePlayers > 0 ? `${activePlayers} Players` : '10 Players'}</p>
            <p className="text-gray-400 text-sm">
              {waitingMatches > 0 ? `${waitingMatches} waiting` : 'No players waiting'}
            </p>
          </div>

          {/* Grade Mode Selection */}
          {!isLoading && gameState === 'setup' && (
            <>
              <div className="px-4 flex flex-wrap gap-2">
                {GRADE_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedMode === mode.id
                        ? 'bg-gray-700 text-white border border-gray-600'
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Rewards Info */}
          <div className="px-4 py-4">
            <p className="text-gray-400 text-sm mb-3">Rewards</p>
            <div className="flex justify-between text-sm">
              <div className="text-center">
                <p className="text-gray-500 mb-1">Win</p>
                <p className="text-white font-semibold">50 coins</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 mb-1">Draw</p>
                <p className="text-white font-semibold">25 coins</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 mb-1">Loss</p>
                <p className="text-white font-semibold">10 coins</p>
              </div>
            </div>
          </div>

          {/* Magic Boxes - Victory Reward Boxes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4"
          >
            <p className="text-gray-400 text-sm mb-3">Win Battles to Open Boxes</p>
            <div className="flex items-center justify-center p-3 bg-white/10 rounded-full border border-white/20">
              {[0, 1, 2, 3].map((boxIndex) => (
                <motion.div
                  key={boxIndex}
                  className="w-12 h-12 rounded-full border-2 border-amber-400/50 flex items-center justify-center bg-gray-800/50 mx-1"
                >
                  <img 
                    src="/images/closed-tin.png" 
                    alt="Reward Box" 
                    className="w-8 h-8 object-contain"
                  />
                </motion.div>
              ))}
            </div>
            <p className="text-gray-500 text-xs text-center mt-2">Win 4 battles to unlock all rewards</p>
          </motion.div>

          {/* Start Match Buttons */}
          <div className="px-4 pb-8 space-y-3">
            {isLoading ? (
              <div className="text-center py-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-400 mb-4">Finding opponent...</p>
                <button
                  onClick={cancelMatchmaking}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                {/* Play vs AI Button */}
                <button
                  onClick={startAIMatch}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  Play vs AI
                </button>
                
                {/* Play vs Player Button */}
                <button
                  onClick={startMatchmaking}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Swords className="w-5 h-5" />
                  Play vs Player
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

        </motion.div>
    </div>
  );
}

// Battle Game Component
function BattleGame({ match, onComplete, onExit, currentUserId }: { match: Match; onComplete: (p1: number, p2: number, answers: Match['player1_answers']) => void; onExit: () => void; currentUserId: string | null }) {
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
  const isPlayer1 = match.player1_id === currentUserId;
  const isRealOpponent = match.player2_id !== 'ai-opponent';

  // Subscribe to opponent score updates for real multiplayer
  useEffect(() => {
    if (!isRealOpponent) {
      console.log('AI opponent - no score subscription needed');
      return; // Only for real multiplayer
    }

    console.log('Setting up score subscription for match:', match.id);

    const channel = supabase
      .channel(`scores:${match.id}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'battle_matches', filter: `id=eq.${match.id}` },
        (payload) => {
          console.log('Score update received:', payload);
          const updated = payload.new as Match;
          console.log('Updated match scores:', { p1: updated.player1_score, p2: updated.player2_score });
          
          // Update opponent score from Supabase
          if (isPlayer1) {
            // I'm player 1, opponent is player 2
            const newOpponentScore = updated.player2_score || 0;
            console.log('Setting opponent score (player2):', newOpponentScore);
            setOpponentScore(newOpponentScore);
          } else {
            // I'm player 2, opponent is player 1
            const newOpponentScore = updated.player1_score || 0;
            console.log('Setting opponent score (player1):', newOpponentScore);
            setOpponentScore(newOpponentScore);
          }
        }
      )
      .subscribe((status) => {
        console.log('Score subscription status:', status);
      });

    return () => {
      console.log('Unsubscribing from score updates');
      channel.unsubscribe();
    };
  }, [match.id, isPlayer1, isRealOpponent]);

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
    const newScore = playerScore + points;
    setPlayerScore(newScore);
    
    // Sync score to Supabase for real multiplayer
    if (isRealOpponent) {
      const scoreField = isPlayer1 ? 'player1_score' : 'player2_score';
      const answersField = isPlayer1 ? 'player1_answers' : 'player2_answers';
      const newAnswers = [...playerAnswers, {
        questionIndex: currentQuestionIndex,
        correct: isCorrect,
        timeLeft: timeLeft,
      }];
      
      supabase
        .from('battle_matches')
        .update({
          [scoreField]: newScore,
          [answersField]: newAnswers,
        })
        .eq('id', match.id)
        .then(({ error }) => {
          if (error) console.error('Error syncing score:', error);
        });
    }
    
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

  // Get mode info for display
  const modeInfo = { name: 'Mixed Topics' };

  return (
    <div className="h-full w-full bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className={`bg-gradient-to-r ${
        'from-purple-600 to-pink-500'
      } text-white p-4 shrink-0`}>
        <div className="flex items-center justify-between">
          <button onClick={onExit} className="p-2 hover:bg-white/20 rounded-xl">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Mixed</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Scores */}
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="text-center">
            <img src={match.player1_avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <p className="font-bold text-lg">{playerScore}</p>
            <p className="text-xs text-white/80">You</p>
          </div>
          <div className="text-2xl font-bold">VS</div>
          <div className="text-center">
            <img src={match.player2_avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
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
function BattleResults({ match, onExit, onRematch, currentUserId }: { match: Match; onExit: () => void; onRematch: () => void; currentUserId: string | null }) {
  // Determine if current user is player1 or player2
  const isPlayer1 = match.player1_id === currentUserId;
  const myScore = isPlayer1 ? match.player1_score : match.player2_score;
  const opponentScore = isPlayer1 ? match.player2_score : match.player1_score;
  
  const playerWon = myScore > opponentScore;
  const isDraw = myScore === opponentScore;
  const coinsEarned = playerWon ? 50 : isDraw ? 25 : 10;

  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center my-auto"
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
          Mixed Topics
        </p>

        {/* Score Display */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <img src={isPlayer1 ? match.player1_avatar : match.player2_avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
            <p className="text-2xl font-bold text-gray-900">{myScore}</p>
            <p className="text-xs text-gray-500">You</p>
          </div>
          <div className="text-xl text-gray-400">-</div>
          <div className="text-center">
            <img src={isPlayer1 ? match.player2_avatar : match.player1_avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
            <p className="text-2xl font-bold text-gray-900">{opponentScore}</p>
            <p className="text-xs text-gray-500">{isPlayer1 ? match.player2_name : match.player1_name}</p>
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
              <XCircle className="w-5 h-5 text-red-500 mx-auto mb-1" />
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
