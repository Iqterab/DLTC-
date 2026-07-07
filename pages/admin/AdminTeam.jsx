const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import AdminModal from '@/components/admin/AdminModal';
import ImageUpload from '@/components/admin/ImageUpload';

const inputCls = "w-full px-4 py-2.5 bg-theme-bg border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none placeholder:text-theme-muted";

const empty = { name: '', role: '', photo: '', bio: '', phone: '', skills: '', experience: '', displayOrder: 0 };

export default function AdminTeam() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    db.entities.TeamMember.list('displayOrder', 100)
      .then(res => { setItems(res); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) await db.entities.TeamMember.update(editing.id, form);
      else await db.entities.TeamMember.create(form);
      setModalOpen(false);
      load();
    } catch (e) { console.error(e); alert('Failed to save.'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this team member?')) return;
    await db.entities.TeamMember.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif-display text-3xl text-theme-heading mb-1">Team Members</h1>
          <p className="text-theme-body text-sm">Manage leadership profiles.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-64 bg-theme-surface rounded-xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="bg-theme-surface border border-gold/10 rounded-2xl p-12 text-center"><p className="text-theme-body">No team members yet.</p></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-theme-surface border border-gold/10 rounded-xl overflow-hidden">
              <div className="aspect-square bg-theme-bg overflow-hidden">
                {item.photo ? <img src={item.photo} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="font-serif-display text-4xl text-gold/20">{item.name?.charAt(0)}</span></div>}
              </div>
              <div className="p-4">
                <h3 className="text-theme-heading font-semibold text-sm">{item.name}</h3>
                <p className="text-gold text-xs mt-1">{item.role}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-theme-bg text-theme-body hover:text-gold text-xs transition-colors"><Pencil className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="px-3 py-2 rounded-lg bg-theme-bg text-red-400/60 hover:text-red-400 text-xs transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Member' : 'Add Member'}>
        <div className="space-y-4">
          <div><label className="block text-theme-body text-sm mb-1.5">Name</label><input className={inputCls} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Role</label><input className={inputCls} value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} placeholder="Chairman, MD, etc." /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Phone</label><input className={inputCls} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="01XXXXXXXXX" /></div>
          <ImageUpload value={form.photo} onChange={url => setForm(p => ({ ...p, photo: url }))} label="Photo" />
          <div><label className="block text-theme-body text-sm mb-1.5">Email / Short Bio</label><textarea className={inputCls} rows={2} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Email address or short bio" /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Skills</label><textarea className={inputCls} rows={2} value={form.skills} onChange={e => setForm(p => ({ ...p, skills: e.target.value }))} placeholder="Leadership, Strategic Planning, etc." /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Experience</label><textarea className={inputCls} rows={2} value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} placeholder="15+ years in education management..." /></div>
          <div><label className="block text-theme-body text-sm mb-1.5">Display Order</label><input type="number" className={inputCls} value={form.displayOrder} onChange={e => setForm(p => ({ ...p, displayOrder: parseInt(e.target.value) || 0 }))} /></div>
          <button onClick={handleSave} disabled={saving} className="w-full px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all disabled:opacity-40">
            {saving ? 'Saving...' : 'Save Member'}
          </button>
        </div>
      </AdminModal>
    </div>
  );
}