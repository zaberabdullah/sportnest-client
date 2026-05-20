"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Welcome back! Login successful.");

     
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/"); 
        router.refresh();
      } else {
        toast.error(data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center pt-24 px-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800/80 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-center mb-6">
          Welcome <span className="text-[#10b981]">Back</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full h-11 px-4 bg-zinc-950 border border-zinc-850 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full h-11 px-4 bg-zinc-950 border border-zinc-850 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#10b981] hover:bg-[#0d9488] text-white font-bold uppercase tracking-wider rounded-xl transition-all mt-2"
          >
            Log In
          </button>
        </form>

        {/* GOOGLE LOGIN BUTTON */}
        <div className="mt-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase font-bold tracking-widest">OR</span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>
          <button className="w-full h-11 bg-transparent hover:bg-zinc-850 text-white border border-zinc-800 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all mt-4 flex items-center justify-center gap-2">
            <FcGoogle size={20} /> Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#10b981] font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
