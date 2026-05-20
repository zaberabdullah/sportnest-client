"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BookingForm({ facilityId, price, userEmail }) {
  const [formData, setFormData] = useState({
    booking_date: "",
    time_slot: "",
    hours: 1,
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    
    const payload = {
      facility_id: facilityId,
      user_email: userEmail,
      booking_date: formData.booking_date,
      time_slot: formData.time_slot,
      hours: formData.hours,
      total_price: price * formData.hours,
    };

    try {
      const res = await fetch("http://localhost:5000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Booking submitted successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Booking failed!");
    }
  };

  return (
    <form onSubmit={handleBooking} className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white">
      <h3 className="text-xl font-bold mb-4">Book this Facility</h3>
      
      <input 
        type="date" 
        className="w-full p-3 mb-3 bg-zinc-800 rounded"
        onChange={(e) => setFormData({...formData, booking_date: e.target.value})}
        required
      />
      
      <select 
        className="w-full p-3 mb-3 bg-zinc-800 rounded"
        onChange={(e) => setFormData({...formData, time_slot: e.target.value})}
        required
      >
        <option value="">Select Time Slot</option>
        <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
        <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
      </select>

      <button type="submit" className="w-full py-3 bg-emerald-600 rounded-lg font-bold">
        Confirm Booking
      </button>
    </form>
  );
}