const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Save, Video } from 'lucide-react';

const inputCls = "w-full px-4 py-2.5 bg-theme-bg border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none placeholder:text-theme-muted";

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ introVideoUrl: '', heroHeadline: '', heroSubheadline: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    db.entities.AppSettings.list()
      .then(res => {
        if (res.length > 0) {
          setSettings(res[0]);
          setForm({
            introVideoUrl: res[0].introVideoUrl || '',
            heroHeadline: res[0].heroHeadline || '',
            heroSubheadline: res[0].heroSubheadline || '',
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settings) {
        await db.entities.AppSettings.update(settings.id, form);
      } else {
        const created = await db.entities.AppSettings.create(form);
        setSettings(created);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { console.error(e); alert('Failed to save.'); }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif-display text-3xl text-theme-heading mb-1">Settings</h1>
        <p className="text-theme-body text-sm">Manage homepage content and settings.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-theme-surface border border-gold/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Video className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-theme-heading font-semibold text-sm">Introduction Video</h2>
              <p className="text-theme-muted text-xs">YouTube or Vimeo URL for homepage video section.</p>
            </div>
          </div>
          <label className="block text-theme-body text-sm mb-1.5">Video URL</label>
          <input className={inputCls} value={form.introVideoUrl} onChange={e => setForm(p => ({ ...p, introVideoUrl: e.target.value }))} placeholder="https://www.youtube.com/watch?v=..." />
          <p className="text-theme-muted text-xs mt-2">Leave empty to show "Video Coming Soon" placeholder on homepage.</p>
        </div>

        <div className="bg-theme-surface border border-gold/10 rounded-2xl p-6">
          <h2 className="text-theme-heading font-semibold text-sm mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-theme-body text-sm mb-1.5">Hero Headline</label>
              <input className={inputCls} value={form.heroHeadline} onChange={e => setForm(p => ({ ...p, heroHeadline: e.target.value }))} placeholder="Your Global Career, Defined." />
            </div>
            <div>
              <label className="block text-theme-body text-sm mb-1.5">Hero Subheadline</label>
              <textarea className={inputCls} rows={2} value={form.heroSubheadline} onChange={e => setForm(p => ({ ...p, heroSubheadline: e.target.value }))} placeholder="Language and technical training for foreign employment..." />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all disabled:opacity-40">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && <p className="text-green-400 text-sm">Settings saved successfully!</p>}
        </div>
      </div>
    </div>
  );
}