const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    db.entities.Enrollment.list('-created_date', 1000)
      .then(res => { setEnrollments(res); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = enrollments.filter(e => {
    const matchStatus = filter === 'All' || e.status === filter;
    const matchSearch = !search ||
      e.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      e.referenceNumber?.toLowerCase().includes(search.toLowerCase()) ||
      e.phone?.includes(search) ||
      e.email?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif-display text-3xl text-theme-heading mb-1">Enrollments</h1>
        <p className="text-theme-body text-sm">View and manage student applications.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
          <input
            placeholder="Search by name, reference, phone, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-theme-surface border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none placeholder:text-theme-muted"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f ? 'bg-gold text-[#050C1A]' : 'bg-theme-surface border border-theme-input text-theme-body hover:text-theme-heading'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-theme-surface rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-theme-surface border border-gold/10 rounded-2xl p-12 text-center">
          <p className="text-theme-body">No enrollments found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(e => (
            <div key={e.id} className="bg-theme-surface border border-gold/10 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-gold/20 transition-colors">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {e.passportPhoto ? (
                  <img src={e.passportPhoto} alt="" className="w-10 h-12 object-cover rounded border border-gold/20 shrink-0" />
                ) : (
                  <div className="w-10 h-12 rounded bg-theme-bg flex items-center justify-center shrink-0">
                    <span className="text-gold/30 text-xs">{e.fullName?.charAt(0)}</span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-theme-heading text-sm font-medium truncate">{e.fullName}</p>
                  <p className="text-gold/60 text-xs">{e.referenceNumber}</p>
                  <p className="text-theme-muted text-xs truncate">{e.phone} · {e.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  e.status === 'Approved' ? 'bg-green-500/15 text-green-400' :
                  e.status === 'Rejected' ? 'bg-red-500/15 text-red-400' :
                  'bg-amber-500/15 text-amber-400'
                }`}>{e.status}</span>
                <Link to={`/admin/enrollments/${e.id}`}
                  className="w-8 h-8 rounded-lg bg-theme-bg flex items-center justify-center text-gold hover:bg-gold/10 transition-colors">
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}