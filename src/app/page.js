import Link from "next/link";
import Image from "next/image";
import ClientFacilities from "@/components/ClientFacilities"; // আমরা একটা ছোট ক্লায়েন্ট পার্ট আলাদা রাখব

// ১. তোর সেই কাঙ্ক্ষিত এবং সফল সার্ভার সাইড ফেচ ফাংশন
async function getFacilities() {
  try {
    const res = await fetch("http://localhost:5000/api/facility", {
      cache: "no-store", // প্রতিবার ডাটাবেজ থেকে লাইভ ডাটা আনবে
    });
    if (!res.ok) return [];
    
    const data = await res.json();
    return data?.facilities || [];
  } catch (error) {
    console.error("Server fetch error:", error);
    return [];
  }
}

// ২. মেইন হোম পেজ (সার্ভার কম্পোনেন্ট)
export default async function Home() {
  const allFacilities = await getFacilities();

  return (
    <div className="w-full bg-[#121212] antialiased text-white min-h-screen">
      
      {/* 🏙️ HERO SECTION (যেটা গায়েব হয়েছিল, আবার ফেরত আনা হলো) */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <Image 
          src="https://images.pexels.com/photos/23848540/pexels-photo-23848540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Sports Court Background" 
          fill={true}
          priority={true}
          className="absolute inset-0 object-cover object-center w-full h-full opacity-85" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#121212] z-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center z-20 pt-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#10b981] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
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
        </div>
      </section>

      {/* 🔍 SEARCH, FILTER & CARDS SECTION */}
      {/* আমরা সার্ভার থেকে আনা ডাটা এই ক্লায়েন্ট পার্টটাতে পাস করে দিচ্ছি */}
      <ClientFacilities initialFacilities={allFacilities} />

      {/* 🏆 STATIC INFO SECTION */}
      <section id="why-choose-us" className="w-full bg-zinc-900/20 border-y border-zinc-900/60 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-black uppercase tracking-tight mb-10">
            Why <span className="text-[#10b981]">Choose Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900 border border-zinc-800/60 rounded-2xl">
              <span className="text-xl block mb-3">⚡</span>
              <h4 className="text-xs font-black uppercase text-white mb-1">Instant Slot Booking</h4>
              <p className="text-[11px] text-zinc-500">Real-time confirmation on all match bookings with zero waiting lines.</p>
            </div>
            <div className="p-6 bg-zinc-900 border border-zinc-800/60 rounded-2xl">
              <span className="text-xl block mb-3">🏟️</span>
              <h4 className="text-xs font-black uppercase text-white mb-1">Top Tier Arenas</h4>
              <p className="text-[11px] text-zinc-500">Verified high-end football turfs and standard badminton courts.</p>
            </div>
            <div className="p-6 bg-zinc-900 border border-zinc-800/60 rounded-2xl">
              <span className="text-xl block mb-3">🛡️</span>
              <h4 className="text-xs font-black uppercase text-white mb-1">Flexible Scheduling</h4>
              <p className="text-[11px] text-zinc-500">Easy cancellation and slot shifting dashboards built for your squad.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}