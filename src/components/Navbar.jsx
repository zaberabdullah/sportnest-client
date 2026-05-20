"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/facilities", label: "All Facilities" },
  ];

  const privateLinks = [
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/add-facility", label: "Add Facility" },
    { href: "/manage-facilities", label: "Manage My Facilities" },
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
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-colors ${
                isActive(link.href) ? "text-[#10b981] border-b-2 border-[#10b981]" : "text-zinc-200 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-zinc-700">
                <div className="w-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">
                  {user.photoURL ? <img src={user.photoURL} alt={user.name} /> : user.name?.charAt(0).toUpperCase()}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-[#1e1e1e] border border-zinc-800 rounded-2xl w-56 gap-1 text-zinc-200"
              >
                <li className="px-3 py-2 border-b border-zinc-800 mb-1">
                  <p className="font-bold text-white text-sm truncate">{user.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                </li>
                {privateLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={isActive(link.href) ? "text-[#10b981]" : ""}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-2 pt-2 border-t border-zinc-800">
                  <button onClick={handleLogout} className="text-rose-500 font-bold hover:bg-rose-500/10">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-zinc-300 hover:text-white text-sm font-bold px-4 py-2.5 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#10b981] hover:bg-[#0d9488] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
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
          <div className="absolute top-24 left-4 right-4 bg-[#1e1e1e] border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl md:hidden z-50">
            {publicLinks.map((link) => (
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
                <span className="mr-3 text-base">{link.label === "Home" ? "🏠" : "🏟️"}</span>
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <div className="border-t border-zinc-800 my-1"></div>
                {privateLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                      isActive(link.href) ? "text-[#10b981] bg-[#10b981]/10" : "text-zinc-300 hover:bg-zinc-800/50"
                    }`}
                  >
                    <span className="mr-3 text-base">⚙️</span>
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full text-rose-500 font-bold py-3 rounded-xl flex items-center justify-center bg-rose-500/5 hover:bg-rose-500/10 transition-all mt-2 text-sm"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <div className="pt-2 mt-2 border-t border-zinc-800 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-zinc-300 text-sm font-bold py-3 rounded-xl flex items-center justify-center hover:bg-zinc-800/5 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-[#10b981] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
