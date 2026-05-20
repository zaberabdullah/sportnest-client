"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; 
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photoUrl, password } = formData;

    
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain at least one uppercase letter!");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain at least one lowercase letter!");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, photoURL: photoUrl, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Registration successful! Redirecting to login...");
        router.push("/login"); 
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center pt-28 pb-12 px-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800/80 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-center mb-6">
          Create an <span className="text-[#10b981]">Account</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Full Name</label>
            <input type="text" name="name" required onChange={handleChange} className="w-full h-11 px-4 bg-zinc-950 border border-zinc-850 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all" placeholder="Be Careful" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Email Address</label>
            <input type="email" name="email" required onChange={handleChange} className="w-full h-11 px-4 bg-zinc-950 border border-zinc-850 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Photo URL</label>
            <input type="url" name="photoUrl" required onChange={handleChange} className="w-full h-11 px-4 bg-zinc-950 border border-zinc-850 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all" placeholder="https://image-link.com" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Password</label>
            <input type="password" name="password" required onChange={handleChange} className="w-full h-11 px-4 bg-zinc-950 border border-zinc-850 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full h-12 bg-[#10b981] hover:bg-[#0d9488] text-white font-bold uppercase tracking-wider rounded-xl transition-all mt-2">
            Register Now
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
          Already have an account?{" "}
          <Link href="/login" className="text-[#10b981] font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}