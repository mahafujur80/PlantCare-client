"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import PlantCard, { Plant } from "../Share/PlantCard";
import PlantCardSkeleton from "../Share/PlantCardSkeleton";
import {  getTrandingPlants } from "@/lib/PlantAction";

export default function Trending() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const plantsData = await getTrandingPlants()
        setPlants(plantsData || []);
      } catch (err) {
        console.error("Failed to load trending plants:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  return (
    <section className="py-16 bg-white border-b border-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              Featured Highlights
            </h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Our Trending Plants
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Check out these popular plant varieties that are easy to care for, look beautiful, and clean the air in your home.
            </p>
          </div>
          <Link href="/plants">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold rounded-xl text-xs px-4 py-2 mt-4 md:mt-0 shadow-sm">
              Explore All Plants
            </Button>
          </Link>
        </div>

        {/* Plant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <PlantCardSkeleton key={idx} />
              ))
            : plants.map((plant) => (
                <PlantCard key={plant._id || plant.id} plant={plant} />
              ))}
        </div>
      </div>
    </section>
  );
}
