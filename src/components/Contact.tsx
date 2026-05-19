import { Phone, Mail, MapPin, Instagram, Twitter, Facebook, Github } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-slate-400 text-lg mb-10">
              Have a specific question about your device? Our team is ready to help you 24/7.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">WhatsApp Us</h4>
                  <p className="text-slate-400">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-cyan-600/10 text-cyan-500 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Email Support</h4>
                  <p className="text-slate-400">support@unlockyourdevice.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-purple-600/10 text-purple-500 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Global HQ</h4>
                  <p className="text-slate-400">Tech Park Road, Bangalore, India</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-white font-bold mb-6">Follow Us</h4>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Name</label>
                <input placeholder="Your Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Email</label>
                <input placeholder="Your Email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea rows={4} placeholder="Your Message" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
