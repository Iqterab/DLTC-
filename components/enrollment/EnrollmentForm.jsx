const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, ShieldCheck, Clock, MapPin } from 'lucide-react';

import DynamicTable from './DynamicTable';
import PhotoUpload from './PhotoUpload';

const COUNTRIES = [
  'Bangladesh', 'Japan', 'China', 'South Korea', 'Serbia', 'Malta', 'United States', 'United Kingdom',
  'Australia', 'Germany', 'France', 'Italy', 'Spain', 'Canada', 'New Zealand', 'Singapore',
  'United Arab Emirates', 'Saudi Arabia', 'Russia', 'Netherlands', 'Sweden', 'Switzerland',
  'Ireland', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria', 'Portugal', 'Greece',
  'Turkey', 'Egypt', 'Malaysia', 'Thailand', 'Vietnam', 'Indonesia', 'Philippines', 'India',
  'Pakistan', 'Nepal', 'Sri Lanka', 'Brazil', 'Argentina', 'Mexico', 'South Africa', 'Nigeria',
  'Kenya', 'Morocco', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Lebanon', 'Other'
];

const COURSE_OPTIONS = [
  'Japanese Language N5', 'Japanese Language N4', 'Korean Language', 'German Language',
  'Italian Language', 'Serbian Language', 'Maltese Language', 'English Language',
];

const SECTIONS = [
  { id: 'student', label: 'Student Information', num: '01' },
  { id: 'spouse', label: 'Spouse Information', num: '02' },
  { id: 'address', label: 'Address', num: '03' },
  { id: 'education', label: 'Education & Experience', num: '04' },
  { id: 'course', label: 'Course Selection', num: '05' },
];

