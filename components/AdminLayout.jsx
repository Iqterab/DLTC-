const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, BookOpen, Bell, Users, FileText, Settings, LogOut, Menu, Globe } from 'lucide-react';

import ThemeToggle from '@/components/ThemeToggle';

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Enrollments', path: '/admin/enrollments', icon: ClipboardList },
  { label: 'Courses', path: '/admin/courses', icon: BookOpen },
  { label: 'Notices', path: '/admin/notices', icon: Bell },
  { label: 'Team Members', path: '/admin/team', icon: Users },
  { label: 'Blog Posts', path: '/admin/blog', icon: FileText },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await db.auth.logout('/login');
  };

  return (
    <div className="min-h-screen bg-[#050C1A] flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0A1628] border-r border-gold/10 z-50 transition-transform duration-300 flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 border-b border-gold/10 shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center">
              <Globe className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-serif-display text-lg text-white">DLTC</p>
              <p className="text-[9px] text-slate-400 tracking-wider uppercase">Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="p-4 flex flex-col gap-1 flex-1 overflow-y-auto">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-gold/10 text-gold border-l-2 border-gold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gold/10 shrink-0">
          <div className="flex justify-center mb-3">
            <ThemeToggle />
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-[#0A1628] border-b border-gold/10 px-6 h-16 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-white font-medium text-sm">Admin Panel</span>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}