import { Plane, Briefcase, Clock, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const visaServices = [
  { type: 'Running', title: 'Student Visa', desc: 'Active intake for study abroad programs.', icon: Plane },
  { type: 'Running', title: 'Work Permit Visa', desc: 'Skilled and non-skilled worker placement ongoing.', icon: Briefcase },
  { type: 'Upcoming', title: 'Student Visa', desc: 'New batch opening soon — reserve your spot.', icon: Sparkles },
  { type: 'Upcoming', title: 'Work Permit Visa', desc: 'Upcoming opportunities in multiple countries.', icon: Clock },
];

export default function VisaSection() {
  return (
    <section className="py-24 bg-theme-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Visa Consultancy"
          title="Your pathway to foreign employment & education."
          subtitle="We handle both student and work permit visas — with running intakes and upcoming opportunities."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {visaServices.map((visa, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 group hover:transform hover:-translate-y-1 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <visa.icon className="w-5 h-5 text-gold" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  visa.type === 'Running' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'
                }`}>
                  {visa.type}
                </span>
              </div>
              <h3 className="text-theme-heading font-semibold mb-2">{visa.title}</h3>
              <p className="text-theme-body text-sm">{visa.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}