function Field({ label, children, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-theme-body text-sm font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 bg-theme-surface border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none transition-colors placeholder:text-theme-muted";

function SectionHeader({ num, title, id }) {
  return (
    <div id={id} className="flex items-center gap-3 mb-6 pb-3 border-b border-gold/10 scroll-mt-24">
      <span className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-sm font-semibold">{num}</span>
      <h3 className="font-serif-display text-2xl text-theme-heading">{title}</h3>
    </div>
  );
}

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    fullName: '', fathersName: '', mothersName: '', email: '', phone: '',
    nationality: '', dateOfBirth: '', nidNumber: '', birthCertificateNumber: '',
    passportNumber: '', choiceOfCountry: '', passportPhoto: '',
    spouseName: '', spouseContact: '', spouseRelationship: '', spouseNid: '',
    presentAddress: '', permanentAddress: '',
    educationQualifications: [{ examName: '', year: '', grade: '' }],
    professionalTraining: [{ trainingName: '', year: '', duration: '' }],
    workExperience: [{ country: '', role: '', duration: '' }],
    technicalTraining: [{ trainingName: '', year: '', duration: '' }],
    preferredCourses: [], otherCourse: '', preferredStartDate: '', timeSlot: '', shortNote: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);
  const [activeSection, setActiveSection] = useState('student');
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [submittedRef]);

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const toggleCourse = (course) => {
    setFormData(prev => ({
      ...prev,
      preferredCourses: prev.preferredCourses.includes(course)
        ? prev.preferredCourses.filter(c => c !== course)
        : [...prev.preferredCourses, course]
    }));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitting(true);
    const refNum = `DLTC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    try {
      await db.entities.Enrollment.create({
        ...formData,
        referenceNumber: refNum,
        status: 'Pending'
      });
      await db.integrations.Core.SendEmail({
        to: 'info@DLTcenter.com',
        subject: `New Enrollment: ${formData.fullName} — ${refNum}`,
        body: `A new student has submitted an enrollment application.\n\nReference: ${refNum}\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.choiceOfCountry}\nPreferred Courses: ${[...formData.preferredCourses, formData.otherCourse].filter(Boolean).join(', ')}\n\nView full details in the admin panel.`
      });
      setSubmittedRef(refNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Submission failed. Please try again.');
    }
    setSubmitting(false);
  };

  if (submittedRef) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full text-center animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
            <div className="relative p-8 rounded-2xl border border-gold/30 bg-gold/5 backdrop-blur-sm">
              <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
              <h2 className="font-serif-display text-3xl text-theme-heading mb-2">Application Submitted!</h2>
              <p className="text-theme-body mb-6">Your application reference number is:</p>
              <div className="py-4 px-6 rounded-xl bg-theme-bg border border-gold/20 mb-6">
                <p className="font-serif-display text-3xl text-gradient-gold tracking-wider">{submittedRef}</p>
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-theme-body text-sm">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  Our staff will contact you within 24 hours.
                </div>
                <div className="flex items-center gap-3 text-theme-body text-sm">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  Your data is 100% secure.
                </div>
                <div className="flex items-center gap-3 text-theme-body text-sm">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  Visit our campus after submission for orientation.
                </div>
              </div>
              <p className="text-theme-muted text-xs mt-6">Please save your reference number for future tracking.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-8 max-w-6xl mx-auto px-6 lg:px-8 py-12">
      {/* Section Tracker */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-theme-muted text-xs uppercase tracking-widest mb-4">Form Sections</p>
          <div className="space-y-1">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollToSection(s.id)}
                className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === s.id ? 'bg-gold/10 text-gold border-l-2 border-gold' : 'text-theme-body hover:text-theme-heading hover:bg-theme-heading/5'
                }`}>
                <span className={`text-xs font-mono ${activeSection === s.id ? 'text-gold' : 'text-theme-muted'}`}>{s.num}</span>
                {s.label}
              </button>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-theme-surface border border-gold/10">
            <div className="flex items-center gap-2 text-gold text-xs mb-2">
              <Clock className="w-3.5 h-3.5" /> Under 2 minutes
            </div>
            <p className="text-theme-body text-xs">Average enrollment time. Your data is 100% secure.</p>
          </div>
        </div>
      </aside>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
        {/* Section 1: Student Information */}
        <section>
          <SectionHeader num="01" title="Student Information" id="student" />
          <div className="grid sm:grid-cols-[1fr_200px] gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name"><input className={inputCls} value={formData.fullName} onChange={e => update('fullName', e.target.value)} required placeholder="Your full name" /></Field>
              <Field label="Father's Name"><input className={inputCls} value={formData.fathersName} onChange={e => update('fathersName', e.target.value)} placeholder="Father's name" /></Field>
              <Field label="Mother's Name"><input className={inputCls} value={formData.mothersName} onChange={e => update('mothersName', e.target.value)} placeholder="Mother's name" /></Field>
              <Field label="Email"><input type="email" className={inputCls} value={formData.email} onChange={e => update('email', e.target.value)} required placeholder="you@example.com" /></Field>
              <Field label="Phone Number"><input className={inputCls} value={formData.phone} onChange={e => update('phone', e.target.value)} required placeholder="+880..." /></Field>
              <Field label="Nationality"><input className={inputCls} value={formData.nationality} onChange={e => update('nationality', e.target.value)} placeholder="Bangladeshi" /></Field>
              <Field label="Date of Birth"><input type="date" className={inputCls} value={formData.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)} /></Field>
              <Field label="NID Number"><input className={inputCls} value={formData.nidNumber} onChange={e => update('nidNumber', e.target.value)} placeholder="National ID" /></Field>
              <Field label="Birth Certificate Number"><input className={inputCls} value={formData.birthCertificateNumber} onChange={e => update('birthCertificateNumber', e.target.value)} placeholder="Birth cert. no." /></Field>
              <Field label="Passport Number"><input className={inputCls} value={formData.passportNumber} onChange={e => update('passportNumber', e.target.value)} placeholder="Passport no." /></Field>
              <Field label="Choice of Country">
                <select className={inputCls} value={formData.choiceOfCountry} onChange={e => update('choiceOfCountry', e.target.value)}>
                  <option value="">Select a country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <div>
              <label className="block text-theme-body text-sm font-medium mb-1.5">Passport Size Photo</label>
              <PhotoUpload photo={formData.passportPhoto} onUpload={url => update('passportPhoto', url)} />
            </div>
          </div>
        </section>

        {/* Section 2: Spouse Information */}
        <section>
          <SectionHeader num="02" title="Spouse Information" id="spouse" />
          <p className="text-theme-muted text-sm mb-4">If applicable</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Spouse Name"><input className={inputCls} value={formData.spouseName} onChange={e => update('spouseName', e.target.value)} placeholder="Spouse's name" /></Field>
            <Field label="Spouse Contact Number"><input className={inputCls} value={formData.spouseContact} onChange={e => update('spouseContact', e.target.value)} placeholder="Phone" /></Field>
            <Field label="Spouse Relationship"><input className={inputCls} value={formData.spouseRelationship} onChange={e => update('spouseRelationship', e.target.value)} placeholder="Husband/Wife" /></Field>
            <Field label="Spouse NID"><input className={inputCls} value={formData.spouseNid} onChange={e => update('spouseNid', e.target.value)} placeholder="NID number" /></Field>
          </div>
        </section>

        {/* Section 3: Address */}
        <section>
          <SectionHeader num="03" title="Present & Permanent Address" id="address" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Present Address"><textarea className={inputCls} rows={3} value={formData.presentAddress} onChange={e => update('presentAddress', e.target.value)} placeholder="Current address" /></Field>
            <Field label="Permanent Address"><textarea className={inputCls} rows={3} value={formData.permanentAddress} onChange={e => update('permanentAddress', e.target.value)} placeholder="Permanent address" /></Field>
          </div>
        </section>

        {/* Section 4: Education & Experience */}
        <section>
          <SectionHeader num="04" title="Educational & Experience Information" id="education" />
          <div className="space-y-8">
            <div>
              <h4 className="text-theme-heading font-medium text-sm mb-3">Education Qualification</h4>
              <DynamicTable
                columns={[
                  { key: 'examName', label: 'Exam Name', placeholder: 'SSC / HSC / BSc' },
                  { key: 'year', label: 'Year', placeholder: '2020' },
                  { key: 'grade', label: 'Grade', placeholder: 'GPA 5.0' },
                ]}
                rows={formData.educationQualifications}
                onChange={r => update('educationQualifications', r)}
                addLabel="Add Education"
              />
            </div>
            <div>
              <h4 className="text-theme-heading font-medium text-sm mb-3">Other Professional Training</h4>
              <DynamicTable
                columns={[
                  { key: 'trainingName', label: 'Training Name', placeholder: 'Training name' },
                  { key: 'year', label: 'Year', placeholder: '2023' },
                  { key: 'duration', label: 'Duration', placeholder: '3 months' },
                ]}
                rows={formData.professionalTraining}
                onChange={r => update('professionalTraining', r)}
                addLabel="Add Training"
              />
            </div>
            <div>
              <h4 className="text-theme-heading font-medium text-sm mb-3">Other Country Work Experience</h4>
              <DynamicTable
                columns={[
                  { key: 'country', label: 'Country', placeholder: 'Country' },
                  { key: 'role', label: 'Role', placeholder: 'Job title' },
                  { key: 'duration', label: 'Duration', placeholder: '2 years' },
                ]}
                rows={formData.workExperience}
                onChange={r => update('workExperience', r)}
                addLabel="Add Experience"
              />
            </div>
            <div>
              <h4 className="text-theme-heading font-medium text-sm mb-3">Technical Training</h4>
              <DynamicTable
                columns={[
                  { key: 'trainingName', label: 'Training Name', placeholder: 'Training name' },
                  { key: 'year', label: 'Year', placeholder: '2024' },
                  { key: 'duration', label: 'Duration', placeholder: '6 months' },
                ]}
                rows={formData.technicalTraining}
                onChange={r => update('technicalTraining', r)}
                addLabel="Add Training"
              />
            </div>
          </div>
        </section>

        {/* Section 5: Course Selection */}
        <section>
          <SectionHeader num="05" title="Course Selection Information" id="course" />
          <div className="space-y-6">
            <div>
              <label className="block text-theme-body text-sm font-medium mb-3">Preferred Courses</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {COURSE_OPTIONS.map(course => (
                  <label key={course} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                    formData.preferredCourses.includes(course) ? 'border-gold/50 bg-gold/10 text-theme-heading' : 'border-theme-input text-theme-body hover:border-gold/30'
                  }`}>
                    <input type="checkbox" checked={formData.preferredCourses.includes(course)} onChange={() => toggleCourse(course)} className="w-4 h-4 accent-gold" />
                    <span className="text-sm">{course}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <Field label="Other (specify)">
                  <input className={inputCls} value={formData.otherCourse} onChange={e => update('otherCourse', e.target.value)} placeholder="Any course not listed above" />
                </Field>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Preferred Start Date"><input type="date" className={inputCls} value={formData.preferredStartDate} onChange={e => update('preferredStartDate', e.target.value)} /></Field>
              <Field label="Preferred Time Slot">
                <select className={inputCls} value={formData.timeSlot} onChange={e => update('timeSlot', e.target.value)}>
                  <option value="">Select time slot</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </Field>
            </div>
            <Field label="Short Note (Optional)" full>
              <textarea className={inputCls} rows={3} value={formData.shortNote} onChange={e => update('shortNote', e.target.value)} placeholder="Anything you'd like us to know..." />
            </Field>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 mt-1 accent-gold" required />
              <span className="text-theme-body text-sm">I agree to the terms and privacy policy of Destination Language & Training Centre.</span>
            </label>

            <button type="submit" disabled={!agreed || submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-gold text-[#050C1A] font-semibold hover:bg-gold-light transition-all hover:shadow-xl hover:shadow-gold/20 disabled:opacity-40 disabled:cursor-not-allowed">
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#050C1A]/30 border-t-[#050C1A] rounded-full animate-spin" />
                  Submitting...
                </>
              ) : 'Enroll Now'}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}