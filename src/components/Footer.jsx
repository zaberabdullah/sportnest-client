import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-900/60">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white font-black text-xl">
            ⚽
          </div>
          <span className="text-xl font-black text-white tracking-tight uppercase">
            Sport<span className="text-white font-medium lowercase">Nest</span>
          </span>
        </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-md mb-6">
              Bangladesh's #1 sports facility platform. Book premium turfs, courts & pools instantly. 
              Built for players, by players.
            </p>
            
            {/* Social Icons - React Icons */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: "https://facebook.com" },
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaXTwitter, href: "https://twitter.com" },
                { icon: FaYoutube, href: "https://youtube.com" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800/60 flex items-center justify-center text-zinc-500 hover:text-[#10b981] hover:border-[#10b981]/40 hover:bg-[#10b981]/5 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "All Facilities", href: "/facilities" },
                { name: "My Bookings", href: "/my-bookings" },
                { name: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-[#10b981] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <Mail className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                <a href="mailto:support@sportnest.com" className="hover:text-[#10b981] transition-colors">
                  support@sportnest.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <Phone className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-[#10b981] transition-colors">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <MapPin className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-600 font-medium">
              © {currentYear} SportNest. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-zinc-600 hover:text-[#10b981] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-zinc-600 hover:text-[#10b981] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}