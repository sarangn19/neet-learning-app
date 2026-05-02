import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Swords, BookOpen, BarChart3 } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Main Content */}
      <main className="flex-1 pb-24">
        <Outlet />
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl z-50 shadow-xl">
        <div className="flex items-center justify-around py-3">
          <NavItem to="/" icon={<Home className="w-5 h-5" />} label="Home" isActive={isActive('/')} />
          <NavItem to="/battle" icon={<Swords className="w-5 h-5" />} label="Battle" isActive={isActive('/battle')} />
          <NavItem to="/mcqs" icon={<BookOpen className="w-5 h-5" />} label="MCQs" isActive={isActive('/mcqs')} />
          <NavItem to="/performance" icon={<BarChart3 className="w-5 h-5" />} label="Stats" isActive={isActive('/performance')} />
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
      className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
        isActive ? 'bg-amber-100' : 'hover:bg-gray-100'
      }`}
    >
      <div className={`${isActive ? 'text-amber-600' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className={`text-[10px] ${isActive ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
    </Link>
  );
}
