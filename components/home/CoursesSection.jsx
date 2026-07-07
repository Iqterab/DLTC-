const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';
import CourseCard, { FutureCourseCard } from '@/components/CourseCard';

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.Course.list('displayOrder', 50)
      .then(res => { setCourses(res); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Language Courses"
            title="Learn the world's languages."
            subtitle="From Japanese to Maltese, our courses prepare you for global opportunities. New courses added regularly."
          />
          <Link to="/courses" className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all text-sm font-medium whitespace-nowrap">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-theme-surface border border-gold/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
            <FutureCourseCard />
          </div>
        )}
      </div>
    </section>
  );
}