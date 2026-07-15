"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaArrowRight, FaLeaf } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50/40 dark:from-emerald-950/20 dark:to-slate-900 min-h-screen">
      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 left-10 -z-10 min-h-screen w-72 rounded-full bg-emerald-300/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 -z-10 h-96 w-96 rounded-full bg-teal-300/10 blur-3xl" />

      <div className="container mx-auto px-6 h-full flex flex-col justify-center min-h-screen">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          {/* Text Content */}
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <span className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <FaLeaf /> Plantcare Premium Selection
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
              Bring the Tropics Indoors <br />
              <span className="text-emerald-600 dark:text-emerald-400">Monstera Deliciosa</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Known for its iconic split leaves, the Monstera Deliciosa is a statement piece for any living room. Medium light, moderate water, maximum style.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/plants">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-6 text-base">
                  Explore Catalogue <FaArrowRight className="ml-1.5 text-sm" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-emerald-600/30 dark:border-emerald-500/30 hover:border-emerald-600 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl px-6 py-6 text-base">
                  Learn Care Science
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-3xl border-4 border-white shadow-2xl dark:border-slate-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80"
                alt="Monstera Deliciosa"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-bold text-emerald-800 shadow-sm dark:bg-slate-900/80 dark:text-emerald-400">
                ★ 4.8 Care Score
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
