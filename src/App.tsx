import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { useUserStore } from './store/userStore';

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'));
const HomeDuolingo = lazy(() => import('./pages/HomeDuolingo'));
const BattlePage = lazy(() => import('./pages/BattlePage'));
const ChapterList = lazy(() => import('./pages/ChapterList'));
const ChapterView = lazy(() => import('./pages/ChapterView'));
const ModuleView = lazy(() => import('./pages/ModuleView'));
const Lesson = lazy(() => import('./pages/Lesson'));
const Profile = lazy(() => import('./pages/Profile'));
const Performance = lazy(() => import('./pages/Performance'));
const PracticeSetup = lazy(() => import('./pages/PracticeSetup'));
const PracticeSession = lazy(() => import('./pages/PracticeSession'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SuperAdminDashboard = lazy(() => import('./pages/SuperAdminDashboard'));
const Shop = lazy(() => import('./pages/Shop'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Home - Outside Layout (has its own nav) */}
            <Route path="/" element={
              <ProtectedRoute>
                <HomeDuolingo />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="battle" element={<BattlePage />} />
              <Route path="mcqs" element={<PracticeSetup />} />
              <Route path="shop" element={<Shop />} />
              <Route path="practice" element={<PracticeSetup />} />
              <Route path="practice/:subjectId" element={<PracticeSetup />} />
              <Route path="chapter/:subjectId/:grade" element={<ChapterList />} />
              <Route path="chapter/:subjectId/:grade/:chapterId" element={<ChapterView />} />
              <Route path="module/:subjectId/:chapterId/:moduleId" element={<ModuleView />} />
              <Route path="lesson/:levelId" element={<Lesson />} />
              <Route path="profile" element={<Profile />} />
              <Route path="performance" element={<Performance />} />
            </Route>
            {/* Practice Session - Outside Layout (no nav bar) */}
            <Route path="/practice/session" element={
              <ProtectedRoute>
                <PracticeSession />
              </ProtectedRoute>
            } />
            {/* Auth Routes - Outside Layout */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/superadmin" element={<SuperAdminDashboard />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
