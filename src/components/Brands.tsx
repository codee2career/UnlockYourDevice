import { motion } from 'motion/react';

const mobileBrands = [
  'Apple iPhone', 'Samsung', 'Vivo', 'Oppo', 'Realme', 'Xiaomi', 'Redmi', 
  'OnePlus', 'Motorola', 'Nokia', 'Google Pixel', 'Lenovo', 'Asus', 'Huawei', 'Sony'
];

const tabletBrands = [
  'Apple iPad', 'Samsung Galaxy Tab', 'Lenovo Tab', 'Xiaomi Pad', 'Realme Pad', 'Huawei MatePad'
];

export default function Brands() {
  return (
    <section id="brands" className="py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Supported Brands</h2>
          <p className="text-slate-400">We provide official unlocking for all major mobile and tablet manufacturers.</p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-blue-500/30"></span>
              Mobile Devices
              <span className="w-full h-px bg-blue-500/30"></span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {mobileBrands.map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-700/50 transition-all cursor-default"
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-cyan-500/30"></span>
              Tablet Devices
              <span className="w-full h-px bg-cyan-500/30"></span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {tabletBrands.map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all cursor-default"
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
