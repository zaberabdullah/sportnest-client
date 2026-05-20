"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const userEmail = "test@example.com";

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/api/booking/my-bookings/${userEmail}`);
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      toast.error("Failed to load bookings!");
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
      const res = await fetch(`http://localhost:5000/api/booking/cancel/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Booking cancelled successfully!");

        fetchBookings();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[#0b0f19]" />;

  return (
    <div className="min-h-screen bg-[#0b0f19] p-6 pt-28">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-8">My Bookings</h2>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="overflow-x-auto bg-zinc-900/40 rounded-3xl border border-zinc-800">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-[11px] uppercase">
                  <th className="p-5">Facility Name</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Time Slot</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b border-zinc-800/40">
                    <td className="p-5 text-white font-bold">{b.facility_details?.name || "Facility"}</td>
                    <td className="p-5 text-zinc-300">{b.booking_date}</td>
                    <td className="p-5 text-zinc-300">{b.time_slot}</td>
                    <td className="p-5">
                      <span
                        className={`px-2 py-1 rounded text-[10px] uppercase ${b.status === "cancelled" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      {b.status !== "cancelled" && (
                        <button
                          onClick={() => handleCancel(b._id)}
                          className="text-red-400 text-xs font-bold hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
