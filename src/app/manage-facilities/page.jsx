"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client"; 

export default function ManageFacilitiesPage() {
  const { data: session, isPending } = useSession(); 
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session?.user?.email) {
      setLoading(true);
      fetch(`http://localhost:5000/api/facility?user_email=${session.user.email}`, {
        credentials: "include", 
      })
        .then((res) => res.json())
        .then((data) => setFacilities(data.facilities || []))
        .finally(() => setLoading(false));
    }
  }, [session, isPending]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this facility?")) return;
    const res = await fetch(`http://localhost:5000/api/facility/${id}`, {
      method: "DELETE",
      credentials: "include", 
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setFacilities(facilities.filter((f) => f._id !== id));
      toast.success("Deleted successfully!");
    } else {
      toast.error(data.message || "Delete failed!");
    }
  };

  const openUpdateModal = (facility) => {
    setSelectedFacility(facility);
    setFormData(facility);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/facility/${selectedFacility._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({
        ...formData,
        price_per_hour: parseFloat(formData.price_per_hour),
        capacity: parseInt(formData.capacity),
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      toast.success("Updated successfully!");
      setFacilities(facilities.map((f) => (f._id === selectedFacility._id ? { ...f, ...formData, price_per_hour: parseFloat(formData.price_per_hour), capacity: parseInt(formData.capacity) } : f)));
      setSelectedFacility(null);
    } else {
      toast.error(data.message || "Update failed!");
    }
  };

  if (isPending) return <div className="min-h-screen bg-[#060814] pt-28 text-white text-center">Loading...</div>;
  if (!session?.user) return <div className="min-h-screen bg-[#060814] pt-28 text-white text-center">Please login first</div>;

  return (
    <div className="min-h-screen bg-[#060814] text-white p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black uppercase mb-8">Manage Facilities</h2>
        
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : facilities.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 border border-zinc-900/60 rounded-3xl text-zinc-500 text-xs font-semibold uppercase">
            No facilities found! Add one first.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <div key={f._id} className="bg-zinc-900/50 p-4 rounded-3xl border border-zinc-800">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={f.image || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e"}
                    alt={f.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{f.name}</h3>
                <p className="text-zinc-400 text-xs mb-1">{f.location}</p>
                <p className="text-emerald-400 font-black mb-4">${f.price_per_hour}/hr</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openUpdateModal(f)}
                    className="flex-1 bg-zinc-700 py-2 rounded-xl text-xs font-bold uppercase"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(f._id)}
                    className="flex-1 bg-red-600 py-2 rounded-xl text-xs font-bold uppercase"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedFacility && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleUpdate} className="bg-zinc-900 p-8 rounded-3xl w-full max-w-lg border border-zinc-700">
            <h2 className="text-xl font-bold mb-4">Update Facility</h2>
            
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-800 p-3 rounded-xl mb-3 text-white"
              placeholder="Facility Name"
              required
            />

            <input
              type="text"
              value={formData.facility_type || ""}
              onChange={(e) => setFormData({ ...formData, facility_type: e.target.value })}
              className="w-full bg-zinc-800 p-3 rounded-xl mb-3 text-white"
              placeholder="Facility Type"
              required
            />

            <input
              type="text"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-zinc-800 p-3 rounded-xl mb-3 text-white"
              placeholder="Location"
              required
            />

            <input
              type="number"
              value={formData.price_per_hour || ""}
              onChange={(e) => setFormData({ ...formData, price_per_hour: e.target.value })}
              className="w-full bg-zinc-800 p-3 rounded-xl mb-3 text-white"
              placeholder="Price Per Hour"
              required
            />

            <input
              type="number"
              value={formData.capacity || ""}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              className="w-full bg-zinc-800 p-3 rounded-xl mb-3 text-white"
              placeholder="Capacity"
              required
            />

            <input
              type="url"
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-zinc-800 p-3 rounded-xl mb-3 text-white"
              placeholder="Image URL"
              required
            />

            <textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-800 p-3 rounded-xl mb-3 text-white"
              placeholder="Description"
              rows={3}
              required
            ></textarea>

            <div className="flex gap-4 mt-4">
              <button type="submit" className="flex-1 bg-emerald-600 py-3 rounded-xl font-bold">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className="flex-1 bg-zinc-700 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}