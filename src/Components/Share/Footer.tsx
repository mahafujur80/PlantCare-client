import Link from "next/link";
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <h2 className="text-emerald-600 flex items-center text-2xl font-bold">
                Plant <span className="mx-1 text-emerald-500"><FaLeaf /></span> Care
              </h2>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering plant lovers with smart diagnostics, premium care guides, and a curated selection of beautiful green companions.
            </p>
            <div className="flex gap-4 text-lg mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
                <FaInstagram />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Explore</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/plants" className="hover:text-emerald-500 transition-colors">Browse Plants</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Plant Resources */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/about#features" className="hover:text-emerald-500 transition-colors">Smart Watering Guide</Link>
              </li>
              <li>
                <Link href="/plants?careLevel=Easy" className="hover:text-emerald-500 transition-colors">Beginner Plants</Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-emerald-500 transition-colors">Help Center & FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-500 transition-colors">Partnership Queries</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex flex-col">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Office Location</span>
                <span>122 Green Valley Road, Plant City, PC 5402</span>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Phone Support</span>
                <span>+1 (800) 555-LEAF (5323)</span>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Email Address</span>
                <span>support@plantcare-app.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-6 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PlantCare Inc. All rights reserved. Designed with premium HSL green aesthetics.</p>
        </div>
      </div>
    </footer>
  );
}
