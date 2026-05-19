import Link from "next/link";
import Image from "next/image";

async function getSingleFacility(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/facility/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();

    return data?.facility || data;
  } catch (error) {
    console.error("Error fetching single facility:", error);
    return null;
  }
}

export default async function FacilityDetails({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const facility = await getSingleFacility(id);

  if (!facility) {
    return (
      <div className="w-full min-h-screen bg-[#121212] flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-xl font-black uppercase text-red-500 mb-4">❌ Facility Not Found</h2>
        <Link href="/" className="bg-[#10b981] text-xs font-bold uppercase px-5 py-3 rounded-xl">
          Back To Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#121212] min-h-screen text-white antialiased flex flex-col">
      <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[45vh] bg-zinc-900 overflow-hidden">
        <Image
          src={facility.image || "https://images.pexels.com/photo-1541252260730-0412e8e2108e"}
          alt={facility.name}
          fill
          priority
          className="object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 pb-24 -mt-16 sm:-mt-24 relative z-20">
        <div className="bg-zinc-900 border border-zinc-800/80 p-6 sm:p-8 rounded-3xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
              {facility.facility_type || "Sports"}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
              {facility.name}
            </h1>
            <p className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">📍 {facility.location}</p>
          </div>

          <button className="w-full md:w-auto bg-[#10b981] hover:bg-[#0d9488] text-white text-xs font-black uppercase px-6 py-4 rounded-xl transition-all shadow-lg shadow-[#10b981]/10 whitespace-nowrap text-center">
            Check Availability ⚡
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/40 p-6 sm:p-8 rounded-3xl border border-zinc-800/40">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">About This Facility</h3>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-medium">
                {facility.description ||
                  "No description provided. It features international standard ground conditions, perfect lightning for night matches, and proper squad management."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/40 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl">
                  👥
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                    Max Capacity
                  </span>
                  <span className="text-xs sm:text-sm font-black text-white">{facility.capacity || "N/A"} Players</span>
                </div>
              </div>
              <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/40 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl">
                  🕒
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                    Session Limit
                  </span>
                  <span className="text-xs sm:text-sm font-black text-white">60 Min / Slot</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 lg:sticky lg:top-6 h-fit shadow-xl">
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase block tracking-wider mb-1">
                Pricing / Hour
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-[#10b981]">৳{facility.price_per_hour}</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Per Hour</span>
              </div>
            </div>

            <button className="w-full h-12 bg-[#10b981] hover:bg-[#0d9488] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#10b981]/10">
              Proceed To Booking ⚡
            </button>

            <div className="border-t border-zinc-800/60 pt-5">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3">
                Available Slots ({facility.available_slots?.length || 0})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {facility.available_slots?.map((slot) => (
                  <div
                    key={slot}
                    className="w-full bg-zinc-950/60 border border-zinc-800/40 px-4 py-3 rounded-xl text-xs font-semibold text-zinc-300 flex items-center gap-2"
                  >
                    <span className="text-emerald-500">🟢</span> {slot}
                  </div>
                )) || <p className="text-[11px] text-zinc-600 uppercase">No slots available today</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
