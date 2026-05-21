"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <Image
        src="https://images.pexels.com/photos/23848540/pexels-photo-23848540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Sports Court Background"
        fill={true}
        priority={true}
        className="absolute inset-0 object-cover object-center w-full h-full opacity-85"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#121212] z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto px-4 text-center z-20 pt-24"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#10b981] text-white text- font-black uppercase tracking-[0.2em] rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          Where Champions Train
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.95] select-none">
          Where Your <br />
          <span className="text-[#10b981]">Game Start</span>
        </h1>
        <p className="mt-6 text-sm text-zinc-200 max-w-xl mx-auto leading-relaxed">
          Unlock the next level of performance. Discover and book premium, high-end turfs and courts tailored for ultimate athletes.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="#search-section" className="inline-flex items-center bg-[#10b981] hover:bg-[#0d9488] text-white font-bold text-xs uppercase tracking-widest h-12 px-6 rounded-xl transition-all">
            Explore Arenas ⚡
          </a>
        </div>
      </motion.div>
    </section>
  );
}