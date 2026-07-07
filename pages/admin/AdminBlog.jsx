const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import AdminModal from '@/components/admin/AdminModal';
import ImageUpload from '@/components/admin/ImageUpload';

const inputCls = "w-full px-4 py-2.5 bg-theme-bg border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none placeholder:text-theme-muted";

const empty = { title: '', content: '', coverImage: '', publishDate: new Date().toISOString().split('T')[0], isPublished: true };

export default function AdminBlog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    db.entities.BlogPost.list('-publishDate', 100)
      .then(res => { setItems(res); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, publishDate: item.publishDate ? new Date(item.publishDate).toISOString().split('T')[0] : '' }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) await db.entities.BlogPost.update(editing.id, form);
      else await db.entities.BlogPost.create(form);
      setModalOpen(false);
      load();
    } catch (e) { console.error(e); alert('Failed to save.'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    await db.entities.BlogPost.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif-display text-3xl text-theme-heading mb-1">Blog Posts</h1>
          <p className="text-theme-body text-sm">Manage blog articles.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all">
          <Plus className="w-4 h-4" /> Add Post
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-theme-surface rounded-xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="bg-theme-surface border border-gold/10 rounded-2xl p-12 text-center"><p className="text-theme-body">No blog posts yet.</p></div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-theme-surface border border-gold/10 rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="flex gap-4 flex-1 min-w-0">
                {item.coverImage && <img src={item.coverImage} alt="" className="w-16 h-16 object-cover rounded-lg border border-gold/20 shrink-0" />}
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-theme-heading font-semibold text-sm">{item.title}</h3>
                    {!item.isPublished && <span className="px-2 py-0.5 rounded-full text-xs bg-theme-heading/20 text-theme-body">Draft</span>}
                  </div>
                  <p className="text-theme-body text-sm line-clamp-2">{item.content?.replace(/[#*]/g, '').slice(0, 120)}</p>
                  {item.publishDate && <p className="text-gold/60 text-xs mt-2">{new Date(item.publishDate).toLocaleDateString()}</p>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg bg-theme-bg flex items-center justify-center text-theme-body hover:text-gold transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg bg-theme-bg flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Post' : 'Add Post'}>
        <div className="space-y-4">
          <div><label className="block text-theme-body text-sm mb-1.5">Title</label><input className={inputCls} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Content (Markdown supported)</label><textarea className={inputCls} rows={8} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} /></div>
          <ImageUpload value={form.coverImage} onChange={url => setForm(p => ({ ...p, coverImage: url }))} label="Cover Image" />
          <div><label className="block text-theme-body text-sm mb-1.5">Publish Date</label><input type="date" className={inputCls} value={form.publishDate} onChange={e => setForm(p => ({ ...p, publishDate: e.target.value }))} /></div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))} className="w-4 h-4 accent-gold" />
            <span className="text-theme-body text-sm">Published</span>
          </label>
          <button onClick={handleSave} disabled={saving} className="w-full px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all disabled:opacity-40">
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </AdminModal>
    </div>
  );
}