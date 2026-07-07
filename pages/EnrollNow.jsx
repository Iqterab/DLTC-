import EnrollmentForm from '@/components/enrollment/EnrollmentForm';
import SectionHeading from '@/components/SectionHeading';

export default function EnrollNow() {
  return (
    <div className="min-h-screen bg-theme-bg pt-24">
      <section className="py-12 bg-gradient-to-b from-[#0A1628] to-theme-bg border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <SectionHeading
            center
            eyebrow="Admission"
            title="Enroll Now"
            subtitle="Complete the form below to begin your journey with DLTC. Our team will review your application and contact you within 24 hours."
          />
        </div>
      </section>

      <EnrollmentForm />
    </div>
  );
}