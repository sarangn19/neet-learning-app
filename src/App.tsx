import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
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
    </Routes>
  );
}

export default App;
