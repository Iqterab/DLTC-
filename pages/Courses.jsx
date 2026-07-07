const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';
import CourseCard, { FutureCourseCard } from '@/components/CourseCard';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    db.entities.Course.list('displayOrder', 100)
      .then(res => { setCourses(res); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? courses : courses.filter(c => c.status === filter);

  return (
    <>
      <section className="pt-32 pb-12 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Language Courses"
            title="Choose your path to the world."
            subtitle="From beginner to advanced levels, our language courses prepare you for global opportunities. New courses are added regularly — check back often."
          />
        </div>
      </section>

      <section className="pb-24 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-3 mb-8">
            {['All', 'Running', 'Upcoming'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f ? 'bg-gold text-[#050C1A]' : 'border border-theme-input text-theme-body hover:text-theme-heading hover:border-gold/30'
                }`}>
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="h-64 rounded-2xl bg-theme-surface border border-gold/10 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => <CourseCard key={course.id} course={course} />)}
              <FutureCourseCard />
            </div>
          )}

          <div className="mt-16 text-center">
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="font-serif-display text-2xl text-theme-heading mb-2">Ready to start your journey?</h3>
              <p className="text-theme-body text-sm mb-6">Enroll now and take the first step toward your global career.</p>
              <Link to="/enroll" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-[#050C1A] font-semibold hover:bg-gold-light transition-all hover:shadow-xl hover:shadow-gold/20">
                Enroll Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}