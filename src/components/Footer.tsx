import { Smartphone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                UnlockYourDevice
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              Providing professional and official device unlocking services globally. Fast, secure, and permanent solutions for all major brands.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 italic serif">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Pricing', 'FAQ', 'Contact Us'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-blue-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 italic serif">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'About Us'].map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {currentYear} UnlockYourDevice. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-slate-500 text-sm">Made with ❤️ for Tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
