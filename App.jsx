import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import PublicLayout from '@/components/PublicLayout';
import AdminLayout from '@/components/AdminLayout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Courses from '@/pages/Courses';
import Notices from '@/pages/Notices';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import EnrollNow from '@/pages/EnrollNow';
import Contact from '@/pages/Contact';
import Dashboard from '@/pages/admin/Dashboard';
import AdminEnrollments from '@/pages/admin/AdminEnrollments';
import EnrollmentDetail from '@/pages/admin/EnrollmentDetail';
import AdminCourses from '@/pages/admin/AdminCourses';
import AdminNotices from '@/pages/admin/AdminNotices';
import AdminTeam from '@/pages/admin/AdminTeam';
import AdminBlog from '@/pages/admin/AdminBlog';
import AdminSettings from '@/pages/admin/AdminSettings';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050C1A]">
        <div className="w-8 h-8 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/enroll" element={<EnrollNow />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/enrollments" element={<AdminEnrollments />} />
          <Route path="/admin/enrollments/:id" element={<EnrollmentDetail />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/notices" element={<AdminNotices />} />
          <Route path="/admin/team" element={<AdminTeam />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App