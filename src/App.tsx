import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SubjectSelect from './pages/SubjectSelect';
import ChapterMap from './pages/ChapterMap';
import ChapterView from './pages/ChapterView';
import ModuleView from './pages/ModuleView';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<SubjectSelect />} />
        <Route path="learn/:subjectId/:grade" element={<ChapterMap />} />
        <Route path="learn/:subjectId/:grade/:chapterId" element={<ChapterView />} />
        <Route path="learn/:subjectId/:grade/:chapterId/:moduleId" element={<ModuleView />} />
        <Route path="lesson/:levelId" element={<Lesson />} />
        <Route path="profile" element={<Profile />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
}

export default App;
