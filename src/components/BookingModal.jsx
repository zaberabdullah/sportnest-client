"use client";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function BookingModal({ facilityId, price, onClose }) {
  const { data: session } = useSession();

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please login first!");
      return;
    }

    const form = e.target;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking"`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        facility_id: facilityId,
        user_email: session.user.email,
        booking_date: form.date.value,
        time_slot: form.slot.value,
        hours: 1,
        total_price: price,
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Booking successful!");
      onClose();
    } else {
      toast.error(data.message || "Booking failed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <form onSubmit={handleBooking} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 w-full max-w-sm">
        <h2 className="text-white font-bold mb-4">Confirm Booking</h2>
        <input name="date" type="date" className="w-full p-2 mb-2 bg-zinc-800 rounded text-white" required />
        <input
          name="slot"
          type="text"
          placeholder="e.g., 10:00-11:00"
          className="w-full p-2 mb-4 bg-zinc-800 rounded text-white"
          required
        />

        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 p-2 bg-zinc-700 text-white rounded">
            Cancel
          </button>
          <button type="submit" className="flex-1 p-2 bg-emerald-600 text-white rounded font-bold">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
