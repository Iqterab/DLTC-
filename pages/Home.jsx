import HeroSection from '@/components/home/HeroSection';
import IntroVideo from '@/components/home/IntroVideo';
import AboutSection from '@/components/home/AboutSection';
import CoursesSection from '@/components/home/CoursesSection';
import VisaSection from '@/components/home/VisaSection';
import SisterCompanies from '@/components/home/SisterCompanies';
import TeamSection from '@/components/home/TeamSection';
import NoticePreview from '@/components/home/NoticePreview';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroVideo />
      <AboutSection />
      <CoursesSection />
      <VisaSection />
      <SisterCompanies />
      <TeamSection />
      <NoticePreview />
      <ContactSection />
    </>
  );
}