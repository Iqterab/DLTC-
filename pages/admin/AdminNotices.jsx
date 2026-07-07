const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import AdminModal from '@/components/admin/AdminModal';

const inputCls = "w-full px-4 py-2.5 bg-theme-bg border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none placeholder:text-theme-muted";

const empty = { title: '', body: '', date: new Date().toISOString().split('T')[0], isPublished: true };

export default function AdminNotices() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    db.entities.NoticeBoard.list('-date', 100)
      .then(res => { setItems(res); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, date: item.date ? new Date(item.date).toISOString().split('T')[0] : '' }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) await db.entities.NoticeBoard.update(editing.id, form);
      else await db.entities.NoticeBoard.create(form);
      setModalOpen(false);
      load();
    } catch (e) { console.error(e); alert('Failed to save.'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this notice?')) return;
    await db.entities.NoticeBoard.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif-display text-3xl text-theme-heading mb-1">Notices</h1>
          <p className="text-theme-body text-sm">Manage notice board announcements.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all">
          <Plus className="w-4 h-4" /> Add Notice
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-theme-surface rounded-xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="bg-theme-surface border border-gold/10 rounded-2xl p-12 text-center"><p className="text-theme-body">No notices yet.</p></div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-theme-surface border border-gold/10 rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-theme-heading font-semibold text-sm">{item.title}</h3>
                  {!item.isPublished && <span className="px-2 py-0.5 rounded-full text-xs bg-theme-heading/20 text-theme-body">Draft</span>}
                </div>
                <p className="text-theme-body text-sm line-clamp-2">{item.body}</p>
                {item.date && <p className="text-gold/60 text-xs mt-2">{new Date(item.date).toLocaleDateString()}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg bg-theme-bg flex items-center justify-center text-theme-body hover:text-gold transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg bg-theme-bg flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Notice' : 'Add Notice'}>
        <div className="space-y-4">
          <div><label className="block text-theme-body text-sm mb-1.5">Title</label><input className={inputCls} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Body</label><textarea className={inputCls} rows={5} value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Date</label><input type="date" className={inputCls} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))} className="w-4 h-4 accent-gold" />
            <span className="text-theme-body text-sm">Published</span>
          </label>
          <button onClick={handleSave} disabled={saving} className="w-full px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all disabled:opacity-40">
            {saving ? 'Saving...' : 'Save Notice'}
          </button>
        </div>
      </AdminModal>
    </div>
  );
}