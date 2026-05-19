import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How long does unlocking take?",
    answer: "Most Android devices are unlocked within 1-6 hours. iPhones typically take 12-24 hours depending on the carrier and region. We always aim for the fastest processing."
  },
  {
    question: "Is my data safe?",
    answer: "Yes, our official IMEI unlocking process does not touch your device data. Your photos, contacts, and apps remain perfectly safe. No factory reset is required in most cases."
  },
  {
    question: "Which devices are supported?",
    answer: "We support over 100 brands, including Apple, Samsung, Google, OnePlus, Xiaomi, and many more. If your brand is not on our list, feel free to contact us."
  },
  {
    question: "Do you support iPhones and iPads?",
    answer: "Yes! We specialize in permanent factory unlocking for all iPad and iPhone models, including the latest iPhone 15 series. We can unlock network, iCloud, and screen locks."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about our unlocking service.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-slate-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-slate-900 transition-colors hover:bg-slate-800"
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <span className="text-blue-500">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-900/50"
                  >
                    <div className="p-6 text-slate-400 border-t border-slate-800 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
