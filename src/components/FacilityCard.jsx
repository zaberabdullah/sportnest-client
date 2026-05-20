"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

const TYPE_STYLES = {
  Football:   { bg: "bg-green-100",  text: "text-green-700"  },
  Badminton:  { bg: "bg-blue-100",   text: "text-blue-700"   },
  Swimming:   { bg: "bg-amber-100",  text: "text-amber-700"  },
  Tennis:     { bg: "bg-orange-100", text: "text-orange-700" },
  Cricket:    { bg: "bg-red-100",    text: "text-red-700"    },
  Basketball: { bg: "bg-purple-100", text: "text-purple-700" },
};

export default function FacilityCard({ facility }) {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    _id,
    name,
    facility_type,
    image,
    location,
    price_per_hour,
    capacity,
    available_slots,
  } = facility;

  const typeStyle = TYPE_STYLES[facility_type] || {
    bg: "bg-slate-100",
    text: "text-slate-700",
  };

  const handleBookNow = () => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }
    router.push(`/facilities/${_id}`);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

   
      <div className="relative h-44 bg-slate-50 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

      
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeStyle.bg} ${typeStyle.text}`}>
            {facility_type}
          </span>
        </div>
      </div>

  
      <div className="flex flex-col flex-1 p-4">

           <h3 className="font-semibold text-slate-900 text-[15px] mb-1 truncate">
          {name}
        </h3>


        <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </p>


        <div className="h-px bg-slate-100 mb-3" />


        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Up to {capacity}
          </span>

          {available_slots?.length > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {available_slots[0]}
            </span>
          )}
        </div>



<div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
  <button
    onClick={() => {
  
      console.log("Update Clicked for:", _id);
    }}
    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold py-2 rounded-lg transition-all"
  >
    Update
  </button>
  
  <button
    onClick={() => {
      if(confirm("Are you sure you want to delete this facility?")) {
        
         console.log("Deleting:", _id);
      }
    }}
    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold py-2 rounded-lg transition-all"
  >
    Delete
  </button>
</div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-green-600">
              ৳{price_per_hour}
            </span>
            <span className="text-xs text-slate-400"> / hour</span>
          </div>
          <button
            onClick={handleBookNow}
            className="bg-green-600 hover:bg-green-700 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
}