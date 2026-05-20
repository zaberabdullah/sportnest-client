import { createFacility } from "@/app/actions";

export default function AddFacilityPage() {
  async function handleFormSubmit(formData) {
    "use server";
    const res = await createFacility(formData);

    if (res.success) {
      console.log("Success in DB!");
    }
  }

  return (
    <div className="min-h-screen bg-[#060814] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-black text-white flex items-center justify-center px-4 pt-28 pb-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-xl p-8 sm:p-10 rounded-[32px] shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Add New{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Facility
            </span>
          </h2>
          <p className="text-zinc-400 text-xs mt-1.5">Expand the platform by adding a new sports hub or court</p>
        </div>

        <form action={handleFormSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Facility Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Elite Futsal & Sports"
                required
                className="w-full h-12 px-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl focus:outline-none focus:border-emerald-500 text-sm text-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Facility Type</label>
              <input
                type="text"
                name="facility_type"
                placeholder="e.g., football / swimming"
                required
                className="w-full h-12 px-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl focus:outline-none focus:border-emerald-500 text-sm text-white transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://images.pexels.com/photos/..."
              required
              className="w-full h-12 px-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl focus:outline-none focus:border-emerald-500 text-sm text-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                Price Per Hour (৳/$)
              </label>
              <input
                type="number"
                name="price_per_hour"
                placeholder="1400"
                required
                className="w-full h-12 px-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl focus:outline-none focus:border-emerald-500 text-sm text-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Capacity (Persons)</label>
              <input
                type="number"
                name="capacity"
                placeholder="12"
                required
                className="w-full h-12 px-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl focus:outline-none focus:border-emerald-500 text-sm text-white transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g., Shiromoni, Khulna"
              required
              className="w-full h-12 px-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl focus:outline-none focus:border-emerald-500 text-sm text-white transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Description</label>
            <textarea
              name="description"
              placeholder="Roof-covered premium futsal ground. Play rain or shine!..."
              required
              rows={3}
              className="w-full p-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl focus:outline-none focus:border-emerald-500 text-sm text-white transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black uppercase tracking-wider rounded-xl mt-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 active:scale-[0.99]"
          >
            Save Facility
          </button>
        </form>
      </div>
    </div>
  );
}
