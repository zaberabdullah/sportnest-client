"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ClientFacilities({ initialFacilities }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const sportsTypes = ["All", "Football", "Badminton", "Tennis", "Swimming"];

  // প্রথম ৬টা ডাটা ফিল্টারের পর কেটে নিবে
  const filteredFacilities = initialFacilities
    .filter((facility) => {
      const matchesSearch = facility?.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = 
        selectedType === "All" || 
        facility?.facility_type?.toLowerCase() === selectedType.toLowerCase();
      return matchesSearch && matchesType;
    })
    .slice(0, 6);

  return (
    <>
      {/* 🔍 SEARCH & FILTER CONTROLS */}
      <section id="search-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-zinc-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search by turf or court name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-semibold text-white uppercase tracking-wider focus:outline-none focus:border-[#10b981] transition-all"
            />
            <span className="absolute left-4 top-3.5 text-zinc-500 text-sm">🔍</span>
          </div>
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-start">
            {sportsTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`h-10 px-5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border ${
                  selectedType === type
                    ? "bg-[#10b981] text-white border-[#10b981]"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🏟️ FEATURED FACILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8">
          Featured <span className="text-[#10b981]">Facilities</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <div key={facility._id} className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between h-full hover:border-zinc-700 transition-all duration-200">
              <div className="relative w-full aspect-[16/10] bg-zinc-800">
                <Image 
                  src={facility.image || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e"} 
                  alt={facility.name} 
                  fill 
                  className="object-cover" 
                />
                <span className="absolute top-3 left-3 bg-black/80 text-[#10b981] border border-zinc-800 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                  {facility.facility_type}
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-white">
                    {facility.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium mt-1">
                    📍 {facility.location}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-bold uppercase block tracking-wider">Per Hour</span>
                    <span className="text-base font-black text-white">৳{facility.price_per_hour}</span>
                  </div>
                  <Link 
                    href={`/facilities/${facility._id}`} 
                    className="bg-[#10b981] hover:bg-[#0d9488] text-white text-[10px] font-bold uppercase px-4 py-2.5 rounded-xl transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <div className="text-center py-12 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
            ❌ NO DATA FOUND
          </div>
        )}
      </section>
    </>
  );
}