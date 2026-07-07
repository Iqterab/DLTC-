import { Link } from 'react-router-dom';
import { Target, Eye, Plane, Briefcase, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export default function AboutSection() {
  return (
    <section className="py-24 bg-theme-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="About DLTC"
              title="Building bridges between Bangladesh and the world."
              subtitle="Founded in 2025, DLTC is a multinational language and technical training centre dedicated to preparing students for foreign employment and education opportunities."
            />
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-theme-heading font-semibold mb-1">Our Mission</h3>
                  <p className="text-theme-body text-sm leading-relaxed">
                    District-wise centres all over Bangladesh. Service care — home and abroad — with work station placement.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-theme-heading font-semibold mb-1">Our Vision</h3>
                  <p className="text-theme-body text-sm leading-relaxed">
                    Language and technical training for foreign working — empowering every student with the skills they need to succeed globally.
                  </p>
                </div>
              </div>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all text-sm font-medium mt-8">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6">
              <Plane className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-theme-heading font-semibold mb-2">Student Visa Consultancy</h3>
              <p className="text-theme-body text-sm">Complete guidance for study abroad opportunities across our partner countries.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 mt-8">
              <Briefcase className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-theme-heading font-semibold mb-2">Worker Visa Consultancy</h3>
              <p className="text-theme-body text-sm">Skilled and non-skilled worker placement with full visa support.</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="text-5xl font-serif-display text-gradient-gold">2025</div>
              <p className="text-theme-body text-sm mt-2">Founded with a vision for global mobility.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 mt-8">
              <div className="text-5xl font-serif-display text-gradient-gold">6+</div>
              <p className="text-theme-body text-sm mt-2">Languages taught by experienced instructors.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}