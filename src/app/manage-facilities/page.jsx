import Image from "next/image";


async function getFacilities() {
  try {
    const res = await fetch("http://localhost:5000/api/facility", { 
      cache: "no-store" 
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Server Fetch Error:", error);
    return [];
  }
}

export default async function ManageFacilitiesPage() {
  const facilities = await getFacilities();

  return (
    <div className="min-h-screen bg-[#060814] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-black text-white p-6 sm:p-8 pt-24 relative overflow-hidden">
      
   
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="mb-8 pt-50">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Manage <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Facilities</span>
          </h2>
          <p className="text-zinc-400 text-xs mt-1">Pure Next.js Server-Side Rendered View</p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <div key={f._id} className="bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-xl p-4 rounded-3xl flex flex-col gap-4 shadow-xl hover:border-zinc-700/80 transition-all group">
              
             
              <div className="relative w-full aspect-[16/10] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800/60">
                <Image
                  src={f.image || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e"}
                  alt={f.name || "Facility"}
                  fill
                  sizes="(max-w-7xl) 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

          
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div>
                  <h3 className="font-bold text-lg text-zinc-100 group-hover:text-emerald-400 transition-colors truncate">
                    {f.name}
                  </h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                    📍 {f.location}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">Rate</span>
                  <p className="text-emerald-400 font-black text-lg">${f.pricePerHour}<span className="text-xs text-zinc-500 font-normal">/hr</span></p>
                </div>
              </div>


              <button
                className="w-full py-2.5 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200"
              >
                Delete Facility
              </button>
            </div>
          ))}
        </div>
        {facilities.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/10 border border-zinc-800/40 rounded-3xl backdrop-blur-sm">

            <p className="font-semibold text-sm text-zinc-400">No facilities found in the system!</p>
            <p className="text-xs text-zinc-500 mt-1">Go to All Facility page to add a field first.</p>
          </div>
        )}
      </div>
    </div>
  );
}