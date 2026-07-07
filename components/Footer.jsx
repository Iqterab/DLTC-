import { Link } from 'react-router-dom';
import { Globe, Facebook, Youtube, Linkedin, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-theme-bg border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center">
                <Globe className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-serif-display text-xl text-theme-heading">DLTC</p>
                <p className="text-[10px] text-theme-body tracking-wider uppercase">Est. 2025</p>
              </div>
            </div>
            <p className="text-theme-body text-sm leading-relaxed">
              Destination Language & Training Centre — your bridge to global career and education opportunities.
            </p>
          </div>

          <div>
            <h4 className="text-theme-heading font-semibold text-sm mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-theme-body text-sm hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-theme-body text-sm hover:text-gold transition-colors">Courses</Link></li>
              <li><Link to="/notices" className="text-theme-body text-sm hover:text-gold transition-colors">Notice Board</Link></li>
              <li><Link to="/blog" className="text-theme-body text-sm hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/enroll" className="text-theme-body text-sm hover:text-gold transition-colors">Enroll Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-theme-heading font-semibold text-sm mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-theme-body text-sm">
                <MapPin className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                Rahman Chamber (7th floor), 12-13, Motijheel C/A, Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2 text-theme-body text-sm">
                <Phone className="w-4 h-4 text-gold/60 shrink-0" />
                +880 1976-587268
              </li>
              <li className="flex items-center gap-2 text-theme-body text-sm">
                <Mail className="w-4 h-4 text-gold/60 shrink-0" />
                info@DLTcenter.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-theme-heading font-semibold text-sm mb-4 tracking-wide">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Youtube, Linkedin, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-theme-body hover:text-gold hover:border-gold/50 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-theme-body text-xs mt-4">Sat–Thu: 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className="border-t border-theme-heading/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-theme-body text-xs">© 2025 Destination Language & Training Centre. All rights reserved.</p>
          <p className="text-theme-body text-xs">Designed for global futures.</p>
        </div>
      </div>
    </footer>
  );
}