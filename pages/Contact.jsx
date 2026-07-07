const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await db.integrations.Core.SendEmail({
        to: 'info@DLTcenter.com',
        subject: `New Contact Form Message from ${formData.name}`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      });
      setSent(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Failed to send:', err);
      alert('Failed to send message. Please try calling us directly.');
    }
    setSending(false);
  };

  const inputCls = "w-full px-4 py-2.5 bg-theme-surface border border-theme-input rounded-lg text-theme-heading text-sm focus:border-gold outline-none transition-colors placeholder:text-theme-muted";

  return (
    <>
      <section className="pt-32 pb-12 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Contact Us"
            title="Get in touch."
            subtitle="Have questions? We're here to help. Reach out through any of the channels below or visit us at our Motijheel campus."
          />
        </div>
      </section>

      <section className="pb-24 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-theme-heading font-semibold mb-1">Address</h3>
                <p className="text-theme-body text-sm leading-relaxed">Rahman Chamber (7th floor), 12-13, Motijheel C/A, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-theme-heading font-semibold mb-1">Phone</h3>
                <a href="tel:+8801976587268" className="text-theme-body text-sm hover:text-gold transition-colors">+880 1976-587268</a>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-theme-heading font-semibold mb-1">Email</h3>
                <a href="mailto:info@DLTcenter.com" className="text-theme-body text-sm hover:text-gold transition-colors">info@DLTcenter.com</a>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-theme-heading font-semibold mb-1">Business Hours</h3>
                <p className="text-theme-body text-sm">Saturday – Thursday</p>
                <p className="text-theme-body text-sm">9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="glass-card rounded-2xl p-8">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="font-serif-display text-2xl text-theme-heading mb-2">Message Sent!</h3>
                <p className="text-theme-body text-sm mb-6">We'll get back to you as soon as possible.</p>
                <button onClick={() => setSent(false)} className="text-gold text-sm hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif-display text-2xl text-theme-heading mb-6">Send us a message</h3>
                <div>
                  <label className="block text-theme-body text-sm font-medium mb-1.5">Name</label>
                  <input className={inputCls} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required placeholder="Your name" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-theme-body text-sm font-medium mb-1.5">Email</label>
                    <input type="email" className={inputCls} value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-theme-body text-sm font-medium mb-1.5">Phone</label>
                    <input className={inputCls} value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} placeholder="+880..." />
                  </div>
                </div>
                <div>
                  <label className="block text-theme-body text-sm font-medium mb-1.5">Message</label>
                  <textarea className={inputCls} rows={5} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} required placeholder="Your message..." />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold text-[#050C1A] font-semibold hover:bg-gold-light transition-all disabled:opacity-50">
                  {sending ? (
                    <><div className="w-5 h-5 border-2 border-[#050C1A]/30 border-t-[#050C1A] rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}