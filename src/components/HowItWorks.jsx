"use client"; // ✅ এটা লাগবেই

import { motion } from "framer-motion"; // ✅ এটা লাগবেই
import { Search, MousePointerClick, Gamepad2 } from "lucide-react";

const howItWorks = [
  { icon: Search, step: "01", title: "Search Arena", desc: "Browse turfs, courts & pools near you" },
  { icon: MousePointerClick, step: "02", title: "Pick Slot", desc: "Choose date, time & duration that fits you" },
  { icon: Gamepad2, step: "03", title: "Play Game", desc: "Show up & enjoy. We'll handle the rest" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function HowItWorks() {
  return (
    <section className="bg-[#121212] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
            How It <span className="text-[#10b981]">Works</span>
          </h2>
          <p className="mt-4 text-sm text-zinc-500 font-medium">Book your game in 3 simple steps</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {howItWorks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="relative text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-6xl font-black text-[#10b981]/10 absolute top-0 left-1/2 -translate-x-1/2 -z-10">{item.step}</div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-400 font-medium">{item.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h- bg-gradient-to-r from-[#10b981]/40 to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}