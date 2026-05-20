"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/booking", { 
        credentials: "include" 
      });
      const data = await res.json();

     
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data && Array.isArray(data.data)) {
        setBookings(data.data);
      } else if (data && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Booking fetch error:", err);
      toast.error("Failed to load bookings from server!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchBookings();
  }, []);


  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/booking/${id}`, { 
        method: "DELETE", 
        credentials: "include" 
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Booking cancelled successfully!");
      
        setBookings((prevBookings) => prevBookings.filter((b) => b._id !== id));
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("Something went wrong!");
    }
  };


  if (!mounted) {
    return <div className="min-h-screen bg-[#0b0f19]" />;
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-black text-white p-6 sm:p-8 pt-28 relative overflow-hidden">
      
  
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        
        <div className="mb-8 pt-50">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            My <span className="bg-gradient-to-r from-[#10b981] to-emerald-400 bg-clip-text text-transparent">Bookings History</span>
          </h2>
          <p className="text-zinc-400 text-xs mt-1">Review and manage your custom facility reservations</p>
        </div>

  
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/20 border border-zinc-800/60 rounded-3xl backdrop-blur-md">
            <div className="w-8 h-8 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-zinc-400 mt-4 font-medium uppercase tracking-wider">Fetching your slots...</p>
          </div>
        ) : (
    
          <div className="overflow-x-auto bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md rounded-3xl shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-[11px] uppercase font-black tracking-wider text-zinc-400">
                  <th className="p-5">Facility Name</th>
                  <th className="p-5">Booking Date</th>
                  <th className="p-5">Time Slot</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-zinc-800/40">
                {bookings?.map((b) => (
                  <tr key={b._id} className="hover:bg-emerald-500/[0.02] transition-all duration-200 group">
                    <td className="p-5 font-bold text-zinc-100 group-hover:text-[#10b981] transition-colors">
                      {b.facility?.name || b.facilityName || "Sports Ground/Court"}
                    </td>
                    <td className="p-5 text-zinc-300">
                      <span className="mr-1">🗓️</span> {b.date}
                    </td>
                    <td className="p-5 text-zinc-300">
                      <span className="mr-1">⏰</span> {b.startTime} - {b.endTime}
                    </td>
                    <td className="p-5 text-right">
                      <button 
                        onClick={() => handleCancel(b._id)} 
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-red-500/20 shadow-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
                
                {/* ফাঁকা ডাটাবেজের এম্পটি স্টেট */}
                {bookings?.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-16 text-zinc-500">
                      <p className="font-semibold text-sm text-zinc-400">No booked facilities found in your dashboard!</p>
                      <p className="text-xs text-zinc-500 mt-1">Go to facilities and book a slot first.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}