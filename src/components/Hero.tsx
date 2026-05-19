import { motion } from 'motion/react';
import { ShieldCheck, Zap, Globe, ArrowRight, Smartphone } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <ShieldCheck size={16} />
              <span>100% Secure Unlocking Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Unlock Your Device <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Instantly</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg">
              Fast, Secure & Trusted Mobile and Tablet Unlock Service. We support 100+ brands and provide permanent solutions for all network locks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#unlock-form"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
              >
                Unlock Now <ArrowRight size={20} />
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold transition-all"
              >
                Contact Support
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Globe size={24} />
                <span>150+ Countries</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Zap size={24} />
                <span>24h Average</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative z-10 w-full max-w-md mx-auto aspect-[4/5] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-4 shadow-2xl border border-slate-700 overflow-hidden">
               {/* Mockup Content */}
               <div className="w-full h-full bg-slate-950 rounded-[2.5rem] relative overflow-hidden flex flex-col items-center justify-center p-8">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[60px] rounded-full animate-pulse" />
                  <Smartphone size={120} className="text-blue-500 mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Device Locked?</h3>
                    <p className="text-slate-400 text-sm">We provide permanent factory unlock solutions for iPhones and iPads.</p>
                  </div>
                  <div className="mt-8 flex gap-2">
                    <div className="w-12 h-1 bg-blue-500 rounded-full" />
                    <div className="w-4 h-1 bg-slate-700 rounded-full" />
                    <div className="w-4 h-1 bg-slate-700 rounded-full" />
                  </div>
               </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
