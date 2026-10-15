import { Link, NavLink, Outlet } from 'react-router-dom';
import { Bookmark, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SiteLayout() {
  const { user, logout } = useAuth();
  const navClass = ({ isActive }) =>
    `border-b-2 px-2 py-1 font-mono text-xs uppercase tracking-widest ${isActive ? 'border-inkred text-inkred' : 'border-transparent hover:border-charcoal'}`;

  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-charcoal">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 py-5">
          <Link to="/feed" className="font-display text-4xl font-black tracking-tighter">AERO<span className="text-inkred">.</span></Link>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.25em] md:block">The intelligent daily dispatch</div>
          <button onClick={logout} className="flex items-center gap-2 font-mono text-xs uppercase hover:text-inkred"><LogOut size={15} /> Exit</button>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-5 pb-3">
          <NavLink to="/feed" className={navClass}>News desk</NavLink>
          <NavLink to="/saved" className={navClass}><span className="flex items-center gap-1"><Bookmark size={13} /> Saved</span></NavLink>
          <NavLink to="/preferences" className={navClass}>Preferences</NavLink>
          <NavLink to="/profile" className={navClass}><span className="flex items-center gap-1"><Settings size={13} /> Profile</span></NavLink>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8"><Outlet /></main>
      <footer className="mx-auto max-w-7xl border-t-2 border-charcoal px-5 py-5 font-mono text-[10px] uppercase tracking-widest">AERO / Independent news, intelligently arranged / {user?.name || 'Reader'}</footer>
    </div>
  );
}
