import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, User, Flame, Gem, Heart } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';

export default function Layout() {
  const location = useLocation();
  const { xp, level, streak, gems, hearts } = useUserStore();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">ScienceLearn</span>
            </Link>

            {/* Stats */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Hearts */}
              <div className="stat-badge bg-brand-red/10 text-brand-red">
                <Heart className="w-4 h-4 fill-current" />
                <span>{hearts}/5</span>
              </div>
              
              {/* Gems */}
              <div className="stat-badge bg-brand-blue/10 text-brand-blue">
                <Gem className="w-4 h-4" />
                <span>{gems}</span>
              </div>
              
              {/* Streak */}
              <div className="stat-badge bg-brand-orange/10 text-brand-orange">
                <Flame className="w-4 h-4 fill-current" />
                <span>{streak}</span>
              </div>
              
              {/* XP / Level */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-yellow"
                    initial={{ width: 0 }}
                    animate={{ width: `${(xp % 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="font-bold text-gray-600 text-sm">Lvl {level}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t-2 border-gray-200 sticky bottom-0 z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            <NavItem to="/" icon={<Home className="w-6 h-6" />} label="Home" isActive={isActive('/')} />
            <NavItem to="/learn" icon={<BookOpen className="w-6 h-6" />} label="Learn" isActive={location.pathname.includes('/learn')} />
            <NavItem to="/leaderboard" icon={<Trophy className="w-6 h-6" />} label="League" isActive={isActive('/leaderboard')} />
            <NavItem to="/profile" icon={<User className="w-6 h-6" />} label="Profile" isActive={isActive('/profile')} />
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, isActive }: { to: string; icon: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <Link 
      to={to}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'text-brand-blue bg-brand-blue/10 border-b-4 border-brand-blue' 
          : 'text-gray-400 hover:text-gray-600 border-b-4 border-transparent'
      } active:border-b-0 active:translate-y-1`}
    >
      {icon}
      <span className="text-xs font-bold">{label}</span>
    </Link>
  );
}
