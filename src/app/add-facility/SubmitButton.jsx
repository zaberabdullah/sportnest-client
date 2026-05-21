"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black uppercase tracking-wider rounded-xl mt-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending? "Saving..." : "Save Facility"}
    </button>
  );
}