import { ShieldCheck, Zap, CreditCard, Star, Smartphone, Users } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    title: '100% Secure',
    description: 'Our unlocking process is safe and official, preserving your device warranty.',
    icon: ShieldCheck,
    color: 'text-blue-500'
  },
  {
    title: 'Instant Processing',
    description: 'Automated systems ensure the fastest possible turnaround time.',
    icon: Zap,
    color: 'text-yellow-500'
  },
  {
    title: 'Affordable Pricing',
    description: 'Premium service at the most competitive market rates.',
    icon: CreditCard,
    color: 'text-green-500'
  },
  {
    title: 'Trusted Service',
    description: 'Over 50,000+ devices successfully unlocked since 2018.',
    icon: Star,
    color: 'text-orange-500'
  },
  {
    title: 'All Devices Supported',
    description: 'Support for almost every major smartphone and tablet brand globally.',
    icon: Smartphone,
    color: 'text-cyan-500'
  },
  {
    title: 'Expert Team',
    description: 'Dedicated professionals available 24/7 to assist with your requests.',
    icon: Users,
    color: 'text-purple-500'
  }
];

export default function Features() {
  return (
    <section id="services" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose Us?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">We combine cutting-edge technology with expert support to provide the best unlocking experience.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-800/50 border border-slate-700/50 rounded-3xl hover:bg-slate-800 transition-all hover:shadow-xl group"
            >
              <div className={`w-12 h-12 ${feature.color} bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={26} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
