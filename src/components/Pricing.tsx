import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Mobile Unlock',
    price: '350',
    features: [
      'All Android Phones',
      'Fast Unlock',
      'Secure Service',
      '24/7 Support',
      'Factory Unlock',
      'Money-Back Guarantee'
    ],
    popular: true
  },
  {
    name: 'Tablet Unlock',
    price: '399',
    features: [
      'All Tablet Brands',
      'Quick Processing',
      'Data Safe',
      'Expert Support',
      'Carrier Unlocking',
      'Permanent Solution'
    ],
    popular: false
  }
];

interface PricingProps {
  onSelectPlan: (plan: string, price: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section id="pricing" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Service Plans</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Purchase a token to start the professional unlocking process for your device.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-slate-900 border ${
                plan.popular ? 'border-blue-500/50 shadow-[0_0_40px_rgba(37,99,235,0.1)]' : 'border-slate-800'
              } rounded-3xl p-8 transition-all hover:bg-slate-800/80 group`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Diamond
                </div>
              )}
              {!plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-700 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Silver
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-white">₹{plan.price}</span>
                <span className="text-slate-500">/token</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-300">
                    <div className="bg-blue-500/10 p-1 rounded-full">
                      <Check size={16} className="text-blue-500" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(plan.name, plan.price)}
                className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                Purchase Token
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
