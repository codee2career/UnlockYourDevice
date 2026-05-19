import { motion } from 'motion/react';
import { Smartphone, FileText, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Choose Device',
    description: 'Select your mobile or tablet brand and model from our list.',
    icon: Smartphone,
    color: 'bg-blue-600'
  },
  {
    title: 'Submit Details',
    description: 'Fill in the unlock form with your IMEI and device information.',
    icon: FileText,
    color: 'bg-cyan-600'
  },
  {
    title: 'Get Unlock Solution',
    description: 'Receive your unlock confirmation and instructions via email.',
    icon: CheckCircle,
    color: 'bg-green-600'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400">Simple three-step process to get your device unlocked permanently.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-slate-800 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 ${step.color} text-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:rotate-6 transition-transform`}>
                  <step.icon size={32} />
                </div>
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl group-hover:border-slate-700 transition-colors">
                  <span className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2 block">Step 0{index + 1}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
