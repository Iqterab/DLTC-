const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import AdminModal from '@/components/admin/AdminModal';

const inputCls = "w-full px-4 py-2.5 bg-theme-bg border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none placeholder:text-theme-muted";

const empty = { name: '', language: '', level: '', duration: '', fee: '', seatsAvailable: 0, status: 'Upcoming', description: '', displayOrder: 0 };

export default function AdminCourses() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    db.entities.Course.list('displayOrder', 100)
      .then(res => { setItems(res); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) await db.entities.Course.update(editing.id, form);
      else await db.entities.Course.create(form);
      setModalOpen(false);
      load();
    } catch (e) { console.error(e); alert('Failed to save.'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return;
    await db.entities.Course.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif-display text-3xl text-theme-heading mb-1">Courses</h1>
          <p className="text-theme-body text-sm">Manage language courses.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all">
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-theme-surface rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-theme-surface border border-gold/10 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-theme-heading font-semibold">{item.name}</h3>
                  {item.language && <p className="text-theme-body text-xs mt-1">{item.language}</p>}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Running' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'}`}>{item.status}</span>
              </div>
              {item.description && <p className="text-theme-body text-xs mb-3 line-clamp-2">{item.description}</p>}
              <div className="flex items-center gap-3 text-xs text-theme-muted mb-4">
                {item.level && <span>{item.level}</span>}
                {item.duration && <span>· {item.duration}</span>}
                {item.fee && <span className="text-gold/60">· {item.fee}</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-theme-bg text-theme-body hover:text-gold text-xs transition-colors">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="flex items-center justify-center px-3 py-2 rounded-lg bg-theme-bg text-red-400/60 hover:text-red-400 text-xs transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Course' : 'Add Course'}>
        <div className="space-y-4">
          <div><label className="block text-theme-body text-sm mb-1.5">Course Name</label><input className={inputCls} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-theme-body text-sm mb-1.5">Language</label><input className={inputCls} value={form.language} onChange={e => setForm(p => ({ ...p, language: e.target.value }))} /></div>
            <div><label className="block text-theme-body text-sm mb-1.5">Level</label><input className={inputCls} value={form.level} onChange={e => setForm(p => ({ ...p, level: e.target.value }))} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-theme-body text-sm mb-1.5">Duration</label><input className={inputCls} value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} /></div>
            <div><label className="block text-theme-body text-sm mb-1.5">Fee</label><input className={inputCls} value={form.fee} onChange={e => setForm(p => ({ ...p, fee: e.target.value }))} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-theme-body text-sm mb-1.5">Seats Available</label><input type="number" className={inputCls} value={form.seatsAvailable} onChange={e => setForm(p => ({ ...p, seatsAvailable: parseInt(e.target.value) || 0 }))} /></div>
            <div><label className="block text-theme-body text-sm mb-1.5">Status</label><select className={inputCls} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}><option value="Upcoming">Upcoming</option><option value="Running">Running</option></select></div>
          </div>
          <div><label className="block text-theme-body text-sm mb-1.5">Description</label><textarea className={inputCls} rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Display Order</label><input type="number" className={inputCls} value={form.displayOrder} onChange={e => setForm(p => ({ ...p, displayOrder: parseInt(e.target.value) || 0 }))} /></div>
          <button onClick={handleSave} disabled={saving} className="w-full px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all disabled:opacity-40">
            {saving ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </AdminModal>
    </div>
  );
}