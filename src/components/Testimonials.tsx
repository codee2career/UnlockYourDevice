import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "iPhone 14 Pro User",
    text: "Fast service and excellent support. My network lock was removed within 2 hours of submission. Highy recommended!",
    stars: 5
  },
  {
    name: "Sarah Miller",
    role: "Samsung Galaxy S23 User",
    text: "My iPhone unlocked within minutes. I was skeptical at first, but the team was very professional and the price was fair.",
    stars: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Pixel 7 Pro User",
    text: "Very professional and affordable. They handled my US-carrier locked Tablet with ease. Great communication throughout.",
    stars: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-slate-400">Trusted by thousands of customers worldwide.</p>
        </div>

        <div className="max-w-4xl mx-auto relative h-[350px] md:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 bg-slate-800 border border-slate-700/50 p-8 md:p-12 rounded-3xl flex flex-col items-center text-center"
            >
              <Quote className="text-blue-500/20 w-16 h-16 absolute top-8 left-8" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-slate-300 italic mb-8 leading-relaxed">
                "{testimonials[activeIndex].text}"
              </p>
              <div>
                <h4 className="text-lg font-bold text-white">{testimonials[activeIndex].name}</h4>
                <p className="text-blue-400 text-sm">{testimonials[activeIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button onClick={prev} className="p-3 bg-slate-800 border border-slate-700 rounded-full text-white hover:bg-slate-700 transition-all">
              <ChevronLeft size={24} />
            </button>
             <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-blue-600' : 'bg-slate-700'}`} />
              ))}
            </div>
            <button onClick={next} className="p-3 bg-slate-800 border border-slate-700 rounded-full text-white hover:bg-slate-700 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
