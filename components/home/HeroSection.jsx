import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';

const countries = ['Japan', 'Malta', 'Serbia', 'Korea', 'China', 'England'];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050C1A]">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
          alt="Global connection"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050C1A] via-theme-bg/90 to-[#050C1A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A] via-transparent to-[#050C1A]/60" />
      </div>

      {/* Gold compass lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center pt-20">
        {/* Left: Headline */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-medium tracking-wide">Est. 2025 — Global Academy</span>
          </div>
          <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05]">
            Your Global Career,
            <br />
            <span className="text-gradient-gold">Defined.</span>
          </h1>
          <p className="text-slate-300 text-lg mt-6 max-w-lg leading-relaxed">
            Language and technical training for foreign employment and study abroad.
            Your bridge to the world's leading economies — from Japan to Malta.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/enroll" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-[#050C1A] font-semibold hover:bg-gold-light transition-all hover:shadow-xl hover:shadow-gold/20">
              Enroll Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/courses" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-theme-heading/30 text-white font-medium hover:border-gold/50 hover:text-gold transition-all">
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Right: Orbital navigation */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-96 h-96">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-gold/15" />
            <div className="absolute inset-8 rounded-full border border-gold/10" />
            <div className="absolute inset-16 rounded-full border border-gold/5" />

            {/* Rotating country labels */}
            <div className="absolute inset-0" style={{ animation: 'slow-rotate 60s linear infinite' }}>
              {countries.map((country, i) => {
                const angle = (i / countries.length) * 360;
                return (
                  <div key={country}
                    className="absolute top-1/2 left-1/2"
                    style={{ transform: `rotate(${angle}deg) translateY(-175px)` }}>
                    <span className="block text-white/70 text-sm font-medium tracking-wide whitespace-nowrap"
                      style={{ animation: 'slow-rotate 60s linear infinite reverse', transform: `rotate(-${angle}deg)` }}>
                      {country}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Center globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 rounded-full border border-gold/30 bg-[#050C1A]/80 backdrop-blur-sm flex items-center justify-center animate-float">
                <Globe className="w-12 h-12 text-gold" />
              </div>
            </div>

            {/* Gold dots on ring */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold/40" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold/40" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-gold/40" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-gold/40" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  );
}