const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';

import SectionHeading from '@/components/SectionHeading';

export default function SisterCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.SisterCompany.list('displayOrder', 50)
      .then(res => { setCompanies(res); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && companies.length === 0) return null;

  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Our Conglomerate"
          title="A family of companies, built on trust."
          subtitle="DLTC is part of a distinguished group of companies serving Bangladesh since 2003."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-theme-surface border border-gold/10 animate-pulse" />
            ))
          ) : (
            companies.map(company => (
              <div key={company.id} className="relative glass-card rounded-2xl p-6 overflow-hidden group hover:transform hover:-translate-y-1 transition-all duration-500">
                <div className="absolute -top-4 -right-2 text-8xl font-serif-display text-gold/5 select-none">
                  {company.startYear}
                </div>
                <div className="relative">
                  <p className="text-gold text-xs font-medium tracking-widest mb-2">EST. {company.startYear}</p>
                  <h3 className="font-serif-display text-xl text-theme-heading mb-2">{company.name}</h3>
                  {company.tagline && <p className="text-gold/70 text-xs font-medium mb-3">{company.tagline}</p>}
                  {company.description && <p className="text-theme-body text-sm leading-relaxed">{company.description}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}