"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner"; 
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn.email({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message || "Invalid credentials!");
    } else {
      toast.success("Welcome back!");
      router.push(callbackUrl);
      router.refresh();
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center pt-24 px-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800/80 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-center mb-6">
          Welcome <span className="text-[#10b981]">Back</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#10b981] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#10b981] hover:bg-[#0d9488] disabled:opacity-50 text-white font-bold uppercase tracking-wider rounded-xl transition-all mt-2"
          >
            {loading? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase font-bold tracking-widest">OR</span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full h-11 bg-transparent hover:bg-zinc-800 text-white border border-zinc-800 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all mt-4 flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#10b981] font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}