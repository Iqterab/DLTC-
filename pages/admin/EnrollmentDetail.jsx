const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

function FieldDisplay({ label, value }) {
  return (
    <div>
      <p className="text-theme-muted text-xs uppercase tracking-wide mb-1">{label}</p>
      <p className="text-theme-heading text-sm">{value || '—'}</p>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 className="font-serif-display text-lg text-gold border-b border-gold/10 pb-2 mb-4">{children}</h3>;
}

export default function EnrollmentDetail() {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    db.entities.Enrollment.get(id)
      .then(res => { setEnrollment(res); setStatus(res.status || 'Pending'); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleStatusUpdate = async () => {
    setSaving(true);
    try {
      await db.entities.Enrollment.update(enrollment.id, { status });
      setEnrollment(prev => ({ ...prev, status }));
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="text-center py-20">
        <p className="text-theme-body">Enrollment not found.</p>
        <Link to="/admin/enrollments" className="text-gold hover:underline mt-4 inline-block">Back to Enrollments</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin/enrollments" className="inline-flex items-center gap-2 text-theme-body hover:text-gold transition-colors text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Enrollments
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-serif-display text-3xl text-gradient-gold">{enrollment.referenceNumber}</p>
          <p className="text-theme-body text-sm mt-1">{enrollment.fullName} · {new Date(enrollment.created_date).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={status} onChange={e => setStatus(e.target.value)}
            className="px-4 py-2.5 bg-theme-surface border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none">
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={handleStatusUpdate} disabled={saving || status === enrollment.status}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-[#050C1A] text-sm font-semibold hover:bg-gold-light transition-all disabled:opacity-40">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr] gap-8">
        {enrollment.passportPhoto && (
          <div>
            <img src={enrollment.passportPhoto} alt="Passport" className="w-full rounded-xl border border-gold/20" />
          </div>
        )}

        <div className="space-y-8">
          <section>
            <SectionTitle>Student Information</SectionTitle>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FieldDisplay label="Full Name" value={enrollment.fullName} />
              <FieldDisplay label="Father's Name" value={enrollment.fathersName} />
              <FieldDisplay label="Mother's Name" value={enrollment.mothersName} />
              <FieldDisplay label="Email" value={enrollment.email} />
              <FieldDisplay label="Phone" value={enrollment.phone} />
              <FieldDisplay label="Nationality" value={enrollment.nationality} />
              <FieldDisplay label="Date of Birth" value={enrollment.dateOfBirth} />
              <FieldDisplay label="NID Number" value={enrollment.nidNumber} />
              <FieldDisplay label="Birth Certificate" value={enrollment.birthCertificateNumber} />
              <FieldDisplay label="Passport Number" value={enrollment.passportNumber} />
              <FieldDisplay label="Choice of Country" value={enrollment.choiceOfCountry} />
            </div>
          </section>

          {(enrollment.spouseName || enrollment.spouseContact) && (
            <section>
              <SectionTitle>Spouse Information</SectionTitle>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FieldDisplay label="Spouse Name" value={enrollment.spouseName} />
                <FieldDisplay label="Spouse Contact" value={enrollment.spouseContact} />
                <FieldDisplay label="Relationship" value={enrollment.spouseRelationship} />
                <FieldDisplay label="Spouse NID" value={enrollment.spouseNid} />
              </div>
            </section>
          )}

          <section>
            <SectionTitle>Address</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4">
              <FieldDisplay label="Present Address" value={enrollment.presentAddress} />
              <FieldDisplay label="Permanent Address" value={enrollment.permanentAddress} />
            </div>
          </section>

          <section>
            <SectionTitle>Education Qualification</SectionTitle>
            {enrollment.educationQualifications?.length > 0 ? (
              <div className="space-y-2">
                {enrollment.educationQualifications.map((e, i) => (
                  <div key={i} className="flex gap-4 text-sm text-theme-body">
                    <span className="text-gold/60">{i + 1}.</span>
                    <span>{e.examName || '—'}</span>
                    <span>{e.year || '—'}</span>
                    <span>{e.grade || '—'}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-theme-muted text-sm">No data</p>}
          </section>

          <section>
            <SectionTitle>Professional Training</SectionTitle>
            {enrollment.professionalTraining?.length > 0 ? (
              <div className="space-y-2">
                {enrollment.professionalTraining.map((t, i) => (
                  <div key={i} className="flex gap-4 text-sm text-theme-body">
                    <span className="text-gold/60">{i + 1}.</span>
                    <span>{t.trainingName || '—'}</span>
                    <span>{t.year || '—'}</span>
                    <span>{t.duration || '—'}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-theme-muted text-sm">No data</p>}
          </section>

          <section>
            <SectionTitle>Work Experience</SectionTitle>
            {enrollment.workExperience?.length > 0 ? (
              <div className="space-y-2">
                {enrollment.workExperience.map((w, i) => (
                  <div key={i} className="flex gap-4 text-sm text-theme-body">
                    <span className="text-gold/60">{i + 1}.</span>
                    <span>{w.country || '—'}</span>
                    <span>{w.role || '—'}</span>
                    <span>{w.duration || '—'}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-theme-muted text-sm">No data</p>}
          </section>

          <section>
            <SectionTitle>Technical Training</SectionTitle>
            {enrollment.technicalTraining?.length > 0 ? (
              <div className="space-y-2">
                {enrollment.technicalTraining.map((t, i) => (
                  <div key={i} className="flex gap-4 text-sm text-theme-body">
                    <span className="text-gold/60">{i + 1}.</span>
                    <span>{t.trainingName || '—'}</span>
                    <span>{t.year || '—'}</span>
                    <span>{t.duration || '—'}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-theme-muted text-sm">No data</p>}
          </section>

          <section>
            <SectionTitle>Course Selection</SectionTitle>
            <div className="space-y-4">
              <div>
                <p className="text-theme-muted text-xs uppercase tracking-wide mb-1">Preferred Courses</p>
                <div className="flex flex-wrap gap-2">
                  {enrollment.preferredCourses?.map((c, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs">{c}</span>
                  ))}
                  {enrollment.otherCourse && (
                    <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs">Other: {enrollment.otherCourse}</span>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <FieldDisplay label="Preferred Start Date" value={enrollment.preferredStartDate} />
                <FieldDisplay label="Time Slot" value={enrollment.timeSlot} />
              </div>
              {enrollment.shortNote && <FieldDisplay label="Short Note" value={enrollment.shortNote} />}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}