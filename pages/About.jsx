const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Target, Eye, Plane, Briefcase, Building2, Calendar } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';

export default function About() {
  const [companies, setCompanies] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    db.entities.SisterCompany.list('displayOrder', 50).then(setCompanies).catch(() => {});
    db.entities.TeamMember.list('displayOrder', 50).then(setMembers).catch(() => {});
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 bg-theme-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80" alt="Students" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="About DLTC"
            title="A multinational vision for global mobility."
            subtitle="Destination Language & Training Centre was founded in 2025 as part of a distinguished conglomerate serving Bangladesh since 2003. We prepare students for foreign employment and education through language and technical training."
          />
        </div>
      </section>

      <section className="py-20 bg-theme-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8">
            <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif-display text-2xl text-theme-heading mb-3">Our Mission</h3>
            <p className="text-theme-body leading-relaxed">
              District-wise centres all over Bangladesh. Service care — home and abroad — with work station placement.
              We exist to make global opportunities accessible to every Bangladeshi student and worker.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-8">
            <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif-display text-2xl text-theme-heading mb-3">Our Vision</h3>
            <p className="text-theme-body leading-relaxed">
              Language and technical training for foreign working — empowering every student with the skills,
              knowledge, and cultural understanding they need to succeed on the global stage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading center eyebrow="Our Services" title="What we do." subtitle="Language training, technical training, and complete visa consultancy." />
          <div className="grid sm:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 flex items-start gap-4">
              <Plane className="w-8 h-8 text-gold shrink-0" />
              <div>
                <h3 className="text-theme-heading font-semibold mb-2">Student Visa Consultancy</h3>
                <p className="text-theme-body text-sm">Complete guidance for study abroad programs across our partner countries — from application to arrival.</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 flex items-start gap-4">
              <Briefcase className="w-8 h-8 text-gold shrink-0" />
              <div>
                <h3 className="text-theme-heading font-semibold mb-2">Worker Visa Consultancy</h3>
                <p className="text-theme-body text-sm">Skilled and non-skilled worker placement with full visa support and overseas employment assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-theme-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading center eyebrow="Our Conglomerate" title="The DLTC family of companies." subtitle="Built on trust since 2003." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {companies.length > 0 ? companies.map(c => (
              <div key={c.id} className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -top-4 -right-2 text-7xl font-serif-display text-gold/5 select-none">{c.startYear}</div>
                <Building2 className="w-8 h-8 text-gold mb-3" />
                <p className="text-gold text-xs font-medium tracking-widest mb-1">EST. {c.startYear}</p>
                <h3 className="font-serif-display text-xl text-theme-heading mb-2">{c.name}</h3>
                {c.tagline && <p className="text-gold/70 text-xs mb-2">{c.tagline}</p>}
                {c.description && <p className="text-theme-body text-sm">{c.description}</p>}
              </div>
            )) : (
              <>
                <div className="glass-card rounded-2xl p-6"><Building2 className="w-8 h-8 text-gold mb-3" /><p className="text-gold text-xs mb-1">EST. 2017</p><h3 className="text-theme-heading mb-2">Salim Shipping Line</h3><p className="text-theme-body text-sm">Import-Export & Clearing Forwarding Company</p></div>
                <div className="glass-card rounded-2xl p-6"><Building2 className="w-8 h-8 text-gold mb-3" /><p className="text-gold text-xs mb-1">EST. 2010</p><h3 className="text-theme-heading mb-2">Salim Engineer's</h3><p className="text-theme-body text-sm">Contractor, Supplier & Logistic Service</p></div>
                <div className="glass-card rounded-2xl p-6"><Building2 className="w-8 h-8 text-gold mb-3" /><p className="text-gold text-xs mb-1">EST. 2009</p><h3 className="text-theme-heading mb-2">Farjana Nursery & Forest</h3><p className="text-theme-body text-sm">Horticulture & Plantation</p></div>
                <div className="glass-card rounded-2xl p-6"><Building2 className="w-8 h-8 text-gold mb-3" /><p className="text-gold text-xs mb-1">EST. 2003</p><h3 className="text-theme-heading mb-2">Salim Engineer's & Builder's</h3><p className="text-theme-body text-sm">Computer ICT</p></div>
                <div className="glass-card rounded-2xl p-6"><Building2 className="w-8 h-8 text-gold mb-3" /><p className="text-gold text-xs mb-1">EST. 2025</p><h3 className="text-theme-heading mb-2">DLTC</h3><p className="text-theme-body text-sm">Language & Training Center</p></div>
              </>
            )}
          </div>
        </div>
      </section>

      {members.length > 0 && (
        <section className="py-20 bg-theme-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeading center eyebrow="Leadership" title="Admin Board" subtitle="Chairman, Managing Director, Executive Director & Director Board." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {members.map(m => (
                <div key={m.id} className="glass-card rounded-2xl overflow-hidden group">
                  <div className="aspect-square bg-theme-surface overflow-hidden">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><span className="font-serif-display text-5xl text-gold/20">{m.name?.charAt(0)}</span></div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-theme-heading font-semibold">{m.name}</h3>
                    <p className="text-gold text-sm mt-1">{m.role}</p>
                    {m.bio && <p className="text-theme-body text-xs mt-2">{m.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}