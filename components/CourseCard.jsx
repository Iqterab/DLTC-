import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <div className="glass-card rounded-2xl p-6 group transition-all duration-500 hover:transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif-display text-2xl text-theme-heading">{course.name}</h3>
          {course.language && <p className="text-theme-body text-sm mt-1">{course.language}</p>}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          course.status === 'Running' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'
        }`}>
          {course.status}
        </span>
      </div>
      {course.description && <p className="text-theme-body text-sm mb-4 line-clamp-2">{course.description}</p>}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-theme-body mb-5">
        {course.level && <span>Level: {course.level}</span>}
        {course.duration && <span>Duration: {course.duration}</span>}
        {course.fee && <span className="text-gold/80">Fee: {course.fee}</span>}
      </div>
      <Link to="/enroll" className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all text-sm font-medium">
        Enroll Now <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function FutureCourseCard() {
  return (
    <div className="rounded-2xl p-6 border-2 border-dashed border-gold/20 animate-pulse-gold flex flex-col items-center justify-center text-center min-h-[240px]">
      <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-3">
        <Plus className="w-6 h-6 text-gold/50" />
      </div>
      <p className="text-theme-body text-sm font-medium">More Courses</p>
      <p className="text-theme-muted text-xs mt-1">Coming Soon</p>
    </div>
  );
}