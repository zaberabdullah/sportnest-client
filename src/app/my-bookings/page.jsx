"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/my-bookings/${session.user.email}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || "Failed to load bookings!");
      }
    } catch (err) {
      toast.error("Failed to load bookings!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && session?.user?.email) {
      fetchBookings();
    }
  }, [session, isPending]);

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/cancel/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Booking cancelled successfully!");
        fetchBookings();
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  if (isPending) return <div className="min-h-screen bg-[#0b0f19] pt-28 text-white text-center">Loading...</div>;
  if (!session?.user)
    return (
      <div className="min-h-screen bg-[#0b0f19] pt-28 text-white text-center">Please login to see your bookings</div>
    );

  return (
    <div className="min-h-screen bg-[#0b0f19] p-6 pt-28">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-8">My Bookings</h2>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 border border-zinc-900/60 rounded-3xl text-zinc-500 text-xs font-semibold uppercase">
            No bookings found!
          </div>
        ) : (
          <div className="overflow-x-auto bg-zinc-900/40 rounded-3xl border border-zinc-800">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text- uppercase">
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
                        className={`px-2 py-1 rounded text- uppercase ${b.status === "cancelled" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}
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
