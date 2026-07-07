const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ArrowRight } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';

export default function NoticePreview() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.NoticeBoard.filter({ isPublished: true }, '-date', 3)
      .then(res => { setNotices(res); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && notices.length === 0) return null;

  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Notice Board"
            title="Latest announcements."
          />
          <Link to="/notices" className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all text-sm font-medium whitespace-nowrap">
            View All Notices <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-theme-surface border border-gold/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map(notice => (
              <div key={notice.id} className="glass-card rounded-2xl p-6 flex items-start gap-4 group hover:transform hover:translate-x-2 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="text-theme-heading font-semibold mb-1">{notice.title}</h3>
                  <p className="text-theme-body text-sm line-clamp-2">{notice.body}</p>
                  {notice.date && (
                    <p className="text-gold/60 text-xs mt-2">
                      {new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}