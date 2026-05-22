import ClientFacilitiesAll from "@/components/ClientFacilitiesAll";
export const dynamic = 'force-dynamic' 
async function getAllFacilities() {
  try {
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/facility`, {
      cache: "no-store", 
    });
    if (!res.ok) return [];
    
    const data = await res.json();
    return data?.facilities || [];
  } catch (error) {
    console.error("Error fetching all facilities:", error);
    return [];
  }
}

export default async function AllFacilitiesPage() {
  const facilities = await getAllFacilities();

  return (

    <div className="w-full bg-[#121212] min-h-screen text-white antialiased pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
   
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            All Available <span className="text-[#10b981]">Arenas</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
            Browse through our complete list of premium sports facilities, turfs, and courts. Filter by your favorite sport and book your slot instantly.
          </p>
        </div>


        <ClientFacilitiesAll initialFacilities={facilities} />

      </div>
    </div>
  );
}