import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords, Users, Trophy, Clock, Zap, ArrowLeft } from 'lucide-react';
import { useUserStore } from '../store/userStore';

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
  status: 'waiting' | 'active' | 'completed';
  subject: string;
  created_at: string;
}

export default function Battle() {
  const { name, avatar, coins, addCoins } = useUserStore();
  const [activeTab, setActiveTab] = useState<'find' | 'history'>('find');
  const [isSearching, setIsSearching] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [matchHistory] = useState<Match[]>([]);
  const [countdown, setCountdown] = useState(3);
  const [gameState, setGameState] = useState<'lobby' | 'countdown' | 'playing' | 'finished'>('lobby');

  // Mock matchmaking - in production this would use Supabase Realtime
  const startMatchmaking = () => {
    setIsSearching(true);
    
    // Simulate finding an opponent after 2-4 seconds
    setTimeout(() => {
      const mockOpponents = [
        { name: 'Rahul', avatar: '👨‍🎓' },
        { name: 'Priya', avatar: '👩‍🔬' },
        { name: 'Arun', avatar: '🧑‍🔬' },
        { name: 'Neha', avatar: '🐱' },
        { name: 'Vikram', avatar: '🦁' },
      ];
      const opponent = mockOpponents[Math.floor(Math.random() * mockOpponents.length)];
      
      const match: Match = {
        id: 'match-' + Date.now(),
        player1_id: 'current-user',
        player1_name: name,
        player1_avatar: avatar,
        player1_score: 0,
        player2_id: 'opponent-' + Date.now(),
        player2_name: opponent.name,
        player2_avatar: opponent.avatar,
        player2_score: 0,
        status: 'active',
        subject: 'Physics',
        created_at: new Date().toISOString(),
      };
      
      setCurrentMatch(match);
      setIsSearching(false);
      setGameState('countdown');
      
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
    }, 2000 + Math.random() * 2000);
  };

  const cancelMatchmaking = () => {
    setIsSearching(false);
  };

  const handleGameComplete = (playerScore: number, opponentScore: number) => {
    if (currentMatch) {
      setCurrentMatch({
        ...currentMatch,
        player1_score: playerScore,
        player2_score: opponentScore,
        status: 'completed',
      });
    }
    setGameState('finished');
    
    // Award coins based on result
    if (playerScore > opponentScore) {
      addCoins(50);
    } else {
      addCoins(10);
    }
  };

  const exitBattle = () => {
    setCurrentMatch(null);
    setGameState('lobby');
    setCountdown(3);
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
          setGameState('countdown');
          setCountdown(3);
          let count = 3;
          const interval = setInterval(() => {
            count--;
            setCountdown(count);
            if (count <= 0) {
              clearInterval(interval);
              setGameState('playing');
            }
          }, 1000);
        }}
      />
    );
  }

  // Render lobby
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
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-xs text-gray-500">Matches</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-xs text-gray-500">Wins</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{coins}</p>
                <p className="text-xs text-gray-500">Coins</p>
              </div>
            </div>
          </div>

          {/* Matchmaking Card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Quick Match</h3>
                  <p className="text-white/80 text-sm">5 questions • Physics</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/80">Online Players</p>
                <p className="font-bold">24</p>
              </div>
            </div>

            {isSearching ? (
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
                />
                <p className="font-semibold mb-2">Finding opponent...</p>
                <button
                  onClick={cancelMatchmaking}
                  className="text-sm text-white/80 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={startMatchmaking}
                className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-white/90 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Matchmaking
                </div>
              </button>
            )}
          </div>

          {/* Rewards Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Rewards
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Win: +50 coins + XP</li>
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
                      <p className="text-xs text-gray-500">{match.subject}</p>
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
function BattleGame({ match, onComplete, onExit }: { match: Match; onComplete: (p1: number, p2: number) => void; onExit: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correct: 0,
    },
    {
      question: "Which law states F = ma?",
      options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Gravitation"],
      correct: 1,
    },
    {
      question: "What is the speed of light in vacuum?",
      options: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^10 m/s", "3 × 10^4 m/s"],
      correct: 0,
    },
    {
      question: "Which particle has a negative charge?",
      options: ["Proton", "Neutron", "Electron", "Photon"],
      correct: 2,
    },
    {
      question: "What is the formula for kinetic energy?",
      options: ["mgh", "½mv²", "mv", "mc²"],
      correct: 1,
    },
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
  }, [timeLeft, showResult]);

  // Simulate opponent answering
  useEffect(() => {
    if (!showResult && selectedAnswer === null) {
      const opponentTimer = setTimeout(() => {
        // Opponent has 60% chance to answer correctly
        if (Math.random() < 0.6) {
          setOpponentScore(s => s + 10);
        } else {
          setOpponentScore(s => s + 2);
        }
      }, 3000 + Math.random() * 4000);
      return () => clearTimeout(opponentTimer);
    }
  }, [currentQuestion, showResult, selectedAnswer]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    const points = isCorrect ? 10 + timeLeft : 0;
    setPlayerScore(s => s + points);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(10);
      } else {
        onComplete(playerScore + points, opponentScore);
      }
    }, 1500);
  };

  const question = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4">
        <div className="flex items-center justify-between">
          <button onClick={onExit} className="p-2 hover:bg-white/20 rounded-xl">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="font-bold">Battle</h2>
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
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-2 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1}/{questions.length}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {timeLeft}s
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-auto p-4">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-lg mx-auto"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
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
                      : 'bg-gray-100 hover:bg-purple-50 hover:border-purple-300 border-2 border-transparent'
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
        </motion.div>
      </div>
    </div>
  );
}

// Battle Results Component
function BattleResults({ match, onExit, onRematch }: { match: Match; onExit: () => void; onRematch: () => void }) {
  const playerWon = match.player1_score > match.player2_score;
  const isDraw = match.player1_score === match.player2_score;

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

        {/* Rewards */}
        <div className="bg-yellow-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Coins Earned</p>
          <p className="text-3xl font-bold text-yellow-600">
            +{playerWon ? 50 : 10}
          </p>
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
