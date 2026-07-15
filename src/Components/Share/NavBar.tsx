"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import PlantCareLogo from "./Logo";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as User;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to log out");
    }
  };

  // Nav link helper
  const linkClass = (path: string) => {
    const base = "transition-all duration-300 font-medium text-sm hover:text-emerald-500 ";
    return pathname === path
      ? base + "text-emerald-600 border-b-2 border-emerald-500 pb-1"
      : base + "text-slate-600 dark:text-slate-300";
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <header className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90">
          <PlantCareLogo />
        </Link>

        {/* DESKTOP ROUTING */}
        <ul className="hidden items-center gap-6 md:flex">
          <li>
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/plants" className={linkClass("/plants")}>
              Explore Plants
            </Link>
          </li>
          {user?.email && (
            <>
              <li>
                <Link href="/items/add" className={linkClass("/items/add")}>
                  Add Plant
                </Link>
              </li>
              <li>
                <Link href="/items/manage" className={linkClass("/items/manage")}>
                  Manage Plants
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href="/about" className={linkClass("/about")}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
          </li>
        </ul>

        {/* AUTH BUTTONS (DESKTOP) */}
        <div className="hidden items-center gap-4 md:flex">
          {!isPending && !user?.email && (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300">
                Login
              </Link>
              <Link href="/signup">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-md font-medium px-5 rounded-xl">
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {!isPending && user?.email && (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border border-emerald-500"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                    {user.name[0]?.toUpperCase()}
                  </div>
                )}
                <span>Profile</span>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-sm font-medium px-4 py-1.5 rounded-xl text-sm"
              >
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none md:hidden dark:hover:bg-slate-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white p-4 md:hidden dark:border-slate-800 dark:bg-slate-900 shadow-inner">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-base font-medium ${pathname === "/" ? "text-emerald-600" : "text-slate-700"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/plants"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-base font-medium ${pathname === "/plants" ? "text-emerald-600" : "text-slate-700"}`}
              >
                Explore Plants
              </Link>
            </li>
            {user?.email && (
              <>
                <li>
                  <Link
                    href="/items/add"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-base font-medium ${pathname === "/items/add" ? "text-emerald-600" : "text-slate-700"}`}
                  >
                    Add Plant
                  </Link>
                </li>
                <li>
                  <Link
                    href="/items/manage"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-base font-medium ${pathname === "/items/manage" ? "text-emerald-600" : "text-slate-700"}`}
                  >
                    Manage Plants
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-base font-medium ${pathname === "/profile" ? "text-emerald-600" : "text-slate-700"}`}
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-base font-medium ${pathname === "/about" ? "text-emerald-600" : "text-slate-700"}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-base font-medium ${pathname === "/contact" ? "text-emerald-600" : "text-slate-700"}`}
              >
                Contact
              </Link>
            </li>

            <li className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800 flex flex-col gap-2">
              {!user?.email ? (
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <Button variant="bordered" className="w-full border-emerald-600 text-emerald-600 font-medium rounded-xl">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <Button className="w-full bg-emerald-600 text-white font-medium rounded-xl">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-xl"
                >
                  Logout
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
