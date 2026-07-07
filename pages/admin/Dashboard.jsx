const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, BookOpen, Users, Bell, Clock, ArrowRight, FileText } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, courses: 0, running: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      db.entities.Enrollment.list('-created_date', 1000),
      db.entities.Course.list('-created_date', 1000),
    ]).then(([enrollments, courses]) => {
      setRecent(enrollments.slice(0, 5));
      setStats({
        total: enrollments.length,
        pending: enrollments.filter(e => e.status === 'Pending').length,
        approved: enrollments.filter(e => e.status === 'Approved').length,
        rejected: enrollments.filter(e => e.status === 'Rejected').length,
        courses: courses.length,
        running: courses.filter(c => c.status === 'Running').length,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Enrollments', value: stats.total, icon: ClipboardList, color: 'text-gold' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-400' },
    { label: 'Approved', value: stats.approved, icon: Users, color: 'text-green-400' },
    { label: 'Total Courses', value: stats.courses, icon: BookOpen, color: 'text-blue-400' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif-display text-3xl text-theme-heading mb-1">Dashboard</h1>
        <p className="text-theme-body text-sm">Overview of your training centre.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <div key={i} className="bg-theme-surface border border-gold/10 rounded-2xl p-5">
            <card.icon className={`w-6 h-6 ${card.color} mb-3`} />
            <p className="font-serif-display text-3xl text-theme-heading">{loading ? '—' : card.value}</p>
            <p className="text-theme-body text-xs mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-theme-surface border border-gold/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-theme-heading font-semibold">Recent Enrollments</h2>
            <Link to="/admin/enrollments" className="text-gold text-xs hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-theme-bg rounded-lg animate-pulse" />)}</div>
          ) : recent.length === 0 ? (
            <p className="text-theme-body text-sm py-4 text-center">No enrollments yet.</p>
          ) : (
            <div className="space-y-2">
              {recent.map(e => (
                <Link key={e.id} to={`/admin/enrollments/${e.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-theme-bg hover:bg-theme-bg/60 transition-colors">
                  <div>
                    <p className="text-theme-heading text-sm font-medium">{e.fullName}</p>
                    <p className="text-theme-muted text-xs">{e.referenceNumber}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    e.status === 'Approved' ? 'bg-green-500/15 text-green-400' :
                    e.status === 'Rejected' ? 'bg-red-500/15 text-red-400' :
                    'bg-amber-500/15 text-amber-400'
                  }`}>{e.status}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-theme-surface border border-gold/10 rounded-2xl p-6">
          <h2 className="text-theme-heading font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Courses', path: '/admin/courses', icon: BookOpen },
              { label: 'Notices', path: '/admin/notices', icon: Bell },
              { label: 'Team', path: '/admin/team', icon: Users },
              { label: 'Blog', path: '/admin/blog', icon: FileText },
            ].map(item => (
              <Link key={item.path} to={item.path}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-theme-bg hover:bg-gold/5 hover:border-gold/20 border border-transparent transition-all">
                <item.icon className="w-5 h-5 text-gold" />
                <span className="text-theme-body text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}