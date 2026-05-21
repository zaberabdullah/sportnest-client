"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photoUrl, password } = formData;

    if (password.length < 6) return toast.error("Password must be at least 6 characters!");
    if (!/[A-Z]/.test(password)) return toast.error("Need at least one uppercase letter!");
    if (!/[a-z]/.test(password)) return toast.error("Need at least one lowercase letter!");

    setLoading(true);

const { data, error } = await signUp.email({
  name,
  email,
  password,
  image: photoUrl || undefined,
});

console.log("SignUp Response:", { data, error }); // এটা এড করো ডিবাগের জন্য

if (error) {
  toast.error(error.message || "Registration failed!"); // আসল error দেখাবে
} else {
  toast.success("Registration successful!");
  router.push("/");
  router.refresh();
}

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
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
            <input type="text" name="name" required onChange={handleChange}
              className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all"
              placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Email Address</label>
            <input type="email" name="email" required onChange={handleChange}
              className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all"
              placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Photo URL</label>
            <input type="url" name="photoUrl" onChange={handleChange}
              className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all"
              placeholder="https://image-link.com" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Password</label>
            <input type="password" name="password" required onChange={handleChange}
              className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all"
              placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full h-12 bg-[#10b981] hover:bg-[#0d9488] disabled:opacity-50 text-white font-bold uppercase tracking-wider rounded-xl transition-all mt-2">
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase font-bold tracking-widest">OR</span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>
          <button onClick={handleGoogleLogin}
            className="w-full h-11 bg-transparent hover:bg-zinc-800 text-white border border-zinc-800 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all mt-4 flex items-center justify-center gap-2">
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