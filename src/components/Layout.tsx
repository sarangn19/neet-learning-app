import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, User } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pt-safe">
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
