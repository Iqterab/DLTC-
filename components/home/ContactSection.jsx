import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export default function ContactSection() {
  return (
    <section className="py-24 bg-theme-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Get in Touch"
          title="Visit us at our Motijheel campus."
          subtitle="Our team is ready to help you start your global journey. Reach out today."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <h3 className="text-theme-heading font-semibold mb-2">Address</h3>
            <p className="text-theme-body text-sm leading-relaxed">
              Rahman Chamber (7th floor), 12-13, Motijheel C/A, Dhaka, Bangladesh
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <h3 className="text-theme-heading font-semibold mb-2">Phone & Email</h3>
            <p className="text-theme-body text-sm">+880 1976-587268</p>
            <p className="text-theme-body text-sm">info@DLTcenter.com</p>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <h3 className="text-theme-heading font-semibold mb-2">Business Hours</h3>
            <p className="text-theme-body text-sm">Saturday – Thursday</p>
            <p className="text-theme-body text-sm">9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-[#050C1A] font-semibold hover:bg-gold-light transition-all hover:shadow-xl hover:shadow-gold/20">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}