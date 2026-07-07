const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.NoticeBoard.filter({ isPublished: true }, '-date', 100)
      .then(res => { setNotices(res); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="pt-32 pb-12 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Notice Board" title="Announcements & Updates." subtitle="Stay informed about important dates, new courses, and centre updates." />
        </div>
      </section>

      <section className="pb-24 bg-theme-bg">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-28 rounded-2xl bg-theme-surface border border-gold/10 animate-pulse" />)}
            </div>
          ) : notices.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Bell className="w-12 h-12 text-gold/30 mx-auto mb-4" />
              <p className="text-theme-body">No notices published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map(notice => (
                <div key={notice.id} className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-theme-heading font-semibold">{notice.title}</h3>
                      {notice.date && (
                        <span className="text-gold/60 text-xs whitespace-nowrap">
                          {new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <p className="text-theme-body text-sm leading-relaxed">{notice.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}