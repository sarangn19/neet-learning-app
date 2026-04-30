import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingBag, Swords } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <NavItem to="/" icon={<Home className="w-5 h-5" />} label="Home" isActive={isActive('/')} />
          <NavItem to="/learn" icon={<BookOpen className="w-5 h-5" />} label="Learn" isActive={isActive('/learn')} />
          <NavItem to="/mcqs" icon={<span className="text-lg font-bold">Q</span>} label="MCQs" isActive={isActive('/mcqs')} />
          <NavItem to="/shop" icon={<ShoppingBag className="w-5 h-5" />} label="Shop" isActive={isActive('/shop')} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, isActive }: { to: string; icon: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <Link 
      to={to}
      className="flex flex-col items-center gap-1 py-1 px-3 relative"
    >
      <div className={`${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-xs ${isActive ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
        {label}
      </span>
      {isActive && (
        <div className="absolute -bottom-2 w-8 h-0.5 bg-gray-900 rounded-full" />
      )}
    </Link>
  );
}
