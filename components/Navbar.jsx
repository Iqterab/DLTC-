import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Courses', path: '/courses' },
  { label: 'Notices', path: '/notices' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || mobileOpen ? 'bg-[#050C1A]/95 backdrop-blur-xl border-b border-gold/10' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
            <Globe className="w-5 h-5 text-gold" />
          </div>
          <div className="hidden sm:block">
            <p className="font-serif-display text-xl text-white leading-none">DLTC</p>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase">Language & Training</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              className={`text-sm font-medium transition-colors relative group ${
                location.pathname === link.path ? 'text-gold' : 'text-white/80 hover:text-white'
              }`}>
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/enroll" className="hidden sm:inline-flex items-center px-6 py-2.5 rounded-full bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all hover:shadow-lg hover:shadow-gold/20">
            Enroll Now
          </Link>
          <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-[#050C1A] border-t border-gold/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className={`text-sm font-medium ${location.pathname === link.path ? 'text-gold' : 'text-white/80'}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/enroll" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gold text-[#050C1A] text-sm font-semibold mt-2">
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}