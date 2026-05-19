"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/facilities", label: "All Facilities" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <div className="absolute top-0 left-0 w-full z-50 pt-4 px-4 sm:px-6 lg:px-8">
      <nav className="w-full max-w-7xl mx-auto h-20 bg-transparent flex items-center justify-between">
        
    
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white font-black text-xl">
            ⚽
          </div>
          <span className="text-xl font-black text-white tracking-tight uppercase">
            Sport<span className="text-white font-medium lowercase">Nest</span>
          </span>
        </Link>

  
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-colors ${
                isActive(link.href) 
                  ? "text-[#10b981] border-b-2 border-[#10b981]" 
                  : "text-zinc-200 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

 
        <div className="hidden md:flex items-center">
          <Link
            href="/auth/login"
            className="bg-[#10b981] hover:bg-[#0d9488] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200"
          >
            Login
          </Link>
        </div>


        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl bg-black/40 border border-zinc-700/50 text-zinc-300 transition-all"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-24 left-4 right-4 bg-[#1e1e1e] border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                  isActive(link.href) 
                    ? "text-[#10b981] bg-[#10b981]/10 font-black" 
                    : "text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                <span className="mr-3 text-base">
                  {link.label === "Home" ? "🏠" : "🏟️"}
                </span>
                {link.label}
              </Link>
            ))}
            
            <div className="pt-2 mt-2 border-t border-zinc-800">
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#10b981] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        )}

      </nav>
    </div>
  );
}