const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Play, Globe } from 'lucide-react';

function getEmbedUrl(url) {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  return url;
}

export default function IntroVideo() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.AppSettings.list()
      .then(res => { setSettings(res[0] || null); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const embedUrl = getEmbedUrl(settings?.introVideoUrl);

  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-gold/50" />
          <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase">Introduction</p>
          <span className="h-px w-8 bg-gold/50" />
        </div>
        <h2 className="font-serif-display text-4xl md:text-5xl text-theme-heading mb-4">
          Discover DLTC
        </h2>
        <p className="text-theme-body text-lg mb-12 max-w-2xl mx-auto">
          Watch our story — from language training to global employment opportunities.
        </p>

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-gold/20 bg-theme-surface group">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title="DLTC Introduction Video"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#142850]/40 to-theme-bg/80" />
              <div className="relative w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center animate-pulse-gold">
                <Globe className="w-10 h-10 text-gold/50" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 text-gold/70 justify-center">
                  <Play className="w-4 h-4" />
                  <p className="text-theme-body text-sm font-medium">Introduction Video Coming Soon</p>
                </div>
                <p className="text-theme-muted text-xs mt-2">Our team is preparing something special for you.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}