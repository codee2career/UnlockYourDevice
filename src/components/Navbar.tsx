import { useState, useEffect } from 'react';
import { Menu, X, Smartphone, ShieldCheck, Moon, Sun, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AuthModal from './AuthModal';

interface NavbarProps {
  user: string | null;
  onLoginSuccess: (user: string) => void;
  onLogout: () => void;
}

export default function Navbar({ user, onLoginSuccess, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = (username: string) => {
    onLoginSuccess(username);
    setIsAuthModalOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Brands', href: '#brands' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                UnlockYourDevice
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-blue-400 font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="h-6 w-px bg-slate-800 mx-2" />

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                    <User size={16} />
                    <span className="font-semibold text-sm">{user}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="text-slate-400 hover:text-red-400 transition-colors p-2"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-white hover:text-blue-400 font-semibold transition-colors px-4"
                >
                  Login
                </button>
              )}

              <a
                href="#unlock-form"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                Unlock Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
               <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 text-slate-400"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 p-2"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-slate-800"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {user && (
                   <div className="flex items-center gap-3 text-blue-400 bg-blue-500/10 px-4 py-3 rounded-xl border border-blue-500/20 mb-2">
                    <User size={20} />
                    <span className="font-bold">{user}</span>
                  </div>
                )}
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-300 text-lg font-medium py-2"
                  >
                    {link.name}
                  </a>
                ))}
                
                {user ? (
                   <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-400 text-left font-medium py-2 flex items-center gap-2"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-slate-300 text-left text-lg font-medium py-2"
                  >
                    Login
                  </button>
                )}

                <a
                  href="#unlock-form"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-blue-600 text-white text-center py-4 rounded-xl font-bold mt-4"
                >
                  Unlock Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
