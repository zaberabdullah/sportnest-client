"use client";

import { motion } from "framer-motion";
import { Zap, Trophy, CalendarClock, ShieldCheck } from "lucide-react";


const whyFeatures = [
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Real-time slot confirmation with zero waiting. Book in 10 seconds."
  },
  {
    icon: Trophy,
    title: "Premium Turfs",
    desc: "FIFA-grade artificial grass & international standard courts verified by us."
  },
  {
    icon: CalendarClock,
    title: "Smart Scheduling",
    desc: "Reschedule or cancel anytime. Manage your squad bookings in one dashboard."
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "100% refund on cancellations. bKash, Nagad, Card - all supported."
  },
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

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-[#0a0a0a] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            Why <span className="text-[#10b981]">SPORTnest</span>
          </h2>
          <p className="mt-4 text-sm text-zinc-500 font-medium max-w-2xl mx-auto">
            Bangladesh's #1 sports facility platform. Built for players, by players.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {whyFeatures.map((feature, idx) => {
            const Icon = feature.icon; // ✅ এটা এখন Component
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="group relative bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6 transition-all duration-300 hover:border-[#10b981]/40 hover:bg-zinc-900/80 hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#10b981]/0 to-[#10b981]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#10b981]/20 transition-all duration-300">
                  <Icon className="w-6 h-6" /> {/* ✅ এখানে রেন্ডার হবে */}
                </div>
                <div className="relative">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-6 right-6 h- bg-gradient-to-r from-transparent via-[#10b981]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}