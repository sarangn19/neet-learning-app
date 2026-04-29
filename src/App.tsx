import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import ChapterList from './pages/ChapterList';
import ChapterView from './pages/ChapterView';
import ModuleView from './pages/ModuleView';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import PracticeSetup from './pages/PracticeSetup';
import PracticeSession from './pages/PracticeSession';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if user has already seen splash this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasSeenSplash', 'true');
  };

  return (
    <>
      <SplashScreen 
        onComplete={handleSplashComplete} 
        duration={2500}
      />
      {!showSplash && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
        {/* MCQ Practice Routes */}
        <Route path="learn" element={<PracticeSetup />} />
        <Route path="practice" element={<PracticeSetup />} />
        <Route path="practice/:subjectId" element={<PracticeSetup />} />
        <Route path="practice/session" element={<PracticeSession />} />
        {/* Legacy Learning Routes - Redirect old learn URLs to practice */}
        <Route path="learn/*" element={<PracticeSetup />} />
        <Route path="chapter/:subjectId/:grade" element={<ChapterList />} />
        <Route path="chapter/:subjectId/:grade/:chapterId" element={<ChapterView />} />
        <Route path="module/:subjectId/:grade/:chapterId/:moduleId" element={<ModuleView />} />
        <Route path="lesson/:levelId" element={<Lesson />} />
        <Route path="profile" element={<Profile />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
      {/* Auth Routes - Outside Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/superadmin" element={<SuperAdminDashboard />} />
    </Routes>
      )}
    </>
  );
}

export default App;
