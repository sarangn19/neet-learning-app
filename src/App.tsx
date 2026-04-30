import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import ChapterList from './pages/ChapterList';
import ChapterView from './pages/ChapterView';
import ModuleView from './pages/ModuleView';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import PracticeSetup from './pages/PracticeSetup';
import PracticeSession from './pages/PracticeSession';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Shop from './pages/Shop';
import Battle from './pages/Battle';
import SplashScreen from './components/SplashScreen';
import { useUserStore } from './store/userStore';

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUserStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated } = useUserStore();

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
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="mcqs" element={<PracticeSetup />} />
            <Route path="shop" element={<Shop />} />
            <Route path="battle" element={<Battle />} />
            <Route path="practice" element={<PracticeSetup />} />
            <Route path="practice/:subjectId" element={<PracticeSetup />} />
            <Route path="practice/session" element={<PracticeSession />} />
            <Route path="chapter/:subjectId/:grade" element={<ChapterList />} />
            <Route path="chapter/:subjectId/:grade/:chapterId" element={<ChapterView />} />
            <Route path="module/:subjectId/:grade/:chapterId/:moduleId" element={<ModuleView />} />
            <Route path="lesson/:levelId" element={<Lesson />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* Auth Routes - Outside Layout */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
        </Routes>
      )}
    </>
  );
}

export default App;
