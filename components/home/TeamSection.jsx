const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Phone, Mail, Briefcase, Star } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';

function TeamCard({ member }) {
  const [activeTab, setActiveTab] = useState('contact');

  const tabs = [
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'experience', label: 'Experience', icon: Briefcase },
  ];

  return (
    <div className="glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:transform hover:-translate-y-1">
      {/* Photo */}
      <div className="aspect-[4/5] bg-theme-bg overflow-hidden relative">
        {member.photo ? (
          <img src={member.photo} alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-24 h-24 rounded-full border-2 border-gold/20 flex items-center justify-center">
              <span className="font-serif-display text-4xl text-gold/30">
                {member.name?.charAt(0)}
              </span>
            </div>
            <p className="text-theme-muted text-xs">Photo coming soon</p>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-theme-bg to-transparent" />
      </div>

      {/* Name & Role */}
      <div className="px-5 pt-4 pb-3 text-center">
        <h3 className="text-theme-heading font-serif-display text-xl">{member.name}</h3>
        <p className="text-gold text-sm mt-0.5">{member.role}</p>
      </div>

      {/* Tabs */}
      <div className="border-t border-gold/10">
        <div className="flex">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all ${
                activeTab === tab.id ? 'text-gold bg-gold/5 border-b-2 border-gold' : 'text-theme-muted hover:text-theme-body border-b-2 border-transparent'
              }`}>
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 bg-theme-bg/50 min-h-[72px] flex items-center">
          {activeTab === 'contact' && (
            <div className="space-y-1.5 w-full">
              {member.phone && (
                <p className="flex items-center gap-2 text-theme-body text-sm">
                  <Phone className="w-3.5 h-3.5 text-gold/60 shrink-0" /> {member.phone}
                </p>
              )}
              {member.bio && (
                <p className="flex items-start gap-2 text-theme-body text-xs">
                  <Mail className="w-3.5 h-3.5 text-gold/60 shrink-0 mt-0.5" /> {member.bio}
                </p>
              )}
              {!member.phone && !member.bio && <p className="text-theme-muted text-xs text-center">No contact info yet.</p>}
            </div>
          )}
          {activeTab === 'skills' && (
            <p className="text-theme-body text-xs leading-relaxed">{member.skills || 'Skills information will be updated soon.'}</p>
          )}
          {activeTab === 'experience' && (
            <p className="text-theme-body text-xs leading-relaxed">{member.experience || 'Experience details will be updated soon.'}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.TeamMember.list('displayOrder', 50)
      .then(res => { setMembers(res); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && members.length === 0) return null;

  return (
    <section className="py-24 bg-theme-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Our Team"
          title="Meet Our Experts"
          subtitle="Dedicated professionals committed to delivering exceptional results."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-96 rounded-2xl bg-theme-bg border border-gold/10 animate-pulse" />
            ))
          ) : (
            members.map(member => (
              <TeamCard key={member.id} member={member} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}