const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * STUDENT PORTAL — FUTURE FEATURE (COMMENTED OUT)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This file contains the full implementation for a Student Login & Dashboard system
 * that can be activated in the future. It allows students to log in with their
 * enrollment reference number and track their course fees, academic progress,
 * attendance, and schedule — similar to a university management system.
 *
 * TO ACTIVATE:
 * 1. Create the StudentProgress entity (schema below) in base44/entities/
 * 2. Uncomment the StudentLogin and StudentDashboard page code
 * 3. Create the files: src/pages/StudentLogin.jsx and src/pages/StudentDashboard.jsx
 * 4. Add the routes to src/App.jsx (routes are commented at the bottom of this file)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ENTITY SCHEMA — Create as: base44/entities/StudentProgress.jsonc
 *
 * {
 *   "name": "StudentProgress",
 *   "type": "object",
 *   "properties": {
 *     "enrollmentId": { "type": "string" },
 *     "referenceNumber": { "type": "string" },
 *     "studentEmail": { "type": "string" },
 *     "courseEnrolled": { "type": "string" },
 *     "totalFee": { "type": "number" },
 *     "feePaid": { "type": "number" },
 *     "feeStatus": { "type": "string", "enum": ["Unpaid", "Partial", "Paid"], "default": "Unpaid" },
 *     "attendancePercentage": { "type": "number", "default": 0 },
 *     "currentLevel": { "type": "string" },
 *     "grades": { "type": "array", "items": { "type": "object", "properties": { "subject": { "type": "string" }, "grade": { "type": "string" }, "date": { "type": "string" } } } },
 *     "upcomingSchedule": { "type": "array", "items": { "type": "object", "properties": { "title": { "type": "string" }, "date": { "type": "string" }, "time": { "type": "string" } } } },
 *     "announcements": { "type": "array", "items": { "type": "object", "properties": { "title": { "type": "string" }, "body": { "type": "string" }, "date": { "type": "string" } } } }
 *   },
 *   "required": ["enrollmentId", "referenceNumber"]
 * }
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * STUDENT LOGIN PAGE — Create as: src/pages/StudentLogin.jsx
 *
 * import { useState } from 'react';
 * import { Link, useNavigate } from 'react-router-dom';
 * import { GraduationCap, ArrowRight } from 'lucide-react';
 * import { base44 } from '@/api/base44Client';
 * import SectionHeading from '@/components/SectionHeading';
 *
 * export default function StudentLogin() {
 *   const [referenceNumber, setReferenceNumber] = useState('');
 *   const [email, setEmail] = useState('');
 *   const [error, setError] = useState('');
 *   const [loading, setLoading] = useState(false);
 *   const navigate = useNavigate();
 *
 *   const handleLogin = async (e) => {
 *     e.preventDefault();
 *     setLoading(true);
 *     setError('');
 *     try {
 *       // Find enrollment by reference number and email
 *       const enrollments = await db.entities.Enrollment.filter({
 *         referenceNumber: referenceNumber.toUpperCase(),
 *         email: email.toLowerCase()
 *       });
 *       if (enrollments.length === 0) {
 *         setError('No enrollment found with these credentials. Please check your reference number and email.');
 *         return;
 *       }
 *       const enrollment = enrollments[0];
 *       if (enrollment.status === 'Rejected') {
 *         setError('Your application has been rejected. Please contact the office.');
 *         return;
 *       }
 *       // Store student session in localStorage
 *       localStorage.setItem('studentEnrollmentId', enrollment.id);
 *       localStorage.setItem('studentReferenceNumber', enrollment.referenceNumber);
 *       navigate('/student-dashboard');
 *     } catch (err) {
 *       setError('Login failed. Please try again.');
 *     }
 *     setLoading(false);
 *   };
 *
 *   return (
 *     <div className="min-h-screen bg-[#050C1A] pt-32 pb-20 flex items-center">
 *       <div className="max-w-md w-full mx-auto px-6">
 *         <div className="text-center mb-8">
 *           <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-4">
 *             <GraduationCap className="w-8 h-8 text-gold" />
 *           </div>
 *           <h1 className="font-serif-display text-3xl text-white">Student Portal</h1>
 *           <p className="text-slate-400 text-sm mt-2">Login to track your course progress and fees.</p>
 *         </div>
 *         <form onSubmit={handleLogin} className="glass-card rounded-2xl p-8 space-y-4">
 *           <div>
 *             <label className="block text-slate-300 text-sm mb-1.5">Reference Number</label>
 *             <input
 *               value={referenceNumber}
 *               onChange={e => setReferenceNumber(e.target.value)}
 *               placeholder="DLTC-2025-XXXX"
 *               required
 *               className="w-full px-4 py-2.5 bg-[#0A1628] border border-slate-700 rounded-lg text-white text-sm focus:border-gold outline-none placeholder:text-slate-600"
 *             />
 *           </div>
 *           <div>
 *             <label className="block text-slate-300 text-sm mb-1.5">Email Address</label>
 *             <input
 *               type="email"
 *               value={email}
 *               onChange={e => setEmail(e.target.value)}
 *               placeholder="you@example.com"
 *               required
 *               className="w-full px-4 py-2.5 bg-[#0A1628] border border-slate-700 rounded-lg text-white text-sm focus:border-gold outline-none placeholder:text-slate-600"
 *             />
 *           </div>
 *           {error && <p className="text-red-400 text-sm">{error}</p>}
 *           <button type="submit" disabled={loading}
 *             className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-[#050C1A] font-semibold hover:bg-gold-light transition-all disabled:opacity-40">
 *             {loading ? 'Logging in...' : 'Login'} <ArrowRight className="w-4 h-4" />
 *           </button>
 *         </form>
 *         <p className="text-slate-500 text-xs text-center mt-4">
 *           Don't have a reference number? <Link to="/enroll" className="text-gold hover:underline">Enroll now</Link>
 *         </p>
 *       </div>
 *     </div>
 *   );
 * }
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * STUDENT DASHBOARD PAGE — Create as: src/pages/StudentDashboard.jsx
 *
 * import { useState, useEffect } from 'react';
 * import { useNavigate } from 'react-router-dom';
 * import { GraduationCap, Wallet, Calendar, TrendingUp, Bell, LogOut } from 'lucide-react';
 * import { base44 } from '@/api/base44Client';
 *
 * export default function StudentDashboard() {
 *   const [enrollment, setEnrollment] = useState(null);
 *   const [progress, setProgress] = useState(null);
 *   const [loading, setLoading] = useState(true);
 *   const navigate = useNavigate();
 *
 *   useEffect(() => {
 *     const enrollmentId = localStorage.getItem('studentEnrollmentId');
 *     if (!enrollmentId) {
 *       navigate('/student-login');
 *       return;
 *     }
 *     db.entities.Enrollment.get(enrollmentId)
 *       .then(enr => {
 *         setEnrollment(enr);
 *         // Fetch student progress if it exists
 *         return db.entities.StudentProgress.filter({ enrollmentId });
 *       })
 *       .then(prog => {
 *         if (prog.length > 0) setProgress(prog[0]);
 *         setLoading(false);
 *       })
 *       .catch(() => {
 *         navigate('/student-login');
 *       });
 *   }, []);
 *
 *   const handleLogout = () => {
 *     localStorage.removeItem('studentEnrollmentId');
 *     localStorage.removeItem('studentReferenceNumber');
 *     navigate('/');
 *   };
 *
 *   if (loading) {
 *     return <div className="min-h-screen bg-[#050C1A] flex items-center justify-center">
 *       <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
 *     </div>;
 *   }
 *
 *   const feePercentage = progress ? Math.round((progress.feePaid / progress.totalFee) * 100) : 0;
 *   const attendance = progress?.attendancePercentage || 0;
 *
 *   return (
 *     <div className="min-h-screen bg-[#050C1A] pt-24 pb-20">
 *       <div className="max-w-5xl mx-auto px-6 lg:px-8">
 *         <div className="flex items-center justify-between mb-8">
 *           <div>
 *             <h1 className="font-serif-display text-3xl text-white">Welcome, {enrollment?.fullName}</h1>
 *             <p className="text-gold/60 text-sm">{enrollment?.referenceNumber}</p>
 *           </div>
 *           <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-all text-sm">
 *             <LogOut className="w-4 h-4" /> Logout
 *           </button>
 *         </div>
 *
 *         <div className="grid sm:grid-cols-3 gap-4 mb-8">
 *           <div className="glass-card rounded-2xl p-6">
 *             <GraduationCap className="w-6 h-6 text-gold mb-3" />
 *             <p className="text-slate-400 text-xs">Course Enrolled</p>
 *             <p className="text-white font-semibold mt-1">{progress?.courseEnrolled || enrollment?.preferredCourses?.[0] || 'Not assigned'}</p>
 *           </div>
 *           <div className="glass-card rounded-2xl p-6">
 *             <Wallet className="w-6 h-6 text-gold mb-3" />
 *             <p className="text-slate-400 text-xs">Fee Status</p>
 *             <p className="text-white font-semibold mt-1">{progress?.feeStatus || 'Pending'}</p>
 *             {progress && (
 *               <div className="mt-2">
 *                 <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
 *                   <div className="h-full bg-gold rounded-full" style={{ width: `${feePercentage}%` }} />
 *                 </div>
 *                 <p className="text-slate-500 text-xs mt-1">{progress.feePaid} / {progress.totalFee} BDT</p>
 *               </div>
 *             )}
 *           </div>
 *           <div className="glass-card rounded-2xl p-6">
 *             <TrendingUp className="w-6 h-6 text-gold mb-3" />
 *             <p className="text-slate-400 text-xs">Attendance</p>
 *             <p className="text-white font-semibold mt-1">{attendance}%</p>
 *             <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
 *               <div className="h-full bg-green-400 rounded-full" style={{ width: `${attendance}%` }} />
 *             </div>
 *           </div>
 *         </div>
 *
 *         <div className="grid md:grid-cols-2 gap-6">
 *           <div className="glass-card rounded-2xl p-6">
 *             <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> Upcoming Schedule</h3>
 *             {progress?.upcomingSchedule?.length > 0 ? (
 *               <div className="space-y-3">
 *                 {progress.upcomingSchedule.map((s, i) => (
 *                   <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#050C1A]">
 *                     <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex flex-col items-center justify-center">
 *                       <span className="text-gold text-xs font-bold">{new Date(s.date).getDate()}</span>
 *                     </div>
 *                     <div>
 *                       <p className="text-white text-sm">{s.title}</p>
 *                       <p className="text-slate-500 text-xs">{s.time}</p>
 *                     </div>
 *                   </div>
 *                 ))}
 *               </div>
 *             ) : <p className="text-slate-400 text-sm">No upcoming classes scheduled.</p>}
 *           </div>
 *
 *           <div className="glass-card rounded-2xl p-6">
 *             <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gold" /> Academic Progress</h3>
 *             {progress?.grades?.length > 0 ? (
 *               <div className="space-y-2">
 *                 {progress.grades.map((g, i) => (
 *                   <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[#050C1A]">
 *                     <span className="text-slate-300 text-sm">{g.subject}</span>
 *                     <span className="text-gold font-semibold text-sm">{g.grade}</span>
 *                   </div>
 *                 ))}
 *               </div>
 *             ) : <p className="text-slate-400 text-sm">No grades published yet.</p>}
 *           </div>
 *         </div>
 *
 *         {progress?.announcements?.length > 0 && (
 *           <div className="glass-card rounded-2xl p-6 mt-6">
 *             <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-gold" /> Announcements</h3>
 *             <div className="space-y-3">
 *               {progress.announcements.map((a, i) => (
 *                 <div key={i} className="p-3 rounded-lg bg-[#050C1A]">
 *                   <p className="text-white text-sm font-medium">{a.title}</p>
 *                   <p className="text-slate-400 text-xs mt-1">{a.body}</p>
 *                 </div>
 *               ))}
 *             </div>
 *           </div>
 *         )}
 *       </div>
 *     </div>
 *   );
 * }
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ROUTES — Add to src/App.jsx inside <Routes>:
 *
 *   <Route path="/student-login" element={<StudentLogin />} />
 *   <Route path="/student-dashboard" element={<StudentDashboard />} />
 *
 * And add imports at top:
 *
 *   import StudentLogin from '@/pages/StudentLogin';
 *   import StudentDashboard from '@/pages/StudentDashboard';
 *
 * Also add a "Student Login" link in the Navbar or Footer:
 *
 *   <Link to="/student-login" className="text-slate-400 text-sm hover:text-gold transition-colors">Student Login</Link>
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export const STUDENT_PORTAL_FUTURE = true;